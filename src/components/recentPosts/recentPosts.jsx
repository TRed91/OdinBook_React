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
                        console.log(data.data);
                        setUserPosts(data.data.posts);
                        setFollowPosts(data.data.following)
                    } else {
                        setMessage(data.message);
                    }
                }).catch(err => {
                console.log(err.message);
                setMessage("Oops! Something went wrong...");
            });
        }
    }, [user])

    return (
        <div className={styles.recentPosts}>
            {message && <p>{message}</p>}
            <Posts posts={userPosts}/>
            {followPosts.map(f => {
                return <Posts posts={f.posts} />
            })}
        </div>
    )
}

export default RecentPosts;