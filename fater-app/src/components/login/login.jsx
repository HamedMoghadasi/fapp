import React, { Component } from "react";
import "./login.css";
import login from "./login.png";

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="card card-container">
          <img
            id="profile-img"
            className="profile-img-card"
            src={login}
            alt="user profile"
          />
          <p id="profile-name" className="profile-name-card"></p>

          <form className="form-signin">
            <span id="reauth-email" className="reauth-email"></span>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />
            <div id="remember" className="checkbox">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button
              className="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <a href="localhost:3502" className="forgot-password">
            Forgot the password?
          </a>
        </div>

        <input className="btn btn-danger btn-register" value="Regiter Now" />
      </div>
    );
  }
}

export default Login;
