import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import MapContainer from "../containers/map-container";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <a href="/login">Sign in</a>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
      <MapContainer />
    </IonPage>
  );
};

export default Home;
