import { IonContent, IonPage } from "@ionic/react";

import React from "react";
import "./changePassword.css";
import { Protect } from "../../utils/Auth";
import { Redirect } from "react-router-dom";

import ChangePasswordContainer from "../../components/changePassword/changePassword";

export interface IChangePasswordProps {
  needAuthentication: boolean;
  neededRole: string;
}

const ChangePassword: React.FC<IChangePasswordProps> = (props) => {
  var userState = Protect(props);
  if (userState.isValid) {
    return (
      <IonPage>
        <IonContent>
          <ChangePasswordContainer />
        </IonContent>
      </IonPage>
    );
  }
  return <Redirect to={userState.redirectPath} />;
};

export default ChangePassword;
