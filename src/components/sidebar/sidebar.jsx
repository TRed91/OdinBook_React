import styles from './sidebar.module.css';
import {GravatarQuickEditorCore} from "@gravatar-com/quick-editor";
import PropTypes from "prop-types";

function Sidebar({user}) {

    return (
        <>
            <ul className={styles.sidebarContainer}>
                <li>
                    <a href="/new">
                        New Post
                    </a>
                </li>
                <li>
                    <a href={`/profile/${user.userId}`}>
                        Profile
                    </a>
                </li>
                <li>
                    <a href="/posts">
                        Recent Posts
                    </a>
                </li>
                <li>
                    <a href="/community">
                        Community
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
                    }}>Change Avatar</a>
                </li>}
            </ul>
        </>
    )
}

Sidebar.propTypes = {
    user: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    })
}

export default Sidebar;