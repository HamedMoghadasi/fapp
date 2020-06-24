import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 300 + theme.spacing(3) * 2,
    width: "73%",
    height: "100%",
    // marginTop: "70px",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function CustomeThumbComponent(props) {
  return (
    <span {...props}>
      <svg className="dragger-container" width="1128" height="83">
        <g
          className="timeline-dragger draggerA react-draggable"
          transform="translate(0,38) scale(0.7)"
          style={{
            touchAction: "none",
            cursor: "pointer",
            display: "block",
          }}
        >
          <path
            fill="#ccc"
            stroke="#333"
            stroke-width="1px"
            d="M5.706 47.781 C2.77 47.781.39 45.402.39 42.467 v-16.592 l11.391-12.255 11.391-12.255 11.391 12.255 11.391 12.255 v16.592 c0 2.935-2.38 5.314-5.316 5.314 h-34.932z"
          ></path>
          <rect
            pointer-events="none"
            fill="#515151"
            width="3"
            height="20"
            x="15"
            y="18"
          ></rect>
          <rect
            pointer-events="none"
            fill="#515151"
            width="3"
            height="20"
            x="21"
            y="18"
          ></rect>
          <rect
            pointer-events="none"
            fill="#515151"
            width="3"
            height="20"
            x="27"
            y="18"
          ></rect>
        </g>
      </svg>
    </span>
  );
}
const PersianMonth = (value) => {
  let month = "";
  switch (value) {
    case 1:
      month = "فروردین";
      break;
    case 2:
      month = "اردیبهشت";
      break;
    case 3:
      month = "خرداد";
      break;
    case 4:
      month = "تیر";
      break;
    case 5:
      month = "مرداد";
      break;
    case 6:
      month = "شهریور";
      break;
    case 7:
      month = "مهر";
      break;
    case 8:
      month = "آبان";
      break;
    case 9:
      month = "آذر";
      break;
    case 10:
      month = "دی";
      break;
    case 11:
      month = "بهمن";
      break;
    case 12:
      month = "اسفند";
      break;
    default:
      month = "فروردین";
      break;
  }
  return month;
};
// Style Slider
let PrettoSlider = withStyles({
  root: {
    color: "rgba(40,40,40,0.85)",
    height: "100%",
    padding: 0,
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
    borderRadius: 4,
    opacity: 1,
  },
})(Slider);
export default function CustomizedSlider(props) {
  const TimeScale = props.timescale;
  const classes = useStyles();

  // Slider
  const [sliderValue, setSliderValue] = useState(0);
  useEffect(() => {
    if (TimeScale === 0) {
      setSliderValue(props.currentYear);
    } else if (TimeScale === 1) {
      setSliderValue(props.currentMonth);
    } else if (TimeScale === 2) {
      setSliderValue(props.currentDay);
    } else if (TimeScale === 3) {
      setSliderValue(props.currentHour);
    }
  }, [
    TimeScale,
    props.currentYear,
    props.countMonths,
    props.currentDay,
    props.currentMonth,
    props.currentHour,
  ]);
  // Date Range
  useEffect(() => {
    if (props.DateRange.length !== 0) {
      if (TimeScale === 0) {
        setSliderValue([
          props.DateRange[0].from.year,
          props.DateRange[0].to.year,
        ]);
      } else if (TimeScale === 1) {
        setSliderValue([
          props.DateRange[0].from.month,
          props.DateRange[0].to.month,
        ]);
      } else if (TimeScale === 2) {
        setSliderValue([
          props.DateRange[0].from.day,
          props.DateRange[0].to.day,
        ]);
      }
    }
  }, [TimeScale, props.DateRange]);
  const changeSliderValue = (value) => {
    if (props.DateRange.length !== 0) {
      setSliderValue(value[1]);
      props.getSliderValue(value[1]);
      return;
    }
    if (TimeScale === 0) {
      setSliderValue(value);
    } else {
      setSliderValue(value);
    }
    props.getSliderValue(value);
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
    for (let i = 1; i <= 24 && i > 0; i++) {
      marksHours.push({ value: i, label: i });
    }
  }

  // Tooltip
  function ValueLabelComponent(propsComponent) {
    const { children, open, value } = propsComponent;
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
      return (
        <Tooltip
          open={open}
          enterTouchDelay={0}
          placement="top"
          title={props.currentYear + "-" + props.currentMonth + "-" + value}
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
            props.currentYear +
            "-" +
            props.currentMonth +
            "-" +
            props.currentDay +
            " " +
            value +
            ":" +
            "00"
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
      <PrettoSlider
        classes={{
          track: props.DateRange.length !== 0 ? "track-blue" : "",
        }}
        // ThumbComponent={CustomeThumbComponent}
        ValueLabelComponent={ValueLabelComponent}
        valueLabelDisplay="auto"
        aria-label="custom thumb label"
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
        step={TimeScale === 0 ? 0.5 : TimeScale === 1 ? 1 : 1}
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
        onChange={(e, value) => changeSliderValue(value)}
      />
    </div>
  );
}
