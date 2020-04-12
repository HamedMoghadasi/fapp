import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import React from "react";
import "./Home.css";
import MapContainer from "../containers/map-container";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <a href="/login" className="btn-login">
            <IonIcon icon={personOutline} />
          </a>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
      <MapContainer />
    </IonPage>
  );
};

export default Home;
