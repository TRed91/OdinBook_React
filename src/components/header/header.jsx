import styles from './header.module.css';
import {useNavigate} from "react-router-dom";

function Header({user, logoutUser}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        logoutUser();
        navigate('/login');
    }

    return (
        <header>
            <h1>Odin Book</h1>
            <nav>
                <ul>
                    {!user && <li><a href="login">Login</a></li>}
                    {!user && <li><a href="signup">Sign Up</a></li>}
                    {user && <li><a href="">Profile</a></li>}
                    {user && <li><a href="">Posts</a></li>}
                    {user && <li><a onClick={handleLogout}>Logout</a></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;