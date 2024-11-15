import styles from "./posts.module.css";
import Avatar from "../avatar/avatar.jsx";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const formatDate = (string) => {
    const date = new Date(string);
    const day = padNumber(date.getDay());
    const month = padNumber(date.getMonth());
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());
    return `${day}/${month}/${date.getFullYear()} - ${hours}:${minutes}`;
}

const padNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
}

function PostCard({post , passKey}) {

    const navigate = useNavigate();

    return (
        <div key={passKey} className={styles.postCard}>
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
                <div>
                    Comments: {post._count.comments}
                </div>
                <div className={styles.postLikes}>
                    Likes: {post._count.likes}
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
    passKey: PropTypes.number.isRequired,
}

export default PostCard;