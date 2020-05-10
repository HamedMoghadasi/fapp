import React, { Component } from "react";
import { GetAuthenticatedUser } from "../../../../utils/Auth";
import $ from "jquery";
import { Roles } from "../../../../constants/Roles";
import jmoment from "moment-jalaali";
import moment from "moment";

import "./UserTabContent.css";

class UserTabContent extends Component {
  state = {
    currentUser: GetAuthenticatedUser(),
  };

  calculateTokenExp = (currentUser) => {
    var jtokenExpDate = jmoment(new Date(currentUser.exp * 1000)).format(
      "jYYYY/jMM/jDD HH:mm"
    );

    const now = moment(new Date());
    var tokenExpDate = moment(new Date(currentUser.exp * 1000));

    var diffHour = tokenExpDate.diff(now, "hours");
    var diff = `${diffHour} hours`;
    if (tokenExpDate >= now && diffHour === 0) {
      diff = `${tokenExpDate.diff(now, "minutes")} minutes`;
    }

    $("#userTab--tokenExp-data").text(`${jtokenExpDate}, (${diff})`);
  };

  initUserTab = () => {
    var currentUser = this.state.currentUser;
    $("#userTab--email-data").text(currentUser.email);
    $("#userTab--username-data").text(currentUser.username);
    $("#userTab--role-data").text(currentUser.role);
    this.calculateTokenExp(currentUser);
    if (currentUser.role !== Roles.Admin) {
      $("#userTabsOperation-RedirectToDashboard").remove();
    }
  };

  componentDidMount = () => {
    this.initUserTab();
  };
  render() {
    return (
      <div
        className="tab-pane fade"
        id="user"
        role="tabpanel"
        aria-labelledby="user-tab"
      >
        <div id="userTab--email" className="userTabItems">
          <span id="userTab--email-label" className="userTabItems-label">
            ایمیل:
          </span>
          <span id="userTab--email-data" className="userTabItems-data"></span>
        </div>
        <div id="userTab--username" className="userTabItems">
          <span id="userTab--username-label" className="userTabItems-label">
            نام کاربری:
          </span>
          <span
            id="userTab--username-data"
            className="userTabItems-data"
          ></span>
        </div>
        <div id="userTab--role" className="userTabItems">
          <span id="userTab--role-label" className="userTabItems-label">
            نقش:
          </span>
          <span
            id="userTab--role-data"
            className="userTabItems-data badge badge-success"
          ></span>
        </div>
        <div id="userTab--tokenExp" className="userTabItems">
          <span id="userTab--tokenExp-label" className="userTabItems-label">
            Token:
          </span>
          <span
            id="userTab--tokenExp-data"
            className="userTabItems-data badge badge-secondary"
          ></span>
        </div>

        <div id="userTabsOperation">
          <a
            href="/changePassword"
            id="userTabsOperation-changePassword"
            className="btn btn-sm btn-primary col col-12"
          >
            تغییر رمز عبور
          </a>

          <a
            href="/dashboard"
            id="userTabsOperation-RedirectToDashboard"
            className="btn btn-sm btn-danger col col-12"
          >
            پنل مدیریت
          </a>
        </div>
      </div>
    );
  }
}

export default UserTabContent;
