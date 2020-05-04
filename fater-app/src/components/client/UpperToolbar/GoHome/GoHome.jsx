import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { projections } from "../../../../constants/projections";
import * as OlProj from "ol/proj";

import $ from "jquery";

class GoHome extends Component {
  handleHomeClick = () => {
    let map = $("#mapContainer").data("map");

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
        <FontAwesomeIcon
          icon={faHome}
          className="ut-icon"
          id="home"
          onClick={this.handleHomeClick}
        />
      </>
    );
  }
}

export default GoHome;
