import styles from "./posts.module.css";
import Avatar from "../avatar/avatar.jsx";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const formatDate = (string) => {
    const date = new Date(string);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
}

function PostCard({post , key}) {

    const navigate = useNavigate();

    return (
        <div key={key} className={styles.postCard} onClick={() => navigate(`/posts/${post.postId}`)}>
            <div className={styles.postHeader}>
                <Avatar user={post.user} big={false}/>
            </div>
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
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        text: PropTypes.string.isRequired,
        postId: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired,
        time: PropTypes.string.isRequired,
        _count: PropTypes.object.isRequired,
    })
}

export default PostCard;