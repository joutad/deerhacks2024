import React from 'react'
import '../styles/register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
        <form action="/register" method="post">
        <h1>Register for Lil' Learner!</h1>
        <label htmlFor="name">Enter your name:</label>
        <input type="text" name="name" id="name" placeholder="Name" required />
        
        <label htmlFor="email">Enter your email:</label>
        <input type="text" name="email" id="email" placeholder="Email" required />
        
        <label htmlFor="password">Choose a password:</label>
        <input type="password" name="password" id="password" placeholder="Password" required />
        
        <label htmlFor="role">Select your role:</label>
        <select name="role" id="role" required>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
        </select>
        
        <input type="submit" value="Register" />
        <Link to="/">Already have an account? Login</Link>
    </form>
    </div>
  )
}

export default Register