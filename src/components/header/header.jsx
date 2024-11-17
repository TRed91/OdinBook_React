import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Header.module.css";

function Header({user, logoutUser}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        logoutUser();
        navigate('/login');
    }

    return (
        <header className={styles.header}>
            <h1>Odin Book</h1>
            <nav>
                <ul>
                    {!user && <li><img src="/login-2-svgrepo-com.svg" width={25} alt="" className={"icon"}/><a href="/login">Login</a></li>}
                    {!user && <li><img src="/login-2-svgrepo-com.svg" width={25} alt="" className={"icon"}/><a href="/signup">Sign Up</a></li>}
                    {user && <li>
                        <img src="/logout-svgrepo-com.svg" width={25} className={"icon"} alt=""/>
                        <a onClick={handleLogout} className={styles.logout}>
                            Logout
                        </a>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.object,
    logoutUser: PropTypes.func.isRequired,
}

export default Header;