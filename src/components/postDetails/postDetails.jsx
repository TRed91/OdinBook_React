import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PostCard from "../posts/postCard.jsx";
import Posts from "../posts/posts.jsx";
import styles from "./postDetails.module.css";

function PostDetails() {
    const { postId } = useParams();
    const [ post, setPost ] = useState();
    const [ message, setMessage ] = useState("");

    useEffect(() => {
        if (postId) {
            fetch(`http://localhost:3000/post/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        setPost(data.data);
                    } else {
                        setMessage(data.message);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    setMessage("Oops! Something went wrong!");
                });
        }
    }, [postId]);

    if (post) {
        return (
            <div className={styles.postDetailsContainer}>
                <div className={styles.originalPost}>
                    <PostCard post={post} />
                </div>
                <div className={styles.comments}>
                    <Posts posts={post.comments}/>
                </div>
            </div>
        )
    }
}

export default PostDetails;