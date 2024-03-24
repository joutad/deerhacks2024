import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
// import styled from "styled-components";
import BUTTON from "../styles/NavButton";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    
    return (
        !isAuthenticated && (
            <BUTTON className="authBtn" onClick={() => loginWithRedirect()}>
                Log In / Register
            </BUTTON>
        )
    )
}

// const BUTTON = styled.button`
//     background: none;
//     font-family: serif;
//     font-weight: 800;
//     border-color: rgb(0 0 0 / 5%);
//     border-radius: 12px;
//     padding: 1rem;
//     cursor: pointer;
//     &:hover {
//         background-color: aliceblue;
//     }
// `;

export default LoginButton