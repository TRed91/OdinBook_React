import {useOutletContext} from "react-router-dom";

function Profile() {

    const [user, setUser] = useOutletContext()

    if (user) {
        return (
            <div>
                <h2>{user.userName}'s Profile</h2>
                <div>
                    <p>Username: </p>
                    <p>{user.userName}</p>
                </div>
                <div>
                    <p>Email: </p>
                    <p>{user.email}</p>
                </div>
            </div>
        )
    }
}

export default Profile;