import styles from './signupLogin.module.css';

function Signup() {
    return (
        <>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id={"username"} required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id={"email"} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id={"password"} required/>
                </div>
                <div>
                    <label htmlFor="cpw">Confirm Password</label>
                    <input type="password" id={"cpw"} required/>
                </div>
                <button>Sign Up</button>
            </form>
        </>
    )
}

export default Signup;