import React, { Component } from "react";
import "./login.css";
import login from "./login.png";
import $ from "jquery";
import { IonIcon } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";

class Login extends Component {
  onSignIn() {
    const body = {
      email: $("#email").val(),
      password: $("#password").val(),
    };

    // $.ajax({
    //     url:
    // });
  }

  onPassChange() {
    const passValue = $("#password").val();
    if (passValue.length > 0) {
      if ($("#password")[0].type === "password") {
        $("#password-eye").removeClass("hide");
        $("#password-eye").addClass("active");
      }
    } else {
      $("#password-eye").addClass("hide");
      $("#password-eye").removeClass("active");
    }
  }

  togglePassEye() {
    console.log($("#password").type);
    const isPasswordShown = $("#password-eyeoff").hasClass("active");

    if (isPasswordShown) {
      $("#password-eyeoff").removeClass("active");
      $("#password-eyeoff").addClass("hide");

      $("#password-eye").addClass("active");
      $("#password-eye").removeClass("hide");

      $("#password")[0].type = "password";
    } else {
      $("#password-eye").removeClass("active");
      $("#password-eye").addClass("hide");

      $("#password-eyeoff").addClass("active");
      $("#password-eyeoff").removeClass("hide");

      $("#password")[0].type = "text";
    }
  }

  componentDidMount() {}

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
              id="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
            <div id="passwordContainer">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
                onChange={this.onPassChange}
              />
              <span onClick={this.togglePassEye}>
                <IonIcon
                  className="passwordEye hide"
                  id="password-eyeoff"
                  icon={eyeOff}
                />
                <IonIcon
                  className="passwordEye hide"
                  id="password-eye"
                  icon={eye}
                />
              </span>
            </div>

            <button
              className="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
              onSubmit={this.onSignIn}
            >
              Sign in
            </button>
          </form>
          <a href="/ForgetPassword" className="forgot-password">
            Forgot the password?
          </a>
        </div>

        <a href="/Register" className="btn btn-danger btn-register">
          Register Now
        </a>
      </div>
    );
  }
}

export default Login;
