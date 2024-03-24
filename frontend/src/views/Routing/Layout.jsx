import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link } from "react-router-dom";
import { styled } from "styled-components";
import LoginButton from "../../components/LoginButton";
import LogoutButton from "../../components/LogoutButton";
import { useEffect } from "react";
import BUTTON from "../../styles/NavButton";

const Layout = () => {

    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        console.log("isAuth?", isAuthenticated);
    }, [isAuthenticated]);
    

  return (
    <>
      <nav>
        <UL>
          <li>
            <Link to="/">
                <BUTTON>
                    Home
                </BUTTON>
            </Link>
          </li>
          <li>
            <Link to="/about">
                <BUTTON>
                    About
                </BUTTON>
            </Link>
          </li>
          <li>
            {isAuthenticated ?
                (
                    <Link to="/logout">
                        <LogoutButton />                
                    </Link>
                ):
                (
                    <Link to="/login">
                        <LoginButton />                    
                    </Link>
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