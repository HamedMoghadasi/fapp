import React, { Component } from "react";
import "./SideToolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faDrawPolygon,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { unByKey } from "ol/Observable";
import Overlay from "ol/Overlay";

import { getArea, getLength } from "ol/sphere";
import { LineString, Polygon } from "ol/geom";
import Draw from "ol/interaction/Draw";
import { units } from "../../../constants/units";

import $ from "jquery";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Unit from "./unit/unit";

class SideToolbar extends Component {
  drawing = (drawShapeTYpe) => {
    var source = $("#mapContainer").data("drawVector-source");
    console.log(source.getFeatures());

    var map = $("#mapContainer").data("map");
    var mapUnit = $("#mapContainer").data("unit");

    var sketch;
    var measureTooltipElement;
    var measureTooltip;

    var draw; // global so we can remove it later

    var formatLength = function (line) {
      var length = getLength(line);
      var output = {};

      if (length > 100) {
        const distance = Math.round((length / 1000) * 100) / 100;
        output[`${units.KM}`] = `${distance} km`;
        output[`${units.MILE}`] = `${(distance / 0.621371).toFixed(3)} mile`;
      } else {
        const distance = Math.round(length * 100) / 100;
        output[`${units.KM}`] = `${distance} m`;
        output[`${units.MILE}`] = `${(distance / 3.28084).toFixed(3)} ft`;
      }
      return output;
    };

    var formatArea = function (polygon) {
      var area = getArea(polygon);
      var output = {};
      if (area > 10000) {
        const distance = Math.round((area / 1000000) * 100) / 100;
        output[`${units.KM}`] = `${distance} km<sup>2</sup>`;
        output[`${units.MILE}`] = `${(distance / 0.386102).toFixed(
          3
        )} mile<sup>2</sup>`;
      } else {
        const distance = Math.round(area * 100) / 100;

        output[`${units.KM}`] = `${distance} m<sup>2</sup>`;
        output[`${units.MILE}`] = `${(distance / 10.7639).toFixed(
          3
        )} ft<sup>2</sup>`;
      }
      return output;
    };

    function addInteraction() {
      draw = new Draw({
        source: source,
        type: drawShapeTYpe,
        style: new Style({
          fill: new Fill({
            color: "rgba(254, 254, 254, 0.5)",
          }),
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: 2,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
          }),
        }),
      });

      map.addInteraction(draw);

      createMeasureTooltip();

      var listener;
      draw.on("drawstart", function (evt) {
        // set sketch
        sketch = evt.feature;

        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on("change", function (evt) {
          var geom = evt.target;
          var output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);

            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output[`${mapUnit}`];
          measureTooltipElement.dataset[`${units.KM}`] = output[`${units.KM}`];
          measureTooltipElement.dataset[`${units.MILE}`] =
            output[`${units.MILE}`];
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      draw.on("drawend", function () {
        measureTooltipElement.className =
          "ol-tooltip ol-tooltip-static shapeUnit";

        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;

        unByKey(listener);
        map.removeInteraction(draw);
      });
    }

    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement("div");
      measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
      });
      map.addOverlay(measureTooltip);
    }

    addInteraction();
  };

  handleRemoveAllDrawShape = () => {
    var drawVector = $("#mapContainer").data("drawVector");

    drawVector.getSource().clear();
    $(".ol-tooltip.ol-tooltip-static").remove();
  };

  render() {
    return (
      <>
        <div id="st-container">
          <FontAwesomeIcon
            icon={faRuler}
            className="st-icon"
            id="ruler"
            title="Line String"
            onClick={() => this.drawing("LineString")}
          />

          <FontAwesomeIcon
            icon={faDrawPolygon}
            className="st-icon"
            id="polygon"
            title="Polygon"
            onClick={() => this.drawing("Polygon")}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="st-icon"
            id="Trash"
            title="Remove All Shapes"
            onClick={this.handleRemoveAllDrawShape}
          />
          <Unit />
        </div>
      </>
    );
  }
}

export default SideToolbar;
