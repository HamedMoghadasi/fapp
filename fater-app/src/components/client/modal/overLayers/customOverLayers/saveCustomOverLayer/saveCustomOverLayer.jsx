import React, { Component } from "react";
import $ from "jquery";
import { toast } from "react-toastify";

import "./saveCustomOverLayer.css";

let API_URL = process.env.REACT_APP_API_URL;

class SaveCustomLayerModal extends Component {
  notify = (message, type) => {
    if (type === "error") {
      toast.error(`${message}`, {
        autoClose: 10000,
        fontSize: "20px",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === "success") {
      toast.success(`${message}`, {
        autoClose: 10000,
        fontSize: "20px",
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  handleClose = () => {
    $("#saveCustomLayerModal").modal("hide");
  };

  handleSubmit = () => {
    const self = this;
    var _name = document.getElementById("saveCustomLayerModal-name").value;
    var _description = document.getElementById(
      "saveCustomLayerModal-description"
    ).value;
    var _file = $("#saveCustomLayerModal").data("file");

    console.log("_file :>> ", _file);

    var formData = new FormData();
    formData.append("name", _name);
    formData.append("description", _description);
    if (_file) {
      formData.append("customVectorFile", _file.file);
    }

    if (window.localStorage.access_token) {
      const notif = this.notify;
      $.ajax({
        url: `${API_URL}/api/v1/customVectorFile`,
        type: "POST",
        async: false,
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            `Beare ${window.localStorage.access_token.replace(/"/g, "")}`
          );
        },
        success: function (response) {
          console.log("response :>> ", response);
          self.props.updateCustomOverLayersListState(_file.id);
          $("#saveCustomLayerModal").modal("hide");
          notif("Succefully saved!", "success");
        },
        error: function (err) {
          $("#saveCustomLayerModal").modal("hide");
          notif("Failed! Custom Vector Layer did not Added", "error");
        },
      });
    }
  };

  render() {
    return (
      <>
        <div
          className="modal fade"
          id="saveCustomLayerModal"
          role="dialog"
          aria-labelledby="saveCustomLayerModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <form autoComplete="off">
                  <div className="form-group">
                    <label htmlFor="saveCustomLayerModal-name">name</label>
                    <input
                      type="text"
                      id="saveCustomLayerModal-name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="saveCustomLayerModal-description">
                      description
                    </label>
                    <input
                      type="text"
                      id="saveCustomLayerModal-description"
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-success"
                >
                  ذخیره
                </button>
                <button
                  type="button"
                  onClick={this.handleClose}
                  className="btn btn-danger"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SaveCustomLayerModal;
