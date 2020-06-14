import React, { Component } from "react";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import $ from "jquery";

import "./customOverLayers.css";

class CustomOverLayers extends Component {
  getFileExtension = (file) => {
    const filename = file.name;
    let last_dot = filename.lastIndexOf(".");
    return filename.slice(last_dot + 1).toLowerCase();
  };

  isGeoJson = (extension) => {
    return extension === "geojson";
  };

  handleClick = () => {
    const self = this;
    var input = document.getElementById("customOverlayers-file");
    var map = $("#mapContainer").data("map");

    if (
      !window.File ||
      !window.FileReader ||
      !window.FileList ||
      !window.Blob
    ) {
      alert("The File APIs are not fully supported in this browser.");
      return;
    } else if (!input.files[0]) {
      alert("فایلی انتخاب نشده است.");
    } else {
      var file = input.files[0];
      let extension = this.getFileExtension(file);
      console.log("ext :>> ", this.getFileExtension(file));
      if (this.isGeoJson(extension)) {
        var reader = new FileReader();
        reader.onload = function () {
          var geojsonContent = JSON.parse(reader.result);

          console.log(geojsonContent);
          console.log(
            "projection : >>",
            new GeoJSON().readProjection(geojsonContent)
          );

          var vectorSource = new VectorSource({
            features: new GeoJSON({
              featureProjection: "EPSG:3857",
            }).readFeatures(geojsonContent),
          });

          var vectorLayer = new VectorLayer({
            source: vectorSource,
          });
          vectorLayer.set("name", file.name);
          vectorLayer.set("description", "Added by user");

          vectorLayer.setZIndex("1000000");
          map.getLayers().array_ = [...map.getLayers().array_, vectorLayer];
          map.updateSize();
          self.props.refreshComponent();
        };
        reader.readAsText(file);
      } else {
        alert("فقط فایل GeoJSON مجاز است");
      }

      input.value = "";
    }
  };

  render() {
    return (
      <>
        <div
          className="tab-pane fade"
          id="customOverlayers"
          role="tabpanel"
          aria-labelledby="customOverlayers-tab"
        >
          <div className="row" id="customOverlayers-description-row">
            <p id="customOverlayers-description">
              برای اضافه کردن یک لایه بُرداری جدید، فایل GeoJSON مورد نظر خود را
              انتخاب کنید.
            </p>
          </div>
          <input type="file" id="customOverlayers-file" />
          <br />
          <hr />
          <button className="btn btn-primary btn-sm" onClick={this.handleClick}>
            اضافه کردن
          </button>
        </div>
      </>
    );
  }
}

export default CustomOverLayers;
