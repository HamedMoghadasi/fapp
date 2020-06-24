import React, { useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";

const persianDate = require("persian-date");

export default function AnimationBtn(props) {
  const [selectedDate, setSelectedDate] = useState({
    year: new persianDate().year(),
    month: new persianDate().month(),
    day: new persianDate().date(),
  });
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
      />
    </div>
  );
}
