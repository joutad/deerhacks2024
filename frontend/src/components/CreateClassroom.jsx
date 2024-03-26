import React from 'react'
import { Link } from 'react-router-dom'

const CreateClassroom = (userType) => {
    console.log(userType);
  return (
    <div>
        {userType === "teacher" ? (
            <Link to='/classrooms'>
                Return to classrooms
            </Link>):
            (
                "Not Authorized."
            )
        }
    </div>)
}

export default CreateClassroom