import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = ({ user }) => {
  return user ? (
    <Navbar bg="light" expand="lg">
      <Link className="navbar-brand" to={user ? "/" : "/feedback"}>
        <Logo />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <React.Fragment>
          <Nav>
            <NavLink className="nav-item nav-link mr-sm-2" to="/dashboard">
              DASHBOARD
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            <NavLink className="nav-item nav-link mr-sm-2" to="/signout">
              SIGN OUT
            </NavLink>
          </Nav>
        </React.Fragment>
      </Navbar.Collapse>
    </Navbar>
  ) : (
    <></>
  );
};

export default NavBar;
