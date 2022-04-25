import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthControl from "./auth/authControl";
import MyBasketButton from "./basket/MyBasketButton"
import SaveBasketButton from "./basket/SaveBasketButton"
import ShowTokenButton from "./ShowTokenButton"
import { QueryContext } from "../contexts/QueryContext";
import { GlobalContext } from "../contexts/GlobalContext";

export default function NavBar() {
    let history = useHistory()

    const { navbar, isAuthenticated, refreshLogin } = useContext(GlobalContext);
    const { config } = useContext(QueryContext);
    if (!navbar) return null;
    if (!config) return null;

    refreshLogin(history)
    //let loggedIn = localStorage.getItem('esap_logged_in')
    //if ((!isAuthenticated) && (loggedIn)) {
    //    history.push("/login");
    //}

    // construct the navigation bar based on the configuration
    const navlist = navbar.navbar;

    return (
    <Navbar bg="dark" variant="dark">
      <img
        alt=""
        src={config.logo}
        height="40"
        className="d-inline-block align-top"
      />

      <Nav className="mr-auto">
        {navlist.map((nav) => (
          <Nav.Link key={nav.title} as={NavLink} to={nav.route}>
            {nav.title}
          </Nav.Link>
        ))}
      </Nav>
        <Nav.Link key="my basket" as={NavLink} to="/basket">
            <MyBasketButton />
        </Nav.Link>
        <SaveBasketButton/>{' '}
      <Nav>
          <ShowTokenButton/>
          <AuthControl />
      </Nav>
    </Navbar>
    );
}
