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
} from "../../configuration/waters";

class Fourth extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };

  olsConfiguration = {
    tabs: [
      {
        label: "Oil spill",
        content: lakesOptions[0].description,
        options: grouped_lakesAndDams_Options,
        optionsDefaultValue: lakesOptions[0],
        satellites: [
          satellites.sentinel1,
          satellites.modis,
          satellites.sentinel2,
        ],
        handleAddLayer: (selectedSatellites, location) => {
          console.log("satellites :>> ", selectedSatellites);
          console.log("location :>> ", location);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "ols",
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
                ? "Oil spill"
                : `Oil spill -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ${location} `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["ols", `${location}`, `${satellite}`]);
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
      <div className="fourthItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".waterArea-grid-container", ".fourthItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title">رویداد</span>
        <hr />
        <div className="accordion" id="waterArea-fourth-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-fourth-headingOne"
              data-toggle="collapse"
              data-target="#waterArea-fourth-collapseOne"
              aria-expanded="false"
              aria-controls="waterArea-fourth-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">آلودگی نفتی</span>
              </h5>
            </div>

            <div
              id="waterArea-fourth-collapseOne"
              className="collapse"
              aria-labelledby="waterArea-fourth-headingOne"
              data-parent="#waterArea-fourth-accordion"
            >
              <div className="card-body">
                <VerticalTabs configuration={this.olsConfiguration} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Fourth;
