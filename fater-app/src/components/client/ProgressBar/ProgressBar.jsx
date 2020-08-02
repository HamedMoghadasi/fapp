import React, { Component } from "react";
import $ from "jquery";
import { moveProgressBarForward } from "../../../utils/ProgressBarHelper";

import "./ProgressBar.css";

class ProgressBar extends Component {
  state = {};

  componentDidMount = () => {};

  handleClick = () => {
    moveProgressBarForward(15);
  };

  render() {
    return (
      <div className="progressBar-container" onClick={this.handleClick}>
        <div className="progress">
          <div
            id="progressBar"
            className="progress-bar bg-danger"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
