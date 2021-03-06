import React, { Component } from "react";
import $ from "jquery";
import { units } from "../../../../constants/units";

import unitIcon from "../../../../assets/Icons/unit.svg";
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
        <img
          className="st-icon"
          id="unit"
          title="Unit Manager"
          data-toggle="collapse"
          data-target="#unitChanger-container"
          src={unitIcon}
          alt="unit icon"
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
