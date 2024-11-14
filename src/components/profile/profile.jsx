import {useOutletContext} from "react-router-dom";
import styles from "./profile.module.css";
import {useEffect, useState} from "react";
import Posts from "../posts/posts.jsx";
import Avatar from "../avatar/avatar.jsx";

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
    }, [user])

    if (user) {
        return (
            <div className={styles.profileContainer}>
                <div className={styles.avatarContainer}>
                    <Avatar user={user} big={true} />
                </div>
                <div className={styles.profileDetails}>
                    <img src="" alt=""/>
                    <p>{user.email}</p>
                </div>
                <div className={styles.postsSection}>
                    {message.length > 0 ? <p>{message}</p> : <Posts posts={posts} />}
                </div>
            </div>
        )
    }
}

export default Profile;