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
  satellites,
  getSatelliteLableByValue,
} from "../../../../../../../../constants/satellites";

class Second extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };
  coConfiguration = {
    tabs: [
      {
        label: "CO",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "co",
                location: "world",
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
                ? "CO "
                : `CO  -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["co", "world", `${satellite}`]);
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

  so2Configuration = {
    tabs: [
      {
        label: "SO2",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "so2",
                location: "world",
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
                ? "SO2"
                : `SO2 -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["so2", "world", `${satellite}`]);
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
  no2Configuration = {
    tabs: [
      {
        label: "NO2",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "no2",
                location: "world",
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
                ? "NO2"
                : `NO2 -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["no2", "world", `${satellite}`]);
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
  o3Configuration = {
    tabs: [
      {
        label: "O3",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "o3",
                location: "world",
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
                ? "O3"
                : `O3 -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["o3", "world", `${satellite}`]);
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

  pm10Configuration = {
    tabs: [
      {
        label: "pm 10",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "pm10",
                location: "world",
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
                ? "PM 10"
                : `PM 10 -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["pm10", "world", `${satellite}`]);
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

  pm25Configuration = {
    tabs: [
      {
        label: "pm 2.5",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "pm2.5",
                location: "world",
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
                ? "PM 2.5"
                : `PM 2.5 -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["pm2.5", "world", `${satellite}`]);
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

  ch4Configuration = {
    tabs: [
      {
        label: "ch4",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "ch4",
                location: "world",
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
                ? "CH 4"
                : `CH 4 -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["ch4", "world", `${satellite}`]);
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

  hchoConfiguration = {
    tabs: [
      {
        label: "hcho",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "hcho",
                location: "world",
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
                ? "HCHO"
                : `HCHO -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["hcho", "world", `${satellite}`]);
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

  aodConfiguration = {
    tabs: [
      {
        label: "aod",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "aod",
                location: "world",
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
                ? "AOD"
                : `AOD -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["aod", "world", `${satellite}`]);
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

  aotConfiguration = {
    tabs: [
      {
        label: "aot",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [satellites.viirs, satellites.modis, satellites.sentinel3],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "aot",
                location: "world",
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
                ? "AOT"
                : `AOT -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["aot", "world", `${satellite}`]);
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

  uvaiConfiguration = {
    tabs: [
      {
        label: "uvai",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "uvai",
                location: "world",
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
                ? "UV AI"
                : `UV AI -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["uvai", "world", `${satellite}`]);
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

  render() {
    return (
      <div className="secondItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".airState-grid-container", ".secondItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title">پارامتر‌های کیفیت هوا</span>
        <hr />
        <div className="accordion" id="airState-second-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingOne"
              data-toggle="collapse"
              data-target="#airState-second-collapseOne"
              aria-expanded="false"
              aria-controls="airState-second-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">
                  نقشه آلودگی مونوکسید کربن (CO)
                </span>
              </h5>
            </div>

            <div
              id="airState-second-collapseOne"
              className="collapse"
              aria-labelledby="airState-second-headingOne"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.coConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingTwo"
              data-toggle="collapse"
              data-target="#airState-second-collapseTwo"
              aria-expanded="false"
              aria-controls="airState-second-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">
                  نقشه آلودگی دی اکسید گوگرد (SO2)
                </span>
              </h5>
            </div>

            <div
              id="airState-second-collapseTwo"
              className="collapse"
              aria-labelledby="airState-second-headingTwo"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.so2Configuration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingTwelve"
              data-toggle="collapse"
              data-target="#airState-second-collapseTwelve"
              aria-expanded="false"
              aria-controls="airState-second-collapseTwelve"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">نقشه آلودگی NO2</span>
              </h5>
            </div>

            <div
              id="airState-second-collapseTwelve"
              className="collapse"
              aria-labelledby="airState-second-headingTwelve"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.no2Configuration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingFour"
              data-toggle="collapse"
              data-target="#airState-second-collapseFour"
              aria-expanded="false"
              aria-controls="airState-second-collapseFour"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">نقشه غلظت ازن (O3)</span>
              </h5>
            </div>

            <div
              id="airState-second-collapseFour"
              className="collapse"
              aria-labelledby="airState-second-headingFour"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.o3Configuration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingFive"
              data-toggle="collapse"
              data-target="#airState-second-collapseFive"
              aria-expanded="false"
              aria-controls="airState-second-collapseFive"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">نقشه ذرات معلق (PM10)</span>
              </h5>
            </div>

            <div
              id="airState-second-collapseFive"
              className="collapse"
              aria-labelledby="airState-second-headingFive"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.pm10Configuration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingEleven"
              data-toggle="collapse"
              data-target="#airState-second-collapseEleven"
              aria-expanded="false"
              aria-controls="airState-second-collapseEleven"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">نقشه ذرات معلق (PM2.5)</span>
              </h5>
            </div>

            <div
              id="airState-second-collapseEleven"
              className="collapse"
              aria-labelledby="airState-second-headingEleven"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.pm25Configuration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingSix"
              data-toggle="collapse"
              data-target="#airState-second-collapseSix"
              aria-expanded="false"
              aria-controls="airState-second-collapseSix"
            >
              <h5 className="mb-0">
                <span className="btn btn-default"> نقشه غلظت متان (CH4)</span>
              </h5>
            </div>

            <div
              id="airState-second-collapseSix"
              className="collapse"
              aria-labelledby="airState-second-headingSix"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.ch4Configuration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingSeven"
              data-toggle="collapse"
              data-target="#airState-second-collapseSeven"
              aria-expanded="false"
              aria-controls="airState-second-collapseSeven"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">
                  {" "}
                  نقشه آلودگی فرمالدهید (HCHO)
                </span>
              </h5>
            </div>

            <div
              id="airState-second-collapseSeven"
              className="collapse"
              aria-labelledby="airState-second-headingSeven"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.hchoConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingTen"
              data-toggle="collapse"
              data-target="#airState-second-collapseTen"
              aria-expanded="false"
              aria-controls="airState-second-collapseTen"
            >
              <h5 className="mb-0">
                <span className="btn btn-default"> نقشه عمق اپتیکی (AOD)</span>
              </h5>
            </div>

            <div
              id="airState-second-collapseTen"
              className="collapse"
              aria-labelledby="airState-second-headingTen"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.aodConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingEight"
              data-toggle="collapse"
              data-target="#airState-second-collapseEight"
              aria-expanded="false"
              aria-controls="airState-second-collapseEight"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">
                  نقشه ضخامت اپتیکی ذرات معلق (AOT)
                </span>
              </h5>
            </div>

            <div
              id="airState-second-collapseEight"
              className="collapse"
              aria-labelledby="airState-second-headingEight"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.aotConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-second-headingNine"
              data-toggle="collapse"
              data-target="#airState-second-collapseNine"
              aria-expanded="false"
              aria-controls="airState-second-collapseNine"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">
                  نقشه شاخص UV هواویزها (UV AI)
                </span>
              </h5>
            </div>

            <div
              id="airState-second-collapseNine"
              className="collapse"
              aria-labelledby="airState-second-headingNine"
              data-parent="#airState-second-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.uvaiConfiguration} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Second;
