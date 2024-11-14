import {useOutletContext} from "react-router-dom";
import styles from "./profile.module.css";
import {useEffect, useState} from "react";

function Profile() {

    const [user, setUser] = useOutletContext()
    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        user && fetch(`http://localhost:3000/post/user/${user.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setPosts(data.data)
                } else {
                    setMessage(data.message);
                }
            })
            .catch(err => {
                console.log(err.message);
                setMessage("Oops! Something went wrong!");
            });
    }, [])

    const formatDate = (string) => {
        const date = new Date(string);
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    }

    if (user) {
        return (
            <div className={styles.profileContainer}>
                <div className="avatar hero">
                    <img src={user.avatarUrl} alt=""/>
                    <h1>{user.userName}</h1>
                </div>
                <div className={styles.profileDetails}>
                    <img src="" alt=""/>
                    <p>{user.email}</p>
                </div>
                <div className={styles.profilePosts}>
                {posts.map((post) => (
                        <div key={post.postId} className={styles.postCard}>
                            <div className={styles.postText}>
                                {post.text}
                            </div>
                            <div className={styles.postOptions}>
                                <div className={styles.postTime}>
                                    {formatDate(post.time)}
                                </div>
                                <div>
                                    Comments: {post._count.comments}
                                </div>
                                <div className={styles.postLikes}>
                                    Likes: {post._count.likes}
                                </div>
                            </div>
                        </div>
                ))}
                </div>
            </div>
        )
    }
}

export default Profile;