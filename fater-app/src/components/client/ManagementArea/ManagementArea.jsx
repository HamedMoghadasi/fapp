import React, { Component } from "react";
import $ from "jquery";
import Tabs from "../Tabs/tabs";
import "./ManagementArea.css";
import { menuOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

import { verifyUser } from "../../../utils/Auth";
import { applicationTypes } from "../../../constants/ApplicationType";
import { Roles } from "../../../constants/Roles";

const USER = verifyUser();
let ApplicationType = process.env.REACT_APP_APPLICATION_TYPE;

class ManagementArea extends Component {
  handleCollapse = () => {
    if ($("#ma").hasClass("rollUp")) {
      $("#ma").removeClass("rollUp");
    } else {
      $("#ma").addClass("rollUp");
    }
  };
  handleManagerDOM = () => {
    if (USER.role === Roles.Manager) {
      return <div className="user-managerConatainer">I'm a Manager</div>;
    }

    return false;
  };

  handleSuperManagerDOM = () => {
    if (USER.role === Roles.SuperManager) {
      return (
        <div className="user-superManagerConatainer">I'm a Super Manager</div>
      );
    }

    return false;
  };

  handleTitle = () => {
    if (ApplicationType === applicationTypes.karaneh) {
      return (
        <span className="ma-header-title karaneh">سامانه پایشی کرانه</span>
      );
    } else if (ApplicationType === applicationTypes.afagh) {
      return <span className="ma-header-title afagh">سامانه پایشی آفاق</span>;
    }

    return false;
  };
  render() {
    return (
      <>
        {this.handleManagerDOM()}
        {this.handleSuperManagerDOM()}
        <div id="ma" className="rollUp">
          <div id="ma-header">
            {this.handleTitle()}
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
