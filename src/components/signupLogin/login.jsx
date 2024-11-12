import styles from './signupLogin.module.css';

function Login() {
    return (
        <>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id={"username"} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id={"password"} required />
                </div>
                <button>Login</button>
            </form>
        </>
    )
}

export default Login;