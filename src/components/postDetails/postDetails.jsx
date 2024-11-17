import {useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PostCard from "../posts/postCard.jsx";
import Posts from "../posts/posts.jsx";
import styles from "./postDetails.module.css";
import PropTypes from "prop-types";

function PostDetails() {
    const { postId } = useParams();
    const [ user, setUser ] = useOutletContext();
    const [ post, setPost ] = useState();

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
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [postId]);

    if (post && user) {
        return (
            <div className={styles.postDetailsContainer}>
                <div className={styles.originalPost}>
                    <PostCard post={post} userId={user.userId} />
                </div>
                <div className={styles.comments}>
                    <Posts posts={post.comments} userId={user.userId} />
                </div>
            </div>
        )
    }
}

PostDetails.propTypes = {
    postId: PropTypes.string,
    post: PropTypes.shape({
        user: PropTypes.object,
        comments: PropTypes.array,
    })
}

export default PostDetails;