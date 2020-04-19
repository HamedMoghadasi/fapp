/* eslint-disable */

import React, { Component } from "react";
import $ from "jquery";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
import {
  menu,
  close,
  apps,
  people,
  analytics,
  albums,
  heartOutline,
  call,
  logOutOutline,
  add,
  remove,
  desktopOutline,
  desktop,
} from "ionicons/icons";

import "./sidebar.css";
let sidebarClass = false;
let usersSubmenuClass = "collapse list-unstyled";
let pagesSubmenuClass = "collapse list-unstyled";
let usersAreaExpanded = false;
let pagesAreaExpanded = false;
class SideBar extends Component {
  constructor(props) {
    super(props);
    sidebarClass = this.props.isSidebarOpen === "true" ? "active" : "";
    switch (this.props.menu) {
      case "users":
        usersSubmenuClass += " show";
        usersAreaExpanded = true;
        break;
      case "pages":
        pagesSubmenuClass += " show";
        pagesAreaExpanded = true;
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
    });
  };
  Logout = () => {
    console.log("log outed");
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
              <li className="active">
                <Link to="/dashboard" replace>
                  <IonIcon
                    className="sidebar-item-icon"
                    icon={desktopOutline}
                  />
                  Dashboard
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
                  Users
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
                      All Users
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/Users/Suspended" replace>
                      Suspend User
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/Users/Pending" replace>
                      Pending Users
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/dashboard" replace>
                  <IonIcon className="sidebar-item-icon" icon={analytics} />
                  Logs
                </Link>
                <a
                  id="pagesMenu"
                  className="masterMenu"
                  href="#pagesSubmenu"
                  data-toggle="collapse"
                  aria-expanded={pagesAreaExpanded}
                >
                  <IonIcon className="sidebar-item-icon" icon={albums} />
                  <IonIcon
                    className="sidebar-masterItem-icon plus"
                    icon={add}
                  />
                  <IonIcon
                    className="sidebar-masterItem-icon minus"
                    icon={remove}
                  />
                  Pages
                </a>
                <ul className={pagesSubmenuClass} id="pagesSubmenu">
                  <li>
                    <Link to="/dashboard" replace>
                      Page 1
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" replace>
                      Page 2
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" replace>
                      Page 3
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
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
              </li>
            </ul>

            <ul className="list-unstyled CTAs">
              <li>
                <a href="#" className="download">
                  Update Profile
                </a>
              </li>
              <li>
                <a href="#" className="article">
                  Back to Map
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
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item active">
                    <span className="nav-link">Hamed Moghadasi</span>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={this.Logout}
                    >
                      Logout
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
