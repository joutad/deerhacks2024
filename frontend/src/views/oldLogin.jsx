import React, { useState } from 'react'
import "../styles/auths.css"
import LoginButton from '../old_components/LoginButton';
import LogoutButton from '../old_components/LogoutButton';
import Profile from '../old_components/Profile';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPasswword] = useState("");

    const { isLoading, error } = useAuth0();

    // const createUser = async (userData) => {
    //     try {
    //         console.log(userData);
    //         const res = await axios.post('/api/users/create', userData);
    //         console.log(res.data);
    //         alert(`${userData['userType']} ${userData['name']} (${userData['email']}) added successfully!`)
    //     }
    //     catch (error) {
    //         console.error(error);
    //         // alert('error adding student. please try again.')
    //     }
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The email is: ${emailAddress}\nYour password is ${password} :D`)
    }

    const createUser = async (userData) => {
        try {
            console.log(userData);
            const res = await axios.post('/api/users/create', userData);
            console.log(res.data);
            alert(`${userData['userType']} ${userData['name']} (${userData['email']}) added successfully!`)
        }
        catch (error) {
            console.error(error);
            // alert('error adding student. please try again.')
        }
    }
    
    return (
        <div className='auths'>
            <h1 className='auths-header'>Login</h1>
            <form>
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
                        <Profile onSubmit={createUser}/>
                    </>
                )}
                
            </main>
        </div>
    )
}

export default OldLogin