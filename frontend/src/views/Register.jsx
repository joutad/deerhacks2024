import React, { useState } from 'react'

const Register = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("student");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Registering ${emailAddress}, the pass is ${password}`);
    }

    const handleChange = (event) => {
        setUserType(event.target.value);
    }
  
    return (
        <div className='auths'>
            <h1 className='auths-header'>Register</h1>
            <form onSubmit={handleSubmit}>
                {/* Email address */}
                <label htmlFor="emailAdd">Email Address</label>
                <input type="email" name="emailAdd" id="emailAdd" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>

                {/* Password */}
                <label htmlFor="passwd">Password</label>
                <input type="password" name="passwd" id="passwd" value={password} onChange={(e) => setPassword(e.target.value)}/>

                {/* Confirm password */}
                {/* HERE */}

                {/* Account Type */}
                <select name="accountType" id="accountType" value={userType} onChange={handleChange}>
                    <option value="student">student</option>
                    <option value="teacher">teacher</option>
                </select>

                {/* Register Button */}

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register