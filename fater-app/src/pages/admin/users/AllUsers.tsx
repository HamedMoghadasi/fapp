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
const AllUsers: React.FC<IAllUsersProps> = (props) => {
  var userState = Protect(props);

  if (userState.isValid) {
    return (
      <IonPage>
        <IonContent>
          <AdminTemplateContainer isSidebarOpen="true" menu="users">
            <h1>All Users</h1>
            <Table operators={operators}>
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
