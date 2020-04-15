/* eslint-disable */

import React, { Component } from "react";
import $ from "jquery";
import { IonIcon } from "@ionic/react";
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

class SideBar extends Component {
  componentDidMount = () => {
    $(document).ready(function () {
      $("#dismiss, .overlay").on("click", function () {
        $("#sidebar").removeClass("active");
        $(".overlay").removeClass("active");
      });

      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").addClass("active");
        $(".overlay").addClass("active");
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <nav id="sidebar">
            <div id="dismiss">
              <IonIcon icon={close} />
            </div>

            <div className="sidebar-header"></div>

            <ul className="list-unstyled components">
              {/* <p>Hamed Moghadasi</p> */}
              <li className="active">
                <a
                  href="#homeSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                >
                  <IonIcon className="sidebar-item-icon" icon={people} />
                  Users
                </a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                    <a href="#">All Users</a>
                  </li>
                  <li>
                    <a href="#">Suspend User</a>
                  </li>
                  <li>
                    <a href="#">Pending Users</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <IonIcon className="sidebar-item-icon" icon={analytics} />
                  Logs
                </a>
                <a
                  href="#pageSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                >
                  <IonIcon className="sidebar-item-icon" icon={albums} />
                  Pages
                </a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                  <li>
                    <a href="#">Page 1</a>
                  </li>
                  <li>
                    <a href="#">Page 2</a>
                  </li>
                  <li>
                    <a href="#">Page 3</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <IonIcon className="sidebar-item-icon" icon={heartOutline} />
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#">
                  <IonIcon className="sidebar-item-icon" icon={call} />
                  Contact
                </a>
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
