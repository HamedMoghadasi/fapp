import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SelectModule from "../../../../Moduls/Select/Select";

import "./verticalTab.css";

function TabPanel(props) {
  const {
    children,
    value,
    index,
    handleAddLayer,
    handelDescriptionChange,
    satellites,
    defaultValue,
    options,
    content,
    ...other
  } = props;

  const [selectedSatellites, setSelectedSatellites] = React.useState([]);

  var [location, setLocation] = React.useState({
    value: defaultValue ? defaultValue.value : "",
    label: defaultValue ? defaultValue.lable : "",
    description: defaultValue ? defaultValue.description : "",
  });

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

  const handleSelect = () => {
    if (options && defaultValue) {
      return (
        <SelectModule
          defaultValue={defaultValue}
          options={options}
          handleChange={(data) => {
            setLocation(data);
          }}
        />
      );
    }
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="vertical-tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <div className="vertical-tabpanel-controller">
        {handleSelect()}
        <button
          className="btn btn-success btn-sm mx-1 mb-1 mt-auto "
          onClick={() => {
            console.log("location :>> ", location);
            const locationValue = location.value ? location.value : "world";
            console.log("locationValue :>> ", locationValue);
            if (selectedSatellites.length) {
              handleAddLayer(selectedSatellites, locationValue);
            } else {
              handleAddLayer(["default"], locationValue);
            }
          }}
        >
          + اضافه کردن
        </button>
        {satellites.map((satellite, index) => {
          return (
            <div
              key={index}
              className="form-check form-check-inline vertical-tabpanel-controller-checkboxLabel"
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
      </div>
      {value === index && (
        <Box p={3}>
          <Typography>
            {location.description !== "" ? location.description : content}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(tab, index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    "data-label": `${tab.label}`,
  };
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

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabs = () => {
    if (props.hasTabs) {
      return (
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {props.configuration.tabs.map((tab, index) => {
            return (
              <Tab key={index} label={tab.label} {...a11yProps(tab, index)} />
            );
          })}
        </Tabs>
      );
    } else {
      return;
    }
  };

  return (
    <div className={classes.root}>
      {handleTabs()}
      {props.configuration.tabs.map((tab, index) => {
        return (
          <TabPanel
            value={value}
            index={index}
            key={index}
            handleAddLayer={tab.handleAddLayer}
            options={tab.options}
            defaultValue={tab.optionsDefaultValue}
            satellites={tab.satellites ? tab.satellites : ["default"]}
            content={tab.content}
          ></TabPanel>
        );
      })}
    </div>
  );
}
