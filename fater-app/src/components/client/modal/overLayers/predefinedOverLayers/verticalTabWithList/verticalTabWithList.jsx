import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SelectModule from "../../../../Moduls/Select/Select";

import "./verticalTabWithList.css";

function TabPanelWithList(props) {
  const { children, handleAddLayer, satellites, ...other } = props;

  const [selectedSatellites, setSelectedSatellites] = React.useState([]);
  const [description, setDescription] = React.useState("");

  const handleChecked = (event) => {
    if (event.target.checked) {
      setSelectedSatellites([...selectedSatellites, event.target.value]);
    } else {
      var remainSatellites = selectedSatellites.filter(
        (sat) => sat !== event.target.value
      );
      setSelectedSatellites(remainSatellites);
    }
  };
  return (
    <div
      role="tabpanel"
      className="vertical-tabpanelwithlist"
      id={`vertical-tabpanelwithlist`}
      aria-labelledby={`vertical-tab`}
      {...other}
    >
      <div className="vertical-tabpanelwithlist-controller">
        <button
          className="btn btn-success btn-sm mx-1 mb-1 mt-auto "
          onClick={() => {
            if (selectedSatellites.length) {
              handleAddLayer(selectedSatellites, "anzali");
            } else {
              handleAddLayer(["default"], "anzali");
            }
          }}
        >
          + اضافه کردن
        </button>
        {satellites.map((satellite, index) => {
          return (
            <div
              key={index}
              className="form-check form-check-inline vertical-tabpanelwithlist-controller-checkboxLabel"
            >
              <input
                className="form-check-input"
                type="checkbox"
                value={satellite.value}
                onChange={handleChecked}
              />
              <label className="form-check-label">{satellite.label}</label>
            </div>
          );
        })}
        <SelectModule />
      </div>
      {
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      }
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 300,
  },
  tabs: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabWithList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* {handleTabs()} */}
      <TabPanelWithList
        handleAddLayer={props.configuration.tab.handleAddLayer}
        satellites={
          props.configuration.tab.satellites
            ? props.configuration.tab.satellites
            : ["default"]
        }
      >
        Hello
        {/* content */}
      </TabPanelWithList>
    </div>
  );
}
