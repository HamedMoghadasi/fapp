import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import "./verticalTab.css";

function TabPanel(props) {
  const { children, value, index, handleAddLayer, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
      <button
        className="btn btn-success mx-1 mb-1 mt-auto verticalTabAddLayerBtn"
        onClick={handleAddLayer}
      >
        + اضافه کردن
      </button>
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

  return (
    <div className={classes.root}>
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
      {props.configuration.tabs.map((tab, index) => {
        return (
          <TabPanel
            value={value}
            index={index}
            key={index}
            handleAddLayer={tab.handleAddLayer}
          >
            {tab.content}
          </TabPanel>
        );
      })}
    </div>
  );
}
