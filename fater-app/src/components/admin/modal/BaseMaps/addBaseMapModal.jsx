import React, { Component } from "react";
import $ from "jquery";
import { toast } from "react-toastify";
import jmoment from "jalali-moment";

let API_URL = process.env.REACT_APP_API_URL;

class AddBaseMapModal extends Component {
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

    var _url = document.getElementById("addModal-url").value;
    var _name = document.getElementById("addModal-name").value;
    var _maxZoom = document.getElementById("addModal-maxZoom").value;
    var _description = document.getElementById("addModal-description").value;
    var _baseMapImage = $("#addModal-baseMapImage")[0].files[0];

    var formData = new FormData();
    formData.append("url", _url);
    formData.append("name", _name);
    formData.append("maxZoom", _maxZoom);
    formData.append("description", _description);
    formData.append("baseMapImage", _baseMapImage);

    const notif = this.notify;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/baseMapServer`,
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
              url: data.url,
              name: data.name,
              maxZoom: data.maxZoom,
              description: data.description,
              imageName: data.imageName,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            })
            .draw(true);

          $("#addModal").modal("hide");
          document.getElementById("addModal-url").value = "";
          document.getElementById("addModal-name").value = "";
          document.getElementById("addModal-description").value = "";
          document.getElementById("addModal-baseMapImage").value = "";
          document.getElementById("addModal-maxZoom").value = "";
          notif("Succeful! Base Map Added", "success");
        },
        error: function (err) {
          $("#addModal").modal("hide");
          document.getElementById("addModal-url").value = "";
          document.getElementById("addModal-name").value = "";
          document.getElementById("addModal-description").value = "";
          document.getElementById("addModal-baseMapImage").value = "";
          document.getElementById("addModal-maxZoom").value = "";
          notif("Failed! Base Map did not Added", "error");
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
                    <label htmlFor="addModal-url">Url</label>
                    <input
                      type="text"
                      id="addModal-url"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="addModal-name">Name</label>
                    <input
                      type="text"
                      id="addModal-name"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="addModal-description">Description</label>
                    <input
                      type="text"
                      id="addModal-description"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="addModal-maxZoom">Max Zoom</label>
                    <input
                      type="number"
                      id="addModal-maxZoom"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="addModal-baseMapImage">Map Image</label>
                    <br />
                    <input
                      type="file"
                      accept="image/*"
                      name="baseMapImage"
                      id="addModal-baseMapImage"
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

export default AddBaseMapModal;
