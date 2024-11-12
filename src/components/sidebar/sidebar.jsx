import styles from './sidebar.module.css';
import {GravatarQuickEditorCore} from "@gravatar-com/quick-editor";

function Sidebar({user}) {

    return (
        <>
            <ul className={styles.sidebarContainer}>
                <li>
                    <a href="/">
                        Profile
                    </a>
                </li>
                <li>
                    <a href="posts">
                        Posts
                    </a>
                </li>
                {user && <li>
                    <a onClick={() => {
                            new GravatarQuickEditorCore({
                                email: user.email,
                                editorTriggerSelector: '#edit-profile',
                                avatarSelector: '#gravatar-avatar',
                                scope: ['avatars'],
                            }).open()
                    }}>Change Profile Picture</a>
                </li>}
            </ul>
        </>
    )
}

export default Sidebar;