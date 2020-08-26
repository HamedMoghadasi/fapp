import React, { Component } from "react";
import $ from "jquery";
import "./baselayersModal.css";
import { getMap } from "../../../../utils/Map";
import OlTileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

let API_URL = process.env.REACT_APP_API_URL;

class BaseLayersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseMaps: [],
      dataFetched: false,
    };
  }
  getData = () => {
    const self = this;
    let data = [];
    if (this.state.baseMaps.length === 0 && window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/baseMapServer`,
        type: "GET",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            `Beare ${window.localStorage.access_token.replace(/"/g, "")}`
          );
        },
        success: function (response) {
          data = response.data;

          if (response) {
            self.setState({ baseMaps: data });
          }
        },
      });
    }

    return data;
  };

  hanndleAddMap = (item) => {
    console.log(" map adding start ...  ");
    const map = $("#mapContainer").data("map");

    var newMap = new OlTileLayer({
      source: new XYZ({
        url: item.url,
        maxZoom: item.maxZoom,
        crossOrigin: "Anonymous",
      }),
    });
    newMap.set("name", item.name);
    newMap.set("description", item.description);
    newMap.setZIndex((map.getLayers().array_.length + 1) * 10);
    map.getLayers().array_ = [...map.getLayers().array_, newMap];

    this.props.refreshComponent();
    map.updateSize();
  };

  componentDidMount = () => {
    let self = this;
    $(document).ready(function () {
      $("#baseLayersModal").on("show.bs.modal", function () {
        self.getData();
      });
    });
  };

  render() {
    return (
      <>
        <div
          className="modal fade"
          id="baseLayersModal"
          role="dialog"
          aria-labelledby="baseLayersModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.baseMaps &&
                  this.state.baseMaps.map((item, index) => {
                    return (
                      <div className="card text-center" key={index}>
                        <img
                          className="backgroundi"
                          src={item.imageName}
                          alt=""
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">{item.description}</p>
                          <button
                            className="btn btn-primary m-2"
                            onClick={() => this.hanndleAddMap(item)}
                          >
                            اضافه کردن نقشه
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BaseLayersModal;
