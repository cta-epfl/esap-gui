import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthControl from "./auth/authControl";
import MyShoppingBasket from "./MyShoppingBasket"
import { QueryContext } from "../contexts/QueryContext";
import { GlobalContext } from "../contexts/GlobalContext";

export default function NavBar() {
  const { navbar } = useContext(GlobalContext);
  const { config } = useContext(QueryContext);
  if (!navbar) return null;
  if (!config) return null;
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
      <Navbar.Brand href="/">{config.title}</Navbar.Brand>

      <Nav className="mr-auto">
        {navlist.map((nav) => (
          <Nav.Link key={nav.title} as={NavLink} to={nav.route}>
            {nav.title}
          </Nav.Link>
        ))}
      </Nav>
        <Nav>
            <MyShoppingBasket />
        </Nav>
      <Nav>
        <AuthControl />
      </Nav>
    </Navbar>
  );
}
