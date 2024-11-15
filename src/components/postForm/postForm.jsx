import {useOutletContext, useParams} from "react-router-dom";
import {useState} from "react";
import styles from "./postForm.module.css";

function PostForm () {

    const [ user, setUser ] = useOutletContext();
    const [ text, setText ] = useState('');
    const [ message, setMessage ] = useState(null);
    const { commentId } = useParams();

    const handleInputChange = e => {
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

    return (
        <div className={styles.formContainer}>
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

export default PostForm;