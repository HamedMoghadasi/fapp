import React, { Component } from "react";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";

let API_URL = process.env.REACT_APP_API_URL;

class DeleteUserModal extends Component {
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

    const notif = this.notify;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/admin/users/${data.id}`,
        type: "DELETE",
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
          dt.row(".selected").remove().draw();
          $("#deleteModal").modal("hide");
          notif("Succeful! User Deleted", "success");
        },
        error: function (err) {
          $("#deleteModal").modal("hide");
          notif("Failed! User did not Deleted", "error");
        },
      });
    }
  };

  render() {
    return (
      <>
        <ToastContainer />
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
                <h5 className="modal-title" id="deleteModalLabel">
                  Delete User
                </h5>
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
                <p>Are you sure you want delete this user ?!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="deleteModal-submit"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DeleteUserModal;
