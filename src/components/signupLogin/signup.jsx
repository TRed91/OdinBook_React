import styles from './signupLogin.module.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup() {

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ cpw, setCpw ] = useState('');
    const navigate = useNavigate();
    const [message, setMessage ] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://site--odinbookapi--q2l8yjbfk2dn.code.run/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    cpw: cpw,
                }),
            });
            const data = await res.json();
            if (data.ok) {
                navigate('/login');
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
                    <label htmlFor="email">Email</label>
                    <input type="email" id={"email"} required
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id={"password"} minLength={8} required
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }/>
                </div>
                <div>
                    <label htmlFor="cpw">Confirm Password</label>
                    <input type="password" id={"cpw"} required
                        value={ cpw }
                        onChange={ (e) => setCpw(e.target.value) }/>
                </div>
                <button>Sign Up</button>
            </form>
            {Array.isArray(message) ?
                <ul>
                    {message.map((m, i) => <li key={i} className={styles.errMsg}>{m}</li>)}
                </ul> :
                <p className={styles.errMsg}>{message}</p>}
        </div>
    )
}

export default Signup;