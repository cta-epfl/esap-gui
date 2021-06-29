import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function AuthControl() {
  const { api_host, isAuthenticated, loggedInUserName, token } = useContext(GlobalContext);

  console.log("loggedIn: ", isAuthenticated);

  if (isAuthenticated) {
    return (
      <Nav.Link as={NavLink} to="/logout">
        {`Logout ${loggedInUserName}`}
      </Nav.Link>
    );
  }

  return <Nav.Link href={`${api_host}oidc/authenticate`}>Login</Nav.Link>;
}
