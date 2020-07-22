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
  // Language Timeline
  if (props.lang === "eng") {
    persianDate.toCalendar("gregorian");
  } else {
    persianDate.toCalendar("persian");
  }
  const minYear = 1380;
  const maxYear = new persianDate().year();
  // Select Time
  const [timeScale, setTimeScale] = useState(2);
  const handleChange = (value) => {
    setTimeScale(value);
  };
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
      } else if (
        currentMonth >= new persianDate().month() &&
        currentDay >= new persianDate().date() &&
        currentHour > new Date().getHours()
      ) {
        setcurrentHour(new Date().getHours());
      }
    }
  }, [currentDay, currentHour, currentMonth, currentYear, maxYear]);
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
    setAnimationRangeValue([]);
  };
  // Animation
  const [DateRange, setDateRange] = useState([]);
  useEffect(() => {
    if (DateRange.length !== 0) {
      if (timeScale === 3) {
        setTimeScale(2);
      }
      const date = DateRange[0].from;
      if (date) {
        setcurrentDay(date.day);
        setcurrentMonth(date.month);
        setcurrentYear(date.year);
      }
    }
  }, [DateRange, timeScale]);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const playAnimation = () => {
    if (DateRange.length !== 0) {
      setIsPlayingAnimation(true);
      props.onChange(DateRange);
    }
  };
  // Make Date Range Value
  const [animationRangeValue, setAnimationRangeValue] = useState([]);
  useEffect(() => {
    const DateRangeVlaue = [];
    if (DateRange.length !== 0) {
      if (timeScale === 0) {
        for (let i = DateRange[0].from.year; i <= DateRange[0].to.year; i++) {
          DateRangeVlaue.push({
            day: DateRange[0].from.day,
            month: DateRange[0].from.month,
            year: i,
          });
        }
      } else if (timeScale === 1) {
        for (let i = DateRange[0].from.month; i <= DateRange[0].to.month; i++) {
          DateRangeVlaue.push({
            day: DateRange[0].from.day,
            month: i,
            year: DateRange[0].from.year,
          });
        }
      } else if (timeScale === 2) {
        for (let i = DateRange[0].from.day; i <= DateRange[0].to.day; i++) {
          DateRangeVlaue.push({
            day: i,
            month: DateRange[0].from.month,
            year: DateRange[0].from.year,
          });
        }
      }
      setAnimationRangeValue(DateRangeVlaue);
    }
  }, [DateRange, timeScale]);
  // Component
  useEffect(() => {
    if (timeScale !== 3) {
      setcurrentHour(new Date().getHours());
    }
    const date = {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
      hour: currentHour,
    };
    props.onChange(date);
    sessionStorage.setItem("date", JSON.stringify(date));
  }, [currentYear, currentMonth, currentDay, props, currentHour, timeScale]);
  useEffect(() => {
    if (animationRangeValue.length !== 0) {
      props.getAnimationRangeValues(animationRangeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DateRange, animationRangeValue]);
  useEffect(() => {
    let scaleText = "";
    if (timeScale === 0) {
      scaleText = "year";
    } else if (timeScale === 1) {
      scaleText = "month";
    } else if (timeScale === 2) {
      scaleText = "day";
    } else if (timeScale === 3) {
      scaleText = "hour";
    }
    props.timeScale(scaleText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeScale]);
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
            lang={props.lang}
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
          countHours={
            currentYear < maxYear ||
            currentMonth < new persianDate().month() ||
            currentDay < new persianDate().date()
              ? 24
              : new Date().getHours()
          }
          currentMonth={currentMonth}
          currentDay={currentDay}
          currentHour={currentHour}
          getSliderValue={getSliderValue}
          DateRange={DateRange}
          isPlayingAnimation={isPlayingAnimation}
          setIsPlayingAnimation={setIsPlayingAnimation}
          playAnimation={props.playAnimation}
        />
      </div>
      <div className="timeline-container-phone">
        <DatePickerMobile
          setcurrentYear={setcurrentYear}
          setcurrentMonth={setcurrentMonth}
          setcurrentDay={setcurrentDay}
          daysOfMonth={daysOfMonth}
          minYear={minYear}
          lang={props.lang}
        />
      </div>
    </div>
  );
}

export default TimeLine;
