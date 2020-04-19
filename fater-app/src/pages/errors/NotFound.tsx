import { IonContent, IonPage, IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";

import "./errors.css";

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="error-container">
          <IonIcon icon={closeCircle} id="icon" />
          <h1 id="text">404 :: PAGE NOT FOUND</h1>
          <p>
            The page you are looking for might have been removed
            <br />
            had its name changed or it is temporarily unavailable
          </p>
          <a href="/" className="btn btn-primary" id="button">
            Back to Home
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
