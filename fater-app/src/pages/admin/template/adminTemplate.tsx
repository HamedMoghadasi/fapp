import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import React from "react";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";

const AdminTemplate: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <a href="/" className="btn-back">
            <IonIcon icon={homeOutline} />
          </a>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AdminTemplateContainer>
          <h1>Hamed Moghadasi</h1>
        </AdminTemplateContainer>
      </IonContent>
    </IonPage>
  );
};

export default AdminTemplate;
