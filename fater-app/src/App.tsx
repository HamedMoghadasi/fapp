/** React */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Roles } from "./constants/Roles";

/* ionic/react Components */
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Pages */
import Home from "./pages/Home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";
import ChangePassword from "./pages/changePassword/changePassword";
import Dashboard from "./pages/admin/template/adminTemplate";
import AllUsers from "./pages/admin/users/AllUsers";
import SuspendedUsers from "./pages/admin/users/SuspendedUser";
import PendingUsers from "./pages/admin/users/PendingUsers";
import AccessDenied from "./pages/errors/AccessDenied";
import NotFound from "./pages/errors/NotFound";
import UserActivityLogs from "./pages/admin/logs/userActivityLogs";

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
import Locations from "./pages/admin/locations/locations";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Route path="*">
          <NotFound />
        </Route>

        <Route
          path="/Error/AccessDenied"
          component={AccessDenied}
          exact={true}
        />

        <Route
          path="/home"
          component={() => {
            return <Home needAuthentication={true} neededRole={Roles.User} />;
          }}
          exact={true}
        />
        <Route
          exact
          path="/"
          component={() => {
            return <Home needAuthentication={true} neededRole={Roles.User} />;
          }}
        />

        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/forgetPassword" component={ForgetPassword} exact={true} />

        <Route
          path="/changePassword"
          component={() => {
            return (
              <ChangePassword
                needAuthentication={true}
                neededRole={Roles.User}
              />
            );
          }}
          exact={true}
        />
        <Route
          path="/dashboard"
          component={() => {
            return (
              <Dashboard needAuthentication={true} neededRole={Roles.Admin} />
            );
          }}
          exact={true}
        />
        <Route
          path="/dashboard/Users/All"
          component={() => {
            return (
              <AllUsers needAuthentication={true} neededRole={Roles.Admin} />
            );
          }}
          exact={true}
        />
        <Route
          path="/dashboard/Users/Suspended"
          component={() => {
            return (
              <SuspendedUsers
                needAuthentication={true}
                neededRole={Roles.Admin}
              />
            );
          }}
          exact={true}
        />
        <Route
          path="/dashboard/Users/Pending"
          component={() => {
            return (
              <PendingUsers
                needAuthentication={true}
                neededRole={Roles.Admin}
              />
            );
          }}
          exact={true}
        />
        <Route
          path="/dashboard/Logs/UsersActivity"
          component={() => {
            return (
              <UserActivityLogs
                needAuthentication={true}
                neededRole={Roles.Admin}
              />
            );
          }}
          exact={true}
        />

        <Route
          path="/dashboard/Locations"
          component={() => {
            return (
              <Locations needAuthentication={true} neededRole={Roles.Admin} />
            );
          }}
          exact={true}
        />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
