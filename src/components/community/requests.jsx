import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import styles from "./userCard.module.css"
import RequestCard from "./requestCard.jsx";

function Requests() {

    const [ user, setUser ] = useOutletContext();

    return (
        <div className={styles.userCardContainer}>
            {user &&
                user.incomingRequest.map( c => {
                    return <div key={user.userId}><RequestCard userRequest={c} activeUser={user}/></div>
                })}
        </div>
    )
}

export default Requests;