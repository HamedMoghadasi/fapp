import React, { Component } from "react";
import $ from "jquery";
import { toast } from "react-toastify";
import jmoment from "jalali-moment";

let API_URL = process.env.REACT_APP_API_URL;

class AddLocationModal extends Component {
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

  handleSubmit = () => {
    const dt = $("#tableo").DataTable();

    var _Name = document.getElementById("addModal-name").value.toLowerCase();
    var _KeyWords = document
      .getElementById("addModal-keyWords")
      .value.toLowerCase();
    var _lat = document.getElementById("addModal-lat").value;
    var _lon = document.getElementById("addModal-lon").value;

    const body = {
      Name: _Name,
      KeyWords: _KeyWords,
      lat: _lat,
      lon: _lon,
    };

    const notif = this.notify;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/location`,
        type: "POST",
        async: false,
        data: JSON.stringify(body),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            `Beare ${window.localStorage.access_token.replace(/"/g, "")}`
          );
        },
        success: function (response) {
          const data = response.data;
          console.log(data);

          data.createdAt = `${jmoment(data.createdAt).format(
            "jYYYY/jMM/jDD"
          )} <span class="badge badge-warning" style="opacity:0.6;margin-left:5px">${jmoment(
            data.createdAt
          ).format("HH:mm")}</span>`;

          data.updatedAt = `${jmoment(data.updatedAt).format(
            "jYYYY/jMM/jDD"
          )} <span class="badge badge-warning" style="opacity:0.6;margin-left:5px">${jmoment(
            data.updatedAt
          ).format("HH:mm")}</span>`;

          dt.row
            .add({
              id: data.id,
              Name: data.Name,
              KeyWords: data.KeyWords,
              lat: data.lat,
              lon: data.lon,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            })
            .draw(true);

          $("#addModal").modal("hide");
          document.getElementById("addModal-name").value = "";
          document.getElementById("addModal-keyWords").value = "";
          document.getElementById("addModal-lat").value = "";
          document.getElementById("addModal-lon").value = "";
          notif("Succeful! Location Added", "success");
        },
        error: function (err) {
          $("#addModal").modal("hide");
          document.getElementById("addModal-name").value = "";
          document.getElementById("addModal-keyWords").value = "";
          document.getElementById("addModal-lat").value = "";
          document.getElementById("addModal-lon").value = "";
          notif("Failed! Location did not Added", "error");
        },
      });
    }
  };

  render() {
    return (
      <>
        <div
          className="modal fade"
          id="addModal"
          role="dialog"
          aria-labelledby="addModalLabel"
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
                <form autoComplete="off">
                  <div className="form-group">
                    <label htmlFor="addModal-name">Name</label>
                    <input
                      type="text"
                      id="addModal-name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="addModal-keyWords">Key words</label>
                    <input
                      type="text"
                      id="addModal-keyWords"
                      className="form-control"
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col col-6">
                      <label htmlFor="addModal-lat">latitudes </label>
                      <input
                        type="text"
                        id="addModal-lat"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col col-6">
                      <label htmlFor="addModal-lon">longitudes</label>
                      <input
                        type="text"
                        id="addModal-lon"
                        className="form-control"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-success"
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddLocationModal;
