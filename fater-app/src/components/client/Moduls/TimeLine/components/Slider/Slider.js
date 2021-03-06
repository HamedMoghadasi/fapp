import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
const persianDate = require("persian-date");

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 300 + theme.spacing(3) * 2,
    width: "72%",
    height: "100%",
    backgroundColor: "rgba(32, 32, 32, 0.85)",
    padding: "0 17px",
    borderRadius: 12,
    // marginTop: "70px",
  },
  wrapper: {
    position: "relative",
    height: "100%",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PersianMonth = (value) => {
  const month = persianDate.rangeName().months[value - 1];
  return month;
};
// Style Slider
let PrettoSlider = withStyles({
  root: {
    position: "relative",
    color: "transparent",
    borderRadius: 12,
    height: "100%",
    padding: 0,
    zIndex: 1,
  },
  thumb: {
    height: 27,
    width: 27,
    // width: 40,
    backgroundColor: "#0085f3",
    border: "1.5px solid white",
    marginTop: -14,
    marginLeft: -12.7,
    borderRadius: "50% 48% 50% 0",
    transform: "rotate(-45deg)",
    // marginLeft: -17.2,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
    "&:nth-child(1)": {
      background: "red",
    },
    "&:after": {
      content: "|||",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      fontSize: "17px",
      color: "white",
    },
  },
  active: {
    color: "blue",
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: "100%",
    borderRadius: 4,
    background: "transparent",
    // background: props.DateRange.length !== 0 ? "#37aeee2a" : "transparent",
  },
  rail: {
    height: "100%",
    opacity: 1,
  },
})(Slider);
let PrettoSlider2 = withStyles({
  root: {
    width: "100%",
    padding: 0,
    left: "0px",
    color: "transparent",
    borderRadius: 12,
    height: "100%",
    position: "absolute",
    top: "0",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#ffd400",
    border: "1.5px solid white",
    marginTop: -14,
    marginLeft: -9.2,
    borderRadius: "0% 0% 50% 50%",
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {
    color: "transparent",
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: "100%",
    borderRadius: 4,
    left: "17px !important",
    background: "transparent",
    // background: props.DateRange.length !== 0 ? "#37aeee2a" : "transparent",
  },
  rail: {
    height: "100%",
    opacity: 1,
  },
})(Slider);
const CustomizedSlider = (props) => {
  const TimeScale = props.timescale;
  const classes = useStyles();
  // Slider
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0);
  useEffect(() => {
    if (props.DateRange.length !== 0) {
      return;
    } else {
      if (TimeScale === 0) {
        setSliderValue(props.currentYear);
      } else if (TimeScale === 1) {
        setSliderValue(props.currentMonth);
      } else if (TimeScale === 2) {
        setSliderValue(props.currentDay);
      } else if (TimeScale === 3) {
        setSliderValue(props.currentHour);
      }
    }
  }, [
    TimeScale,
    props.currentYear,
    props.countMonths,
    props.currentDay,
    props.currentMonth,
    props.currentHour,
    props.DateRange,
  ]);
  // Date Range
  useEffect(() => {
    if (props.DateRange.length !== 0) {
      if (TimeScale === 0) {
        setSliderValue2([
          props.DateRange[0].from.year,
          props.DateRange[0].to.year,
        ]);
      } else if (TimeScale === 1) {
        setSliderValue2([
          props.DateRange[0].from.month,
          props.DateRange[0].to.month,
        ]);
      } else if (TimeScale === 2) {
        setSliderValue2([
          props.DateRange[0].from.day,
          props.DateRange[0].to.day,
        ]);
      } else if (TimeScale === 3) {
        setSliderValue2([
          props.DateRange[0].from.hour,
          props.DateRange[0].to.hour,
        ]);
      }
    }
  }, [TimeScale, props.DateRange, props.currentHour]);

  // Animation step by step
  useEffect(() => {
    if (props.isPlayingAnimation === true && props.playAnimation === true) {
      sliderAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isPlayingAnimation]);
  // Play Action Animation
  let demoValue = sliderValue2[0] ? sliderValue2[0] : 0;
  let firstValueSlider = sliderValue;
  const sliderAnimation = () => {
    setTimeout(() => {
      setSliderValue(demoValue);
      demoValue += 1;
      if (demoValue - 1 <= sliderValue2[1]) {
        props.isPlayingAnimationFunction(true);
        props.getSliderValue(demoValue - 1);
        sliderAnimation();
      } else {
        props.isPlayingAnimationFunction(false);
        setSliderValue(firstValueSlider);
        props.setIsPlayingAnimation(false);
      }
    }, 1000);
  };
  const changeSliderValue = (value) => {
    // if (props.DateRange.length !== 0) {
    //   setSliderValue(value[1]);
    //   props.getSliderValue(value[1]);
    //   return;
    // }
    if (TimeScale === 0) {
      setSliderValue(value);
    } else {
      setSliderValue(value);
    }
    props.getSliderValue(value);
  };
  const changeSliderValue2 = (value) => {
    setSliderValue2(value);
    props.getSliderValue2(value);
  };
  // Marks
  let marksYears = [];
  if (TimeScale === 0) {
    const persianYear = props.countYears - 10;
    for (let i = 1; i <= 10; i++) {
      if (i === 1 || i === 5 || i === 10) {
        marksYears.push({ value: persianYear + i, label: persianYear + i });
      } else {
        marksYears.push({ value: persianYear + i });
      }
    }
  }
  let marksMonths = [];
  if (TimeScale === 1) {
    const persianMonth = props.countMonths;
    for (let i = persianMonth; i <= 12 && i > 0; i--) {
      marksMonths.unshift({ value: i, label: PersianMonth(i) });
    }
  }
  let marksDays = [];
  if (TimeScale === 2) {
    const persianDay = props.countDays;
    for (let i = 1; i <= persianDay && i > 0; i++) {
      if (i === 1 || i % 5 === 0 || i === props.countDays) {
        marksDays.push({ value: i, label: i });
      } else {
        marksDays.push({ value: i });
      }
    }
  }
  let marksHours = [];
  if (TimeScale === 3) {
    for (let i = 1; i <= props.countHours && i > 0; i++) {
      marksHours.push({ value: i, label: i });
    }
  }

  // Tooltip
  function ValueLabelComponent(propsComponent) {
    const { children, open, value } = propsComponent;
    const dataIndex = Object.entries(children.props)[4][1];
    if (TimeScale === 0) {
      const valueString = value.toString();
      let month = "";
      switch (valueString.split(".")[1]) {
        case "5":
          month = "شهریور";
          break;
        default:
          month = "فروردین";
          break;
      }
      return (
        <Tooltip
          open={open}
          enterTouchDelay={0}
          placement="top"
          title={Math.floor(value) + "-" + month}
          // title={"01-" + month + "-" + Math.floor(value)}
        >
          {children}
        </Tooltip>
      );
    } else if (TimeScale === 1) {
      return (
        <Tooltip
          open={open}
          enterTouchDelay={0}
          placement="top"
          title={PersianMonth(value) + "-" + props.currentYear}
        >
          {children}
        </Tooltip>
      );
    } else if (TimeScale === 2) {
      let dateRange = 1;
      if (props.DateRange.length !== 0) {
        Object.values(props.DateRange[0])
          .reverse()
          .filter((date) =>
            date.day === value ? (dateRange = date.month) : null
          );
      }
      return (
        <Tooltip
          open={open}
          enterTouchDelay={0}
          placement="top"
          title={
            props.DateRange.length === 0 ? (
              <div style={{ direction: "rtl" }}>
                {value +
                  "-" +
                  PersianMonth(props.currentMonth) +
                  "-" +
                  props.currentYear}
              </div>
            ) : props.DateRange.length !== 0 ? (
              <div style={{ direction: "rtl" }}>
                {value +
                  "-" +
                  PersianMonth(dateRange) +
                  "-" +
                  props.currentYear}
              </div>
            ) : (
              ""
            )
          }
        >
          {children}
        </Tooltip>
      );
    } else if (TimeScale === 3) {
      return (
        <Tooltip
          open={open}
          enterTouchDelay={0}
          placement="top"
          title={
            props.DateRange.length === 0 ? (
              <div style={{ direction: "rtl" }}>
                {value +
                  ":" +
                  "00" +
                  " " +
                  props.currentDay +
                  "-" +
                  PersianMonth(props.currentMonth) +
                  "-" +
                  props.currentYear}
              </div>
            ) : props.DateRange.length !== 0 ? (
              <div style={{ direction: "rtl" }}>
                {dataIndex !== 1
                  ? value +
                    ":" +
                    "00" +
                    " " +
                    props.DateRange[0].from.day +
                    "-" +
                    PersianMonth(props.DateRange[0].from.month) +
                    "-" +
                    props.DateRange[0].from.year
                  : value +
                    ":" +
                    "00" +
                    " " +
                    props.DateRange[0].to.day +
                    "-" +
                    PersianMonth(props.DateRange[0].to.month) +
                    "-" +
                    props.DateRange[0].to.year}
              </div>
            ) : (
              ""
            )
          }
        >
          {children}
        </Tooltip>
      );
    }
  }
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <PrettoSlider
          // ThumbComponent={CustomeThumbComponent}
          ValueLabelComponent={ValueLabelComponent}
          valueLabelDisplay={props.DateRange.length !== 0 ? "on" : "auto"}
          // aria-label="custom thumb label slider"
          getAriaValueText={() => "custom thumb label slider"}
          min={
            TimeScale === 0
              ? marksYears[0].value
              : TimeScale === 1
              ? marksMonths[0].value
              : TimeScale === 2
              ? marksDays[0].value
              : TimeScale === 3
              ? marksHours[0].value
              : null
          }
          max={
            TimeScale === 0
              ? marksYears[marksYears.length - 1].value
              : TimeScale === 1
              ? marksMonths[marksMonths.length - 1].value
              : TimeScale === 2
              ? marksDays[marksDays.length - 1].value
              : TimeScale === 3
              ? marksHours[marksHours.length - 1].value
              : null
          }
          step={1}
          marks={
            TimeScale === 0
              ? marksYears.length !== 0
                ? marksYears
                : null
              : TimeScale === 1
              ? marksMonths.length !== 0
                ? marksMonths
                : null
              : TimeScale === 2
              ? marksDays.length !== 0
                ? marksDays
                : null
              : TimeScale === 3
              ? marksHours.length !== 0
                ? marksHours
                : null
              : null
          }
          value={sliderValue}
          defaultValue={10}
          onChange={(e, value) => changeSliderValue(value)}
        />
        <PrettoSlider2
          // classes={{
          //   track:
          //     props.DateRange.length !== 0 && TimeScale !== 3
          //       ? "track-yellow"
          //       : "",
          // }}
          ValueLabelComponent={ValueLabelComponent}
          valueLabelDisplay={props.DateRange.length !== 0 ? "on" : "auto"}
          getAriaValueText={() => "custom thumb label slider"}
          min={
            TimeScale === 0
              ? marksYears[0].value
              : TimeScale === 1
              ? marksMonths[0].value
              : TimeScale === 2
              ? marksDays[0].value
              : TimeScale === 3
              ? marksHours[0].value
              : null
          }
          max={
            TimeScale === 0
              ? marksYears[marksYears.length - 1].value
              : TimeScale === 1
              ? marksMonths[marksMonths.length - 1].value
              : TimeScale === 2
              ? marksDays[marksDays.length - 1].value
              : TimeScale === 3
              ? marksHours[marksHours.length - 1].value
              : null
          }
          step={1}
          marks={
            TimeScale === 0
              ? marksYears.length !== 0
                ? marksYears
                : null
              : TimeScale === 1
              ? marksMonths.length !== 0
                ? marksMonths
                : null
              : TimeScale === 2
              ? marksDays.length !== 0
                ? marksDays
                : null
              : TimeScale === 3
              ? marksHours.length !== 0
                ? marksHours
                : null
              : null
          }
          value={props.DateRange.length !== 0 ? sliderValue2 : sliderValue}
          onChange={(e, value) => changeSliderValue2(value)}
        />
      </div>
    </div>
  );
};

export default CustomizedSlider;
