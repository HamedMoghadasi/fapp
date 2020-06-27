import React, { useRef } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const persianDate = require("persian-date");

export default function DateCounter(props) {
  const newYear = new persianDate()
    .year(props.currentYear)
    .month(props.currentMonth)
    .date(props.currentDay);
  const newMonth = new persianDate()
    .year(props.currentYear)
    .month(props.currentMonth)
    .date(props.currentDay);
  const newDay = new persianDate()
    .year(props.currentYear)
    .month(props.currentMonth)
    .date(props.currentDay);

  const YearRef = useRef();
  const MonthRef = useRef();
  const DayRef = useRef();
  const yearInc = () => {
    if (props.currentYear < new persianDate().year()) {
      props.setcurrentYear(newYear.add("years", 1).year());
      props.setcurrentMonth(newMonth.add("years", 1).month());
      props.setcurrentDay(newDay.add("years", 1).date());
    }
  };
  const yearDec = () => {
    if (
      props.currentYear <= new persianDate().year() &&
      props.currentYear > props.minYear
    ) {
      props.setcurrentYear(newYear.subtract("years", 1).year());
      props.setcurrentMonth(newMonth.subtract("years", 1).month());
      props.setcurrentDay(newDay.subtract("years", 1).date());
    }
  };
  const monthInc = () => {
    if (
      props.currentYear === new persianDate().year() &&
      props.currentMonth === new persianDate().month()
    ) {
      return;
    } else {
      props.setcurrentYear(newYear.add("months", 1).year());
      props.setcurrentMonth(newMonth.add("months", 1).month());
      props.setcurrentDay(newDay.add("months", 1).date());
    }
  };
  const monthDec = () => {
    if (props.currentYear >= props.minYear && props.currentMonth > 1) {
      props.setcurrentYear(newYear.subtract("months", 1).year());
      props.setcurrentMonth(newMonth.subtract("months", 1).month());
      props.setcurrentDay(newDay.subtract("months", 1).date());
    }
  };
  const dayInc = () => {
    if (
      props.currentYear === new persianDate().year() &&
      props.currentMonth === new persianDate().month() &&
      props.currentDay === new persianDate().date()
    ) {
      return;
    } else {
      props.setcurrentYear(newYear.add("days", 1).year());
      props.setcurrentMonth(newMonth.add("days", 1).month());
      props.setcurrentDay(newDay.add("days", 1).date());
    }
  };
  const dayDec = () => {
    if (props.currentYear >= props.minYear && props.currentMonth >= 1) {
      props.setcurrentYear(newYear.subtract("days", 1).year());
      props.setcurrentMonth(newMonth.subtract("days", 1).month());
      props.setcurrentDay(newDay.subtract("days", 1).date());
    }
  };
  const changeYear = (e) => {
    if (e.currentTarget.value === new persianDate().year()) {
      return;
    } else if (
      e.currentTarget.value >= props.minYear &&
      e.currentTarget.value <= new persianDate().year() &&
      Number(e.currentTarget.value) <= new persianDate().year()
    ) {
      props.setcurrentYear(Number(e.currentTarget.value));
    } else {
      props.setcurrentYear(props.currentYear);
      if (e.currentTarget.value.length >= 4) {
        e.currentTarget.value = props.currentYear;
      }
    }
  };
  const changeMonth = (e) => {
    if (
      props.currentYear === new persianDate().year() &&
      e.currentTarget.value === new persianDate().month()
    ) {
      return;
    } else if (e.currentTarget.value > 0 && e.currentTarget.value <= 12) {
      props.setcurrentMonth(Number(e.currentTarget.value));
    } else {
      props.setcurrentMonth(props.currentMonth);
      if (e.currentTarget.value.length >= 1) {
        e.currentTarget.value = props.currentMonth;
      }
    }
  };
  const changeDay = (e) => {
    if (
      props.currentYear === new persianDate().year() &&
      props.currentMonth === new persianDate().month() &&
      e.currentTarget.value === new persianDate().date()
    ) {
      return;
    } else if (
      e.currentTarget.value > 0 &&
      e.currentTarget.value <=
        props.daysOfMonth(props.currentYear, props.currentMonth)
    ) {
      props.setcurrentDay(Number(e.currentTarget.value));
    } else {
      props.setcurrentDay(props.currentDay);
      if (e.currentTarget.value.length >= 1) {
        e.currentTarget.value = props.currentDay;
      }
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
          onKeyUp={changeYear}
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
          onKeyUp={changeMonth}
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
          onKeyUp={changeDay}
          maxLength={2}
        />
        <div className="down" onClick={dayDec}>
          <ExpandMoreIcon />
        </div>
      </div>
    </>
  );
}
