import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Protect } from "../../../utils/Auth";
import { Redirect } from "react-router-dom";
import $ from "jquery";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";
import Table from "../../../components/admin/table/table";
import userState from "../../../constants/userState";

let API_URL = process.env.REACT_APP_API_URL;

export interface IAllUsersProps {
  needAuthentication: boolean;
  neededRole: string;
}

const handleDelete = (dt: any) => {
  console.log(dt);
  dt.row(".selected").remove().draw();
};

const handleEdit = (dt: any) => {
  alert("edit");
};

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
      default:
        break;
    }
    return userStateDom;
  }
};
const operators = [
  { dom: "#deleteBtn", handler: handleDelete, event: "click" },
  { dom: "#editBtn", handler: handleEdit, event: "click" },
];

function getData() {
  let data: any = [];
  console.log(window.location.href);
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
      },
    });
  }

  return data;
}

function getColumns() {
  return [
    { title: "#", data: "id" },
    { title: "Email", data: "email" },
    { title: "username", data: "username" },
    { title: "confirmed", data: "isEmailConfirmed" },
    { title: "role", data: "role" },
    { title: "state", data: "state" },
    { title: "createdAt", data: "createdAt" },
    { title: "updatedAt", data: "updatedAt" },
  ];
}

function createdRow(row: any, data: any, dataIndex: any, cells: any) {
  cells[5].innerHTML = styleUserStateCell(data.state);
}

const configuration = {
  operators,
  data: getData(),
  columns: getColumns(),
  createdRow: createdRow,
};

const AllUsers: React.FC<IAllUsersProps> = (props) => {
  var userState = Protect(props);

  if (userState.isValid) {
    return (
      <IonPage>
        <IonContent>
          <AdminTemplateContainer isSidebarOpen="true" menu="users">
            <h1>All Users</h1>
            <Table configuration={configuration}>
              <button
                id="deleteBtn"
                className="btn btn-md btn-danger m-1 operatorBtn"
              >
                Delete
              </button>
              <button
                id="editBtn"
                className="btn btn-md btn-warning m-1 operatorBtn"
              >
                Edit
              </button>
            </Table>
          </AdminTemplateContainer>
        </IonContent>
      </IonPage>
    );
  }

  return <Redirect to={userState.redirectPath} />;
};

export default AllUsers;
