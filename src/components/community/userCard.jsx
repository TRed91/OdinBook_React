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
        fetch(`https://site--odinbookapi--q2l8yjbfk2dn.code.run/user/${activeUser.userId}/request/${userCard.userId}`, {
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
        fetch(`https://site--odinbookapi--q2l8yjbfk2dn.code.run/user/${activeUser.userId}/unfollow/${userCard.userId}`, {
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
                    <button onClick={() => navigate(`/profile/${userCard.userId}`)} className={styles.userCardButton}>
                        <img src="/profile-round-1342-svgrepo-com.svg" width={20} className={"icon"} alt=""/>
                        <span className={styles.userCardButtonText}>Profile</span>
                    </button>
                    {sentRequest() ? <button className={styles.pending}>Pending</button> :
                        isFollowing() ? <button onClick={handleUnfollowRequest} className={styles.userCardButton}>
                                <img src="/unfollow-svgrepo-com.svg" width={20} className={"icon"} alt=""/>
                                <span className={styles.userCardButtonText}>Unfollow</span>
                            </button> :
                            <button onClick={handleFollowRequest} className={styles.userCardButton}>
                                <img src="/user-follow-svgrepo-com.svg" width={20} className={"icon"} alt=""/>
                                <span className={styles.userCardButtonText}>Follow</span>
                            </button>}
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