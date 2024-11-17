import styles from "./posts.module.css";
import Avatar from "../avatar/avatar.jsx";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const formatDate = (string) => {
    const date = new Date(string);
    const day = padNumber(date.getDate());
    const month = padNumber(date.getMonth() + 1);
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());
    return `${day}/${month}/${date.getFullYear()} - ${hours}:${minutes}`;
}

const padNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
}

function PostCard({post, userId}) {

    const navigate = useNavigate();

    const handleLike = () => {
        fetch(`http://localhost:3000/like/${post.postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.postCard}>
            <div className={styles.postHeader} onClick={() => navigate(`/posts/${post.postId}`)}>
                <Avatar user={post.user} big={false}/>
            </div>
            <div className={styles.postText} onClick={() => navigate(`/posts/${post.postId}`)}>
                {post.text}
            </div>
            <div className={styles.postOptions}>
                <div className={styles.postTime}>
                    {formatDate(post.time)}
                </div>
                <div className={styles.cardButtons}>
                    <div onClick={() => navigate(`/new/${post.postId}`)} className={styles.postComments}>
                        <img src="/comments-svgrepo-com.svg" width={30} className={"icon"} alt=""/> {post._count.comments}
                    </div>
                    <div className={styles.postLikes}
                        onClick={handleLike}>
                        <img src="/like-svgrepo-com.svg" width={30} className={"icon"} alt=""/> {post._count.likes}
                    </div>
                </div>
            </div>
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        text: PropTypes.string.isRequired,
        postId: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired,
        time: PropTypes.string.isRequired,
        _count: PropTypes.object.isRequired,
    }),
    userId: PropTypes.number,
}

export default PostCard;