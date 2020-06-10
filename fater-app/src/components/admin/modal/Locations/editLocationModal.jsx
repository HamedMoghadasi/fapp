import React, { Component } from "react";
import $ from "jquery";
import { toast } from "react-toastify";

let API_URL = process.env.REACT_APP_API_URL;

class EditLocationModal extends Component {
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
    var data = dt.rows({ selected: true }).data()[0];
    var index = dt.rows({ selected: true }).indexes();
    var row = $(dt.row(index).node());

    var _Name = document.getElementById("editModal-name").value.toLowerCase();
    var _KeyWords = document
      .getElementById("editModal-keyWords")
      .value.toLowerCase();
    var _lat = document.getElementById("editModal-lat").value;
    var _lon = document.getElementById("editModal-lon").value;

    const body = {
      Name: _Name,
      KeyWords: _KeyWords,
      lat: _lat,
      lon: _lon,
    };

    const notif = this.notify;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/location/${data.id}`,
        type: "PUT",
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
          data.Name = body.Name;
          data.KeyWords = body.KeyWords;
          data.lat = body.lat;
          data.lon = body.lon;

          dt.row(row).invalidate().draw();
          $("#editModal").modal("hide");
          notif("Succeful! Location Update", "success");
        },
        error: function (err) {
          $("#editModal").modal("hide");
          notif("Failed! Location did not Update", "error");
        },
      });
    }
  };

  componentDidMount() {
    $("#editModal").on("show.bs.modal", function () {
      var data = $("#tableo").DataTable().rows({ selected: true }).data()[0];

      console.log(data);

      document.getElementById("editModal-name").value = data.Name;
      document.getElementById("editModal-keyWords").value = data.KeyWords;
      document.getElementById("editModal-lat").value = data.lat;
      document.getElementById("editModal-lon").value = data.lon;
    });
  }
  render() {
    return (
      <>
        <div
          className="modal fade"
          id="editModal"
          role="dialog"
          aria-labelledby="editModalLabel"
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
                    <label htmlFor="editModal-name">Name</label>
                    <input
                      type="text"
                      id="editModal-name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editModal-keyWords">Key words</label>
                    <input
                      type="text"
                      id="editModal-keyWords"
                      className="form-control"
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col col-6">
                      <label htmlFor="editModal-lat">latitudes</label>
                      <input
                        type="number"
                        id="editModal-lat"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col col-6">
                      <label htmlFor="editModal-lon">longitudes</label>
                      <input
                        type="number"
                        id="editModal-lon"
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
                  className="btn btn-warning"
                >
                  ثبت تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditLocationModal;
