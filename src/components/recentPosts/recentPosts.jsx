import {useOutletContext} from "react-router-dom";
import Posts from "../posts/posts.jsx";
import {useEffect, useState} from "react";
import styles from "./recentPosts.module.css";

function RecentPosts() {

    const [ user, setUser ] = useOutletContext();
    const [ userPosts, setUserPosts ] = useState([]);
    const [ followPosts, setFollowPosts ] = useState([]);
    const [ message, setMessage ] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`https://site--odinbookapi--q2l8yjbfk2dn.code.run/post/recent/${user.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        setUserPosts(data.data.posts);
                        uniteFollowPosts(data.data.following);
                    } else {
                        setMessage(data.message);
                    }
                }).catch(err => {
                console.log(err.message);
                setMessage("Oops! Something went wrong...");
            });
        }
    }, [user])

    function uniteFollowPosts(following) {
        const postsArray = [];
        following.forEach(f => {
           f.posts.forEach(post => {
               postsArray.push(post);
           })
        });
        postsArray.sort((a, b) => {
            const aDate = new Date(a.time);
            const bDate = new Date(b.time);
            return bDate - aDate;
        })
        setFollowPosts(postsArray);
    }

    return (
        <div className={styles.recentPostsContainer}>
            {message && <p>{message}</p>}
            <div className={styles.recentPosts}>
                <h2 className={styles.section}>Your posts</h2>
                {user && <Posts posts={userPosts} userId={user.userId}/>}
            </div>
            <div className={styles.recentPosts}>
                <h2 className={styles.section}>Users you follow</h2>
                {user && <Posts posts={followPosts} userId={user.userId} />}
            </div>
        </div>
    )
}

export default RecentPosts;