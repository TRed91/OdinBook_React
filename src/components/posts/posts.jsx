import styles from "./posts.module.css";
import PropTypes from "prop-types";
import Avatar from "../avatar/avatar.jsx";
import {useNavigate} from "react-router-dom";
import PostCard from "./postCard.jsx";

function Posts({posts}) {

    return (
        <div className={styles.profilePosts}>
            {posts.map((post) => (
                <PostCard post={post} key={post.postId} passKey={post.postId} />
            ))}
        </div>
    )
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default Posts;