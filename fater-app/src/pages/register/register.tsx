import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React from "react";
import "./register.css";

import RegisterContainer from "../../components/register/register";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <a href="/Login" className="btn-back">
            <IonIcon icon={chevronBackOutline} /> Login
          </a>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RegisterContainer />
      </IonContent>
    </IonPage>
  );
};

export default Login;
