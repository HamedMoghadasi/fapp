import React, { Component } from "react";
import "./login.css";
import login from "./login.png";
import $ from "jquery";
import { IonIcon, IonSpinner } from "@ionic/react";
import { eye, eyeOff, refresh } from "ionicons/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localStorage from "local-storage";
import request from "request";
import bcrypt from "bcryptjs";
import authHelper from "../../utils/Auth";
import { SubmitByEnter } from "../../utils/Helper";

let API_URL = process.env.REACT_APP_API_URL;
let captchaSecret = process.env.REACT_APP_CAPTCHA_SECRET;
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
    this.validateCaptcha().then((response) => {
      const notif = this.notify;
      if (response.isValid) {
        this.enableSpinner();
        const body = {
          email: $("#email").val(),
          password: $("#password").val(),
          rememberMe: `${$("#remember input").prop("checked")}`,
          captcha: `${response.token}${captchaSecret}`,
        };

        const disableSpiner = this.disableSpinner;
        const refreshCaptcha = this.refreshCaptch;

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
            refreshCaptcha();
            $("#password").val("");

            if (err) {
              notif(err.responseJSON.message, "error");
            } else {
              notif("check you internet connection.", "error");
            }

            console.error(err);
          },
        });
      } else {
        this.refreshCaptch();
        notif("Security code is not valid", "error");
      }
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

  getCaptcha = () => {
    var body = request(`${API_URL}/api/v1/captcha`, (error, response, body) => {
      if (!error) {
        const jsonBody = JSON.parse(body);

        this.renderCaptcha(jsonBody.data);
      } else {
        console.error(error);
        $("#captcha-input").val(error);
      }
    });
    return body;
  };

  validateCaptcha = () => {
    const token = $("#captcha-input").attr("token");
    const text = $("#captcha-input").val().toLowerCase();
    return bcrypt
      .hash(text, bcrypt.getSalt(token))
      .then((hash) => {
        return {
          isValid: hash === token,
          token,
        };
      })
      .catch((err) => {
        console.error(err);
      });
  };

  renderCaptcha = (data) => {
    $("#captcha-input").attr("token", data.captcha.token);
    $("#captcha-svg-container").prepend(data.captcha.svg);
  };

  refreshCaptch = () => {
    $("#captcha-svg-container svg").remove();
    $("#captcha-input").val("");
    this.getCaptcha();
  };

  componentDidMount() {
    this.getCaptcha();
    SubmitByEnter();
  }

  componentWillMount = () => {
    authHelper.isAuthenticated();
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
                  <input type="checkbox" /> مرا به خاطر بسپار
                </label>
              </div>

              <div id="captcha-container">
                <div id="captcha-svg-container">
                  <button onClick={this.refreshCaptch}>
                    <IonIcon icon={refresh} />{" "}
                  </button>
                </div>
                <input
                  type="text"
                  id="captcha-input"
                  className="form-control"
                  placeholder="security code"
                  autoComplete="off"
                  required
                />
              </div>
              <button
                className="btn btn-lg btn-primary btn-block btn-signin"
                type="submit"
                id="btn-signIn"
              >
                <span id="btn-signIn-text">ورود</span>

                <IonSpinner id="btn-signIn-spinner" name="dots" />
              </button>
            </form>
            <a href="/ForgetPassword" className="forgot-password">
              بازیابی رمز عبور
            </a>
          </div>

          <a href="/Register" className="btn btn-danger btn-register">
            همین الان ثبت نام کنید
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
