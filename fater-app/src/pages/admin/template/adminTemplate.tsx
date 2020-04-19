import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import React from "react";
import { Protect } from "../../../utils/Auth";
import { Redirect } from "react-router-dom";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";

export interface IAdminTemplateProps {
  needAuthentication: boolean;
  neededRole: string;
}

const AdminTemplate: React.FC<IAdminTemplateProps> = (props) => {
  var userState = Protect(props);

  if (userState.isValid) {
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
            <h1>Dashboard</h1>
          </AdminTemplateContainer>
        </IonContent>
      </IonPage>
    );
  }
  return <Redirect to={userState.redirectPath} />;
};

export default AdminTemplate;
