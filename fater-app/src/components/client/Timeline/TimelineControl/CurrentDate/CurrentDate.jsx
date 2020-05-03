import React, { Component } from "react";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";

import "./CurrentDate.css";

class CurrentDate extends Component {
  state = { from: moment(), isGeorgian: false };
  render() {
    return (
      <>
        <div id="currentDate-container">
          <DatePicker
            onChange={(value) => this.setState({ from: value })}
            isGregorian={this.state.isGeorgian}
            timePicker={false}
            value={this.state.from}
          />
        </div>
      </>
    );
  }
}

export default CurrentDate;
