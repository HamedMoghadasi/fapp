import React, { Component } from "react";
import { projections } from "../../../constants/projections";
import * as OlProj from "ol/proj";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPhotoVideo,
  faShareAlt,
  faGlobeAfrica,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import OlView from "ol/View";

import $ from "jquery";

import "./UpperToolbar.css";

class UpperToolbar extends Component {
  handleHomeClick = () => {
    var map = $("#mapContainer").data("map");

    map.getView().animate({
      center: OlProj.transform(
        [53, 33],
        projections.EPSG4326,
        projections.EPSG3857
      ),
      zoom: 4,
      projection: projections.EPSG3857,
      duration: 1000,
    });
  };

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
          <FontAwesomeIcon
            icon={faHome}
            className="ut-icon"
            id="home"
            onClick={this.handleHomeClick}
          />
        </div>
      </>
    );
  }
}

export default UpperToolbar;
