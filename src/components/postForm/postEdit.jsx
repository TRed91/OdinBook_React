import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./postForm.module.css";
import {useNavigate, useParams} from "react-router-dom";

function PostEdit() {

    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [body, setBody] = useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (post){
            setBody(post.text);
        } else {
            fetch(`https://site--odinbookapi--q2l8yjbfk2dn.code.run/post/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
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
                    setMessage("Oops! Something went wrong.");
                });
        }

    }, [post, postId]);

    const handleChange = (e) => {
        if (message !== "") setMessage("")
        setBody(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://site--odinbookapi--q2l8yjbfk2dn.code.run/post/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                text: body
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    navigate(`/posts/${post.postId}`);
                } else {
                    setMessage(data.message);
                }
            }).catch(err => {
                console.log(err.message);
                setMessage("Oops! Something went wrong.");
        })
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.postForm}>
                <textarea required
                          className={styles.postInput}
                          onChange={handleChange}
                          value={body}>
                </textarea>
                <button>Edit</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

PostEdit.propTypes = {
    post: PropTypes.shape({
        text: PropTypes.string.isRequired,
        postId: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired,
        time: PropTypes.string.isRequired,
        _count: PropTypes.object.isRequired,
    })
}

export default PostEdit;