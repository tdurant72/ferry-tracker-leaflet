import FerryIcon from "../Images/FerryIcon";
import TerminalIcon from "../Images/TerminalIcon";
import TwitterIcon from "../Images/TwitterIcon";
import WeatherIcon from "../Images/WeatherIcon";
import LinksIcon from "../Images/LinksIcon";
import {
  Drawer,
  Grid,
  Paper,
  Tabs,
  Tab,
  ListItem,
  withStyles,
  makeStyles,
  useTheme,
  CssBaseline,
  Accordion,
  Hidden,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";

import { React, useState, useEffect, useContext } from "react";
import { AppContext } from "../../context";
const drawerWidth = "auto";
const tabsHeight = "50px";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  tabs: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(["margin", "width"], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    marginLeft: 0,
  },
  table: {
    minWidth: 370,
    maxWidth: 500,
  },
  tableHeader: {
    backgroundColor: "#1a237e",
  },
  tableHeaderFont: {
    fontSize: "16px",
    color: "#fff",
  },
  tabContainer: {
    justifyContent: "center",
    height: tabsHeight,
  },
  twitterIcon: {
    height: 24,
    width: 24,
  },
  mapHeight: {
    height: "calc(100vh - 50px)",
  },
  accordionHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  hide: {
    display: "none",
  },
  noSmall: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  onSmallTable: {
    padding: 5,
    [theme.breakpoints.up("sm")]: {
      padding: 10,
    },
  },
}));

function TabNav() {
  const { tabValue, setTabValue, activeDrawer, setActiveDrawer } =
    useContext(AppContext);
  const handleTabChange = (event, value) => {
    setTabValue(value);

    console.log("tabValue", value);
  };
  const classes = useStyles();
  return (
    <div id="tabHolder" className={(classes.root, classes.tabContainer)}>
      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="primary"
        >
          <Tab
            icon={<FerryIcon />}
            label="Ferries"
            onClick={setActiveDrawer({ ...activeDrawer, ferryDrawer: true })}
            //   onClick={toggleDrawer("ferryDrawer", true)}
          />

          <Tab
            icon={<TerminalIcon />}
            label="Routes"
            fontSize="small"
            //   onClick={toggleDrawer("terminalDrawer", true)}
            onClick={setActiveDrawer({ ...activeDrawer, terminalDrawer: true })}
          />

          <Tab
            className={classes.noSmall}
            icon={<TwitterIcon />}
            label="Twitter"
            fontSize="small"
            //   onClick={toggleDrawer("twitterDrawer", true)}
            onClick={setActiveDrawer({ ...activeDrawer, twitterDrawer: true })}
          />
          <Tab
            className={classes.noSmall}
            icon={<WeatherIcon />}
            label="Weather"
            //   onClick={toggleDrawer("weatherDrawer", true)}
            onClick={setActiveDrawer({ ...activeDrawer, weatherDrawer: true })}
          />

          <Tab
            icon={<LinksIcon />}
            label="Links"
            //   onClick={toggleDrawer("contactDrawer", true)}
            onClick={setActiveDrawer({ ...activeDrawer, contactDrawer: true })}
          />
        </Tabs>
      </Paper>
    </div>
  );
}

export default TabNav;
