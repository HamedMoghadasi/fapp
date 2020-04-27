import React, { Component } from "react";
import "./DragableLayerInfo.css";
import { IonIcon } from "@ionic/react";
import {
  eye,
  closeOutline,
  settingsOutline,
  informationOutline,
  close,
} from "ionicons/icons";

class DragableLayerInfo extends Component {
  render() {
    return (
      <li className="layers-dragable-li">
        <div id="layers-dragable-item">
          <div id="layers-dragable-item-display">
            <IonIcon icon={eye} />
          </div>
          <div id="layers-dragable-item-content">
            <b>Coast Lines</b>
            <br />
            <i>OpenStreetsMap Contributers</i>
          </div>
          <div id="layers-dragable-item-settings">
            <IonIcon className="item-close" icon={close} />
            <IonIcon className="item-settings" icon={settingsOutline} />
            <IonIcon className="item-info" icon={informationOutline} />
          </div>
        </div>
      </li>
    );
  }
}

export default DragableLayerInfo;
