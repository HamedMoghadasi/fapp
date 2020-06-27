import React, { useState, useEffect } from "react";
import "./TimeLine.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Slider from "./components/Slider/Slider";
import SelectTimeRange from "./components/TimeRange/SelectTimeRange";
import AnimationBtn from "./components/Animation/AnimationBtn";
import DateCounter from "./components/DateCounter/DateCounter";
import DatePickerMobile from "./components/DatePickerMobile/DatePickerMobile";

const persianDate = require("persian-date");
const daysOfMonth = (year, month) => {
  const days = new persianDate([year, month]).daysInMonth();
  return days;
};
function TimeLine(props) {
  const minYear = 1380;
  const maxYear = new persianDate().year();
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
  }, [currentDay, currentMonth, currentYear, maxYear]);
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
      const date = DateRange[0].from;
      setcurrentDay(date.day);
      setcurrentMonth(date.month);
      setcurrentYear(date.year);
    }
  }, [DateRange]);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const playAnimation = () => {
    if (DateRange.length !== 0) {
      setIsPlayingAnimation(true);
      props.onChange(DateRange);
    }
  };
  // Select Time
  const [timeScale, setTimeScale] = useState(2);
  const handleChange = (value) => {
    setTimeScale(value);
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
    <div className="timeline-app">
      <div className="timeline-container">
        <div className="timeline-counterWrapper">
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
            playAnimation={playAnimation}
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
              ? daysOfMonth(currentYear, currentMonth)
              : new persianDate().date()
          }
          currentMonth={currentMonth}
          currentDay={currentDay}
          currentHour={currentHour}
          getSliderValue={getSliderValue}
          DateRange={DateRange}
          isPlayingAnimation={isPlayingAnimation}
          setIsPlayingAnimation={setIsPlayingAnimation}
        />
      </div>
      <div className="timeline-container-phone">
        <DatePickerMobile
          setcurrentYear={setcurrentYear}
          setcurrentMonth={setcurrentMonth}
          setcurrentDay={setcurrentDay}
          daysOfMonth={daysOfMonth}
          minYear={minYear}
        />
      </div>
    </div>
  );
}

export default TimeLine;
