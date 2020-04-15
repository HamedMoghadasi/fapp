import { IonContent, IonPage } from "@ionic/react";
import React from "react";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";

const SuspendedUsers: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <AdminTemplateContainer isSidebarOpen="true" menu="users">
          <h1>Suspend Users</h1>
        </AdminTemplateContainer>
      </IonContent>
    </IonPage>
  );
};

export default SuspendedUsers;
