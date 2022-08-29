import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../Context/LoginContext'

function Login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { setUser } = React.useContext(LoginContext)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        const body = {
            email,
            password
        }
        // console.log(body)
        try {
            let data = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            let response = await data.json();
            console.log(response)
            let token = response.token;
            localStorage.setItem('token', token);
            setUser(token)
            alert("User logged in successfully")
            navigate('/notes');
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>Email:
                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>Password:
                    <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
            </form>
            <Link to='/register'>Create An Account</Link>
        </div>
    )
}

export default Login;