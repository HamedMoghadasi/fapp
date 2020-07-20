import React, { Component } from "react";
import "./Loading.css";

class Loading extends Component {
  state = {};
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
}

export default Loading;
