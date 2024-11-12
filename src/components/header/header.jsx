import styles from './header.module.css';

function Header({user}) {

    return (
        <header>
            <h1>Odin Book</h1>
            <nav>
                <ul>
                    {!user && <li><a href="login">Login</a></li>}
                    {!user && <li><a href="signup">Sign Up</a></li>}
                    {user && <li><a href="">Profile</a></li>}
                    {user && <li><a href="">Posts</a></li>}
                    {user && <li><a href="">Logout</a></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;