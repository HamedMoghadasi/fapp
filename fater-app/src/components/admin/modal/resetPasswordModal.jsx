import React, { Component } from "react";
import $ from "jquery";
import { toast } from "react-toastify";

let API_URL = process.env.REACT_APP_API_URL;

class ResetPasswordModal extends Component {
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

  componentDidMount() {
    $(document).ready(function () {
      //   $("#resetPasswordModal-input").on("keyup", function () {
      //     let isMatch = $(this).val() === "RESET";
      //     if (isMatch) {
      //       $(this)
      //         .css("border", "3px solid rgba(40, 167, 69, 0.5)")
      //         .css("color", "green");
      //       $("#submitBtn").removeClass("btn-danger").addClass("btn-success");
      //     } else {
      //       $(this).css("border", "3px solid #ef6f7b").css("color", "#dc3545");
      //       $("#submitBtn").addClass("btn-danger").removeClass("btn-success");
      //     }
      //   });
    });
  }

  handleSubmit = () => {
    $("#submitBtn").attr("disabled", "disabled");

    const dt = $("#tableo").DataTable();
    var data = dt.rows({ selected: true }).data()[0];

    const body = {
      userId: data.id,
    };

    const notif = this.notify;
    // if ($("#resetPasswordModal-input").val() !== "RESET") {
    //   notif("Failed! write 'RESET' at input", "error");
    // } else {

    // }
    const access_Token = window.localStorage.access_token;
    if (access_Token) {
      $.ajax({
        url: `${API_URL}/api/v1/admin/users/resetPaswordByAdmin`,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(body),
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            `Beare ${access_Token.replace(/"/g, "")}`
          );
        },
        success: function (response) {
          $("#resetPasswordModal").modal("hide");
          notif(
            "Succeful! Password Reset. an email sended for user",
            "success"
          );
        },
        error: function (err) {
          console.log(err);
          $("#resetPasswordModal").modal("hide");
          notif("Failed! User did not Deleted", "error");
        },
      });
    }
  };

  render() {
    return (
      <>
        <div
          className="modal fade"
          id="resetPasswordModal"
          role="dialog"
          aria-labelledby="resetPasswordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="resetPasswordModalLabel">
                  Reset User Password
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
                <p>Are you sure you want Reset this user password ?!</p>
                {/* <input
                  placeholder="RESET"
                  id="resetPasswordModal-input"
                  className="form-control"
                  style={{ color: "#dc3545", border: "3px solid #ef6f7b" }}
                /> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  id="submitBtn"
                  className="btn btn-primary"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ResetPasswordModal;
