import React, { Component } from "react";
import "./login.css";
import login from "./login.png";
import $ from "jquery";
import { IonIcon, IonSpinner } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localStorage from "local-storage";

class Login extends Component {
  notify = (message, type) => {
    if (type === "error") {
      toast.error(`${message}`, {
        autoClose: 10000,
        fontSize: "20px",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === "success") {
      toast.success(`${message}`, {
        autoClose: 10000,
        fontSize: "20px",
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  enableSpinner = () => {
    $("#btn-signIn").prop("disabled", true);
    $("#btn-signIn").css("cursor", "not-allowed");
    $("#btn-signIn-text").css("display", "none");
    $("#btn-signIn-spinner").css("display", "inline-block");
  };

  disableSpinner = () => {
    $("#btn-signIn").prop("disabled", false);
    $("#btn-signIn").css("cursor", "default");
    $("#btn-signIn-text").css("display", "inline-block");
    $("#btn-signIn-spinner").css("display", "none");
  };

  onSignIn = (e) => {
    e.preventDefault();
    this.enableSpinner();
    const body = {
      email: $("#email").val(),
      password: $("#password").val(),
    };

    const notif = this.notify;
    const disableSpiner = this.disableSpinner;
    let API_URL = process.env.REACT_APP_API_URL;
    $.ajax({
      url: `${API_URL}/api/v1/auth/login`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      data: JSON.stringify(body),
      success: function (response) {
        disableSpiner();
        var access_token = response.data.token;
        localStorage.set("access_token", access_token);
        window.location.href = `/home`;
      },
      error: function (err) {
        disableSpiner();
        const msg = err.responseJSON.message;
        if (msg) {
          notif(msg, "error");
        } else {
          notif("check you internet connection.", "error");
        }

        console.error(msg);
      },
    });
    return false;
  };

  onPassChange = () => {
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
  };

  togglePassEye() {
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
      <React.Fragment>
        <ToastContainer />
        <div className="container">
          <div className="card card-container">
            <img
              id="profile-img"
              className="profile-img-card"
              src={login}
              alt="user profile"
            />
            <p id="profile-name" className="profile-name-card"></p>

            <form className="form-signin" onSubmit={this.onSignIn}>
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
              <div id="remember" className="checkbox">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button
                className="btn btn-lg btn-primary btn-block btn-signin"
                type="submit"
                id="btn-signIn"
              >
                <span id="btn-signIn-text">Sign In</span>

                <IonSpinner id="btn-signIn-spinner" name="dots" />
              </button>
            </form>
            <a href="/ForgetPassword" className="forgot-password">
              Forgot the password?
            </a>
          </div>

          <a href="/Register" className="btn btn-danger btn-register">
            Register Now !
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
