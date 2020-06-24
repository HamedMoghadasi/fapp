import React, { useState, useEffect } from "react";
import "./TimeLine.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Slider from "./components/Slider/Slider";
import SelectTimeRange from "./components/TimeRange/SelectTimeRange";
import AnimationBtn from "./components/Animation/AnimationBtn";
import DateCounter from "./components/DateCounter/DateCounter";
import DatePickerMobile from "./components/DatePickerMobile/DatePickerMobile";

const persianDate = require("persian-date");
const daysOfMonth = (value) => {
  let days = 31;
  switch (value) {
    case 7:
      days = 30;
      break;
    case 8:
      days = 30;
      break;
    case 9:
      days = 30;
      break;
    case 10:
      days = 30;
      break;
    case 11:
      days = 30;
      break;
    case 12:
      days = 29;
      break;
    default:
      break;
  }
  return days;
};
function TimeLine(props) {
  const minYear = 1380;
  const maxYear = 1399;
  // Counter
  const [currentYear, setcurrentYear] = useState(new persianDate().year());
  const [currentMonth, setcurrentMonth] = useState(new persianDate().month());
  const [currentDay, setcurrentDay] = useState(new persianDate().date());
  const [currentHour, setcurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    if (maxYear === currentYear) {
      if (currentMonth > new persianDate().month()) {
        setcurrentMonth(new persianDate().month());
      } else if (
        currentMonth >= new persianDate().month() &&
        currentDay > new persianDate().date()
      ) {
        setcurrentDay(new persianDate().date());
      }
    }
  }, [currentDay, currentMonth, currentYear]);
  // Get value from slider
  const getSliderValue = (value) => {
    if (timeScale === 0) {
      setcurrentYear(Math.floor(value));
    } else if (timeScale === 1) {
      setcurrentMonth(value);
    } else if (timeScale === 2) {
      setcurrentDay(value);
    } else if (timeScale === 3) {
      setcurrentHour(value);
    }
    setDateRange([]);
  };
  // Animation
  const [DateRange, setDateRange] = useState([]);
  useEffect(() => {
    if (DateRange.length !== 0) {
      setTimeScale(2);
    }
  }, [DateRange]);
  // Select Time
  const [timeScale, setTimeScale] = useState(2);
  const handleChange = (event) => {
    setTimeScale(event.target.value);
  };
  // Component
  useEffect(() => {
    props.onChange({
      year: currentYear,
      month: currentMonth,
      day: currentDay,
      hour: currentHour,
    });
  }, [currentYear, currentMonth, currentDay, props, currentHour]);
  return (
    <div className="App">
      <div className="container">
        <div className="counterWrapper">
          {/* Date Counter */}
          <DateCounter
            daysOfMonth={daysOfMonth}
            minYear={minYear}
            maxYear={maxYear}
            currentYear={currentYear}
            currentMonth={currentMonth}
            currentDay={currentDay}
            setcurrentYear={setcurrentYear}
            setcurrentMonth={setcurrentMonth}
            setcurrentDay={setcurrentDay}
            disableCounter={props.disableCounter}
          />
          {/* Animation  */}
          <AnimationBtn
            setDateRange={setDateRange}
            disableAnimation={props.disableAnimation}
          />
          {/* Select Time */}
          <SelectTimeRange
            timeScale={timeScale}
            handleChange={handleChange}
            disableTimeScale={props.disableTimeScale}
          />
        </div>
        {/* Slider */}
        <Slider
          timescale={timeScale}
          currentYear={currentYear}
          countYears={maxYear}
          countMonths={currentYear < maxYear ? 12 : new persianDate().month()}
          countDays={
            currentYear < maxYear || currentMonth < new persianDate().month()
              ? daysOfMonth(currentMonth)
              : new persianDate().date()
          }
          currentMonth={currentMonth}
          currentDay={currentDay}
          currentHour={currentHour}
          getSliderValue={getSliderValue}
          DateRange={DateRange}
        />
      </div>
      <div className="container-phone">
        <DatePickerMobile
          setcurrentYear={setcurrentYear}
          setcurrentMonth={setcurrentMonth}
          setcurrentDay={setcurrentDay}
        />
      </div>
    </div>
  );
}

export default TimeLine;
