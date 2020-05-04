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
import TimelineSlider from "../components/client/Timeline/TimelineSlider/TimelineSlider";
import TimelineControl from "../components/client/Timeline/TimelineControl/TimelineControl";
import { useLocation } from "react-router";

const Home: React.FC = () => {
  const location = useLocation();

  console.log("location", location.search);

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

      <MapContainer location={location.search} />
      <UpperToolbar />
      <SideToolbar />
      <TimelineSlider />
      <TimelineControl />
    </IonPage>
  );
};

export default Home;
