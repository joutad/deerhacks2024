import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Classrooms = () => {

    const {user} = useAuth0();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const res = await axios.get(`/api/users?email=${user?.email}`);
                const userData = res.data.message['userType'];
                console.log(userData);
                setUserType(userData);
            }
            catch (error) {
                console.error(error);
            }
        }
        
        fetchUserType();
    }, [user])
    

    return (
        <div>
            <h1>{userType}, Your teacher has invited you to...</h1>
            <ul>
                <li>Math</li>
                <li>English</li>
            </ul>
        </div>
    )
}

export default Classrooms