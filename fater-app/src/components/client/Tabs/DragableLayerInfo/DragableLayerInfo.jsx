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

  handleLayerRemove = (e) => {
    const $targetLayerDom = $(e.target).parent("div").parent("div");
    const ol_uid = $targetLayerDom.data("oluid");
    // $targetLayerDom.closest("li").remove();

    let map = $("#mapContainer").data("map");

    map.getLayers().array_ = map.getLayers().array_.filter((layer) => {
      if (String(layer.ol_uid) !== String(ol_uid)) return layer;
    });

    $("#mapContainer").data("map", map);
    this.props.refreshComponent();
    map.updateSize();
  };
  handleSettingClick = (e) => {
    $(e.target)
      .parent("div")
      .siblings("div.layers-dragable-item-content")
      .find("div.layers-dragable-item-content-layerInfo")
      .toggle("opacity");

    $(e.target)
      .parent("div")
      .siblings("div.layers-dragable-item-content")
      .find("div.layers-dragable-item-content-slider")
      .toggle("diplay");
  };

  componentDidMount = () => {
    $(".opacity-handler").ionRangeSlider({
      skin: "round",
      type: "single",
      hide_min_max: true,
      min: 0,
      max: 100,
      from: 100,
      hide_from_to: true,
      onFinish: function (value) {},
    });

    $(".opacity-handler").on("change", function (e) {
      const $targetLayerDom = $(e.target)
        .parent("div")
        .parent("div")
        .parent("div");
      const ol_uid = $targetLayerDom.data("oluid");

      let _map = $("#mapContainer").data("map");

      _map.getLayers().array_.map((layer) => {
        if (String(layer.ol_uid) === String(ol_uid)) {
          layer.setOpacity($(this).prop("value") / 100);
        }
      });

      $("#mapContainer").data("map", _map);
      _map.updateSize();
    });
  };
  render() {
    return (
      <li className="layers-dragable-li" data-oluid={this.props.ol_uid}>
        <div
          id="layers-dragable-item"
          className={this.props.invisible}
          data-oluid={this.props.ol_uid}
        >
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

          <div className="layers-dragable-item-content">
            <div className="layers-dragable-item-content-slider">
              <input type="text" className="opacity-handler" />
            </div>
            <div className="layers-dragable-item-content-layerInfo">
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
          </div>
          <div className="layers-dragable-item-settings">
            <IonIcon
              className="item-close"
              onClick={(e) => this.handleLayerRemove(e)}
              icon={close}
            />
            <IonIcon
              className="item-settings"
              onClick={(e) => this.handleSettingClick(e)}
              icon={settingsOutline}
            />
            <IonIcon className="item-info" icon={informationOutline} />
          </div>
        </div>
      </li>
    );
  }
}

export default DragableLayerInfo;
