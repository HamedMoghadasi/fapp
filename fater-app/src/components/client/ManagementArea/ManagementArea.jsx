import React, { Component } from "react";
import $ from "jquery";
import Tabs from "../Tabs/tabs";
import "./ManagementArea.css";
import { menuOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

class ManagementArea extends Component {
  handleClick = () => {};
  render() {
    return (
      <>
        <div id="ma">
          <div id="ma-header">
            <IonIcon icon={menuOutline} />
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
