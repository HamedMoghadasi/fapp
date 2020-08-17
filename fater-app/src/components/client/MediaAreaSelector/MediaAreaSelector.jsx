import React, { Component } from "react";
import $ from "jquery";
import { projections } from "../../../constants/projections";
import * as OlProj from "ol/proj";

import "jquery-ui/themes/base/core.css";
import "jquery-ui/themes/base/theme.css";
import "jquery-ui/themes/base/resizable.css";
import "jquery-ui/themes/base/draggable.css";
import "jquery-ui/ui/core";

import "./MediaAreaSelector.css";

class MediaAreaSelector extends Component {
  state = {};
  calculateCoordinate = (x, y) => {
    const map = $("#mapContainer").data("map");
    const xyToCoordinateEPSG3857 = map.getCoordinateFromPixel([x, y]);
    const xyToCoordinateEPSG4326 = OlProj.transform(
      xyToCoordinateEPSG3857,
      projections.EPSG3857,
      projections.EPSG4326
    );

    return xyToCoordinateEPSG4326;
  };
  updateCoordinate = () => {
    let selectedArea = document
      .getElementById("mediaAreaSelector-container")
      .getBoundingClientRect();

    let top_coordinate = this.calculateCoordinate(
      selectedArea.x,
      selectedArea.y
    );

    let bottom_coordinate = this.calculateCoordinate(
      selectedArea.x + selectedArea.width,
      selectedArea.y + selectedArea.height
    );

    $("#mediaAreaSelector-coordinate-top").text(
      `[ ${top_coordinate[0].toFixed(4)} , ${top_coordinate[1].toFixed(4)} ]`
    );
    $("#mediaAreaSelector-coordinate-bottom").text(
      `[ ${bottom_coordinate[0].toFixed(4)} , ${bottom_coordinate[1].toFixed(
        4
      )} ]`
    );
  };

  componentDidMount = () => {
    const updateCoordinate = this.updateCoordinate;

    $("#mediaAreaSelector-container")
      .resizable({
        minHeight: 50,
        minWidth: 50,
        handles: "n, e, s, w,ne,se,nw,sw",

        create: function (event, ui) {
          $(".ui-resizable-se")
            .removeClass("ui-icon-gripsmall-diagonal-se")
            .removeClass("ui-icon");
        },
        stop: function () {
          updateCoordinate();
        },
        resize: function () {
          updateCoordinate();
        },
      })
      .draggable({
        containment: "#mapContainer",
        stop: function () {
          updateCoordinate();
        },
        drag: function () {
          updateCoordinate();
        },
      });
  };
  render() {
    return (
      <div id="mediaAreaSelector-container" className="hide">
        <div id="mediaAreaSelector-wrapper">
          <div id="mediaAreaSelector-coordinate-top"></div>
          <div id="mediaAreaSelector-coordinate-bottom"></div>

          <div className="mediaAreaSelector-resizeHandler side-nw"></div>
          <div className="mediaAreaSelector-resizeHandler side-n"></div>
          <div className="mediaAreaSelector-resizeHandler side-ne"></div>

          <div className="mediaAreaSelector-resizeHandler side-e"></div>
          <div className="mediaAreaSelector-resizeHandler side-w"></div>

          <div className="mediaAreaSelector-resizeHandler side-sw"></div>
          <div className="mediaAreaSelector-resizeHandler side-s"></div>
          <div className="mediaAreaSelector-resizeHandler side-se"></div>
        </div>
      </div>
    );
  }
}

export default MediaAreaSelector;
