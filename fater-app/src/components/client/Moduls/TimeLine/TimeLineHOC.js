import React, { Component } from "react";
import TimeLine from "./TimeLine";
import XYZ from "ol/source/XYZ";
import RasterSource from "ol/source/Raster";
import $ from "jquery";
import { Image as ImageLayer } from "ol/layer";
import chroma from "chroma-js";
import { getHeatMapUrl } from "../../../../utils/HeatMapServerUtils";
import { calculateTimespan } from "../../../../utils/TimeHelper";
import { scale, format } from "../../../../constants/timeline";

class TimeLineWrapper extends Component {
  state = {
    lang: format.fa,
    playAnimation: false,
    rangeValues: [],
    timescale: scale.day,
  };

  handleChange = (data) => {
    console.log("this.state :>> ", this.state);
    console.log("timeline changed : >> ", data);

    const mapContainer = $("#mapContainer").data("map");
    mapContainer
      .getLayers()
      .getArray()
      .map((layer) => {
        if (layer instanceof ImageLayer) {
          $(".loader-wrapper").toggle();
          let heatmapUrl = getHeatMapUrl(1572251400, {
            parameter: "AOT",
            location: "world",
            satellite: "",
          });

          console.log("heatmapUrl :>> ", heatmapUrl);
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

  handleRange = (rangeValues) => {
    let self = this;
    console.log("rangeValues :>> ", rangeValues);
    this.setState({ rangeValues: rangeValues });
    this.setState({ playAnimation: true });

    var rangeTimespans = rangeValues.map((date) => {
      return calculateTimespan(date, self.state.timescale, self.state.lang);
    });

    console.log("rangeTimespans :>> ", rangeTimespans);
  };

  handleTimespan = (value) => {
    console.log("timescale :>> ", value);
    this.setState({ timescale: value });
  };

  render() {
    return (
      <TimeLine
        onChange={(data) => this.handleChange(data)}
        lang={this.state.lang}
        getAnimationRangeValues={(rangeValues) => this.handleRange(rangeValues)}
        playAnimation={this.state.playAnimation}
        timeScale={(value) => {
          this.handleTimespan(value);
        }}
      />
    );
  }
}

export default TimeLineWrapper;
