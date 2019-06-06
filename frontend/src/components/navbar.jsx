import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        <Logo />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/signin">
            SIGN IN
          </NavLink>
          <NavLink className="nav-item nav-link" to="/signup">
            SIGN UP
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
