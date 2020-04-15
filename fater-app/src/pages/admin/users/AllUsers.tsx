import { IonContent, IonPage } from "@ionic/react";
import React from "react";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";

const AllUsers: React.FC = (props) => {
  return (
    <IonPage>
      <IonContent>
        <AdminTemplateContainer isSidebarOpen="true" menu="users">
          <h1>All Users</h1>
        </AdminTemplateContainer>
      </IonContent>
    </IonPage>
  );
};

export default AllUsers;
