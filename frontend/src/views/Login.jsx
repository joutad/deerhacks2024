import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateUserForm from '../components/CreateUserForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {isAuthenticated, isLoading, user} = useAuth0();
    const [isNewUser, setIsNewUser] = useState(Boolean);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const checkUserExists = async () => {
                try {
                    const res = await axios.get(`/api/users?email=${user?.email}`);
                    const doesUserExists = !!res.data.message;
                    console.log("does user exist?", doesUserExists);
                    setIsNewUser(!doesUserExists);
                    if (!isNewUser) {
                        navigate('/classrooms');
                    }
                }
                catch (error) {
                    setIsNewUser(true);
                    console.error("User not found. Create user.", error);
                }
            }

            checkUserExists();
        }
    }, [isAuthenticated, isNewUser, navigate, user?.email]);

    const createUser = async (userData) => {
        try {
            console.log(userData);
            const res = await axios.post(`/api/users/${userData['userType']}s/create`, userData);
            console.log(res.data);
            alert(`${userData['userType']} ${userData['name']} (${userData['email']}) added successfully!`);
            setIsNewUser(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        {isLoading ?
        (
            <>LOADING...</>
        ):
        (
            <>{isAuthenticated ?
                (
                    <>{isNewUser ? 
                        (
                            <>
                                <p>New user! Please fill out any incomplete information:</p>
                                <CreateUserForm values={{email: user?.email, firstName: user?.given_name, lastName: user?.family_name}} onSubmit={createUser}/>
                            </>
                        ):
                        (
                            <p>Logging in...</p>
                        )
                    }</>
                ) : 
                (
                    <>NOT AUTHENTICATED</>
                )
            }</>
        )}
        
        </>
    )
}

export default Login;
