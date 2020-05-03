import React, { Component } from "react";

import "./TimelineControl.css";
import PlayButton from "./PlayButton/PlayButton";
import RangeDate from "./RangeDate/RangeDate";
import CurrentDate from "./CurrentDate/CurrentDate";
class TimelineControl extends Component {
  render() {
    return (
      <div id="timeline-control" className="timeline-container">
        <PlayButton />
        <RangeDate />
        <CurrentDate />
      </div>
    );
  }
}

export default TimelineControl;
