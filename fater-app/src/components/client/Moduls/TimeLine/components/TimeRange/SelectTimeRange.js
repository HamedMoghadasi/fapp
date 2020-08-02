import React from "react";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export default function SelectTimeRange(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectItem = (value, open) => {
    props.handleChange(value);
    setAnchorEl(null);
  };
  return (
    <FormControl
      className="timeline-select-wrapper"
      style={props.disableTimeScale === true ? { display: "none" } : {}}
    >
      <ArrowDropUpIcon className="icon-timeline-select" />
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: 0, margin: 0, minWidth: "100%" }}
      >
        {props.timeScale === 2 ? (
          <Tooltip title="روز">
            <img
              src="timeline/assets/images/day.png"
              alt="روز"
              className="image-timeRange"
            />
          </Tooltip>
        ) : props.timeScale === 3 ? (
          <Tooltip title="ساعت">
            <img
              src="timeline/assets/images/hour.png"
              alt="ساعت"
              className="image-timeRange"
            />
          </Tooltip>
        ) : props.timeScale === 1 ? (
          <Tooltip title="ماه">
            <img
              src="timeline/assets/images/month.png"
              alt="ماه"
              className="image-timeRange"
            />
          </Tooltip>
        ) : props.timeScale === 0 ? (
          <Tooltip title="سال">
            <img
              src="timeline/assets/images/year.png"
              alt="سال"
              className="image-timeRange"
            />
          </Tooltip>
        ) : (
          ""
        )}
      </Button>

      <Menu
        labelid="demo-simple-select-placeholder-label-label"
        id="select-time"
        value={props.timeScale}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ marginTop: -62 }}
      >
        <MenuItem
          style={{ justifyContent: "center" }}
          value={3}
          onClick={() => selectItem(3, false)}
        >
          {/* ساعت */}
          <Tooltip title="ساعت">
            <img
              src="timeline/assets/images/hour.png"
              alt="ساعت"
              className="image-timeRange"
            />
          </Tooltip>
        </MenuItem>
        <MenuItem
          style={{ justifyContent: "center" }}
          value={2}
          onClick={() => selectItem(2, false)}
        >
          {/* روز */}
          <Tooltip title="روز">
            <img
              src="timeline/ssets/images/day.png"
              alt="روز"
              className="image-timeRange"
            />
          </Tooltip>
        </MenuItem>
        <MenuItem
          style={{ justifyContent: "center" }}
          value={1}
          onClick={() => selectItem(1, false)}
        >
          {/* ماه */}
          <Tooltip title="ماه">
            <img
              src="timeline/assets/images/month.png"
              alt="ماه"
              className="image-timeRange"
            />
          </Tooltip>
        </MenuItem>
        <MenuItem
          style={{ justifyContent: "center" }}
          value={0}
          onClick={() => selectItem(0, false)}
        >
          {/* سال */}
          <Tooltip title="سال">
            <img
              src="timeline/assets/images/year.png"
              alt="سال"
              className="image-timeRange"
            />
          </Tooltip>
        </MenuItem>
      </Menu>
    </FormControl>
  );
}
