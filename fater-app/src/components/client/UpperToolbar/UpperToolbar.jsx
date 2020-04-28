import React, { Component } from "react";
import "./UpperToolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPhotoVideo,
  faShareAlt,
  faGlobeAfrica,
} from "@fortawesome/free-solid-svg-icons";

class UpperToolbar extends Component {
  render() {
    return (
      <>
        <div id="ut-container">
          <FontAwesomeIcon icon={faShareAlt} className="ut-icon" id="share" />

          <FontAwesomeIcon icon={faGlobeAfrica} className="ut-icon" id="glob" />
          <FontAwesomeIcon
            icon={faPhotoVideo}
            className="ut-icon"
            id="photoVideo"
          />
          <FontAwesomeIcon icon={faInfoCircle} className="ut-icon" id="info" />
        </div>
      </>
    );
  }
}

export default UpperToolbar;
