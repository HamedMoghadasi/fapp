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
import {
  satellites,
  getSatelliteLableByValue,
} from "../../../../constants/satellites";

class TimeLineWrapper extends Component {
  state = {
    lang: format.eng,
    hasRange: false,
    isPlayingAnimation: false,
    rangeValues: [],
    timescale: scale.day,
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

  getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  addTimelineLayer = (layer, range) => {
    var _parameter = layer.get("params")[0];
    var _location = layer.get("params")[1];
    var _satellite = layer.get("params")[2];
    var _name = layer.get("name");
    let timespan = calculateTimespan(
      range,
      this.state.timescale,
      this.state.lang
    );

    let heatmapUrl = getHeatMapUrl(
      { start: "1572251500", end: "1593568800" },
      {
        parameter: "aod", //layer.get("params")[0]
        location: "world", //layer.get("params")[1]
        satellite: "default", //layer.get("params")[2]
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

    const heatmapName =
      _satellite === "default"
        ? `${_name}`
        : `${_name} -- ${getSatelliteLableByValue[_satellite]}`;
    heatmap.set("name", heatmapName);
    heatmap.set("description", `location: ${_location} `);
    heatmap.set("colors", [
      this.getRandomColor(),
      this.getRandomColor(),
      this.getRandomColor(),
      this.getRandomColor(),
    ]);
    heatmap.set("params", [`${_parameter}`, `${_location}`, `${_satellite}`]);
    heatmap.set("identity", timespan.startTimespan);
    heatmap.set("isTimelineLayer", true);
    // heatmap.setVisible(false);
    const zIndex = mapContainer.getLayers().array_.length * 10000 * -1;
    heatmap.setZIndex(zIndex);

    //mapContainer.getLayers().array_.push(tilelayer);

    mapContainer.getLayers().array_.push(heatmap);

    var i = 0;
    var timer = setInterval(function () {
      if (i === 20) clearInterval(timer);
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

  getAllTimelineLayers = () => {
    const mapContainer = $("#mapContainer").data("map");
    let layers = mapContainer
      .getLayers()
      .getArray()
      .filter((layer) => {
        if (layer.get("isTimelineLayer")) {
          return layer;
        }
      });

    return layers;
  };

  handleRange = (rangeValues) => {
    var mapContainer = $("#mapContainer").data("map");
    //remove previous timeline layers
    mapContainer.getLayers().array_ = this.getAllLayersWithoutTimelineLayers();

    rangeValues.map((range) => {
      mapContainer
        .getLayers()
        .getArray()
        .map((layer, index) => {
          if (layer instanceof ImageLayer && layer.get("isHeatMap")) {
            this.addTimelineLayer(layer, range);
          }
        });
    });

    this.setState({ rangeValues: rangeValues });
    this.setState({ hasRange: true });
  };

  handleTimespan = (value) => {
    this.setState({ timescale: value });
  };

  handlePlayAnimation = (date) => {
    if (this.state.isPlayingAnimation) {
      let timespan = calculateTimespan(
        date,
        this.state.timescale,
        this.state.lang
      );
      const mapContainer = $("#mapContainer").data("map");
      let timelineLayers = this.getAllTimelineLayers();

      timelineLayers.map((layer) => {
        var isTargetLayer = layer.get("identity") === timespan.startTimespan;
        if (isTargetLayer) {
          let zIndex = layer.getZIndex() * -1;
          layer.setZIndex(zIndex);
        } else {
          let zIndex = layer.getZIndex();
          if (zIndex > 0) {
            layer.setZIndex(zIndex * -1);
          }
        }
        var i = 0;
        var timer = setInterval(function () {
          if (i === 10) clearInterval(timer);
          mapContainer.updateSize();
          i++;
        }, 500);
      });
    } else {
      this.setState({ isPlayingAnimation: true });
      setTimeout(() => {
        this.setState({ isPlayingAnimation: false });
      }, 150000);
    }

    //this.setState({ hasRange: true });
  };

  render() {
    return (
      <TimeLine
        onChange={(data) => this.handleChange(data)}
        //onChange={(data) => console.log("on change", data)}
        lang={this.state.lang}
        getAnimationRangeValues={(rangeValues) => this.handleRange(rangeValues)}
        //getAnimationRangeValues={(rangeValues) =>
        //console.log("rangeValues :>> ", rangeValues)
        //}
        hasRange={this.state.hasRange}
        isPlayingAnimation={this.state.isPlayingAnimation}
        onPlayAnimation={(data) => this.handlePlayAnimation(data)}
        //onPlayAnimation={(data) => console.log("onPlayAnimation :>> ", data)}
        timeScale={
          (value) => {
            this.handleTimespan(value);
          }
          // timeScale={(value) => {
          //   console.log("value :>> ", value);
          // }
        }
      />
    );
  }
}

export default TimeLineWrapper;
