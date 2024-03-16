import React, { useState } from 'react'

const CreateUserForm = ({ onSubmit, values }) => {

    const [name] = useState(values.firstName + " " + values.lastName);
    const [email] = useState(values.email);
    const [userType, setUserType] = useState("student");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name, email, userType });
    }

    return (
        <form action="create" method="post" onSubmit={handleSubmit}>
            {/* FIRST NAME */}
            <label htmlFor="name">first name</label>
            <input type="text" value={values.firstName} disabled />
            <br />

            {/* LAST NAME */}
            <label htmlFor="name">last name</label>
            <input type="text" value={values.lastName} disabled />
            <br />

            {/* EMAIL */}
            <label htmlFor="email">email</label>
            <input type="email" value={values.email} disabled />
            <br />

            {/* USER TYPE */}
            <select value={userType} onChange={(e) => setUserType(e.target.value)} >
                <option value="student">student</option>
                <option value="teacher">teacher</option>
            </select><br />
            <button type="submit">Create User!</button>
        </form>
    )
}

export default CreateUserForm
