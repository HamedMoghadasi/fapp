import React, { Component } from "react";
import OlMousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import { projections } from "../../../constants/projections";

import $ from "jquery";

import "./MousePosition.css";

class MousePosition extends Component {
  initOlMousePosition = (projection) => {
    $("#projection").text(projection);

    return new OlMousePosition({
      coordinateFormat: createStringXY(4),
      projection: projection,
      className: "mousePosition-value",
      target: document.getElementById("mousePosition-value-container"),
      undefinedHTML: "&nbsp;",
    });
  };

  getTargetProjection = () => {
    let currentProjection = $("#projection").data("value");
    var targetProjection = projections.EPSG4326;

    if (currentProjection === projections.EPSG4326) {
      targetProjection = projections.EPSG3857;
      $("#projection").data("value", projections.EPSG3857);
    } else if (currentProjection === projections.EPSG3857) {
      targetProjection = projections.EPSG4326;
      $("#projection").data("value", projections.EPSG4326);
    }
    return targetProjection;
  };

  toggleProjection = () => {
    let map = $("#mapContainer").data("map");

    var targetProjection = this.getTargetProjection();

    map.controls.forEach((control) => {
      if (control instanceof OlMousePosition) {
        map.controls.remove(control);

        map.controls.extend([this.initOlMousePosition(targetProjection)]);
      }
    });
  };

  componentDidMount = () => {
    let map = $("#mapContainer").data("map");
    map.controls.extend([this.initOlMousePosition(projections.EPSG4326)]);
  };

  render() {
    return (
      <>
        <div id="mousePosition-container">
          <div id="mousePosition-wrapper">
            <span
              id="projection"
              onClick={this.toggleProjection}
              data-value="EPSG:4326"
            ></span>
            <div id="mousePosition-value-container"></div>
          </div>
        </div>
      </>
    );
  }
}

export default MousePosition;
