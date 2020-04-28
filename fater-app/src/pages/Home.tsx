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
import ManagementArea from "../components/client/ManagementArea/ManagementArea";
import SideToolbar from "../components/client/SideToolbar/SideToolbar";
import UpperToolbar from "../components/client/UpperToolbar/UpperToolbar";

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
      <ManagementArea />

      <MapContainer />
      <UpperToolbar />
      <SideToolbar />
    </IonPage>
  );
};

export default Home;
