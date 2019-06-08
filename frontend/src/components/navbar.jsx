import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = ({ user }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Link className="navbar-brand" to={user ? "/" : "/signin"}>
        <Logo />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {user ? (
          <Nav className="ml-auto">
            <NavLink className=" nav-item nav-link mr-sm-2" to="/signout">
              SIGN OUT
            </NavLink>
          </Nav>
        ) : (
          <Nav className="mr-auto">
            <NavLink className="nav-item nav-link" to="/signin">
              SIGN IN
            </NavLink>
            <NavLink className="nav-item nav-link" to="/signup">
              SIGN UP
            </NavLink>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
