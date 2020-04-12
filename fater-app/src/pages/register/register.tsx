import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import React from "react";
import "./register.css";

import RegisterContainer from "../../components/register/register";

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
        <RegisterContainer />
      </IonContent>
    </IonPage>
  );
};

export default Login;
