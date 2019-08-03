import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { Navbar, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "./ui/form/Button";
import { signOut } from "../../services/http/authService";
import { newWindowLocation } from "../../utils/navigate";
import { FEEDBACK_ROUTE, CREATE_SURVEY_ROUTE } from "../../constants/routes";
import { TOKEN_HEADER } from "../../constants/headers";

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
        <Link className="navbar-brand" to={FEEDBACK_ROUTE}>
          <Logo />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <React.Fragment>
            <Nav />
            <Nav className="ml-auto">
              <Link to={CREATE_SURVEY_ROUTE}>
                <Button
                  type="button"
                  label="CREATE SURVEY"
                  className="nav-create-survey"
                />
              </Link>
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
