import React, { useState, useEffect } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import MomentUtils from "@date-io/moment";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
let persianDate = require("persian-date");

export default function AnimationBtn(props) {
  // Time
  props.lang === "eng"
    ? jMoment.locale("en")
    : jMoment.loadPersian({
        dialect: "persian-modern",
        usePersianDigits: true,
      });
  // Lang
  if (props.lang === "eng") {
    persianDate.toCalendar("gregorian");
  } else {
    persianDate.toCalendar("persian");
  }
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
    props.setcurrentHour(hour);
  };

  // Time
  const [timePick1, settimePick1] = useState(moment());
  const hour = Number(timePick1.format("HH:mm").split(":")[0]);
  useEffect(() => {
    props.setcurrentYear(selectedDate.year);
    props.setcurrentMonth(selectedDate.month);
    props.setcurrentDay(selectedDate.day);
    props.setcurrentHour(hour);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, hour]);
  return (
    <div className="date-picker-mobile">
      <DatePicker
        calendarClassName="animation-datePicker"
        calendarSelectedDayClassName="animation-datePicker-selectDay"
        colorPrimary="#fff"
        value={selectedDate}
        onChange={(value) => setDate(value)}
        shouldHighlightWeekends
        locale={props.lang === "eng" ? "en" : "fa"}
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
        renderFooter={() => (
          <div className="time-picker">
            <MuiPickersUtilsProvider
              utils={props.lang === "eng" ? MomentUtils : JalaliUtils}
              locale="fa"
            >
              <TimePicker
                // clearable
                variant="inline"
                // oklabel="تأیید"
                // cancellabel="لغو"
                // clearlabel="پاک کردن"
                labelFunc={(date) => (date ? date.format("hh:mm A") : "")}
                // minutesStep={5}
                value={timePick1}
                onChange={settimePick1}
              />
            </MuiPickersUtilsProvider>
          </div>
        )}
      />
      <div className="change-date-mobile-wrapper">
        <PlayArrowIcon
          className="change-icon-mobile"
          style={{ transform: "rotate(180deg)" }}
          onClick={dayDec}
        />
        <PlayArrowIcon className="change-icon-mobile" onClick={dayInc} />
      </div>
    </div>
  );
}
