import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Roles } from "../../../constants/Roles";
import { Protect } from "../../../utils/AuthHelper";
import { Redirect } from "react-router-dom";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";

export interface IAllUsersProps {
  needAuthentication: boolean;
  neededRole: Roles;
}

const AllUsers: React.FC<IAllUsersProps> = (props) => {
  var userState = Protect(props);
  if (userState.isValid) {
    return (
      <IonPage>
        <IonContent>
          <AdminTemplateContainer isSidebarOpen="true" menu="users">
            <h1>All Users</h1>
          </AdminTemplateContainer>
        </IonContent>
      </IonPage>
    );
  }
  return <Redirect to={userState.redirectPath} />;
};

export default AllUsers;
