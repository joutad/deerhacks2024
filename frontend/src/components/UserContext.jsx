import React, { createContext, useState, useContext } from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState('');
    const [authenticatedUser, setAuthenticatedUser] = useState({});
    return (
        <UserContext.Provider value={{ userType, setUserType, authenticatedUser, setAuthenticatedUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
