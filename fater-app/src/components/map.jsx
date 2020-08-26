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
import GeoJSON from "ol/format/GeoJSON";

import "ol/ol.css";
import "./map.css";
import "../styles/components/map.css";

import TileWMS from "ol/source/TileWMS";

class Map extends Component {
  _olMap = {};
  getMapView = () => {
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

  createDrawVectorLayer = (drawSource) => {
    let drawVector = new VectorLayer({
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
    drawVector.set("name", "Draw vector layer");
    drawVector.set("description", "Vector Tile Layer provided by @Arad Co");
    drawVector.setZIndex(10000);

    return drawVector;
  };

  createOfflineMapLayer = () => {
    var offlineMap = new OlTileLayer({
      source: new XYZ({
        url: "./assets/map/satelite/{z}/{x}/{y}.png",
        maxZoom: 5,
        crossOrigin: "Anonymous",
      }),
    });

    offlineMap.set("name", "offline satelite map");
    offlineMap.set("description", "tiled image provided by @Arad Co");

    return offlineMap;
  };

  createIranBorderVectorLayer = () => {
    var iranBorderVectorLayer = new VectorLayer({
      source: new VectorSource({
        url: "./assets/map/shapefile/iran-border/iran-border.geojson",
        format: new GeoJSON(),
      }),
    });
    iranBorderVectorLayer.set("name", "Iran border vector");
    iranBorderVectorLayer.set(
      "description",
      "tiled image provided by @Arad Co"
    );
    iranBorderVectorLayer.setZIndex("10000");

    return iranBorderVectorLayer;
  };

  createIranHighwaysWmsLayer = () => {
    var wmsLayers = new OlTileLayer({
      source: new TileWMS({
        url: "http://192.168.11.28:8080/geoserver/Iran/wms",
        params: { LAYERS: "Iran:highway_line", TILED: true },
        serverType: "geoserver",
        cacheSize: 0,
      }),
    });
    wmsLayers.set("name", "Iran highways wms");
    wmsLayers.set("description", "wms image provided by @Arad Co");
    wmsLayers.setZIndex("10000000");

    return wmsLayers;
  };

  adjustLayersZIndex = (layers) => {
    return layers.map((layer, index) => {
      if (layer instanceof OlTileLayer) {
        layer.setZIndex((index + 1) * 10);
      }
      return layer;
    });
  };

  removeMapAttributeSection = () => {
    $(document).ready(() => {
      $(".error-container").remove();
      $(".ol-attribution").remove();

      var map = $("#mapContainer").data("map");
      var i = 0;
      var timer = setInterval(function () {
        if (i === 5) clearInterval(timer);
        map.updateSize();
        i++;
      }, 500);
    });
  };

  removeZoomWithDoubleClickEvent = (map) => {
    let dblClickInteraction;

    // find DoubleClickZoom interaction
    map
      .getInteractions()
      .getArray()
      .forEach(function (interaction) {
        if (interaction instanceof DoubleClickZoom) {
          dblClickInteraction = interaction;
        }
      });

    // remove from map
    map.removeInteraction(dblClickInteraction);
  };

  createMapObject = (mapView, layers) => {
    let map = new OlMap({
      target: "mapContainer",
      controls: defaultControls().extend([new ScaleLine(), new ZoomSlider()]),
      view: mapView,
      layers: layers,
    });

    map.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.props.handleUpdatingCenterAndZoom(center, zoom);
    });

    this.removeZoomWithDoubleClickEvent(map);

    $("#mapContainer").data("map", map);
    console.log("Map :>> ", map);

    return map;
  };

  initialLayers = () => {
    var layers = [];

    var drawSource = new VectorSource();
    var drawVector = this.createDrawVectorLayer(drawSource);
    var offlineMap = this.createOfflineMapLayer();
    var iranBorderVectorLayer = this.createIranBorderVectorLayer();
    //var wmsLayers = this.createIranHighwaysWmsLayer();

    layers.push(offlineMap);
    layers.push(drawVector);
    layers.push(iranBorderVectorLayer);
    //layers.push(wmsLayers);

    layers = this.adjustLayersZIndex(layers);
    $("#mapContainer").data("drawVector-source", drawSource);
    $("#mapContainer").data("drawVector", drawVector);

    return layers;
  };

  componentDidMount = () => {
    let layers = this.initialLayers();
    this.olmap = this.createMapObject(this.getMapView(), layers);

    this.removeMapAttributeSection();
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
