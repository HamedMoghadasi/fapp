import React, { Component } from "react";
import "./DragableLayerInfo.css";
import { IonIcon } from "@ionic/react";
import {
  eye,
  settingsOutline,
  informationOutline,
  close,
  eyeOff,
} from "ionicons/icons";

import $ from "jquery";

class DragableLayerInfo extends Component {
  handleVisiblity = (e) => {
    let map = $("#mapContainer").data("map");

    let targetLayer = map
      .getLayers()
      .array_.filter((layer) => layer.ol_uid === $(this)[0].props.ol_uid)[0];

    targetLayer.setVisible(!targetLayer.values_.visible);
    if (targetLayer.values_.visible) {
      $(e.target).parent("div").parent("div").removeClass("layer-invisible");
    } else {
      $(e.target).parent("div").parent("div").addClass("layer-invisible");
    }
  };

  render() {
    return (
      <li className="layers-dragable-li" data-oluid={this.props.ol_uid}>
        <div id="layers-dragable-item" className={this.props.invisible}>
          <div id="layers-dragable-item-display">
            <IonIcon
              icon={eye}
              id="eye"
              onClick={(e) => this.handleVisiblity(e)}
            />
            <IonIcon
              icon={eyeOff}
              id="eyeOff"
              onClick={(e) => this.handleVisiblity(e)}
            />
          </div>
          <div id="layers-dragable-item-content">
            <b>
              {this.props.layer && this.props.layer.get("name")
                ? this.props.layer.get("name")
                : `Layer ${this.props.ol_uid}`}
            </b>
            <br />
            <i>
              {" "}
              {this.props.layer && this.props.layer.get("description")
                ? this.props.layer.get("description")
                : `-- no information --`}
            </i>
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
