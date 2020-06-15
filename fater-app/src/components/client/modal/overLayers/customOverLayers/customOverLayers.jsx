import React, { Component } from "react";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import $ from "jquery";
import SaveCustomLayerModal from "../../../modal/overLayers/customOverLayers/saveCustomOverLayer/saveCustomOverLayer";
import { GetAuthenticatedUser } from "../../../../../utils/Auth";
import { Roles } from "../../../../../constants/Roles";

import "./customOverLayers.css";

class CustomOverLayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }
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
      this.setState((state) =>
        state.files.push({ id: new Date().getTime(), file: file })
      );

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
  componentDidUpdate = () => {
    if ($("ul.addedFiles-lists li").length) {
      $("#addedFiles-container").removeClass("hide");
    } else {
      $("#addedFiles-container").addClass("hide");
    }
  };
  handleSaveClick = (item) => {
    $("#saveCustomLayerModal").data("file", item);
    $("#saveCustomLayerModal").modal("show");
  };
  updateState = (fileId) => {
    console.log("fileId :>> ", fileId);
    this.setState((state) => {
      // eslint-disable-next-line array-callback-return
      return (state.files = state.files.filter((item) => {
        if (item.id !== fileId) return item;
      }));
    });
  };

  render() {
    var isAdmin = GetAuthenticatedUser().role === Roles.Admin;
    if (isAdmin) {
      return (
        <>
          <SaveCustomLayerModal
            updateCustomOverLayersListState={this.updateState}
          />
          <div
            className="tab-pane fade"
            id="customOverlayers"
            role="tabpanel"
            aria-labelledby="customOverlayers-tab"
          >
            <div className="row" id="customOverlayers-description-row">
              <p id="customOverlayers-description">
                برای اضافه کردن یک لایه بُرداری جدید، فایل GeoJSON مورد نظر خود
                را انتخاب کنید.
              </p>
            </div>
            <input type="file" id="customOverlayers-file" />
            <br />

            <button
              className="btn btn-primary btn-sm"
              id="customOverlayers-addBtn"
              onClick={this.handleClick}
            >
              اضافه کردن
            </button>

            <div id="addedFiles-container" className="hide">
              <hr />
              <p className="addFiles-description">
                نکته: شما میتوانید لایه های اضافه شده، را ذخیره و به لایه های
                پیش فرض اضافه کنید.
              </p>
              <ul className="addedFiles-lists">
                {this.state.files.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="addedFiles-item"
                      data-file={item}
                    >
                      <span className="addFiles-item-text">
                        {item.file.name}
                      </span>
                      <button
                        className="addFiles-item-saveOperation btn btn-sm btn-success"
                        data-toggle="modal"
                        onClick={() => this.handleSaveClick(item)}
                      >
                        ذخیره
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      );
    } else {
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
                برای اضافه کردن یک لایه بُرداری جدید، فایل GeoJSON مورد نظر خود
                را انتخاب کنید.
              </p>
            </div>
            <input type="file" id="customOverlayers-file" />
            <br />

            <button
              className="btn btn-primary btn-sm"
              id="customOverlayers-addBtn"
              onClick={this.handleClick}
            >
              اضافه کردن
            </button>
          </div>
        </>
      );
    }
  }
}

export default CustomOverLayers;
