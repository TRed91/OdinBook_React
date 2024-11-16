import Avatar from "../avatar/avatar.jsx";
import PropTypes from "prop-types";
import styles from "./userCard.module.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function UserCard({ userCard, activeUser }) {

    const navigate = useNavigate();
    const [ message, setMessage ] = useState("");

    const sentRequest = () => {
        let requestSent = false;
        activeUser.outgoingRequest.forEach(r => {
            if (r.userId === userCard.userId) {
                requestSent = true;
            }
        })
        return requestSent;
    }

    const isFollowing = () => {
        let isFollowing = false;
        activeUser.following.forEach(f => {
            if (f.userId === userCard.userId) {
                isFollowing = true;
            }
        })
        return isFollowing;
    }

    const handleFollowRequest = () => {
        fetch(`http://localhost:3000/user/${activeUser.userId}/request/${userCard.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setMessage("Follow request sent!");
                    window.location.reload();
                } else {
                    setMessage("Follow request failed!");
                }
            })
            .catch(err => {
                console.log(err);
                setMessage("Follow request failed!");
            });
    }

    const handleUnfollowRequest = () => {
        fetch(`http://localhost:3000/user/${activeUser.userId}/unfollow/${userCard.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err.message);
                setMessage("Oops! Something went wrong!");
        })
    }

    return (
        <div>
            <div className={styles.userCard}>
                <Avatar user={userCard} big={false}/>
                <div className={styles.cardButtonContainer}>
                    <button onClick={() => navigate(`/profile/${userCard.userId}`)}>Profile</button>
                    {sentRequest() ? <button className={styles.pending}>Pending</button> :
                        isFollowing() ? <button onClick={handleUnfollowRequest}>Unfollow</button> :
                                        <button onClick={handleFollowRequest}>Follow</button>}
                </div>
            </div>
            <div>{message}</div>
        </div>
    )
}

UserCard.propTypes = {
    userCard: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
    activeUser: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        incomingRequest: PropTypes.arrayOf(PropTypes.object).isRequired,
        outgoingRequest: PropTypes.arrayOf(PropTypes.object).isRequired,
        following: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
}

export default UserCard;