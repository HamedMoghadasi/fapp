import { IonContent, IonPage } from "@ionic/react";
import React from "react";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";

const PendingUsers: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <AdminTemplateContainer isSidebarOpen="true" menu="users">
          <h1>Pending Users</h1>
        </AdminTemplateContainer>
      </IonContent>
    </IonPage>
  );
};

export default PendingUsers;
