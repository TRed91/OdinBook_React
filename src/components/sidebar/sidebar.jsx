import styles from './sidebar.module.css';
import {GravatarQuickEditorCore} from "@gravatar-com/quick-editor";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

function Sidebar({user}) {

    const [ pendingFollowCount, setPendingFollowCount ] = useState(0);

    useEffect(() => {
        if (user) {
            setPendingFollowCount(user.incomingRequest.length)
        }
    }, [user]);

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
                <li>
                    <a href="/requests">
                        Follow Requests
                        {pendingFollowCount > 0 ?
                            <span className={styles.pendingFollows}>{pendingFollowCount}</span> :
                            <span className={styles.noPendingFollows}>{pendingFollowCount}</span>}
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
        incomingRequest: PropTypes.arrayOf(PropTypes.object).isRequired,
    })
}

export default Sidebar;