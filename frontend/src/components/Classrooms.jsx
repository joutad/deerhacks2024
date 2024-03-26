import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Classrooms = () => {

    const {user, isAuthenticated} = useAuth0();
    const [userType, setUserType] = useState('');
    const [subjects, setSubjects] = useState([{}]);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchUserDetails = async () => {
                try {
                    const res = await axios.get(`/api/users?email=${user?.email}`);
                    const userData = res.data.message['enrolledClasses'];
                    // console.log(userData);
                    userData ? setUserType("student") : setUserType("teacher");
                    if (!user.name || !user.given_name || !user.family_name) {
                        user.name = res.data.message['name'];
                        const nameArr = user.name.split(" ");
                        user.given_name = nameArr[0];
                        user.family_name = nameArr[nameArr.length-1];
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        
            fetchUserDetails();
        }
    }, [user, isAuthenticated]);

    useEffect(() => {
        const fetchSubjects = async () => {
            if (userType === 'student') {
                try {
                    const res = await axios.get(`/api/users?email=${user?.email}`);
                    console.log(res.data.message['enrolledClasses']);
                    setSubjects(res.data.message['enrolledClasses']);
                }
                catch (error) {
                    console.error("student: subjects error.", error)
                }
            }
            else if (userType === 'teacher') {
                try {
                    const res = await axios.get(`/api/classes/taughtBy?teacher=${user?.email}`);
                    setSubjects(res.data);
                }
                catch (error) {
                    console.error("teacher: subjects error.", error);
                }
            }        
        }

        fetchSubjects();
    }, [userType, user?.email]);
    

    return (
        <div>
            {userType === 'teacher' ?
                (
                    <Link to='/createClassroom'>
                        <CreateClassButton userType={userType}>+ Create Classroom</CreateClassButton>
                    </Link>
                ):
                (
                    ""
                )
            }
            <H1><img width="32px" src={user?.picture} alt="profile" /> {user?.name} ({userType}){userType === 'student' ? `, Your teacher has invited you to...` : ``}</H1>
            <center>
                <UL>
                    {subjects.map(subject => (
                        <li
                            key={`/${subject.subject}${subject.code}${subject.number}`}
                            // key={subject._id}
                            >
                            <Link
                            to={`/${subject._id}`} 
                            // to={`/${subject.subject}${subject.code}${subject.number}`}
                            >{subject.name}</Link>
                        </li>
                    ))}
                    <li>English</li>
                    {/* The above <li> is just to show at least one class */}
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
const CreateClassButton = styled.button`
    background-color: black;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 8px;
`;

export default Classrooms