import React, { useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const persianDate = require("persian-date");

export default function AnimationBtn(props) {
  const [selectedDate, setSelectedDate] = useState({
    year: new persianDate().year(),
    month: new persianDate().month(),
    day: new persianDate().date(),
  });
  const dayInc = () => {
    if (
      selectedDate &&
      selectedDate.year === new persianDate().year() &&
      selectedDate.month === new persianDate().month() &&
      selectedDate.day === new persianDate().date()
    ) {
      return;
    } else {
      const newYear = new persianDate()
        .year(selectedDate.year)
        .month(selectedDate.month)
        .date(selectedDate.day)
        .add("days", 1)
        .year();
      const newMonth = new persianDate()
        .year(selectedDate.year)
        .month(selectedDate.month)
        .date(selectedDate.day)
        .add("days", 1)
        .month();
      const newDay = new persianDate()
        .year(selectedDate.year)
        .month(selectedDate.month)
        .date(selectedDate.day)
        .add("days", 1)
        .date();
      setSelectedDate({
        year: newYear,
        month: newMonth,
        day: newDay,
      });
    }
  };
  const dayDec = () => {
    if (selectedDate && selectedDate.year >= props.minYear) {
      const newYear = new persianDate()
        .year(selectedDate.year)
        .month(selectedDate.month)
        .date(selectedDate.day)
        .subtract("days", 1)
        .year();
      const newMonth = new persianDate()
        .year(selectedDate.year)
        .month(selectedDate.month)
        .date(selectedDate.day)
        .subtract("days", 1)
        .month();
      const newDay = new persianDate()
        .year(selectedDate.year)
        .month(selectedDate.month)
        .date(selectedDate.day)
        .subtract("days", 1)
        .date();
      setSelectedDate({
        year: newYear,
        month: newMonth,
        day: newDay,
      });
    } else {
      return;
    }
  };
  const setDate = (value) => {
    setSelectedDate(value);
    props.setcurrentYear(value.year);
    props.setcurrentMonth(value.month);
    props.setcurrentDay(value.day);
  };
  return (
    <div className="date-picker-mobile">
      <DatePicker
        value={selectedDate}
        onChange={(value) => setDate(value)}
        shouldHighlightWeekends
        locale="fa"
        placeholder="تاریخ را انتخاب کنید"
        maximumDate={{
          year: new persianDate().year(),
          month: new persianDate().month(),
          day: new persianDate().date(),
        }}
        minimumDate={{
          year: props.minYear,
          month: 1,
          day: 1,
        }}
      />
      <div className="change-date-mobile-wrapper">
        <ChevronLeftIcon className="change-icon-mobile" onClick={dayInc} />
        <ChevronRightIcon className="change-icon-mobile" onClick={dayDec} />
      </div>
    </div>
  );
}
