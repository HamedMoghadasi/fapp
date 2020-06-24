import React, { useRef } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const persianDate = require("persian-date");

export default function DateCounter(props) {
  const YearRef = useRef();
  const MonthRef = useRef();
  const DayRef = useRef();
  const yearInc = () => {
    if (props.currentYear < new persianDate().year()) {
      props.setcurrentYear(props.currentYear + 1);
    }
  };
  const yearDec = () => {
    if (
      props.currentYear <= new persianDate().year() &&
      props.currentYear > props.minYear
    ) {
      props.setcurrentYear(props.currentYear - 1);
    }
  };
  const monthInc = () => {
    if (props.currentYear < props.maxYear && props.currentMonth < 12) {
      props.setcurrentMonth(props.currentMonth + 1);
    } else if (props.currentMonth < new persianDate().month()) {
      props.setcurrentMonth(props.currentMonth + 1);
    }
  };
  const monthDec = () => {
    if (props.currentYear < props.maxYear && props.currentMonth > 1) {
      props.setcurrentMonth(props.currentMonth - 1);
    } else if (
      props.currentMonth <= new persianDate().month() &&
      props.currentMonth > 1
    ) {
      props.setcurrentMonth(props.currentMonth - 1);
    }
  };
  const dayInc = () => {
    const maxDays = props.daysOfMonth(props.currentMonth);
    if (props.currentYear < props.maxYear && props.currentDay < maxDays) {
      props.setcurrentDay(props.currentDay + 1);
    } else if (
      props.currentMonth === new persianDate().month() &&
      props.currentDay < new persianDate().date() &&
      props.currentDay < maxDays
    ) {
      props.setcurrentDay(props.currentDay + 1);
    } else if (
      props.currentMonth !== new persianDate().month() &&
      props.currentDay < maxDays
    ) {
      props.setcurrentDay(props.currentDay + 1);
    }
  };
  const dayDec = () => {
    if (props.currentYear < props.maxYear && props.currentDay > 1) {
      props.setcurrentDay(props.currentDay - 1);
    } else if (
      props.currentMonth === new persianDate().month() &&
      props.currentDay <= new persianDate().date() &&
      props.currentDay > 1
    ) {
      props.setcurrentDay(props.currentDay - 1);
    } else if (
      props.currentMonth !== new persianDate().month() &&
      props.currentDay > 1
    ) {
      props.setcurrentDay(props.currentDay - 1);
    }
  };
  const changeYear = (e) => {
    if (
      e.currentTarget.value > props.minYear &&
      Number(e.currentTarget.value) <= new persianDate().year()
    ) {
      props.setcurrentYear(Number(e.currentTarget.value));
    } else {
      props.setcurrentYear(new persianDate().year());
    }
  };
  const changeMonth = (e) => {
    if (
      e.currentTarget.value > 0 &&
      Number(e.currentTarget.value) <= new persianDate().month()
    ) {
      props.setcurrentMonth(Number(e.currentTarget.value));
    } else {
      props.setcurrentMonth(new persianDate().month());
    }
  };
  const changeDay = (e) => {
    if (
      e.currentTarget.value > 0 &&
      Number(e.currentTarget.value) <= new persianDate().date()
    ) {
      props.setcurrentDay(Number(e.currentTarget.value));
    } else {
      props.setcurrentDay(new persianDate().date());
    }
  };
  return (
    <>
      {/* Year */}
      <div
        className="yearWrapper"
        style={props.disableCounter === true ? { display: "none " } : {}}
      >
        <div className="up" onClick={yearInc}>
          <ExpandLessIcon />
        </div>
        <input
          key={props.currentYear}
          type="number"
          name="year"
          id="year"
          className="year"
          ref={YearRef}
          defaultValue={props.currentYear}
          onChange={changeYear}
          maxLength={4}
        />
        <div className="down" onClick={yearDec}>
          <ExpandMoreIcon />
        </div>
      </div>
      {/* Month */}
      <div
        className="yearWrapper"
        style={props.disableCounter === true ? { display: "none " } : {}}
      >
        <div className="up" onClick={monthInc}>
          <ExpandLessIcon />
        </div>
        <input
          key={props.currentMonth}
          type="number"
          name="year"
          id="year"
          className="year"
          ref={MonthRef}
          defaultValue={props.currentMonth}
          onChange={changeMonth}
          maxLength={2}
        />
        <div className="down" onClick={monthDec}>
          <ExpandMoreIcon />
        </div>
      </div>
      {/* Day */}
      <div
        className="yearWrapper"
        style={props.disableCounter === true ? { display: "none " } : {}}
      >
        <div className="up" onClick={dayInc}>
          <ExpandLessIcon />
        </div>
        <input
          key={props.currentDay}
          type="number"
          name="year"
          id="year"
          className="year"
          ref={DayRef}
          defaultValue={props.currentDay}
          onChange={changeDay}
          maxLength={2}
        />
        <div className="down" onClick={dayDec}>
          <ExpandMoreIcon />
        </div>
      </div>
    </>
  );
}
