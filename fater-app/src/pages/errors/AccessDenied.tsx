import { IonContent, IonPage, IonIcon } from "@ionic/react";
import { handLeftOutline } from "ionicons/icons";
import React from "react";

import "./errors.css";

const AccessDenied: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="error-container">
          <IonIcon icon={handLeftOutline} id="icon" />
          <h1 id="text">403 :: Forbidden</h1>
          <p>You do not have permission to access this page.</p>
          <a href="/" className="btn btn-primary" id="button">
            Back to Home
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AccessDenied;
