import styles from './sidebar.module.css';

function Sidebar() {

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
            </ul>
        </>
    )
}

export default Sidebar;