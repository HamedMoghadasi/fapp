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
import { displayLoader } from "../../../../../../../../utils/LoadingHelper";
import {
  getSatelliteLableByValue,
  satellites,
} from "../../../../../../../../constants/satellites";
import {
  grouped_lakesAndDams_Options,
  lakesOptions,
} from "../../../configuration/locations";

class Third extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };

  chlConfiguration = {
    tabs: [
      {
        label: "CHL",
        content: lakesOptions[0].description,
        options: grouped_lakesAndDams_Options,
        optionsDefaultValue: lakesOptions[0],
        satellites: [
          satellites.sentinel2,
          satellites.modis,
          satellites.landsat,
        ],
        handleAddLayer: (selectedSatellites, location) => {
          console.log("satellites :>> ", selectedSatellites);
          console.log("location :>> ", location);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "chl",
                location: location,
                satellite: satellite,
              }
            );
            console.log("heatmapUrl :>> ", heatmapUrl);
            const mapContainer = $("#mapContainer").data("map");
            var aerial = new XYZ({
              url: `${heatMapUrls.aod}`,
              maxZoom: 11,
              crossOrigin: "",
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
                ? "کلروفیل"
                : `کلروفیل -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["chl", `${location}`, `${satellite}`]);
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
  };

  trbConfiguration = {
    tabs: [
      {
        label: "Turbidity",
        content: lakesOptions[0].description,
        options: grouped_lakesAndDams_Options,
        optionsDefaultValue: lakesOptions[0],
        satellites: [
          satellites.sentinel2,
          satellites.modis,
          satellites.landsat,
        ],
        handleAddLayer: (selectedSatellites, location) => {
          console.log("satellites :>> ", selectedSatellites);
          console.log("location :>> ", location);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "trb",
                location: location,
                satellite: satellite,
              }
            );
            console.log("heatmapUrl :>> ", heatmapUrl);
            const mapContainer = $("#mapContainer").data("map");
            var aerial = new XYZ({
              url: `${heatMapUrls.aod}`,
              maxZoom: 11,
              crossOrigin: "",
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
                ? "ذرات معلق (آلی)"
                : `ذرات معلق (آلی) -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["trb", `${location}`, `${satellite}`]);
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
  };

  phsConfiguration = {
    tabs: [
      {
        label: "Phosphor",
        content: lakesOptions[0].description,
        options: grouped_lakesAndDams_Options,
        optionsDefaultValue: lakesOptions[0],
        satellites: [
          satellites.sentinel2,
          satellites.modis,
          satellites.landsat,
        ],
        handleAddLayer: (selectedSatellites, location) => {
          console.log("satellites :>> ", selectedSatellites);
          console.log("location :>> ", location);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "phs",
                location: location,
                satellite: satellite,
              }
            );
            console.log("heatmapUrl :>> ", heatmapUrl);
            const mapContainer = $("#mapContainer").data("map");
            var aerial = new XYZ({
              url: `${heatMapUrls.aod}`,
              maxZoom: 11,
              crossOrigin: "",
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
                ? "فسفر"
                : `فسفر -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["phs", `${location}`, `${satellite}`]);
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
  };

  ssalConfiguration = {
    tabs: [
      {
        label: "Sea salinity",
        content: lakesOptions[0].description,
        options: grouped_lakesAndDams_Options,
        optionsDefaultValue: lakesOptions[0],
        satellites: [],
        handleAddLayer: (selectedSatellites, location) => {
          console.log("satellites :>> ", selectedSatellites);
          console.log("location :>> ", location);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "ssal",
                location: location,
                satellite: satellite,
              }
            );
            console.log("heatmapUrl :>> ", heatmapUrl);
            const mapContainer = $("#mapContainer").data("map");
            var aerial = new XYZ({
              url: `${heatMapUrls.aod}`,
              maxZoom: 11,
              crossOrigin: "",
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
                ? "شوری آب"
                : `شوری آب -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["ssal", `${location}`, `${satellite}`]);
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
  };

  cbacConfiguration = {
    tabs: [
      {
        label: "Cyanobacteria",
        content: lakesOptions[0].description,
        options: grouped_lakesAndDams_Options,
        optionsDefaultValue: lakesOptions[0],
        satellites: [
          satellites.landsat,
          satellites.modis,
          satellites.sentinel2,
          satellites.sentinel3,
        ],
        handleAddLayer: (selectedSatellites, location) => {
          console.log("satellites :>> ", selectedSatellites);
          console.log("location :>> ", location);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "cbac",
                location: location,
                satellite: satellite,
              }
            );
            console.log("heatmapUrl :>> ", heatmapUrl);
            const mapContainer = $("#mapContainer").data("map");
            var aerial = new XYZ({
              url: `${heatMapUrls.aod}`,
              maxZoom: 11,
              crossOrigin: "",
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
                ? "سیانوباکتری‌ها"
                : `سیانوباکتری‌ها -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["cbac", `${location}`, `${satellite}`]);
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
  };

  parConfiguration = {
    tabs: [
      {
        label: "Phoyosynthetically radiation",
        content: lakesOptions[0].description,
        options: grouped_lakesAndDams_Options,
        optionsDefaultValue: lakesOptions[0],
        satellites: [
          satellites.modis,
          satellites.sentinel2,
          satellites.sentinel3,
        ],
        handleAddLayer: (selectedSatellites, location) => {
          console.log("satellites :>> ", selectedSatellites);
          console.log("location :>> ", location);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "par",
                location: location,
                satellite: satellite,
              }
            );
            console.log("heatmapUrl :>> ", heatmapUrl);
            const mapContainer = $("#mapContainer").data("map");
            var aerial = new XYZ({
              url: `${heatMapUrls.aod}`,
              maxZoom: 11,
              crossOrigin: "",
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
                ? "تابش فعال فتوسنتزی"
                : `تابش فعال فتوسنتزی -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["par", `${location}`, `${satellite}`]);
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
  };

  render() {
    return (
      <div className="thirdItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".waterArea-grid-container", ".thirdItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title"> پارامترهای کیفیت بدنه‌های آبی</span>
        <hr />
        <div className="accordion" id="waterArea-third-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-third-headingOne"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseOne"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">میزان کلروفیل</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseOne"
              className="collapse"
              aria-labelledby="waterArea-third-headingOne"
              data-parent="#waterArea-third-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.chlConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-third-headingTwo"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseTwo"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">ذرات معلق (آلی)</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseTwo"
              className="collapse"
              aria-labelledby="waterArea-third-headingTwo"
              data-parent="#waterArea-third-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.trbConfiguration} />
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-third-headingThree"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseThree"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseThree"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">ذرات معلق معدنی (فسفر)</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseThree"
              className="collapse"
              aria-labelledby="waterArea-third-headingThree"
              data-parent="#waterArea-third-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.phsConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-third-headingFour"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseFour"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseFour"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">شوری آب</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseFour"
              className="collapse"
              aria-labelledby="waterArea-third-headingFour"
              data-parent="#waterArea-third-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.ssalConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-third-headingFive"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseFive"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseFive"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">سیانوباکتری‌ها</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseFive"
              className="collapse"
              aria-labelledby="waterArea-third-headingFive"
              data-parent="#waterArea-third-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.cbacConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-third-headingSix"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseSix"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseSix"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">تابش فعال فتوسنتزی</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseSix"
              className="collapse"
              aria-labelledby="waterArea-third-headingSix"
              data-parent="#waterArea-third-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.parConfiguration} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Third;
