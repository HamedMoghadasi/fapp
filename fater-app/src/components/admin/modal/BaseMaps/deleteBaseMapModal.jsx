import React, { Component } from "react";
import $ from "jquery";
import { toast } from "react-toastify";

let API_URL = process.env.REACT_APP_API_URL;

class DeleteBaseMapModal extends Component {
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

    const notif = this.notify;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/baseMapServer/${data.id}`,
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            `Beare ${window.localStorage.access_token.replace(/"/g, "")}`
          );
        },
        success: function (response) {
          dt.row(row).remove();
          dt.row(row).invalidate().draw();

          $("#deleteModal").modal("hide");
          notif("Succeful! Base Map Deleted", "success");
        },
        error: function (err) {
          $("#deleteModal").modal("hide");
          notif("Failed! Base Map did not Deleted", "error");
        },
      });
    }
  };
  render() {
    return (
      <>
        <div
          className="modal fade"
          id="deleteModal"
          role="dialog"
          aria-labelledby="deleteModalLabel"
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
                <p className="modal-message">
                  بعد از حذف امکان بازیابی دوباره وجود ندارد، آیا از تصمیم خود
                  مطمئن هستید ؟
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-danger"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DeleteBaseMapModal;
