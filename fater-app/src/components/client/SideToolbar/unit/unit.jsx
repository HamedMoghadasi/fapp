import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { units } from "../../../../constants/units";

import "./unit.css";

class Unit extends Component {
  convertUnits = () => {
    $(".shapeUnit").each(function (i, object) {
      var mapUnit = $("#mapContainer").data("unit");
      var newValue = $(object).data(`${mapUnit}`);
      $(object).html(newValue);
    });
  };

  prepareSelectedUnit = () => {
    this.convertUnits();
    let currentUnit = $("#mapContainer").data("unit");
    $(".unit-item").removeClass("selected");
    if (currentUnit === units.KM) {
      $("#km").addClass("selected");
    } else if (currentUnit === units.MILE) {
      $("#mile").addClass("selected");
    }
  };

  handleUnit = (event) => {
    const dom = event.target;
    const value = $(dom).data("value");

    $("#mapContainer").data("unit", value);
    this.prepareSelectedUnit();
  };

  componentDidMount = () => {
    this.prepareSelectedUnit();
  };
  render() {
    return (
      <>
        <FontAwesomeIcon
          icon={faCog}
          className="st-icon"
          id="Cog"
          title="Unit Manager"
          data-toggle="collapse"
          data-target="#unitChanger-container"
        />

        <div id="unitChanger-container" className="collapse">
          <div
            id="km"
            className="unit-item"
            data-value={units.KM}
            onClick={(e) => this.handleUnit(e)}
          >
            KM
          </div>
          <div
            id="mile"
            className="unit-item"
            data-value={units.MILE}
            onClick={(e) => this.handleUnit(e)}
          >
            Mile
          </div>
        </div>
      </>
    );
  }
}

export default Unit;
