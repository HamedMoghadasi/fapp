import React, { Component } from "react";
import $ from "jquery";
import VerticalTabs from "../verticalTab/verticalTab";
import "ol/ol.css";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import RasterSource from "ol/source/Raster";
import chroma from "chroma-js";
import { getHeatMapUrl } from "../../../../../../../../utils/HeatMapServerUtils";

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
        label: "CO 1593752671",
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
          // var year = $(
          //   ".timeline-counterWrapper .yearWrapper:nth-child(1) #year"
          // ).val();
          // var month = $(
          //   ".timeline-counterWrapper .yearWrapper:nth-child(2) #year"
          // ).val();
          // var day = $(
          //   ".timeline-counterWrapper .yearWrapper:nth-child(3) #year"
          // ).val();

          // console.log("year :>> ", year);
          // console.log("month :>> ", month);
          // console.log("day :>> ", day);

          let heatmapUrl = getHeatMapUrl(1572251400, {
            parameter: "AOT",
            location: "world",
            satellite: "",
          });

          console.log("heatmapUrl :>> ", heatmapUrl);

          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url:
              "./assets/qweasd/wgis/map/CO_map/co_1593752671/{z}/{x}/{-y}.png",
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

          heatmap.set("name", "CO 1593752671 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
          heatmap.set("params", ["AOT", "world", ""]);
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
        label: "CO 1593752971",
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
            url:
              "./assets/qweasd/wgis/map/CO_map/co_1593752971/{z}/{x}/{-y}.png",
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
              .scale(["#b21227", "#fec97c", "#dff1e3", "#353f9a"])
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

          heatmap.set("name", "CO 1593752971 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
          const zIndex = mapContainer.getLayers().array_.length * 10000;
          heatmap.setZIndex(zIndex);

          // mapContainer.getLayers().array_.push(tilelayer);
          mapContainer.getLayers().array_.push(heatmap);

          this.props.refreshComponent();
          var i = 0;
          var timer = setInterval(function () {
            if (i === 3) clearInterval(timer);
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
        handleAddLayer: () => {
          this.displayLoader(5000);
          const mapContainer = $("#mapContainer").data("map");
          var aerial = new XYZ({
            url:
              "./assets/qweasd/wgis/map/HCHO_map/hcho_1587254400/{z}/{x}/{-y}.png",
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
            url:
              "./assets/qweasd/wgis/map/NO2_map/no2_1586908800/{z}/{x}/{-y}.png",
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
            url:
              "./assets/qweasd/wgis/map/O3_map/o3_1587081600/{z}/{x}/{-y}.png",
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
            url:
              "./assets/qweasd/wgis/map/SO2_map/so2_1587081600/{z}/{x}/{-y}.png",
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
            url:
              "./assets/qweasd/wgis/map/Soil_moisture/sm_bu_1588277393/{z}/{x}/{-y}.png",
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
            url:
              "./assets/qweasd/wgis/map/UV_AI/uvai_1586908800/{z}/{x}/{-y}.png",
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
        label: "AOT 1593675000",
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
            url: "./assets/qweasd/wgis/map/AOT/AOT_1593675000/{z}/{x}/{-y}.png",
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

          heatmap.set("name", "AOT 1593675000 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
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
        label: "AOT 1593761400",
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
            url: "./assets/qweasd/wgis/map/AOT/AOT_1593761400/{z}/{x}/{-y}.png",
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

          heatmap.set("name", "AOT 1593761400 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
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
            url:
              "./assets/qweasd/wgis/map/Sea_surface_current/ssc_1593519925474_Khalije-Fars/{z}/{x}/{-y}.png",
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
        label: "SSC Khalije-Fars 2",
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
            url:
              "./assets/qweasd/wgis/map/Sea_surface_current/ssc_1593840073862_Khalije-Fars/{z}/{x}/{-y}.png",
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

          heatmap.set("name", "SSC Khalije-Fars 2 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
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
            url:
              "./assets/qweasd/wgis/map/Sea_surface_current/ssc_1593519925474_Oman/{z}/{x}/{-y}.png",
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
        label: "SSC Oman 2",
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
            url:
              "./assets/qweasd/wgis/map/Sea_surface_current/ssc_1593840073862_Oman/{z}/{x}/{-y}.png",
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

          heatmap.set("name", "SSC Oman 2 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
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
            url:
              "./assets/qweasd/wgis/map/Sea_surface_temperature_hourly/ssth_1594236600_Khalije-Fars/{z}/{x}/{-y}.png",
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
        label: "SSTH Khalije Fars 2",
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
            url:
              "./assets/qweasd/wgis/map/Sea_surface_temperature_hourly/ssth_1593840073862_Khalije-Fars/{z}/{x}/{-y}.png",
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

          heatmap.set("name", "SSTH Khalije Fars 2 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
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
            url:
              "./assets/qweasd/wgis/map/Sea_surface_temperature_hourly/ssth_1594236600_Oman/{z}/{x}/{-y}.png",
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
        label: "SSTH Oman 2",
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
            url:
              "./assets/qweasd/wgis/map/Sea_surface_temperature_hourly/ssth_1593840073862_Oman/{z}/{x}/{-y}.png",
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

          heatmap.set("name", "SSTH Oman21 -- heatmap");
          heatmap.set("description", "heatmap data provided by @Arad Co.");
          heatmap.set("colors", ["#1c4ee3", "#fec97c", "#45e8dd", "#00ff7b"]);
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
        label: "سد البرز",
        content: `سد لفوربنابر اعلام شرکت مدیریت منابع آب ایران با نام رسمی سد البرز )پاشاکلا(، همچنین شناختهشده
          با نام سهد صهالحی مازندرانی، سهدی است در استان مازندران که در دهستان لفور در شهرستان سوادکوه
          شهمالی واقع شهدهاسهت. این سهد در 45 کیلومتری جنوب شرقی بابل قرار دارد`,

        handleAddLayer: () => {
          this.displayLoader(5000);
          console.log("Alborz Dam");
        },
      },
      {
        label: "سد امیرکبیر",
        content: `سههد امیرکبیر بر روی رودخانه کرج در شههمال شهههر کرج و در 25 کیلومتری جاده کرج به چالوس قرار
        دارد. این سهد اولین سهد چند منظوره کشهور ایران است، و یکی از منابع تامین آب شهر تهران میباشد.
        دریاچه این سد یکی از مراکز طبیعی مهم پرورش ماهیهای قزلآلای رنگین کمان و قزلآلای خالقرمز و
        ماهی سهفید و ماهی سیاه است. انباشه شدن آب رودخانه کرج در پشت سد امیرکبیر علاوه بر کارایی آن
        در تولید انرژی برقابی و تامین بخشههی از آب آشههامیدنی شهههر تهران، باعد بوجود آمدن دریاچهای زیبا
        گردیدهاسهت که موجب اسهتفادههای گردشهگری و تفریحی ورزشهی از سهد کرج شهدهاست. این سد در
        حوضه آبریز درجه یک مرکزی و حوضه آبریز درجه دو دریاچه نمک قرار دارد. `,

        handleAddLayer: () => {
          this.displayLoader(5000);
          console.log("Amir kabir Dam");
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
            this.handleBack(".waterArea-grid-container", ".firstItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <hr />
        <div className="accordion" id="waterArea-first-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-first-headingOne"
              data-toggle="collapse"
              data-target="#waterArea-first-collapseOne"
              aria-expanded="false"
              aria-controls="waterArea-first-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">مساحت پهنه آبی</span>
              </h5>
            </div>

            <div
              id="waterArea-first-collapseOne"
              className="collapse"
              aria-labelledby="waterArea-first-headingOne"
              data-parent="#waterArea-first-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.firstConfiguration} />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-first-headingTwo"
              data-toggle="collapse"
              data-target="#waterArea-first-collapseTwo"
              aria-expanded="false"
              aria-controls="waterArea-first-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">تغییرات مساحت پهنه آبی</span>
              </h5>
            </div>

            <div
              id="waterArea-first-collapseTwo"
              className="collapse"
              aria-labelledby="waterArea-first-headingTwo"
              data-parent="#waterArea-first-accordion"
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
              id="waterArea-first-headingThree"
              data-toggle="collapse"
              data-target="#waterArea-first-collapseThree"
              aria-expanded="false"
              aria-controls="waterArea-first-collapseThree"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">ارتفاع سطح آب پهنه آبی</span>
              </h5>
            </div>

            <div
              id="waterArea-first-collapseThree"
              className="collapse"
              aria-labelledby="waterArea-first-headingThree"
              data-parent="#waterArea-first-accordion"
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
              id="waterArea-first-headingFour"
              data-toggle="collapse"
              data-target="#waterArea-first-collapseFour"
              aria-expanded="false"
              aria-controls="waterArea-first-collapseFour"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">
                  تغییرات مرز نواحی ساحلی دریاها و دریاچه‌ها
                </span>
              </h5>
            </div>

            <div
              id="waterArea-first-collapseFour"
              className="collapse"
              aria-labelledby="waterArea-first-headingFour"
              data-parent="#waterArea-first-accordion"
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
