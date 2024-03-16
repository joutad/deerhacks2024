import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link } from "react-router-dom";
import { styled } from "styled-components";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Layout = () => {

    const { isAuthenticated } = useAuth0();

  return (
    <>
      <nav>
        <UL>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {isAuthenticated ?
                (
                    <LogoutButton />                
                ):
                (
                    <LoginButton />
                ) 
            }
          </li>
        </UL>
      </nav>

      <Outlet />
    </>
  )
};

const UL = styled.ul`
    display: flex;
    justify-content: space-between;
    list-style: none;
`;

export default Layout;