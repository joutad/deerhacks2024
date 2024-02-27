import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
        
        <div className="App">
            <form action="/login_direct" method="post">
                <h1>Welcome to Lil' Learner!</h1>
                <label htmlFor="email">Enter your email:</label>
                <input type="email" name="email" id="email" placeholder="Email"/>
                
                <label htmlFor="password">Enter your password:</label>
                <input type="password" name="password" id="password" placeholder="Password"/>
                
                <label htmlFor="role">Select your role:</label>
                <select name="role" id="role" required>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>

                <input type="submit" value="Login"/>
                {/* <p>{{ html_error }}</p> */}
                <Link to="/register">Don't have an account yet? Register</Link>
                <Link to="/login">Login with Auth0</Link>

            </form>
        </div>
  )
}

export default Login