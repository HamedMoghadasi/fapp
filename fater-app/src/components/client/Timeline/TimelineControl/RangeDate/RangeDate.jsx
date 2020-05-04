import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
// import { DatePicker } from "jalali-react-datepicker";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";

import $ from "jquery";

import "./RangeDate.css";

class RangeDate extends Component {
  constructor(props) {
    super(props);
    this.state = { from: moment(), to: moment(), isGeorgian: false };
  }

  render() {
    return (
      <>
        <span
          id="timeline-control-RangeDate"
          data-toggle="collapse"
          data-target="#dateRange-container"
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
        </span>

        <div id="dateRange-container" className="collapse">
          <DatePicker
            id="From"
            onChange={(value) => this.setState({ from: value })}
            isGregorian={this.state.isGeorgian}
            timePicker={false}
            placeholder="From"
            value={this.state.from}
          />
          <DatePicker
            onChange={(value) => this.setState({ to: value })}
            timePicker={false}
            isGregorian={this.state.isGeorgian}
            value={this.state.to}
          />
        </div>
      </>
    );
  }
}

export default RangeDate;
