import styles from "./posts.module.css";
import PropTypes from "prop-types";
import PostCard from "./postCard.jsx";

function Posts({posts, userId}) {

    return (
        <div className={styles.profilePosts}>
            {posts.map((post) => (
                <PostCard post={post} key={post.postId} passKey={post.postId} userId={userId} />
            ))}
        </div>
    )
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired,
}

export default Posts;