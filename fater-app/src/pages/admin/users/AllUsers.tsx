import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Protect } from "../../../utils/Auth";
import { Redirect } from "react-router-dom";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";
import Table from "../../../components/admin/table/table";

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

const operators = [
  { dom: "#deleteBtn", handler: handleDelete, event: "click" },
  { dom: "#editBtn", handler: handleEdit, event: "click" },
];

function getData() {
  return [
    {
      id: 112,
      email: "fater-test2@developair.ir",
      username: "ali",
      isEmailConfirmed: false,
      role: "User",
      state: "Unconfirmed",
      createdAt: "2020-04-21",
      updatedAt: "2020-04-21",
      updatedAt2: "2020-04-21",
    },
    {
      id: 76,
      email: "h4lmed@gmail.com",
      username: "hamed",
      isEmailConfirmed: true,
      role: "Admin",
      state: "Active",
      createdAt: "2020-04-21",
      updatedAt: "2020-04-21",
      updatedAt2: "2020-04-21",
    },
    {
      id: 113,
      email: "fater-test@developair.ir",
      username: "reza",
      isEmailConfirmed: true,
      role: "User",
      state: "Active",
      createdAt: "2020-04-21",
      updatedAt: "2020-04-21",
      updatedAt2: "2020-04-21",
    },
  ];
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

const configuration = {
  operators,
  data: getData(),
  columns: getColumns(),
  createdRow: function () {
    console.log("cretedRow");
  },
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
