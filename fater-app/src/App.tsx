import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";
import AdminTemplate from "./pages/admin/template/adminTemplate";

import { map, person } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "bootstrap/dist/css/bootstrap.css";
import "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.js";

const App: React.FC = () => {
  const accountUrl = true ? "/Login" : "/dashboard";

  if (window.innerWidth >= 800) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route
              path="/forgetPassword"
              component={ForgetPassword}
              exact={true}
            />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/dashboard" component={AdminTemplate} exact={true} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route
              path="/forgetPassword"
              component={ForgetPassword}
              exact={true}
            />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/dashboard" component={AdminTemplate} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Home" href="/home">
              <IonIcon icon={map} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>

            <IonTabButton href={accountUrl}>
              <IonIcon icon={person} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
