import React, { Component } from "react";
import $ from "jquery";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlTileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls, ZoomSlider, ScaleLine } from "ol/control";

import "ol/ol.css";
import "./map.css";
import "../styles/components/map.css";

class Map extends Component {
  _olMap = {};
  componentDidMount = () => {
    this.olmap = new OlMap({
      target: "mapContainer",
      controls: defaultControls().extend([
        new ScaleLine(),
        // new FullScreen(),
        new ZoomSlider(),
      ]),
      view: new OlView({
        center: this.props.map.center,
        zoom: this.props.map.zoom,
        projection: this.props.map.projection,
      }),
      layers: [
        new OlTileLayer({
          source: new OSM(),
        }),
      ],
    });

    $("#mapContainer").data("map", this.olmap);
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.props.handleUpdatingCenterAndZoom(center, zoom);
    });

    this.removeAttribute();
  };
  removeAttribute = () => {
    $(document).ready(() => {
      $(".error-container").remove();
      $(".ol-attribution").remove();

      setTimeout(() => {
        var map = $("#mapContainer").data("map");
        map.updateSize();
      }, 500);
    });
  };

  componentDidUpdate = () => {
    if (!Object.keys(this.props.map.olmap).length) {
      this.props.initOpenLayers(this.olmap);
    }
  };
  render() {
    return <div id="mapContainer" data-map=""></div>;
  }
}

export default Map;
