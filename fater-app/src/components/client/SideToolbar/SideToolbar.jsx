import React, { Component } from "react";
import "./SideToolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faDrawPolygon,
  faTrashAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

class SideToolbar extends Component {
  render() {
    return (
      <>
        <div id="st-container">
          <FontAwesomeIcon icon={faRuler} className="st-icon" id="ruler" />

          <FontAwesomeIcon
            icon={faDrawPolygon}
            className="st-icon"
            id="polygon"
          />
          <FontAwesomeIcon icon={faTrashAlt} className="st-icon" id="Trash" />
          <FontAwesomeIcon icon={faCog} className="st-icon" id="Cog" />
        </div>
      </>
    );
  }
}

export default SideToolbar;
