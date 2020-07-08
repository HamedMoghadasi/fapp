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
import "ion-rangeslider/js/ion.rangeSlider";
import "ion-rangeslider/css/ion.rangeSlider.css";
import $ from "jquery";

import chroma from "chroma-js";

function getColors() {
  return [chroma.random(), chroma.random(), chroma.random(), chroma.random()];
}

function getColorsPalet() {
  var scale = chroma.scale(getColors()).colors(254);

  var _palet = scale.map((element, index) => {
    return chroma(scale[index]).rgba();
  });

  return _palet;
}

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

    map.updateSize();
  };

  handleLayerRemove = (ol_uid) => {
    let map = $("#mapContainer").data("map");

    map.getLayers().array_ = map.getLayers().array_.filter((layer) => {
      if (String(layer.ol_uid) !== String(ol_uid)) return layer;
    });

    $("#mapContainer").data("map", map);
    this.props.refreshComponent();
    map.updateSize();
  };

  handleSettingClick = (ol_uid) => {
    let sliderDOM = $(
      `#layers-dragable-item[data-oluid="${ol_uid}"] .layers-dragable-item-content .layers-dragable-item-content-slider`
    )[0];

    let layerInfoDOM = $(
      `#layers-dragable-item[data-oluid="${ol_uid}"] .layers-dragable-item-content .layers-dragable-item-content-layerInfo`
    )[0];

    $(sliderDOM).toggle("opacity");
    $(layerInfoDOM).toggle("opacity");

    let isSliderShown = $(sliderDOM).css("opacity") > 0.9;

    if (!isSliderShown) {
      $(sliderDOM).addClass("sliderIsShown");
    } else {
      $(sliderDOM).removeClass("sliderIsShown");
    }
  };

  handlerefreshInputChange = () => {
    this.props.refreshComponent();
  };

  handleSliderDefaultValue = (ol_uid) => {
    let _map = $("#mapContainer").data("map");
    const targetLayer = _map.getLayers().array_.filter((layer) => {
      if (String(layer.ol_uid) === String(ol_uid)) {
        return layer;
      }
    });
    return targetLayer[0].getOpacity() * 100;
  };

  hasColors = () => {
    if (this.props.layer && this.props.layer.get("colors")) {
      return true;
    }
    return false;
  };

  dragableItemClass = () => {
    return this.hasColors()
      ? `${this.props.invisible} heatmap`
      : `${this.props.invisible}`;
  };

  handleChangeColorDOM = () => {
    let _map = $("#mapContainer").data("map");
    var rasterSource = this.props.layer.getSource();
    rasterSource.listeners_.beforeoperations = [];
    rasterSource.on("beforeoperations", function (event) {
      event.data.colors = getColorsPalet();
    });

    rasterSource.refresh();
    _map.updateSize();
  };

  handleColorChange = (e, index, id) => {
    var colors = this.props.layer.get("colors");
    // console.log("e.target.value :>> ", e.target.value);
    // document.getElementById(id).value = e.target.value;
    // console.log("id :>> ", id);
    colors[index] = $(e.target).val();
    this.props.layer.set("colors", colors);
  };

  handleColorPicker = () => {
    if (this.props.layer && this.props.layer.get("colors")) {
      let colors = this.props.layer.get("colors");
      let ol_uid = this.props.layer.ol_uid;
      return (
        <div className="heatmap-colorpicker">
          {colors.map((color, index) => {
            let id = `heatmap-colorpicker-${ol_uid}-${index}`;
            return (
              <input
                type="color"
                key={index}
                onChange={(e) => this.handleColorChange(e, index, id)}
              />
            );
          })}
        </div>
      );
    }
  };

  handleColorbar = () => {
    if (this.props.layer && this.props.layer.get("colors")) {
      const colors = this.props.layer.get("colors");
      var scale = chroma.scale(colors).colors(254);
      return (
        <div className="heatmap-colorbar">
          {scale.map((color, index) => {
            return (
              <span
                key={index}
                className="heatmap-colorbar-step"
                style={{ backgroundColor: `${color}` }}
              ></span>
            );
          })}
          <span className="domain-min">0</span>
          <span className="domain-med">0.5</span>
          <span className="domain-max">1</span>

          {/* <button id="changeColor" onClick={this.handleChangeColorDOM}>
            Change it
          </button> */}
        </div>
      );
    }
  };

  componentDidUpdate = () => {
    var sliderInstance = $(`.opacity-handler`).data("ionRangeSlider");

    const opacityValue = this.handleSliderDefaultValue(this.props.ol_uid);

    sliderInstance.update({
      from: opacityValue,
    });
  };

  componentDidMount = () => {
    const self = this;
    $(`.opacity-handler`).ionRangeSlider({
      skin: "round",
      type: "single",
      hide_min_max: true,
      min: 0,
      max: 100,
      hide_from_to: true,
      onFinish: function (value) {},
    });
    $(`.opacity-handler`).on("change", function (e) {
      // const $targetLayerDom = $(e.target);
      // const ol_uid = $targetLayerDom.data("oluid");
      const ol_uid = self.props.ol_uid;

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
        <input
          className="refreshDragables"
          type="hidden"
          onKeyPress={this.handlerefreshInputChange}
        />
        <div
          id="layers-dragable-item"
          className={this.dragableItemClass()}
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
              <input
                type="text"
                id={`opacityhandler-${this.props.ol_uid}`}
                className="opacity-handler"
                data-oluid={this.props.ol_uid}
                defaultValue={this.handleSliderDefaultValue(this.props.ol_uid)}
              />
              {/* <div className="layer-dragable-item-colorPicker">
                {this.handleColorPicker()}
              </div> */}
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
              <i>{this.handleColorbar()}</i>
            </div>
          </div>

          <div className="layers-dragable-item-settings">
            <IonIcon
              className="item-close"
              onClick={() => this.handleLayerRemove(this.props.ol_uid)}
              icon={close}
            />
            <IonIcon
              className="item-settings"
              onClick={() => this.handleSettingClick(this.props.ol_uid)}
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
