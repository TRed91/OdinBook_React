import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import UserCard from "./userCard.jsx";
import styles from "./userCard.module.css"

function Community() {

    const [ user, setUser ] = useOutletContext();
    const [ community, setCommunity ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/user/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        const users = data.data.filter(u => u.userId !== user.userId)
                        setCommunity(users);
                        setLoading(false);
                    }
                }).catch(err => {
                console.log(err.message);
            });
        }
    }, [user]);

    return (
        <div className={styles.userCardContainer}>
            {loading ? <p>Loading...</p> :
            community.map((user) => {
                return <div key={user.userId}><UserCard user={user} key={user.id} /></div>
            })}
        </div>
    )
}

export default Community;