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
import { displayLoader } from "../../../../../../../../utils/LoadingHelper";

class Third extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };
  soilMoistureConfiguration = {
    tabs: [
      {
        label: "ANZALI",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
    استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
    در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
    زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
    دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
    زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
    پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        satellites: [satellites.amsr2, satellites.gfs],
        handleAddLayer: (selectedSatellites) => {
          console.log("satellites :>> ", selectedSatellites);
          selectedSatellites.map((satellite) => {
            displayLoader(5000);

            let heatmapUrl = getHeatMapUrl(
              { start: "1572251500", end: "1593568800" },
              {
                parameter: "sm",
                location: "anzali",
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
                ? "Soil moisture"
                : `Soil moisture -- ${getSatelliteLableByValue[satellite]}`;
            heatmap.set("name", heatmapName);
            heatmap.set("description", `location: ANZALI `);
            heatmap.set("colors", ["#b21227", "#fec97c", "#dff1e3", "#353f9a"]);
            heatmap.set("params", ["sm", "anzali", `${satellite}`]);
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
      <div className="thirdItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".airState-grid-container", ".thirdItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title">پارامترهای اقیمی</span>
        <hr />
        <div className="accordion" id="airState-third-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-third-headingOne"
              data-toggle="collapse"
              data-target="#airState-third-collapseOne"
              aria-expanded="false"
              aria-controls="airState-third-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">رطوبت سطح خاک</span>
              </h5>
            </div>

            <div
              id="airState-third-collapseOne"
              className="collapse"
              aria-labelledby="airState-third-headingOne"
              data-parent="#airState-third-accordion"
            >
              <div className="card-body">
                <VerticalTabs
                  configuration={this.soilMoistureConfiguration}
                  hasTabs={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Third;
