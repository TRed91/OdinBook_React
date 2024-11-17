import {useEffect, useState} from "react"
import styles from "./postForm.module.css";
import {useOutletContext, useParams} from "react-router-dom";
import PostCard from "../posts/postCard.jsx";

function PostForm () {

    const { commentedId } = useParams();
    const [ user, setUser ] = useOutletContext();
    const [ text, setText ] = useState('');
    const [ message, setMessage ] = useState(null);
    const [ post, setPost ] = useState(null);

    useEffect(() => {
        if (commentedId > 0) {
            fetch(`http://localhost:3000/post/${commentedId}`, {
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
                }).catch(err => console.log(err));
        }
    }, [commentedId]);

    const handleInputChange = e => {
        console.log(commentedId);
        setMessage(null);
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/post/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                userId: user.userId,
                text: text,
                commentedId: commentedId === '0' ? null : commentedId,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setText('');
                    setMessage({ok: true, message: 'Post created!'});
                } else {
                    setMessage({ok: false, message: data.message});
                }
            })
            .catch(err => {
            console.log(err.message);
            setMessage({ ok: false, message: 'Oops! Something went wrong!' });
        });
    }

    if (user) {
        return (
            <div className={styles.formContainer}>
                { post && <PostCard post={post} userId={user.userId} />}
                <form className={styles.postForm} onSubmit={handleSubmit}>
                <textarea name="post" id="post" required
                          className={styles.postInput}
                          value={text}
                          onChange={handleInputChange}>
                </textarea>
                    <button>Post</button>
                </form>
                {message && (message.ok ?
                    <p className={styles.messageSuccess}>{message.message}</p> :
                    <p className={styles.messageFail}>{message.message}</p>)}
            </div>
        )
    }
}

export default PostForm;