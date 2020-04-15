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
} from "ionicons/icons";

import "./sidebar.css";
let sidebarClass = false;
let usersSubmenuClass = "collapse list-unstyled";
let pagesSubmenuClass = "collapse list-unstyled";
class SideBar extends Component {
  constructor(props) {
    super(props);
    sidebarClass = this.props.isSidebarOpen === "true" ? "active" : "";
    console.log("sidebar: ", sidebarClass);
    switch (this.props.menu) {
      case "users":
        usersSubmenuClass += " show";
        break;
      case "pages":
        pagesSubmenuClass += " show";
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
                <a
                  id="usersMenu"
                  href="#usersSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                >
                  <IonIcon className="sidebar-item-icon" icon={people} />
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
                  href="#pagesSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                >
                  <IonIcon className="sidebar-item-icon" icon={albums} />
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
            <div className="sidebar-footer">
              <span title="Log Out">
                <IonIcon icon={logOutOutline} />
              </span>
            </div>
          </nav>

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
                      <a className="nav-link" href="#">
                        Hamed Moghadasi
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* <div className="overlay"></div> */}
      </React.Fragment>
    );
  }
}

export default SideBar;
