import React, { Component } from "react";
import TimeLine from "./TimeLine";

class TimeLineWrapper extends Component {
  state = {};
  render() {
    return (
      <TimeLine
        onChange={(data) => console.log("timeline changed : >> ", data)}
      />
    );
  }
}

export default TimeLineWrapper;
