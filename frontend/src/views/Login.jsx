import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateUserForm from '../components/CreateUserForm';

const Login = () => {
    const {isAuthenticated, user} = useAuth0();
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        const checkUserExists = async () => {
            try {
                console.log(user?.email);
                const res = await axios.get(`/api/users?email=${user?.email}`);
                const doesUserExists = !!res.data.message;
                setIsNewUser(!doesUserExists);
                console.log(isNewUser);
            }
            catch (error) {
                setIsNewUser(true);
                console.log(isNewUser);
                console.error(error);
            }
        }

        if (isAuthenticated) {
            checkUserExists();
        }
        window.location.href = '/';
    }, [isAuthenticated, user?.email]);

    const createUser = async (userData) => {
        try {
            console.log(userData);
            const res = await axios.post('/api/users/create', userData);
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
            {isNewUser ? 
                    (
                        <>
                            <p>New user! Please fill out any incomplete information:</p>
                            <CreateUserForm values={{email: user?.email, firstName: user?.given_name, lastName: user?.family_name}} onSubmit={createUser}/>
                        </>
                    ):
                    (
                        <p>Welcome, {user?.given_name}!</p>
                    )
            }
        </>
    )
}

export default Login;
