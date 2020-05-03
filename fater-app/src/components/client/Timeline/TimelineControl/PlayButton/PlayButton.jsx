import React, { Component } from "react";

import "./PlayButton.css";
import { IonIcon } from "@ionic/react";
import { caretForwardOutline } from "ionicons/icons";

class PlayButton extends Component {
  render() {
    return (
      <button id="timeline-control-playButton">
        <IonIcon icon={caretForwardOutline} />
      </button>
    );
  }
}

export default PlayButton;
