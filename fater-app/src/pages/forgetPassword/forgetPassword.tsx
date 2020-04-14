import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import React from "react";

import "./forgetPassword.css";

import ForgetPasswordContainer from "../../components/forgetPassword/forgetPassword";

const ForgetPassword: React.FC = () => {
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
        <ForgetPasswordContainer />
      </IonContent>
    </IonPage>
  );
};

export default ForgetPassword;
