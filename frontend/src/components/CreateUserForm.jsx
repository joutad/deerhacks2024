import React, { useEffect, useState } from 'react'

const CreateUserForm = ({ onSubmit, values }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [name, setName] = useState("");
    const [email] = useState(values.email);
    const [userType, setUserType] = useState("student");

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = firstName + " " + lastName;
        console.log(name);
        onSubmit({ name, email, userType });
    }

    useEffect(() => {
        if (values.firstName && values.lastName) {
            // console.log(name, name.length);
            console.log("FIRSTNAME EXISTS?", values.firstName);
            setFirstName(values.firstName);
            setLastName(values.lastName);
            // setName(firstName + " " + lastName);
        }
        // else if (name.trim.length <= 4) {
        //     // console.log(firstName, lastName);
        //     setName(firstName + " " + lastName);
        //     // console.log(name);
        // }

    }, [values, firstName, lastName]);
    

    return (
        <form action="create" method="post" onSubmit={handleSubmit}>
            {/* FIRST NAME */}
            <label htmlFor="name">first name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={values.firstName && values.firstName.length > 0}/>
            <br />

            {/* LAST NAME */}
            <label htmlFor="name">last name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={values.lastName && values.lastName.length > 0} />
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
