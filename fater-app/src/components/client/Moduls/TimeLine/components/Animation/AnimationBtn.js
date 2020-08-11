import React, { useState, useEffect } from "react";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import DatePicker from "react-modern-calendar-datepicker";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Tooltip from "@material-ui/core/Tooltip";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import MomentUtils from "@date-io/moment";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const persianDate = require("persian-date");

export default function AnimationBtn(props) {
  // Time
  props.lang === "eng"
    ? jMoment.locale("en")
    : jMoment.loadPersian({
        dialect: "persian-modern",
        usePersianDigits: true,
      });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClickAnimation = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };
  const handlePlayAnimation = () => {
    props.playAnimation();
  };
  const closeAnimation = () => {
    setOpen(false);
  };
  const [selectedDayRange1, setSelectedDayRange1] = useState(null);
  const [selectedDayRange2, setSelectedDayRange2] = useState(null);

  const selectDateRange = (value) => {
    setSelectedDayRange2(value);
    if (selectedDayRange1) {
      const newDayRange1 = selectedDayRange1;
      newDayRange1.hour = hour1;
      newDayRange1.minute = minute1;
      const newDayRange2 = value;
      newDayRange2.hour = hour2;
      newDayRange2.minute = minute2;
      props.setDateRange([{ from: newDayRange1, to: newDayRange2 }]);
    }
    if (props.timescale !== 3) {
      setOpen(false);
    }
  };
  // useEffect(() => {
  //   if (!open) {
  //     setSelectedDayRange({
  //       from: null,
  //       to: null,
  //     });
  //     props.setDateRange([]);
  //   }
  // }, [open]);

  // Time
  const [timePick1, settimePick1] = useState(
    props.lang === "eng" ? moment() : jMoment()
  );
  const [timePick2, settimePick2] = useState(
    props.lang === "eng" ? moment() : jMoment()
  );
  useEffect(() => {
    if (selectedDayRange1) {
      const newRange = selectedDayRange1;
      newRange.hour = hour1;
      newRange.minute = minute1;
      setSelectedDayRange1(newRange);
    }
    if (selectedDayRange2) {
      const newRange = selectedDayRange2;
      newRange.hour = hour2;
      newRange.minute = minute2;
      setSelectedDayRange2(newRange);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePick1, timePick2]);
  const hour1 =
    props.lang === "eng"
      ? Number(timePick1.format("HH:mm").split(":")[0])
      : parsePersianNum(timePick1.format("HH:mm").split(":")[0]);
  const minute1 =
    props.lang === "eng"
      ? Number(timePick1.format("h:mm").split(":")[1])
      : parsePersianNum(timePick1.format("h:mm").split(":")[1]);
  const hour2 =
    props.lang === "eng"
      ? Number(timePick2.format("HH:mm").split(":")[0])
      : parsePersianNum(timePick2.format("HH:mm").split(":")[0]);
  const minute2 =
    props.lang === "eng"
      ? Number(timePick2.format("h:mm").split(":")[1])
      : parsePersianNum(timePick2.format("h:mm").split(":")[1]);

  // Convert Persian Digit To Eng
  function parsePersianNum(str) {
    return Number(
      str
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
          return d.charCodeAt(0) - 1632; // Convert Arabic numbers
        })
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
          return d.charCodeAt(0) - 1776; // Convert Persian numbers
        })
    );
  }
  // Send Data
  useEffect(() => {
    if (selectedDayRange1 && selectedDayRange2) {
      const newDayRange1 = selectedDayRange1;
      newDayRange1.hour = hour1;
      newDayRange1.minute = minute1;
      const newDayRange2 = selectedDayRange2;
      newDayRange2.hour = hour2;
      newDayRange2.minute = minute2;
      props.setDateRange([{ from: newDayRange1, to: newDayRange2 }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDayRange1, selectedDayRange2, hour1, hour2]);

  return (
    <>
      <div
        className="icon-wrapper-animation"
        onClick={handleClickAnimation}
        style={props.disableAnimation === true ? { display: "none " } : {}}
      >
        <ArrowDropUpIcon className="icon-animation" />
        <Tooltip title="انتخاب بازه زمانی">
          <img
            src="timeline/assets/images/calendar.png"
            alt="بازه زمانی"
            className="image-animation"
          />
        </Tooltip>
      </div>
      <div
        className="timeline-btn-animation"
        onClick={handlePlayAnimation}
        style={props.disableAnimation === true ? { display: "none " } : {}}
      >
        <Tooltip title="نمایش بازه زمانی">
          <PlayArrowIcon
            className={
              props.propsPlayAnimation
                ? "btn-animation-icon"
                : "btn-animation-icon btn-animation-icon-disable"
            }
          />
        </Tooltip>
      </div>
      <Popper open={open} anchorEl={anchorEl} placement={"top"} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className="animationSelection-wrapper">
              <CloseIcon className="close-icon" onClick={closeAnimation} />
              <div className="date-pickers-wrapper">
                <span className="animation-text">از</span>
                <DatePicker
                  calendarClassName="animation-datePicker"
                  calendarSelectedDayClassName="animation-datePicker-selectDay"
                  colorPrimary="#fff"
                  value={selectedDayRange1}
                  onChange={setSelectedDayRange1}
                  shouldHighlightWeekends
                  locale={props.lang === "eng" ? "en" : "fa"}
                  placeholder="بازه زمانی انتخاب کنید"
                  maximumDate={{
                    year: new persianDate().year(),
                    month: new persianDate().month(),
                    day: new persianDate().date(),
                  }}
                  renderFooter={() =>
                    props.timescale === 3 ? (
                      <div className="time-picker">
                        <MuiPickersUtilsProvider
                          utils={
                            props.lang === "eng" ? MomentUtils : JalaliUtils
                          }
                          locale="fa"
                        >
                          <TimePicker
                            // clearable
                            variant="inline"
                            // oklabel="تأیید"
                            // cancellabel="لغو"
                            // clearlabel="پاک کردن"
                            labelFunc={(date) =>
                              date ? date.format("hh:mm A") : ""
                            }
                            // minutesStep={5}
                            value={timePick1}
                            onChange={settimePick1}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    ) : null
                  }
                />
                {props.timescale === 3 ? (
                  <span className="time-text">{timePick1.format("HH:mm")}</span>
                ) : null}
                <span className="animation-text">تا</span>
                <DatePicker
                  calendarClassName="animation-datePicker"
                  calendarSelectedDayClassName="animation-datePicker-selectDay"
                  colorPrimary="#fff"
                  value={selectedDayRange2}
                  onChange={selectDateRange}
                  shouldHighlightWeekends
                  locale={props.lang === "eng" ? "en" : "fa"}
                  placeholder="بازه زمانی انتخاب کنید"
                  maximumDate={{
                    year: new persianDate().year(),
                    month: new persianDate().month(),
                    day: new persianDate().date(),
                  }}
                  renderFooter={() =>
                    props.timescale === 3 ? (
                      <div className="time-picker">
                        <MuiPickersUtilsProvider
                          utils={
                            props.lang === "eng" ? MomentUtils : JalaliUtils
                          }
                          locale="fa"
                        >
                          <TimePicker
                            // clearable
                            variant="inline"
                            // oklabel="تأیید"
                            // cancellabel="لغو"
                            // clearlabel="پاک کردن"
                            labelFunc={(date) =>
                              date ? date.format("hh:mm A") : ""
                            }
                            // minutesStep={5}
                            value={timePick2}
                            onChange={settimePick2}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    ) : null
                  }
                />
                {props.timescale === 3 ? (
                  <span className="time-text time-text2">
                    {timePick2.format("HH:mm")}
                  </span>
                ) : null}
              </div>
              <Button
                variant="outlined"
                size="small"
                className="submitButton"
                onClick={() => {
                  props.setDateRange([]);
                  props.setAnimationRangeValue([]);
                  setSelectedDayRange1(null);
                  setSelectedDayRange2(null);
                  settimePick1(props.lang === "eng" ? moment() : jMoment());
                  settimePick2(props.lang === "eng" ? moment() : jMoment());
                }}
              >
                پاک کردن
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
