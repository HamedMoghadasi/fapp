import React, { Component } from "react";

import $ from "jquery";
import { IonIcon, IonSpinner } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";

import "./register.css";
import register from "./register.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitByEnter } from "../../utils/Helper";

class Register extends Component {
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
    $("#btn-register").prop("disabled", true);
    $("#btn-register").css("cursor", "not-allowed");
    $("#btn-register-text").css("display", "none");
    $("#btn-register-spinner").css("display", "inline-block");
  };

  disableSpinner = () => {
    $("#btn-register").prop("disabled", false);
    $("#btn-register").css("cursor", "default");
    $("#btn-register-text").css("display", "inline-block");
    $("#btn-register-spinner").css("display", "none");
  };

  onSignIn = (e) => {
    e.preventDefault();
    this.enableSpinner();
    const body = {
      email: $("#email").val(),
      username: $("#username").val(),
      password: $("#password").val(),
    };

    let API_URL = process.env.REACT_APP_API_URL;
    const notif = this.notify;
    const disableSpiner = this.disableSpinner;
    $.ajax({
      url: `${API_URL}/api/v1/auth/register`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      data: JSON.stringify(body),
      success: function (response) {
        disableSpiner();
        if (response.message) {
          notif(response.message, "success");

          setTimeout(() => {
            window.location.href = `/login`;
          }, 10000);
        } else {
          notif("check you internet connection.", "error");
        }
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

  componentDidMount() {
    SubmitByEnter();
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container">
          <div className="card card-container">
            <img
              id="profile-img"
              className="profile-img-card"
              src={register}
              alt="user profile"
            />
            <p id="profile-name" className="profile-name-card"></p>

            <form className="form-register" onSubmit={this.onSignIn}>
              <span id="reauth-email" className="reauth-email"></span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
              <input
                type="username"
                id="username"
                className="form-control"
                placeholder="Username"
                required
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
                className="btn btn-lg btn-warning btn-block btn-signin"
                type="submit"
                id="btn-register"
              >
                <span id="btn-register-text">Register</span>

                <IonSpinner id="btn-register-spinner" name="dots" />
              </button>
            </form>
          </div>

          <a href="/login" className="btn btn-register btn-primary">
            Have you an account? Log in.
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
