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

import gifshot from "gifshot";

import "./TimeLineHOC.css";

class TimeLineHOC extends Component {
  state = {
    lang: format.eng,
    hasRange: false,
    isPlayingAnimation: false,
    rangeValues: [],
    timescale: scale.day,
    isRecording: false,
  };
  images = [];
  dates = [];
  reseteState = () => {
    this.images = [];
    this.dates = [];
  };

  CaptureVideo = () => {
    const self = this;

    let selectedArea = document
      .getElementById("mediaAreaSelector-container")
      .getBoundingClientRect();

    // const extension = $("#video-extension").children("option:selected").val();
    const extension = "png";
    const map = $("#mapContainer").data("map");
    map.once("rendercomplete", function () {
      console.log("rendercomplete :>> ");

      var mapCanvas = document.createElement("canvas");

      let currentDate = JSON.parse(window.sessionStorage.date);
      let currentDate_Timespan = new Date(
        currentDate.year,
        currentDate.month,
        currentDate.day,
        currentDate.hour
      ).getTime();

      mapCanvas.width = selectedArea.width;
      mapCanvas.height = selectedArea.height;
      var mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        document.querySelectorAll(".ol-layer canvas"),

        function (canvas) {
          if (canvas.width > 0) {
            var opacity = canvas.parentNode.style.opacity;

            console.log("currentDate_Timespan :>> ", currentDate_Timespan);
            mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
            var transform = canvas.style.transform;
            // Get the transform parameters from the style's transform matrix
            var matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(",")
              .map(Number);

            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );

            mapContext.drawImage(
              canvas,
              selectedArea.x,
              selectedArea.y,
              selectedArea.width,
              selectedArea.height,
              0,
              0,
              selectedArea.width,
              selectedArea.height
            );

            mapContext.font = "12px Arial";
            mapContext.fillStyle = "red";
            mapContext.fillText("Karaneh", 0, 15);
            if (currentDate) {
              mapContext.fillText(
                `${currentDate.year}-${currentDate.month}-${currentDate.day}  ${currentDate.hour}:00`,
                0,
                30
              );
            } else {
              mapContext.fillText(`${Date.now()}`, 0, 30);
            }
          }
        }
      );

      if (navigator.msSaveBlob) {
        // link download attribuute does not work on MS browsers
        navigator.msSaveBlob(
          mapCanvas.msToBlob(),
          `video-${Date.now()}.${extension}`
        );
      } else {
        // var link = document.getElementById("video-download");
        // link.download = `video-${Date.now()}.${extension}`;
        // link.href = mapCanvas.toDataURL();
        //console.log("link.href :>> ", link.href);
        // link.click();

        // self.setState((state) => ({
        //   dates: [...self.state.dates, currentDate_Timespan],
        // }));

        // self.setState((state) => ({
        //   images: [...self.state.images, mapCanvas.toDataURL()],
        // }));

        console.log("self.state.images :>> ", mapCanvas.toDataURL());
        self.images.push(mapCanvas.toDataURL());
      }
    });
    map.renderSync();

    console.log("self.images :>> ", self.images);
  };

  createGif = () => {
    const self = this;
    let selectedArea = document
      .getElementById("mediaAreaSelector-container")
      .getBoundingClientRect();

    gifshot.createGIF(
      {
        gifWidth: selectedArea.width,
        gifHeight: selectedArea.height,
        images: this.images,
        interval: 1,
        numFrames: 10,
        frameDuration: 1,
        text: "",
        fontWeight: "normal",
        fontSize: "16px",
        fontFamily: "sans-serif",
        fontColor: "#ffffff",
        textAlign: "left",
        textBaseline: "bottom",
        sampleInterval: 10,
        numWorkers: 2,
      },
      function (obj) {
        if (!obj.error) {
          if (document.getElementById("animationGifResult")) {
            document.getElementById("animationGifResult").remove();
          }

          var image = obj.image,
            animatedImage = document.createElement("a");
          animatedImage.href = image;
          animatedImage.download = `animationGif-${new Date().getTime()}.gif`;
          animatedImage.id = "animationGifResult";
          animatedImage.click();
          console.log("link :>> ", image);
          document.body.appendChild(animatedImage);
          self.reseteState();
        }
      }
    );
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
      console.log("handlePlayAnimation");
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
          if (i === 5) clearInterval(timer);
          mapContainer.updateSize();
          i++;
        }, 500);
      });

      if (this.state.isRecording) {
        console.log("Record");
        this.CaptureVideo();
      }
    }
    //this.setState({ hasRange: true });
  };

  handleIsPlayingAnimation = (value) => {
    console.log("isPlayingAnimation : >>", value);

    if (value && !this.state.isPlayingAnimation) {
      this.setState({ isPlayingAnimation: true });
    } else if (!value) {
      console.log("this.images.length  :>> ", this.images.length);

      console.log("this.state.isRecording :>> ", this.state.isRecording);
      if (this.images.length && this.state.isRecording) {
        console.log("create gif");
        this.createGif();
        this.setState({ isRecording: false });
      }
      this.setState({ isPlayingAnimation: false });
      this.setState({ isRecording: false });
    }
  };

  handleHasRange = (value) => {
    console.log("hasRange : >>", value);

    if (value && !this.state.hasRange) {
      this.setState({ hasRange: true });
    } else if (!value) {
      this.setState({ hasRange: false });
    }
  };

  handleRecorder = () => {
    //set record state true here
    if (!this.state.isRecording) {
      this.setState({ isRecording: true });
      document.getElementsByClassName("timeline-btn-animation")[0].click();
    }

    // setTimeout(() => {
    //   console.log(
    //     "this.state.isPlayingAnimation :>> ",
    //     this.state.isPlayingAnimation
    //   );
    //   console.log("this.state.hasRange :>> ", this.state.hasRange);
    //   var i,
    //     j = 0;
    //   while (this.state.isPlayingAnimation && this.state.hasRange) {
    //     if (i === 0) {
    //       console.log("capturing ...");
    //       i++;
    //     }
    //     this.CaptureVideo();
    //   }
    //   if (!this.state.isPlayingAnimation && this.state.hasRange) {
    //     if (j === 0) {
    //       console.log("generating gif ...");
    //       j++;
    //     }
    //     this.createGif();
    //   }
    // }, 2000);
  };

  render() {
    return (
      <>
        <div className="timeline-recorder-manager">
          <button
            id="btn-timeline-recorder"
            onClick={this.handleRecorder}
          ></button>
        </div>
        <TimeLine
          onChange={(data) => this.handleChange(data)}
          //onChange={(data) => console.log("on change", data)}
          lang={this.state.lang}
          getAnimationRangeValues={(rangeValues) =>
            this.handleRange(rangeValues)
          }
          //getAnimationRangeValues={(rangeValues) =>
          //console.log("rangeValues :>> ", rangeValues)
          //}
          hasRange={[
            this.state.hasRange,
            (value) => this.handleHasRange(value),
          ]}
          isPlayingAnimation={[
            this.state.isPlayingAnimation,
            (value) => this.handleIsPlayingAnimation(value),
          ]}
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
      </>
    );
  }
}

export default TimeLineHOC;
