import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Classrooms = () => {

    const {user} = useAuth0();
    const [userType, setUserType] = useState('');
    const [subjects, setSubjects] = useState([{}]);

    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const res = await axios.get(`/api/users?email=${user?.email}`);
                const userData = res.data.message['enrolledClasses'];
                // console.log(userData);
                userData ? setUserType("student") : setUserType("teacher");
            }
            catch (error) {
                console.error(error);
            }
        }
        
        fetchUserType();
    }, [user]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await axios.get(`/api/classes/all`);
                setSubjects(res.data);
            }
            catch (error) {
                console.error("subjects error.", error)
            }
        
        }

        fetchSubjects();
    }, []);
    

    return (
        <div>
            <H1><img width="32px" src={user?.picture} alt="profile" /> {user?.name} ({userType}), Your teacher has invited you to...</H1>
            <center>
                <UL>
                    {subjects.map(subject => (
                        <li key={subject._id}>
                            <Link
                            to={`/${subject._id}`} 
                            // to={`/${subject.subject}${subject.code}${subject.number}`}
                            >{subject.name}</Link>
                        </li>
                    ))}
                    <li>English</li>
                </UL>
            </center>
        </div>
    )
}

const H1 = styled.h1`
    font-family: sans-serif;
`;
const UL = styled.ul`
    border: solid black;
    padding: 2rem;
    border-radius: 8px;
    list-style-type: none;
`;

export default Classrooms