import React, { Component } from "react";

import $ from "jquery";
import { IonIcon, IonSpinner } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";

import "./changePassword.css";
import changePassword from "./changePassword.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAuthenticatedUser } from "../../utils/Auth";

class ChangePassword extends Component {
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

  componentDidMount() {
    var currentUser = GetAuthenticatedUser();
    $("#email").val(`${currentUser.email}`);
  }
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

  onChangePassword = (e) => {
    e.preventDefault();
    this.enableSpinner();
    const body = {
      oldPassword: $("#oldPassword").val(),
      newPassword: $("#password").val(),
    };

    let API_URL = process.env.REACT_APP_API_URL;
    const notif = this.notify;
    const disableSpiner = this.disableSpinner;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/profile/user/ChangePassword`,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        xhrFields: {
          withCredentials: true,
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            `Beare ${window.localStorage.access_token.replace(/"/g, "")}`
          );
        },
        data: JSON.stringify(body),
        success: function (response) {
          disableSpiner();
          if (response.message) {
            notif(response.message, "success");

            setTimeout(() => {
              window.localStorage.removeItem("access_token");
              window.location.href = `/login`;
            }, 5000);
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
    }

    return false;
  };

  onOldPassChange() {
    const passValue = $("#oldPassword").val();
    if (passValue.length > 0) {
      if ($("#oldPassword")[0].type === "password") {
        $("#oldPassword-eye").removeClass("hide");
        $("#oldPassword-eye").addClass("active");
      }
    } else {
      $("#oldPassword-eye").addClass("hide");
      $("#oldPassword-eye").removeClass("active");
    }
  }

  toggleOldPassEye() {
    const isPasswordShown = $("#oldPassword-eyeoff").hasClass("active");

    if (isPasswordShown) {
      $("#oldPassword-eyeoff").removeClass("active");
      $("#oldPassword-eyeoff").addClass("hide");

      $("#oldPassword-eye").addClass("active");
      $("#oldPassword-eye").removeClass("hide");

      $("#oldPassword")[0].type = "password";
    } else {
      $("#oldPassword-eye").removeClass("active");
      $("#oldPassword-eye").addClass("hide");

      $("#oldPassword-eyeoff").addClass("active");
      $("#oldPassword-eyeoff").removeClass("hide");

      $("#oldPassword")[0].type = "text";
    }
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

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container">
          <div className="card card-container">
            <img
              id="profile-img"
              className="profile-img-card"
              src={changePassword}
              alt="user profile"
            />
            <p id="profile-name" className="profile-name-card"></p>

            <form className="form-register" onSubmit={this.onChangePassword}>
              <span id="reauth-email" className="reauth-email"></span>
              <input
                type="text"
                id="email"
                className="form-control"
                disabled
                readonly
              />

              <div id="oldPasswordContainer">
                <input
                  type="password"
                  id="oldPassword"
                  className="form-control"
                  placeholder="Old Password"
                  required
                  onChange={this.onOldPassChange}
                />
                <span onClick={this.toggleOldPassEye}>
                  <IonIcon
                    className="passwordEye hide"
                    id="oldPassword-eyeoff"
                    icon={eyeOff}
                  />
                  <IonIcon
                    className="passwordEye hide"
                    id="oldPassword-eye"
                    icon={eye}
                  />
                </span>
              </div>

              <div id="passwordContainer">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="New Password"
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
                className="btn btn-lg btn-danger btn-block btn-signin"
                type="submit"
                id="btn-register"
              >
                <span id="btn-register-text">Change it</span>

                <IonSpinner id="btn-register-spinner" name="dots" />
              </button>
            </form>
          </div>

          <a href="/" className="btn btn-register btn-link">
            Back to home
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
