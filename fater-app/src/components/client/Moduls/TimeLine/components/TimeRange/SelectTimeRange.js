import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";

export default function SelectTimeRange(props) {
  return (
    <FormControl
      className="select-wrapper"
      style={props.disableTimeScale === true ? { display: "none" } : {}}
    >
      {/* <InputLabel
          shrink
          id="demo-simple-select-placeholder-label-label"
          className="select-label"
        >
          بازه زمانی
        </InputLabel> */}
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="select-time"
        value={props.timeScale}
        onChange={props.handleChange}
      >
        <MenuItem style={{ justifyContent: "center" }} value={3}>
          {/* ساعت */}
          <Tooltip title="ساعت">
            <img
              src="timeline/assets/images/hour.png"
              alt="ساعت"
              className="image-timeRange"
            />
          </Tooltip>
        </MenuItem>
        <MenuItem style={{ justifyContent: "center" }} value={2}>
          {/* روز */}
          <Tooltip title="روز">
            <img
              src="timeline/assets/images/day.png"
              alt="روز"
              className="image-timeRange"
            />
          </Tooltip>
        </MenuItem>
        <MenuItem style={{ justifyContent: "center" }} value={1}>
          {/* ماه */}
          <Tooltip title="ماه">
            <img
              src="timeline/assets/images/month.png"
              alt="ماه"
              className="image-timeRange"
            />
          </Tooltip>
        </MenuItem>
        <MenuItem style={{ justifyContent: "center" }} value={0}>
          {/* سال */}
          <Tooltip title="سال">
            <img
              src="timeline/assets/images/year.png"
              alt="سال"
              className="image-timeRange"
            />
          </Tooltip>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
