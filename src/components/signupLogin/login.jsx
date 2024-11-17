import styles from './signupLogin.module.css';
import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";

function Login() {

    const [ user, setUser ] = useOutletContext();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const data = await res.json();
            if (data.ok) {
                localStorage.setItem('token', data.data.token);
                setUser(data.data.user);
                navigate(`/profile/${data.data.user.userId}`);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log(error.message);
            setMessage("Oops! Something went wrong!");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id={"username"} required
                        value={ username }
                        onChange={ (e) => setUsername(e.target.value) }/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id={"password"} required
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }/>
                </div>
                <button>Login</button>
            </form>
            <p className={styles.errMsg}>{message}</p>
        </div>
    )
}

export default Login;