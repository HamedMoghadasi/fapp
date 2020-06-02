import React, { Component } from "react";
import $ from "jquery";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlTileLayer from "ol/layer/Tile";
import { Vector as VectorLayer } from "ol/layer";
import { DoubleClickZoom } from "ol/interaction";
import OSM from "ol/source/OSM";
import { Vector as VectorSource, XYZ } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { defaults as defaultControls, ZoomSlider, ScaleLine } from "ol/control";
import queryString from "query-string";
import { units } from "../constants/units";

import Projection from "ol/proj/Projection";

import "ol/ol.css";
import "./map.css";
import "../styles/components/map.css";

class Map extends Component {
  _olMap = {};
  getView = () => {
    let params = queryString.parse(this.props.location);

    var view = new OlView({
      center: this.props.map.center,
      zoom: this.props.map.zoom,
      projection: this.props.map.projection,
    });
    if (params.lat && params.lon && params.zoom && params.projection) {
      view = new OlView({
        center: [Number(params.lon), Number(params.lat)],
        zoom: params.zoom,
        projection: params.projection,
      });
    }

    return view;
  };
  componentDidMount = () => {
    this.getView();
    var view_ = this.getView;
    var layers = [];
    var raster = new OlTileLayer({
      source: new OSM(),
    });

    var drawSource = new VectorSource();

    var drawVector = new VectorLayer({
      source: drawSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(220, 53, 69, 0.2)",
        }),
        stroke: new Stroke({
          color: "rgba(220, 53, 69, 1)",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "rgba(220, 53, 69, 1)",
          }),
        }),
      }),
    });

    drawVector.setZIndex(10000);
    var key = "nEpI4PLiQ94chsicl5PF";
    var attributions =
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
      '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

    var aerial = new XYZ({
      attributions: attributions,
      url:
        "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=" + key,
      maxZoom: 20,
      crossOrigin: "",
    });
    var sateliteMap = new OlTileLayer({
      source: aerial,
    });
    raster.set("name", "openStreetMap");
    raster.set("description", "tiled image provided by @openStreetMap");
    layers.push(raster);

    layers.push(drawVector);
    sateliteMap.set("name", "Satelite");
    sateliteMap.set("description", "tiled image provided by @mapTiler.net");
    layers.push(sateliteMap);

    var extent = [0, 0, 52, 36];
    var projection = new Projection({
      code: this.props.map.projection,
      extent: extent,
    });

    this.olmap = new OlMap({
      target: "mapContainer",
      controls: defaultControls().extend([
        new ScaleLine(),
        // new FullScreen(),
        new ZoomSlider(),
      ]),
      view: view_(),
      layers: layers,
    });

    var dblClickInteraction;
    // find DoubleClickZoom interaction
    this.olmap
      .getInteractions()
      .getArray()
      .forEach(function (interaction) {
        if (interaction instanceof DoubleClickZoom) {
          dblClickInteraction = interaction;
        }
      });
    // remove from map
    this.olmap.removeInteraction(dblClickInteraction);

    $("#mapContainer").data("map", this.olmap);
    $("#mapContainer").data("drawVector-source", drawSource);
    $("#mapContainer").data("drawVector", drawVector);
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
        console.log(map);

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
    return <div id="mapContainer" data-unit={units.KM}></div>;
  }
}

export default Map;
