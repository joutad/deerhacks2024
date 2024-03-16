import React from 'react'
import {styled} from 'styled-components';

const Home = () => {



    return (
        <div>
            <h1>Welcome to Lil&apos; Learners!</h1>
            <BUTTON>Log In / Register</BUTTON>
        </div>
    )
}

const BUTTON = styled.button`
    background: none;
    font-family: serif;
    font-weight: 800;
    border-color: rgb(0 0 0 / 5%);
    border-radius: 12px;
    padding: 1rem;
`;

export default Home