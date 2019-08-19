import PropTypes from "prop-types";
import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { TOKEN_HEADER } from "../../constants/headers";
import { FEEDBACKS_ROUTE_PAGE, FEEDBACK_ROUTE } from "../../constants/routes";
import { signOut } from "../../services/http/authService";
import { newWindowLocation } from "../../utils/navigate";

export default class NavBar extends Component {
  static propTypes = {
    /**
     * User that is currently signed in
     */
    user: PropTypes.object
  };

  onSignOut = () => {
    signOut()
      .then(res => this.onSignOutSuccessful())
      .catch(err => this.onSignOutError(err));
  };

  onSignOutSuccessful = () => {
    localStorage.removeItem(TOKEN_HEADER);
    alert("Sign out success");
    newWindowLocation(FEEDBACK_ROUTE);
  };

  onSignOutError = error => {
    alert(error);
    localStorage.removeItem(TOKEN_HEADER);
    newWindowLocation(FEEDBACK_ROUTE);
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <a className="navbar-brand" href={FEEDBACK_ROUTE}>
          <Logo />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <React.Fragment>
            <Nav>
              <NavLink
                className="nav-item nav-link mr-sm-2"
                to={FEEDBACKS_ROUTE_PAGE(1)}
              >
                FEEDBACK
              </NavLink>
            </Nav>
            <Nav className="ml-auto">
              <p
                className="nav-item nav-link sign-out"
                onClick={this.onSignOut}
              >
                SIGN OUT
              </p>
            </Nav>
          </React.Fragment>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
