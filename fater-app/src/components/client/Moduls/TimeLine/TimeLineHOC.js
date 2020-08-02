import React, { Component } from "react";
import TimeLine from "./TimeLine";
import XYZ from "ol/source/XYZ";
import RasterSource from "ol/source/Raster";
import $ from "jquery";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import chroma from "chroma-js";
import { getHeatMapUrl } from "../../../../utils/HeatMapServerUtils";
import { calculateTimespan } from "../../../../utils/TimeHelper";
import { getCountOfHeatMaps } from "../../../../utils/Map";
import { scale, format } from "../../../../constants/timeline";

import { heatMapUrls } from "../../../../constants/Urls";

class TimeLineWrapper extends Component {
  state = {
    lang: format.fa,
    playAnimation: false,
    rangeValues: [],
    timescale: scale.day,
  };

  componentWillUpdate = () => {
    const mapContainer = $("#mapContainer").data("map");
  };

  handleChange = (data) => {
    const mapContainer = $("#mapContainer").data("map");

    mapContainer
      .getLayers()
      .getArray()
      .map((layer) => {
        if (layer instanceof ImageLayer) {
          $(".loader-wrapper").toggle();
          let heatmapUrl = getHeatMapUrl(
            { start: "1572251500", end: "1593568800" },
            {
              parameter: "aod",
              location: "world",
              satellite: "default",
            }
          );

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
            var colors = layer.get("colors");
            var scale = chroma.scale(colors).colors(254);

            var _palet = scale.map((element, index) => {
              return chroma(scale[index]).rgba();
            });

            return _palet;
          }

          raster.on("beforeoperations", function (event) {
            event.data.colors = getColors();
          });

          layer.setSource(raster);
          var i = 0;
          var timer = setInterval(function () {
            if (i === 8) clearInterval(timer);
            mapContainer.updateSize();
            i++;
          }, 500);
          setTimeout(() => {
            $(".loader-wrapper").toggle();
          }, 2000);
        }
      });
  };

  addTimelineLayer = (layer) => {
    let heatmapUrl = getHeatMapUrl(
      { start: "1572251500", end: "1593568800" },
      {
        parameter: "aod", //layer.get(params).parameter
        location: "world", //layer.get(params).parameter
        satellite: "default", //layer.get(params).satellite
      }
    );
    const mapContainer = $("#mapContainer").data("map");

    var aerial = new XYZ({
      url: `${heatMapUrls.aod}`, //heatmapUrl
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
        .scale(["#b21227", "#fec97c", "#dff1e3", "#353f9a"]) //layer.get("colors")
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

    heatmap.set("name", "aod -- heatmap");
    heatmap.set("description", "heatmap data provided by @Arad Co.");
    heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
    heatmap.set("params", ["AOT", "world", ""]);
    heatmap.set("isTimelineLayer", true);
    heatmap.setVisible(false);
    const zIndex = mapContainer.getLayers().array_.length * 10000;
    heatmap.setZIndex(zIndex);

    //mapContainer.getLayers().array_.push(tilelayer);
    console.log("heatmap :>> ", heatmap);
    mapContainer.getLayers().array_.push(heatmap);

    var i = 0;
    var timer = setInterval(function () {
      if (i === 6) clearInterval(timer);
      mapContainer.updateSize();
      i++;
    }, 500);
  };

  getAllLayersWithoutTimelineLayers = () => {
    const mapContainer = $("#mapContainer").data("map");
    let layers = mapContainer
      .getLayers()
      .getArray()
      .filter((layer) => {
        if (!layer.get("isTimelineLayer")) {
          return layer;
        }
      });

    return layers;
  };

  handleRange = (rangeValues) => {
    console.log("2 :>> ");
    console.log("start :>> ", new Date());
    let self = this;
    var mapContainer = $("#mapContainer").data("map");
    //remove previous timeline layers
    mapContainer.getLayers().array_ = this.getAllLayersWithoutTimelineLayers();

    var timespanRangeValues = rangeValues.map((date) => {
      return calculateTimespan(date, this.state.timescale, this.state.lang);
    });

    console.log("timespanRangeValues :>> ", timespanRangeValues);

    rangeValues.map((item) => {
      mapContainer
        .getLayers()
        .getArray()
        .map((layer, index) => {
          if (layer instanceof ImageLayer && layer.get("isHeatMap")) {
            this.addTimelineLayer(layer);
          }
        });
    });
    console.log("rangeValues :>> ", rangeValues);
    this.setState({ rangeValues: rangeValues });
    this.setState({ playAnimation: true });

    console.log("end :>> ", new Date());
  };

  handleTimespan = (value) => {
    this.setState({ timescale: value });
  };

  render() {
    return (
      <TimeLine
        onChange={(data) => this.handleChange(data)}
        lang={this.state.lang}
        getAnimationRangeValues={(rangeValues) => this.handleRange(rangeValues)}
        playAnimation={this.state.playAnimation}
        onPlayAnimation={(data) => console.log("on play animation: >>", data)}
        timeScale={(value) => {
          this.handleTimespan(value);
        }}
      />
    );
  }
}

export default TimeLineWrapper;
