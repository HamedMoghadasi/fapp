import React, { Component } from "react";
import $ from "jquery";
import { toast } from "react-toastify";

let API_URL = process.env.REACT_APP_API_URL;

class EditBaseMapModal extends Component {
  constructor(props) {
    super(props);
    this.state = { imageSrc: "" };
  }

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
  getFileExtension = (file) => {
    const filename = file.name;
    let last_dot = filename.lastIndexOf(".");
    return filename.slice(last_dot + 1).toLowerCase();
  };

  isGeoJson = (extension) => {
    return extension === "geojson";
  };

  handleSubmit = () => {
    const dt = $("#tableo").DataTable();
    var data = dt.rows({ selected: true }).data()[0];
    var index = dt.rows({ selected: true }).indexes();
    var row = $(dt.row(index).node());

    var _name = document.getElementById("editModal-name").value;
    var _description = document.getElementById("editModal-description").value;
    var _geoJsonFile = $("#editModal-customVectorFile")[0].files[0];

    console.log("file :>> ", _geoJsonFile);

    var formData = new FormData();
    formData.append("name", _name);
    formData.append("description", _description);
    if (_geoJsonFile) {
      formData.append("customVectorFile", _geoJsonFile);
    }

    const notif = this.notify;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/customVectorFile/${data.id}`,
        type: "PUT",
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
          data.name = response.data.name;
          data.description = response.data.description;
          if (response.data.fileName) {
            data.fileName = response.data.fileName;
          }

          dt.row(row).invalidate().draw();
          $("#editModal").modal("hide");
          document.getElementById("editModal-customVectorFile").value = "";
          notif("Succeful! Base Map Update", "success");
        },
        error: function (err) {
          $("#editModal").modal("hide");
          document.getElementById("editModal-customVectorFile").value = "";
          notif("Failed! Base Map did not Update", "error");
        },
      });
    }
  };

  componentDidMount = () => {
    $("#editModal").on("show.bs.modal", function () {
      var data = $("#tableo").DataTable().rows({ selected: true }).data()[0];

      document.getElementById("editModal-name").value = data.name;
      document.getElementById("editModal-description").value = data.description;
    });
  };
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
                    <label htmlFor="editModal-name">name</label>
                    <input
                      type="text"
                      id="editModal-name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editModal-description">description </label>
                    <input
                      type="text"
                      id="editModal-description"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editModal-customVectorFile">
                      GeoJSOn File
                    </label>
                    <br />
                    <input
                      type="file"
                      name="customVectorFile"
                      id="editModal-customVectorFile"
                      onChange={this.handleChange}
                    />
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

export default EditBaseMapModal;
