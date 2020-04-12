import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import React from "react";

import "./login.css";

import LoginContainer from "../../components/login/login";

const Login: React.FC = () => {
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
        <LoginContainer />
      </IonContent>
    </IonPage>
  );
};

export default Login;
