import { scale, format } from "../constants/timeline";
import jamoment from "moment-jalaali";
import moment from "moment";

export const calculateTimespan = (date, timeScale, _format) => {
  if (!date) {
    date = { year: "2020", month: "01", day: "01", hour: "10" };
  }
  date = adjustDateFormat(date, _format);

  let timespan = {
    start: new Date(),
    startTimespan: new Date().getTime(),
    end: new Date(),
    endTimespan: new Date().getTime(),
  };

  switch (timeScale) {
    case scale.year:
      timespan.start = moment(new Date(date.year, 0, 1))
        .startOf("years")
        .locale("en")
        .format("YYYY-MM-DD HH:mm");
      timespan.end = moment(new Date(date.year, 0, 1))
        .endOf("years")
        .locale("en")
        .format("YYYY-MM-DD HH:mm");
      break;
    case scale.month:
      timespan.start = moment(new Date(date.year, date.month, 1))
        .startOf("months")
        .locale("en")
        .format("YYYY-MM-DD HH:mm");
      timespan.end = moment(new Date(date.year, date.month, 1))
        .endOf("months")
        .locale("en")
        .format("YYYY-MM-DD HH:mm");
      break;
    case scale.day:
      timespan.start = moment(new Date(date.year, date.month, date.day))
        .startOf("days")
        .locale("en")
        .format("YYYY-MM-DD HH:mm");
      timespan.end = moment(new Date(date.year, date.month, date.day))
        .endOf("days")
        .locale("en")
        .format("YYYY-MM-DD HH:mm");
      break;

    case scale.hour:
      timespan.start = moment(
        new Date(date.year, date.month, date.day, date.hour)
      )
        .startOf("hours")
        .locale("en")
        .format("YYYY-MM-DD HH:mm");
      timespan.end = moment(
        new Date(date.year, date.month, date.day, date.hour)
      )
        .endOf("hours")
        .locale("en")
        .format("YYYY-MM-DD HH:mm");
      break;
    default:
      break;
  }

  timespan.startTimespan = new Date(timespan.start).getTime();
  timespan.endTimespan = new Date(timespan.end).getTime();

  return timespan;
};

const adjustDateFormat = (date, _format) => {
  if (_format === format.fa) {
    let utcDate = jamoment(
      `${date.year}/${date.month}/${date.day} ${date.hour}:00:00`,
      "jYYYY/jM/jD HH:mm:ss"
    ).format("YYYY-M-D HH:mm:ss");

    utcDate = moment(utcDate);
    date = {
      year: utcDate.year(),
      month: utcDate.month(),
      day: utcDate.date(),
      hour: utcDate.hour(),
    };
  }

  return date;
};
