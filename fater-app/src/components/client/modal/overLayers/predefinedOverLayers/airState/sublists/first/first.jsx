import React, { Component } from "react";
import $ from "jquery";
import VerticalTabs from "../../../verticalTab/verticalTab";
import "ol/ol.css";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import RasterSource from "ol/source/Raster";
import chroma from "chroma-js";
import { getHeatMapUrl } from "../../../../../../../../utils/HeatMapServerUtils";
import { heatMapUrls } from "../../../../../../../../constants/Urls";
import {
  satellites,
  getSatelliteLableByValue,
} from "../../../../../../../../constants/satellites";
import { displayLoader } from "../../../../../../../../utils/LoadingHelper";
import { WindLayer } from "ol-wind";
import { gfs } from "./gfs";

import {
  grouped_cities_Options,
  cityOptions,
} from "../../../configuration/locations";

class First extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };

  tempratureConfiguration = {
    tabs: [
      {
        label: "Air temperature",
        content: cityOptions[0].description,
        options: grouped_cities_Options,
        optionsDefaultValue: cityOptions[0],
        satellites: [],
        handleAddLayer: (selectedSatellites, location) => {
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "at",
                location: location,
                satellite: satellite,
              }
            );
            console.log("heatmapUrl :>> ", heatmapUrl);
            const mapContainer = $("#mapContainer").data("map");
            var aerial = new XYZ({
              url: `${heatMapUrls.aod}`,
              maxZoom: 11,
              crossOrigin: "Anonymous",
            });
            var raster = new RasterSource({
              sources: [aerial],
              operation: function (pixels, data) {
                var pixel = pixels[0];
                var colors = data.colors;

                if (pixel[0] !== 0) {
                  const pixel2 = pixel;
                  const color = colors[pixel2[0]];
                  if (color) {
                    pixel[0] = color[0];
                    pixel[1] = color[1];
                    pixel[2] = color[2];
                    pixel[3] = 255;
                  } else {
                    pixel[0] = 0;
                    pixel[1] = 0;
                    pixel[2] = 0;
                    pixel[3] = 0;
                  }
                } else {
                  pixel[0] = 0;
                  pixel[1] = 0;
                  pixel[2] = 0;
                  pixel[3] = 0;
                }

                return pixel;
              },
            });
            raster.on("beforeoperations", function (event) {
              event.data.colors = getColors();
            });

            raster.on("afteroperations", function (event) {});

            function getColors() {
              var scale = chroma
                .scale(["#b21227", "#fec97c", "#dff1e3", "#353f9a"])
                .colors(254);

              var _palet = scale.map((element, index) => {
                return chroma(scale[index]).rgba();
              });

              return _palet;
            }

            var tilelayer = new TileLayer({
              source: aerial,
            });

            var heatmap = new ImageLayer({
              source: raster,
            });

            const heatmapName =
              satellite === "default"
                ? "Air temperature"
                : `Air temperature -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["at", `${location}`, `${satellite}`]);
            heatmap.set("isHeatMap", true);
            const zIndex = mapContainer.getLayers().array_.length * 10000;
            heatmap.setZIndex(zIndex);

            //mapContainer.getLayers().array_.push(tilelayer);
            mapContainer.getLayers().array_.push(heatmap);

            this.props.refreshComponent();
            var i = 0;
            var timer = setInterval(function () {
              if (i === 6) clearInterval(timer);
              mapContainer.updateSize();
              i++;
            }, 500);
          });
        },
      },
    ],
    tabPanel: [{}],
  };

  humidityConfiguration = {
    tabs: [
      {
        label: "Relative humidity",
        content: cityOptions[0].description,
        options: grouped_cities_Options,
        optionsDefaultValue: cityOptions[0],
        satellites: [],
        handleAddLayer: (selectedSatellites, location) => {
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "rh",
                location: location,
                satellite: satellite,
              }
            );
            console.log("heatmapUrl :>> ", heatmapUrl);
            const mapContainer = $("#mapContainer").data("map");
            var aerial = new XYZ({
              url: `${heatMapUrls.aod}`,
              maxZoom: 11,
              crossOrigin: "Anonymous",
            });
            var raster = new RasterSource({
              sources: [aerial],
              operation: function (pixels, data) {
                var pixel = pixels[0];
                var colors = data.colors;

                if (pixel[0] !== 0) {
                  const pixel2 = pixel;
                  const color = colors[pixel2[0]];
                  if (color) {
                    pixel[0] = color[0];
                    pixel[1] = color[1];
                    pixel[2] = color[2];
                    pixel[3] = 255;
                  } else {
                    pixel[0] = 0;
                    pixel[1] = 0;
                    pixel[2] = 0;
                    pixel[3] = 0;
                  }
                } else {
                  pixel[0] = 0;
                  pixel[1] = 0;
                  pixel[2] = 0;
                  pixel[3] = 0;
                }

                return pixel;
              },
            });
            raster.on("beforeoperations", function (event) {
              event.data.colors = getColors();
            });

            raster.on("afteroperations", function (event) {});

            function getColors() {
              var scale = chroma
                .scale(["#b21227", "#fec97c", "#dff1e3", "#353f9a"])
                .colors(254);

              var _palet = scale.map((element, index) => {
                return chroma(scale[index]).rgba();
              });

              return _palet;
            }

            var tilelayer = new TileLayer({
              source: aerial,
            });

            var heatmap = new ImageLayer({
              source: raster,
            });

            const heatmapName =
              satellite === "default"
                ? "Relative humidity"
                : `Relative humidity -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["rh", `${location}`, `${satellite}`]);
            heatmap.set("isHeatMap", true);
            const zIndex = mapContainer.getLayers().array_.length * 10000;
            heatmap.setZIndex(zIndex);

            //mapContainer.getLayers().array_.push(tilelayer);
            mapContainer.getLayers().array_.push(heatmap);

            this.props.refreshComponent();
            var i = 0;
            var timer = setInterval(function () {
              if (i === 6) clearInterval(timer);
              mapContainer.updateSize();
              i++;
            }, 500);
          });
        },
      },
    ],
    tabPanel: [{}],
  };

  windConfiguration = {
    tabs: [
      {
        label: "Wind",
        content: cityOptions[0].description,
        options: grouped_cities_Options,
        optionsDefaultValue: cityOptions[0],
        satellites: [],
        handleAddLayer: (selectedSatellites, location) => {
          selectedSatellites.map((satellite) => {
            displayLoader(2000);

            // let heatmapUrl = getHeatMapUrl(
            //   { start: "1572251500", end: "1593568800" },
            //   {
            //     parameter: "wu",
            //     location: location,
            //     satellite: satellite,
            //   }
            // );

            // console.log("heatmapUrl :>> ", heatmapUrl);

            const mapContainer = $("#mapContainer").data("map");

            const windLayer = new WindLayer(gfs, {
              forceRender: false,
              windOptions: {
                // colorScale: scale,
                maxAge: 100,
                velocityScale: 1 / 20,
                paths: 5000,
                // paths: () => {
                //   can be number or function
                //   const zoom = map.getView().getZoom();
                //   return zoom * 1000;
                // },
                // eslint-disable-next-line no-unused-vars
                colorScale: [
                  "rgb(36,104, 180)",
                  "rgb(60,157, 194)",
                  "rgb(128,205,193 )",
                  "rgb(151,218,168 )",
                  "rgb(198,231,181)",
                  "rgb(238,247,217)",
                  "rgb(255,238,159)",
                  "rgb(252,217,125)",
                  "rgb(255,182,100)",
                  "rgb(252,150,75)",
                  "rgb(250,112,52)",
                  "rgb(245,64,32)",
                  "rgb(237,45,28)",
                  "rgb(220,24,32)",
                  "rgb(180,0,35)",
                ],
                width: 3,
                // colorScale: scale,
                generateParticleOption: true,
              },
              // map: map,
              // projection: 'EPSG:4326'
            });

            const layerName =
              satellite === "default"
                ? "Wind"
                : `Wind -- ${getSatelliteLableByValue[satellite]}`;
            windLayer.set("name", layerName);
            windLayer.set("description", `location: ${location} `);
            windLayer.set("colors", [
              "rgb(36,104, 180)",
              "rgb(60,157, 194)",
              "rgb(128,205,193 )",
              "rgb(151,218,168 )",
              "rgb(198,231,181)",
              "rgb(238,247,217)",
              "rgb(255,238,159)",
              "rgb(252,217,125)",
              "rgb(255,182,100)",
              "rgb(252,150,75)",
              "rgb(250,112,52)",
              "rgb(245,64,32)",
              "rgb(237,45,28)",
              "rgb(220,24,32)",
              "rgb(180,0,35)",
            ]);
            windLayer.set("isWindLayer", true);
            windLayer.set("params", ["wu", `${location}`, `${satellite}`]);

            const zIndex = mapContainer.getLayers().array_.length * 10000;
            windLayer.setZIndex(zIndex);

            //mapContainer.getLayers().array_.push(windLayer);
            mapContainer.addLayer(windLayer);

            this.props.refreshComponent();
          });
        },
      },
    ],
    tabPanel: [{}],
  };

  render() {
    return (
      <div className="firstItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".airState-grid-container", ".firstItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title">پارامترهای هوا شناسی</span>
        <hr />
        <div className="accordion" id="airState-first-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-first-headingOne"
              data-toggle="collapse"
              data-target="#airState-first-collapseOne"
              aria-expanded="false"
              aria-controls="airState-first-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">دما</span>
              </h5>
            </div>

            <div
              id="airState-first-collapseOne"
              className="collapse"
              aria-labelledby="airState-first-headingOne"
              data-parent="#airState-first-accordion"
            >
              <div className="card-body">
                <VerticalTabs
                  configuration={this.tempratureConfiguration}
                  hasTabs={false}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-first-headingTwo"
              data-toggle="collapse"
              data-target="#airState-first-collapseTwo"
              aria-expanded="false"
              aria-controls="airState-first-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">رطوبت</span>
              </h5>
            </div>

            <div
              id="airState-first-collapseTwo"
              className="collapse"
              aria-labelledby="airState-first-headingTwo"
              data-parent="#airState-first-accordion"
            >
              <div className="card-body">
                <VerticalTabs
                  configuration={this.humidityConfiguration}
                  hasTabs={false}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-first-headingThree"
              data-toggle="collapse"
              data-target="#airState-first-collapseThree"
              aria-expanded="false"
              aria-controls="airState-first-collapseThree"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">باد</span>
              </h5>
            </div>

            <div
              id="airState-first-collapseThree"
              className="collapse"
              aria-labelledby="airState-first-headingThree"
              data-parent="#airState-first-accordion"
            >
              <div className="card-body">
                <VerticalTabs
                  configuration={this.windConfiguration}
                  hasTabs={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default First;
