import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Protect } from "../../../utils/Auth";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import jmoment from "jalali-moment";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";
import Table from "../../../components/admin/table/table";
import userActivity from "../../../constants/userActivity";

let API_URL = process.env.REACT_APP_API_URL;

export interface IUsersActivityLogsProps {
  needAuthentication: boolean;
  neededRole: string;
}

const styleActionCell = (action: any) => {
  let actionDom = action;
  if (action) {
    switch (action) {
      case userActivity.Login:
        actionDom = `<span class="badge badge-success">${action}</span>`;
        break;
      case userActivity.Logout:
        actionDom = `<span class="badge badge-danger">${action}</span>`;
        break;
      default:
        break;
    }
    return actionDom;
  }
};

function getData() {
  let data: any = [];
  if (window.localStorage.access_token) {
    $.ajax({
      url: `${API_URL}/api/v1/admin/UserActivityLogs`,
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
    { title: "Action", data: "action" },
    { title: "User Id", data: "userId" },
    { title: "Created at", data: "createdAt" },
    { title: "Updated at", data: "updatedAt" },
  ];
}

function createdRow(row: any, data: any, dataIndex: any, cells: any) {
  cells[1].innerHTML = styleActionCell(data.action);
}

function rowCallback(
  row: any,
  data: any,
  displayNum: any,
  displayIndex: any,
  dataIndex: any
) {
  $("td:eq(1)", row)[0].innerHTML = styleActionCell(data.action);
}

const configuration = {
  operators: {},
  data: getData(),
  columns: getColumns(),
  createdRow: createdRow,
  rowCallback: rowCallback,
};

const UserActivityLogs: React.FC<IUsersActivityLogsProps> = (props) => {
  var userState = Protect(props);

  if (userState.isValid) {
    return (
      <IonPage>
        <IonContent>
          <AdminTemplateContainer isSidebarOpen="true" menu="logs">
            <h1 className="table-header">گزارش فعالیت کاربران</h1>
            <Table configuration={configuration}></Table>
          </AdminTemplateContainer>
        </IonContent>
      </IonPage>
    );
  }

  return <Redirect to={userState.redirectPath} />;
};

export default UserActivityLogs;
