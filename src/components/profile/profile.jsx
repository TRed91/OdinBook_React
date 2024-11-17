import {useOutletContext, useParams} from "react-router-dom";
import styles from "./profile.module.css";
import {useEffect, useState} from "react";
import Posts from "../posts/posts.jsx";
import Avatar from "../avatar/avatar.jsx";

function Profile() {

    const { userId } = useParams()
    const [ user, setUser ] = useOutletContext();
    const [ userProfile, setUserProfile ] = useState();
    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        if(user){
            fetch(`http://localhost:3000/post/user/${userId}`, {
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
            fetch(`http://localhost:3000/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        setUserProfile(data.data);
                    }
                }).catch(err => {
                console.log(err);
                setMessage("Oops! Something went wrong!");
            });
        }
    }, [user])

    if (userProfile) {
        return (
            <div className={styles.profileContainer}>
                <div className={styles.avatarContainer}>
                    <Avatar user={userProfile} big={true} />
                </div>
                <div className={styles.profileDetails}>
                    <img src="/mail-svgrepo-com.svg" width={50} className={"icon"} alt=""/>
                    <p>{userProfile.email}</p>
                </div>
                <div className={styles.postsSection}>
                    {message.length > 0 ? <p>{message}</p> : <Posts posts={posts} />}
                </div>
            </div>
        )
    }
}

export default Profile;