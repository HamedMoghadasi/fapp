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
import { getSatelliteLableByValue } from "../../../../../../../../constants/satellites";

class Fourth extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };

  dustDetectionMapConfiguration = {
    tabs: [
      {
        label: "Dust Detection Map",
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
                parameter: "dm",
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
                ? "Dust Detection Map"
                : `Dust Detection Map -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["dm", "world", `${satellite}`]);
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

  predictedDustMapConfiguration = {
    tabs: [
      {
        label: "Predicted dust map",
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
                parameter: "pdm",
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
                ? "Predicted dust map"
                : `Predicted dust map -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `heatmap data provided by @Arad Co.`);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["pdm", "world", `${satellite}`]);
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
      <div className="fourthItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".airState-grid-container", ".fourthItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title">رویداد</span>
        <hr />
        <div className="accordion" id="airState-fourth-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-fourth-headingOne"
              data-toggle="collapse"
              data-target="#airState-fourth-collapseOne"
              aria-expanded="false"
              aria-controls="airState-fourth-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">گرد و غبار‌های فعال</span>
              </h5>
            </div>

            <div
              id="airState-fourth-collapseOne"
              className="collapse"
              aria-labelledby="airState-fourth-headingOne"
              data-parent="#airState-fourth-accordion"
            >
              <div className="card-body">
                <VerticalTabs
                  configuration={this.dustDetectionMapConfiguration}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-fourth-headingTwo"
              data-toggle="collapse"
              data-target="#airState-fourth-collapseTwo"
              aria-expanded="false"
              aria-controls="airState-fourth-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">پیش‌بینی گرد و غبار</span>
              </h5>
            </div>

            <div
              id="airState-fourth-collapseTwo"
              className="collapse"
              aria-labelledby="airState-fourth-headingTwo"
              data-parent="#airState-fourth-accordion"
            >
              <div className="card-body">
                <VerticalTabs
                  configuration={this.predictedDustMapConfiguration}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Fourth;
