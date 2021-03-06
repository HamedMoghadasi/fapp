import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Protect } from "../../../utils/Auth";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import jmoment from "jalali-moment";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";
import Table from "../../../components/admin/table/table";
import { userState } from "../../../constants/userState";
import EditUserModal from "../../../components/admin/modal/editUserModal";
import DeleteUserModal from "../../../components/admin/modal/deleteUserModal";
import ResetPasswordModal from "../../../components/admin/modal/resetPasswordModal";
import { ToastContainer } from "react-toastify";
import { HandleModalByKey } from "../../../utils/Helper";

import "./AllUsers.css";

let API_URL = process.env.REACT_APP_API_URL;

export interface IAllUsersProps {
  needAuthentication: boolean;
  neededRole: string[];
}

const styleUserStateCell = (state: any) => {
  let userStateDom = state;
  if (state) {
    switch (state) {
      case userState.Active:
        userStateDom = `<span class="badge badge-success">${state}</span>`;
        break;
      case userState.Unconfirmed:
        userStateDom = `<span class="badge badge-default">${state}</span>`;
        break;
      case userState.Suspend:
        userStateDom = `<span class="badge badge-warning">${state}</span>`;
        break;
      case userState.Deleted:
        userStateDom = `<span class="badge badge-danger">${state}</span>`;
        break;
      default:
        break;
    }
    return userStateDom;
  }
};
// const operators = [
//   // { dom: "#resetPasswordBtn", handler: handleResetPassword, event: "click" },
// ];

function getData() {
  let data: any = [];
  if (window.localStorage.access_token) {
    $.ajax({
      url: `${API_URL}/api/v1/admin/users`,
      type: "GET",
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
        data = response.data;
        data.map((item: any) => {
          item.createdAt = `${jmoment(item.createdAt).format(
            "jYYYY/jMM/jDD"
          )} <span class="badge badge-warning" style="opacity:0.6;margin-left:5px">${jmoment(
            item.createdAt
          ).format("HH:mm")}</span>`;

          item.updatedAt = `${jmoment(item.updatedAt).format(
            "jYYYY/jMM/jDD"
          )} <span class="badge badge-warning" style="opacity:0.6;margin-left:5px">${jmoment(
            item.updatedAt
          ).format("HH:mm")}</span>`;
        });
      },
    });
  }

  return data;
}

function getColumns() {
  return [
    { title: "Id", data: "id" },
    { title: "Email", data: "email" },
    { title: "username", data: "username" },
    { title: "confirmed", data: "isEmailConfirmed" },
    { title: "role", data: "role" },
    { title: "state", data: "state" },
    { title: "Created at", data: "createdAt" },
    { title: "Updated at", data: "updatedAt" },
  ];
}

function createdRow(row: any, data: any, dataIndex: any, cells: any) {
  cells[5].innerHTML = styleUserStateCell(data.state);
}

function rowCallback(
  row: any,
  data: any,
  displayNum: any,
  displayIndex: any,
  dataIndex: any
) {
  $("td:eq(5)", row)[0].innerHTML = styleUserStateCell(data.state);
}

const configuration = {
  operators: [],
  data: getData(),
  columns: getColumns(),
  createdRow: createdRow,
  rowCallback: rowCallback,
};

const AllUsers: React.FC<IAllUsersProps> = (props) => {
  var userState = Protect(props);
  HandleModalByKey();
  if (userState.isValid) {
    return (
      <IonPage>
        <IonContent>
          <ToastContainer />
          <EditUserModal />
          <DeleteUserModal />
          <ResetPasswordModal />
          <AdminTemplateContainer
            isSidebarOpen="false"
            menu="users"
            pageTitle="مدیریت کاربران"
          >
            <br />
            <Table configuration={configuration}>
              <div className="row allusers-operator-container">
                <button
                  id="editBtn"
                  className="btn btn-md btn-warning m-1 operatorBtn float-right"
                  data-toggle="modal"
                  data-target="#editModal"
                >
                  ویرایش
                </button>

                <button
                  id="deleteBtn"
                  className="btn btn-md btn-danger m-1 operatorBtn float-right"
                  data-toggle="modal"
                  data-target="#deleteModal"
                >
                  حذف
                </button>

                <button
                  id="resetPasswordBtn"
                  className="btn btn-md btn-primary m-1 operatorBtn "
                  data-toggle="modal"
                  data-target="#resetPasswordModal"
                >
                  بازیابی رمز
                </button>
              </div>
              <hr />
            </Table>
          </AdminTemplateContainer>
        </IonContent>
      </IonPage>
    );
  }

  return <Redirect to={userState.redirectPath} />;
};

export default AllUsers;
