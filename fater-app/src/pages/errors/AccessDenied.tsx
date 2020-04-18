import { IonContent, IonPage, IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";

const AccessDenied: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonIcon icon={closeCircle} style={{ color: "red" }} />
        <h1>403 :: Access Denied</h1>
      </IonContent>
    </IonPage>
  );
};

export default AccessDenied;
