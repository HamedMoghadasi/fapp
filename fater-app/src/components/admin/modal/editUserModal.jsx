import React, { Component } from "react";
import $ from "jquery";
import { RolesArray } from "../../../constants/Roles";
import { userStateArray } from "../../../constants/userState";
import { toast } from "react-toastify";

let API_URL = process.env.REACT_APP_API_URL;

class EditUserModal extends Component {
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
      $("#editModal").on("change", "select", function () {
        $("option[value=" + this.value + "]", this)
          .attr("selected", true)
          .siblings()
          .removeAttr("selected");
      });

      $("#editModal").on("show.bs.modal", function () {
        var data = $("#tableo").DataTable().rows({ selected: true }).data()[0];

        if (data.isEmailConfirmed) {
          $("#editModal-isActive").prop("checked", true);
        } else {
          $("#editModal-isActive").prop("checked", false);
        }
        $("option").removeAttr("selected");
        $(`select option[value=${data.role}]`).attr("selected", "selected");
        $(`select option[value=${data.state}]`).attr("selected", "selected");
      });
    });
  }

  handleSubmit = () => {
    const dt = $("#tableo").DataTable();
    var data = dt.rows({ selected: true }).data()[0];
    var index = dt.rows({ selected: true }).indexes();
    var row = $(dt.row(index).node());

    var statesDropDown = document.getElementById("editModal-states");
    var rolesDropDown = document.getElementById("editModal-roles");

    const body = {
      isEmailConfirmed: $("#editModal-isActive").prop("checked"),
      state: statesDropDown.options[statesDropDown.selectedIndex].value,
      role: rolesDropDown.options[rolesDropDown.selectedIndex].value,
    };

    console.log(body);
    const notif = this.notify;
    if (window.localStorage.access_token) {
      $.ajax({
        url: `${API_URL}/api/v1/admin/users/${data.id}`,
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
          data.isEmailConfirmed = body.isEmailConfirmed;
          data.role = body.role;
          data.state = body.state;

          dt.row(row).invalidate().draw();
          $("#editModal").modal("hide");
          notif("Succeful! User Update", "success");
        },
        error: function (err) {
          $("#editModal").modal("hide");
          notif("Failed! User did not Update", "error");
        },
      });
    }
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
                <h5 className="modal-title" id="editModalLabel">
                  Edit User
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
                <form>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="editModal-isActive"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editModal-isActive"
                    >
                      Confirmed User
                    </label>
                  </div>
                  <hr />
                  <div className="form-group">
                    <label htmlFor="editModal-roles">Role</label>
                    <select className="form-control" id="editModal-roles">
                      {RolesArray.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="editModal-states">State</label>
                    <select className="form-control" id="editModal-states">
                      {userStateArray.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-warning"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditUserModal;
