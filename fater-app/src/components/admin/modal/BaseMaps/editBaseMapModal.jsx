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

  handleSubmit = () => {
    const dt = $("#tableo").DataTable();
    var data = dt.rows({ selected: true }).data()[0];
    var index = dt.rows({ selected: true }).indexes();
    var row = $(dt.row(index).node());

    var _url = document.getElementById("editModal-url").value;
    var _name = document.getElementById("editModal-name").value;
    var _maxZoom = document.getElementById("editModal-maxZoom").value;
    var _description = document.getElementById("editModal-description").value;
    var _baseMapImage = $("#editModal-baseMapImage")[0].files[0];

    console.log("file :>> ", _baseMapImage);

    var formData = new FormData();
    formData.append("url", _url);
    formData.append("name", _name);
    formData.append("maxZoom", _maxZoom);
    formData.append("description", _description);
    if (_baseMapImage) {
      console.log("111 :>> ", 111);
      formData.append("baseMapImage", _baseMapImage);
    }

    const notif = this.notify;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/baseMapServer/${data.id}`,
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
          console.log("response :>> ", response);
          console.log("data :>> ", data);
          data.url = response.data.url;
          data.name = response.data.name;
          data.maxZoom = response.data.maxZoom;
          data.description = response.data.description;
          if (response.data.imageName) {
            data.imageName = response.data.imageName;
          }

          dt.row(row).invalidate().draw();
          $("#editModal").modal("hide");
          document.getElementById("editModal-baseMapImage").value = "";
          notif("Succeful! Base Map Update", "success");
        },
        error: function (err) {
          $("#editModal").modal("hide");
          document.getElementById("editModal-baseMapImage").value = "";
          notif("Failed! Base Map did not Update", "error");
        },
      });
    }
  };

  componentDidMount = () => {
    var self = this;
    $("#editModal").on("show.bs.modal", function () {
      var data = $("#tableo").DataTable().rows({ selected: true }).data()[0];

      console.log(data);

      document.getElementById("editModal-url").value = data.url;
      document.getElementById("editModal-name").value = data.name;
      document.getElementById("editModal-maxZoom").value = data.maxZoom;
      document.getElementById("editModal-description").value = data.description;

      self.setState({ imageSrc: data.imageName });
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
                    <label htmlFor="editModal-url">url</label>
                    <input
                      type="text"
                      id="editModal-url"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editModal-name">name</label>
                    <input
                      type="text"
                      id="editModal-name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editModal-maxZoom">max zoom</label>
                    <input
                      type="number"
                      id="editModal-maxZoom"
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
                    <label htmlFor="editModal-baseMapImage">Map Image</label>
                    <br />
                    <input
                      type="file"
                      accept="image/*"
                      name="baseMapImage"
                      id="editModal-baseMapImage"
                    />
                    <img
                      src={this.state.imageSrc}
                      alt="base map"
                      id="editModal-baseMapImage-Image"
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
