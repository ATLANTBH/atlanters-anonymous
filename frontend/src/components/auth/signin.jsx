import React, { Component } from "react";

class SignIn extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="form-row row">
          <div className="col-lg-3">
            <form className="form">
              <h1 className="sign-in text-center">Sign in</h1>
              <div className="form-group">
                <label className="basic" htmlFor="exampleInputEmail1">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted" />
              </div>
              <div className="form-group">
                <label className="basic" htmlFor="exampleInputPassword1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                <small
                  id="emailHelp"
                  className="form-text text-muted text-right"
                >
                  <ins>
                    <a className="forgot-password" href="/">
                      Forgot password?
                    </a>
                  </ins>
                </small>
              </div>
              <button type="submit" className="btn btn-primary sign-in">
                <div className="sign-in-text">SIGN IN</div>
              </button>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input keep-signed-in"
                  id="exampleCheck1"
                />
                <label className="keep-signed-in" htmlFor="exampleCheck1">
                  Keep me signed in
                </label>
              </div>
              <div className="row no-account-row">
                <div className="col ">
                  <hr />
                </div>
                <div className="col-5 form-group text-center no-account-text">
                  Don't have an account?
                </div>
                <div className="col">
                  <hr />
                </div>
              </div>

              <button type="submit" className="btn btn-primary sign-up">
                <div className="sign-up-text">SIGN UP</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
