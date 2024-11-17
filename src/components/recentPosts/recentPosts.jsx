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
            fetch(`http://localhost:3000/post/recent/${user.userId}`, {
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
        <div className={styles.recentPosts}>
            {message && <p>{message}</p>}
            {user && <Posts posts={userPosts} userId={user.userId}/>}
            {user && <Posts posts={followPosts} userId={user.userId} />}
        </div>
    )
}

export default RecentPosts;