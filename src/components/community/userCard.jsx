import Avatar from "../avatar/avatar.jsx";
import PropTypes from "prop-types";
import styles from "./userCard.module.css";
import {useNavigate} from "react-router-dom";

function UserCard({ user }) {

    const navigate = useNavigate();

    return (
        <div className={styles.userCard}>
            <Avatar user={user} big={false}/>
            <div className={styles.cardButtonContainer}>
                <button onClick={() => navigate(`/profile/${user.userId}`)}>Profile</button>
                <button>Follow</button>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
}

export default UserCard;