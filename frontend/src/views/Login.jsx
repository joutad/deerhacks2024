import React, { useState } from 'react'
import "../styles/auths.css"
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import Profile from '../components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPasswword] = useState("");

    const { isLoading, error } = useAuth0();

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The email is: ${emailAddress}\nYour password is ${password} :D`)
    }
    
    return (
        <div className='auths'>
            <h1 className='auths-header'>Login</h1>
            <form onSubmit={handleSubmit}>
                {/* Email address */}
                <div className='email'>
                    <label htmlFor="emailAdd">Email Address</label>
                    <input type="email" name="emailAdd" id="emailAdd" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
                </div>

                {/* Password */}
                <div className='pass'>
                    <label htmlFor="passwd">Password</label>
                    <input type="password" name="passwd" id="passwd" value={password} onChange={(e) => setPasswword(e.target.value)}/>
                </div>

                <button type="submit">Log In</button>
            </form>
            <main className='column'>
                <h1>auth0 login</h1>
                {error && <p>Authentication Error</p>}
                {!error && isLoading && <p>Loading userdata...</p>}
                {!error && !isLoading && (
                    <>
                        <LoginButton/>
                        <LogoutButton/>
                        <Profile />
                    </>
                )}
                
            </main>
        </div>
    )
}

export default Login