import React, { Component } from "react";

import "./predefinedOverLayers.css";
import WaterArea from "./waterArea/waterArea";
import { applicationTypes } from "../../../../../constants/ApplicationType";
import AirState from "./airState/airState";
let ApplicationType = process.env.REACT_APP_APPLICATION_TYPE;

class PredefinedOverLayers extends Component {
  state = {};

  handleTypeOfOverLayer = () => {
    if (ApplicationType === applicationTypes.karaneh) {
      return <WaterArea refreshComponent={this.props.refreshComponent} />;
    } else if (ApplicationType === applicationTypes.afagh) {
      return <AirState refreshComponent={this.props.refreshComponent} />;
    }

    return false;
  };
  render() {
    return (
      <div
        className="tab-pane fade show active"
        id="defaultOverlayers"
        role="tabpanel"
        aria-labelledby="defaultOverlayers-tab"
      >
        {this.handleTypeOfOverLayer()}
      </div>
    );
  }
}

export default PredefinedOverLayers;
