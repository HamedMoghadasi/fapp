import React, { Component } from "react";
import $ from "jquery";

import OlTileLayer from "ol/layer/Tile";

import OSM from "ol/source/OSM";

import "ion-rangeslider/js/ion.rangeSlider";
import "ion-rangeslider/css/ion.rangeSlider.css";

import "./TimelineSlider.css";

var lang = "fa-IR";

function dateToTS(date) {
  return date.valueOf();
}

function tsToDate(ts) {
  var d = new Date(ts);

  return d.toLocaleDateString(lang, {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
}

class TimelineSlider extends Component {
  componentDidMount() {
    const map = $("#mapContainer").data("map");
    $(".timeline-range-slider").ionRangeSlider({
      type: "single",
      grid: false,
      step: 1,
      hide_min_max: true,
      grid_snap: false,
      min: dateToTS(new Date(2020, 8, 1)),
      max: dateToTS(new Date(2020, 9, 1)),
      from: dateToTS(new Date(2020, 8, 8)),
      prettify: tsToDate,
      onFinish: function (data) {
        console.log(`data at ### ${data.from_pretty} ### is fetching ...`);
        console.log(map);

        var raster = new OlTileLayer({
          source: new OSM(),
        });

        raster.set("name", "openStreetMap");
        raster.set("description", "tiled image provided by @openStreetMap");
        raster.setZIndex("9999999");
        raster.setOpacity(0.3);
        map.getLayers().array_ = [raster];

        map.updateSize();

        setTimeout(function () {
          console.log("data fetched successfully!");
        }, 2000);
      },
    });
  }
  render() {
    return (
      <div id="timeline-slider" className="timeline-container">
        <div id="timeline-slider-wrapper">
          <input
            type="text"
            className="timeline-range-slider"
            name="video-timeline"
          />
        </div>
      </div>
    );
  }
}

export default TimelineSlider;
