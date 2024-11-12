import {useOutletContext} from "react-router-dom";
import { GravatarQuickEditorCore } from "@gravatar-com/quick-editor";
import styles from "./profile.module.css";

function Profile() {

    const [user, setUser] = useOutletContext()

    if (user) {
        return (
            <div className={styles.profileContainer}>
                <div className="avatar hero">
                    <img src={user.avatarUrl} alt=""/>
                    <h1>{user.userName}</h1>
                </div>
                <div className={styles.profileDetails}>
                    <div>
                        <img src="" alt=""/>
                        <p>{user.email}</p>
                    </div>
                    <div className={styles.profilePosts}>

                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;