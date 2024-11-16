import styles from "./userCard.module.css";
import Avatar from "../avatar/avatar.jsx";
import {useState} from "react";
import PropTypes from "prop-types";

function RequestCard({userRequest, activeUser}) {

    const [ message, setMessage ] = useState("");

    const handleAccept = () => {
        fetch(`http://localhost:3000/user/${activeUser.userId}/follow/${userRequest.userId}`, {
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
                } else {
                    setMessage(data.message);
                }
            })
            .catch(err => {
                console.log(err);
                setMessage("Oops! Something went wrong!");
            });
    }

    const handleDecline = () => {
        fetch(`http://localhost:3000/user/${activeUser.userId}/request/decline/${userRequest.userId}`, {
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
                } else {
                    setMessage(data.message);
                }
            })
            .catch(err => {
            console.log(err);
            setMessage("Oops! Something went wrong!");
        });
    }

    return (
        <div>
            <div className={styles.userCard}>
                <Avatar user={userRequest} big={false}/>
                <div className={styles.cardButtonContainer}>
                    <button onClick={handleAccept}>Accept</button>
                    <button onClick={handleDecline}>Decline</button>
                </div>
            </div>
            <div>{message}</div>
        </div>
    )
}

RequestCard.propTypes = {
    userRequest: PropTypes.object.isRequired,
    activeUser: PropTypes.object.isRequired,
}

export default RequestCard;