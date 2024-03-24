import styled from "styled-components";

const BUTTON = styled.button`
    background: none;
    font-family: sans-serif;
    font-weight: 800;
    border-color: rgb(0 0 0 / 5%);
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.1s ease; /* Add a transition for the transform property */
    &:hover {
        background-color: aliceblue;
        // scale: 1.1;
        transform: scale(1.1); /* Scale up on hover */
    }
`;

export default BUTTON;