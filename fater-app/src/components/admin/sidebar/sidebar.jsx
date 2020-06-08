/* eslint-disable */

import React, { Component } from "react";
import $ from "jquery";
import { IonIcon } from "@ionic/react";
import { GetAuthenticatedUser } from "../../../utils/Auth";
import { Link } from "react-router-dom";
import {
  menu,
  close,
  apps,
  people,
  albums,
  heartOutline,
  call,
  logOutOutline,
  add,
  remove,
  desktopOutline,
  map,
  location,
} from "ionicons/icons";

import "./sidebar.css";
let sidebarClass = false;
let usersSubmenuClass = "collapse list-unstyled";
let logsSubmenuClass = "collapse list-unstyled";
let usersAreaExpanded = false;
let logsAreaExpanded = false;
let API_URL = process.env.REACT_APP_API_URL;
class SideBar extends Component {
  constructor(props) {
    super(props);
    sidebarClass = this.props.isSidebarOpen === "true" ? "active" : "";
    switch (this.props.menu) {
      case "users":
        usersSubmenuClass += " show";
        usersAreaExpanded = true;
        break;
      case "logs":
        logsSubmenuClass += " show";
        logsAreaExpanded = true;
      default:
        break;
    }
  }

  componentDidMount = () => {
    $(document).ready(function () {
      $("#dismiss, .overlay").on("click", function () {
        $("#sidebar").removeClass("active");
      });

      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").addClass("active");
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
      });

      const authenticatedUser = GetAuthenticatedUser();
      $("#username").html(
        `<div class="username-container">
          <span class="email">${authenticatedUser.email}</span>
          <span class="role">(${authenticatedUser.role})<span>
         </div>`
      );
    });
  };

  Logout = () => {
    $.ajax({
      url: `${API_URL}/api/v1/auth/logout`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          `Beare ${window.localStorage.access_token.replace(/"/g, "")}`
        );
      },
      success: function (response) {},
    });

    window.localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <nav id="sidebar" className={sidebarClass}>
            <div id="dismiss">
              <IonIcon icon={close} />
            </div>

            <div className="sidebar-header"></div>

            <ul className="list-unstyled components">
              {/* <p>Hamed Moghadasi</p> */}
              <li>
                <Link to="/dashboard" replace>
                  <IonIcon
                    className="sidebar-item-icon"
                    icon={desktopOutline}
                  />
                  داشبورد
                </Link>
              </li>
              <li>
                <a
                  id="usersMenu"
                  href="#usersSubmenu"
                  className="masterMenu"
                  data-toggle="collapse"
                  aria-expanded={usersAreaExpanded}
                >
                  <IonIcon className="sidebar-item-icon" icon={people} />
                  <IonIcon
                    className="sidebar-masterItem-icon plus"
                    icon={add}
                  />
                  <IonIcon
                    className="sidebar-masterItem-icon minus"
                    icon={remove}
                  />
                  کاربران
                </a>
                <ul className={usersSubmenuClass} id="usersSubmenu">
                  <li>
                    <Link
                      to={{
                        pathname: "/dashboard/Users/All",
                        state: {
                          isSidebarOpen: true,
                        },
                      }}
                      replace
                    >
                      مدیریت کاربران
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/dashboard/Users/Suspended" replace>
                      کاربران معلق
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/Users/Pending" replace>
                      Pending Users
                    </Link>
                  </li> */}
                </ul>
              </li>
              <li>
                <Link to="/dashboard/BaseMaps" replace>
                  <IonIcon className="sidebar-item-icon" icon={map} />
                  نقشه ها
                </Link>
              </li>
              <li>
                <Link to="/dashboard/Locations" replace>
                  <IonIcon className="sidebar-item-icon" icon={location} />
                  موقعیت ها
                </Link>
              </li>
              <li>
                <a
                  id="logsMenu"
                  className="masterMenu"
                  href="#logsSubmenu"
                  data-toggle="collapse"
                  aria-expanded={logsAreaExpanded}
                >
                  <IonIcon className="sidebar-item-icon" icon={albums} />
                  <IonIcon
                    className="sidebar-masterItem-icon plus"
                    icon={add}
                  />
                  گزارشات
                  <IonIcon
                    className="sidebar-masterItem-icon minus"
                    icon={remove}
                  />
                </a>

                <ul className={logsSubmenuClass} id="logsSubmenu">
                  <li>
                    <Link to="/dashboard/Logs/UsersActivity" replace>
                      ورود و خروج کاربر
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li>
                <Link to="/dashboard" replace>
                  <IonIcon className="sidebar-item-icon" icon={heartOutline} />
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/dashboard" replace>
                  <IonIcon className="sidebar-item-icon" icon={call} />
                  Contact
                </Link>
              </li> */}
            </ul>

            <ul className="list-unstyled CTAs">
              <li>
                <a href="#" className="download">
                  بروزرسانی پروفایل
                </a>
              </li>
              <li>
                <a href="#" className="article">
                  بازگشت به نقشه
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-link btn-large"
              >
                <IonIcon icon={menu} />
              </button>
              <button
                className="btn btn-link d-inline-block d-lg-none ml-auto"
                type="button"
                id="rightMenuToggle"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <IonIcon icon={apps} />
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav mr-auto">
                  <li className="nav-item active">
                    <span className="nav-link" id="username"></span>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={this.Logout}
                    >
                      خروج
                      <span className="nav-link-icon logout">
                        <IonIcon icon={logOutOutline} />
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        {/* <div className="overlay"></div> */}
      </React.Fragment>
    );
  }
}

export default SideBar;
