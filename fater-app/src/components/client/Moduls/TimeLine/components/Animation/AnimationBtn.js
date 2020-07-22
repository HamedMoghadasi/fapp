import React, { useState } from "react";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import DatePicker from "react-modern-calendar-datepicker";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Tooltip from "@material-ui/core/Tooltip";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const persianDate = require("persian-date");

export default function AnimationBtn(props) {
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
    props.setDateRange([{ from: selectedDayRange1, to: value }]);
    setOpen(false);
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
          <PlayArrowIcon className="btn-animation-icon" />
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
                />
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
                />
              </div>
              {/* <Button
                variant="outlined"
                size="small"
                className="submitButton"
                onClick={selectDateRange}
              >
                تایید
              </Button> */}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
