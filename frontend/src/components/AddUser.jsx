import React from 'react'
import axios from 'axios';
import CreateUserForm from '../components/CreateUserForm'


const AddUser = () => {
    
    const createUser = async (userData) => {
        try {
            console.log(userData);
            const res = await axios.post(`/api/users/${userData['userType']}/create`, userData);
            console.log(res.data);
            alert(`${userData['userType']} ${userData['name']} (${userData['email']}) added successfully!`)
        }
        catch (error) {
            console.error(error);
        }
    }
    
    return (
        <CreateUserForm onSubmit={createUser} />
    )
}

export default AddUser
