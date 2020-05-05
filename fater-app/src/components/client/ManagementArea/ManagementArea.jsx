import React, { Component } from "react";
import $ from "jquery";
import Tabs from "../Tabs/tabs";
import "./ManagementArea.css";
import { menuOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

class ManagementArea extends Component {
  handleCollapse = () => {
    console.log("clicked");

    if ($("#ma").hasClass("rollUp")) {
      $("#ma").removeClass("rollUp");
    } else {
      $("#ma").addClass("rollUp");
    }
  };
  render() {
    return (
      <>
        <div id="ma" className="rollUp">
          <div id="ma-header">
            <IonIcon
              icon={menuOutline}
              id="ma-header-menu"
              onClick={this.handleCollapse}
            />
          </div>
          <div id="ma-container">
            <div id="ma-wrapper">
              <Tabs />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ManagementArea;
