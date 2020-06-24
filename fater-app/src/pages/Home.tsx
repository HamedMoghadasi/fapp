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
import TimeLine from "../components/client/Moduls/TimeLine/TimeLine";
// import TimelineSlider from "../components/client/Timeline/TimelineSlider/TimelineSlider";
// import TimelineControl from "../components/client/Timeline/TimelineControl/TimelineControl";
import { ToastContainer } from "react-toastify";

import { useLocation } from "react-router";
import MousePosition from "../components/client/MousePosition/MousePosition";

import { Protect } from "../utils/Auth";
import { Redirect } from "react-router-dom";

export interface IHomeProps {
  needAuthentication: boolean;
  neededRole: string;
}

const Home: React.FC<IHomeProps> = (props) => {
  const location = useLocation();
  var userState = Protect(props);
  if (userState.isValid) {
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

        <ToastContainer />
        <MapContainer location={location.search} />
        <UpperToolbar />
        <SideToolbar />
        <MousePosition />
        <TimeLine
          onChange={(data: any) => console.log("timeline changed : >> ", data)}
        />
      </IonPage>
    );
  }
  return <Redirect to={userState.redirectPath} />;
};

export default Home;
