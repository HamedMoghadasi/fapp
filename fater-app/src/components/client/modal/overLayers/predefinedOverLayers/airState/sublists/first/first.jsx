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

class First extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };
  displayLoader = (time) => {
    $(".loader-wrapper").toggle();
    setTimeout(() => {
      $(".loader-wrapper").toggle();
    }, time);
  };

  firstConfiguration = {
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
        satellites: [satellites.modis, satellites.amsr2],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            this.displayLoader(5000);

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
                ? "aod"
                : `aod -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", "heatmap data provided by @Arad Co.");
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["AOD", "world", `${satellite}`]);
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
        satellites: [satellites.modis, satellites.sentinel3, satellites.viirs],
        handleAddLayer: () => {
          this.displayLoader(5000);

          let heatmapUrl = getHeatMapUrl(
            { start: "1572251500", end: "1593568800" },
            {
              parameter: "aod",
              location: "world",
              satellite: "default",
            }
          );

          console.log("heatmapUrl :>> ", heatmapUrl);

          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.CO_1593752671}`,
            maxZoom: 15,
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

          heatmap.set("name", "CO -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
          heatmap.set("params", ["AOT", "world", ""]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 6) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "HCHO",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و خت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [],
        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.HCHO}`,
            maxZoom: 15,
            crossOrigin: "",
          });

          var raster = new RasterSource({
            sources: [aerial],
            operation: function (pixels, data) {
              var pixel = pixels[0];
              var colors = data.colors;

              if (
                pixel[0] !== 0 ||
                pixel[1] !== 0 ||
                pixel[2] !== 0 ||
                pixel[3] !== 0
              ) {
                const pixel2 = pixel;
                const color = colors[255 - pixel2[0]];
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

          function getColors() {
            var scale = chroma
              .scale(["#80ff80", "#85d4d5", "#0066cc", "#ffffff"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "HCHO -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#80ff80", "#85d4d5", "#0066cc", "#ffffff"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();

          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "NO2",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
      کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
      جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
      برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.NO2}`,
            maxZoom: 15,
            crossOrigin: "",
          });

          var raster = new RasterSource({
            sources: [aerial],
            operation: function (pixels, data) {
              var pixel = pixels[0];
              var colors = data.colors;

              if (
                pixel[0] !== 0 ||
                pixel[1] !== 0 ||
                pixel[2] !== 0 ||
                pixel[3] !== 0
              ) {
                const pixel2 = pixel;
                const color = colors[255 - pixel2[0]];
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

          function getColors() {
            var scale = chroma
              .scale(["#A30016", "#feaf39", "#58fe7c", "#394dfe"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "NO2 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#A30016", "#feaf39", "#58fe7c", "#394dfe"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "O3",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
      کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شنا ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.O3}`,
            maxZoom: 15,
            crossOrigin: "",
          });

          var raster = new RasterSource({
            sources: [aerial],
            operation: function (pixels, data) {
              var pixel = pixels[0];
              var colors = data.colors;

              if (
                pixel[0] !== 0 ||
                pixel[1] !== 0 ||
                pixel[2] !== 0 ||
                pixel[3] !== 0
              ) {
                const pixel2 = pixel;
                const color = colors[255 - pixel2[0]];
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

          function getColors() {
            var scale = chroma
              .scale(["#A30016", "#feaf39", "#58fe7c", "#394dfe"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "O3 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#A30016", "#feaf39", "#58fe7c", "#394dfe"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "SO2",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متونی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.SO2}`,
            maxZoom: 15,
            crossOrigin: "",
          });

          var raster = new RasterSource({
            sources: [aerial],
            operation: function (pixels, data) {
              var pixel = pixels[0];
              var colors = data.colors;

              if (
                pixel[0] !== 0 ||
                pixel[1] !== 0 ||
                pixel[2] !== 0 ||
                pixel[3] !== 0
              ) {
                const pixel2 = pixel;
                const color = colors[255 - pixel2[0]];
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

          function getColors() {
            var scale = chroma
              .scale(["#A30016", "#feaf39", "#58fe7c", "#394dfe"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "SO2 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#A30016", "#feaf39", "#58fe7c", "#394dfe"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "Soil Moisture",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
      کتابهای زیادی در شصت و سه درصد گذشته حال و  علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.Soil_Moisture}`,
            maxZoom: 15,
            crossOrigin: "",
          });
          var raster = new RasterSource({
            sources: [aerial],
            operation: function (pixels, data) {
              var pixel = pixels[0];
              var colors = data.colors;

              if (
                pixel[0] !== 0 ||
                pixel[1] !== 0 ||
                pixel[2] !== 0 ||
                pixel[3] !== 0
              ) {
                const pixel2 = pixel;
                const color = colors[255 - pixel2[0]];
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

          function getColors() {
            var scale = chroma
              .scale(["#A30016", "#feaf39", "#58fe7c", "#394dfe"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "Soil Moisture -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#A30016", "#feaf39", "#58fe7c", "#394dfe"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "UV AI",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
      کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
      جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
      برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این ص`,
        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.UV_AI}`,
            maxZoom: 15,
            crossOrigin: "",
          });

          var raster = new RasterSource({
            sources: [aerial],
            operation: function (pixels, data) {
              var pixel = pixels[0];
              var colors = data.colors;

              if (
                pixel[0] !== 0 ||
                pixel[1] !== 0 ||
                pixel[2] !== 0 ||
                pixel[3] !== 0
              ) {
                const pixel2 = pixel;
                const color = colors[255 - pixel2[0]];
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

          function getColors() {
            var scale = chroma
              .scale(["#A30016", "#feaf39", "#58fe7c", "#394dfe"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "UV AI -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#A30016", "#feaf39", "#58fe7c", "#394dfe"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "SSC Khalije-Fars 1",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
 علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,

        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.SSC_Khalije_Fars_1}`,
            maxZoom: 15,
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

          function getColors() {
            var scale = chroma
              .scale(["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "SSC Khalije-Fars 1 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          //mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "SSC Oman 1",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
          نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
 علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,

        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.SSC_Oman_1}`,
            maxZoom: 15,
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

          function getColors() {
            var scale = chroma
              .scale(["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "SSC Oman 1 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "SSTH Khalije Fars 1",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
 علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,

        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.SSTH_Khalije_Fars_1}`,
            maxZoom: 15,
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

          function getColors() {
            var scale = chroma
              .scale(["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "SSTH Khalije Fars 1 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
        },
      },
      {
        label: "SSTH Oman 1",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
 علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,

        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url: `${heatMapUrls.SSTH_Oman_1}`,
            maxZoom: 15,
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

          function getColors() {
            var scale = chroma
              .scale(["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"])
              .colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          raster.on("afteroperations", function (event) {});

          var tilelayer = new TileLayer({
            source: aerial,
          });

          var heatmap = new ImageLayer({
            source: raster,
          });

          heatmap.set("name", "SSTH Oman 1 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
          heatmap.set("isHeatMap", true);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 5) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
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
                <VerticalTabs configuration={this.firstConfiguration} />
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
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
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
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default First;
