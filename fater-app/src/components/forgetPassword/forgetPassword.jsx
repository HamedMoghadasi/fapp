import React, { Component } from "react";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./forgetPassword.css";
import forgetPassword from "./forgetPassword.png";
import { IonSpinner } from "@ionic/react";

class ForgetPassword extends Component {
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
    $("#btn-forgetPassword").prop("disabled", true);
    $("#btn-forgetPassword").css("cursor", "not-allowed");
    $("#btn-forgetPassword-text").css("display", "none");
    $("#btn-forgetPassword-spinner").css("display", "inline-block");
  };

  disableSpinner = () => {
    $("#btn-forgetPassword").prop("disabled", false);
    $("#btn-forgetPassword").css("cursor", "default");
    $("#btn-forgetPassword-text").css("display", "inline-block");
    $("#btn-forgetPassword-spinner").css("display", "none");
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.enableSpinner();
    const body = {
      email: $("#email").val(),
    };

    const notif = this.notify;
    const disableSpiner = this.disableSpinner;
    let API_URL = process.env.REACT_APP_API_URL;
    $.ajax({
      url: `${API_URL}/api/v1/auth/forgetPassword`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      data: JSON.stringify(body),
      success: function (response) {
        disableSpiner();
        console.log(response);

        const msg = response.message;
        if (msg) {
          notif(msg, "success");

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

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container">
          <div className="card card-container">
            <img
              id="profile-img"
              className="profile-img-card"
              src={forgetPassword}
              alt="user profile"
            />
            <p id="profile-name" className="profile-name-card"></p>

            <form className="form-signin" onSubmit={this.onSubmit}>
              <span id="reauth-email" className="reauth-email"></span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />

              <button
                className="btn btn-lg btn-warning btn-block btn-signin"
                type="submit"
                id="btn-forgetPassword"
              >
                <span id="btn-forgetPassword-text">Reset Password</span>
                <IonSpinner id="btn-forgetPassword-spinner" name="dots" />
              </button>
            </form>
          </div>
          <a href="/login" className="btn btn-register btn-primary">
            Do you remember your password? Log in.
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgetPassword;
