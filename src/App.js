import axios from "axios";
// import DrawerContextProvider from "./contexts/DrawerContext";
import { useQuery } from "react-query";
import FerryAppStore from "./contexts/GlobalContext";
import ports from "./data/ports";
import Weather from "./components/CityWeather/Weather";
import views from "./data/views";
import TerminalIcon from "./components/Images/TerminalIcon";
import RouteIcon from "./components/Images/RouteIcon";
import FerryIcon from "./components/Images/FerryIcon";
import TwitterIcon from "./components/Images/TwitterIcon";
import WeatherIcon from "./components/Images/WeatherIcon";
import LinksIcon from "./components/Images/LinksIcon";
import CityWeather from "./components/CityWeather/CityWeather";
import TerminalTable from "./components/TerminalTable/TerminalTable";
import FerryTable from "./components/FerryTable/FerryTable";
import Contact from "./components/Contact/Contact";
import Spinner from "./components/Spinner/Loading";
import MapHeader from "./components/MapHeader/MapHeader";
import PropTypes from "prop-types";
import "./App.css";
import {
  Drawer,
  Paper,
  Tabs,
  Tab,
  Grid,
  ListItem,
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  Hidden,
  BottomNavigation,
  BottomNavigationAction,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Timeline } from "react-twitter-widgets";
import { React, useState } from "react";

import Map from "./components/Map/Map";
import TransportNewLight from "./fonts/TransportNewLight_gdi.ttf";
import TransportNewMedium from "./fonts/TransportNewMedium_gdi.ttf";
require("leaflet-plugins/layer/tile/Bing.js");

const drawerWidth = "auto";
const tabsHeight = "50px";

// const TransportLight = {
//   fontFamily: "TransportNewLight",
//   fontStyle: "light",
//   fontWeight: "300",
//   src: `
//     local('TransportNewLight'),
//     local('TransportNewLight_gdi),
//     url(${TransportLight}) format('ttf)
//   `,
// };
const font = "'TransportNewLight',sans-serif";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [TransportNewLight],
      },
    },
  },
  palette: {
    primary: {
      light: "#3f81b3",
      main: "#3072a4",
      dark: "#092940",
      contrastText: "#e3f2fd",
    },
    secondary: {
      light: "#d06e31",
      main: "#c75a17",
      dark: "#b44c0b",
    },
  },
});
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
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    // transition: theme.transitions.create(["margin", "width"], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
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
  drawerDiv: {
    padding: 10,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerType: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightBold,
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
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    marginLeft: 0,
  },
  table: {
    padding: 5,
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
  tabHeader: {
    fontSize: "16px",
    color: theme.palette.primary.dark,
  },
  twitterIcon: {
    height: 24,
    width: 24,
  },
  mapHeight: {
    height: "calc(100vh - 100px)",
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
      display: "inherit",
    },
  },
  onSmallTable: {
    padding: 5,
    [theme.breakpoints.up("sm")]: {
      padding: 10,
    },
  },
}));

const App = () => {
  const [drawers, setDrawers] = useState({
    weatherDrawer: false,
    twitterDrawer: false,
    ferryDrawer: false,
    contactDrawer: false,
    terminalDrawer: false,
  });

  const [tabValue, setTabValue] = useState(0);

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log("toggleDrawer", side, open);
    setDrawers({
      ...drawers,
      [side]: open,
    });
  };

  const handleTabChange = (event, value) => {
    console.log("value", value);
    setTabValue(value);
  };

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };

  const classes = useStyles();
  // const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div id="all-content">
        <FerryAppStore>
          <div id="mapHolder">
            <MapHeader />
            <Map className={classes.mapHeight}></Map>
          </div>
          <div
            id="drawers"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Drawer
              open={drawers.terminalDrawer}
              //variant="persistent"
              onClose={toggleDrawer("terminalDrawer", false)}
              onClick={toggleDrawer("terminalDrawer", false)}
              className={classes.drawer}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("terminalDrawer", false)}
                onKeyDown={toggleDrawer("terminalDrawer", false)}
              />
              <div className="viewDrawer">
                <TerminalTable />
              </div>
            </Drawer>
            <Drawer
              anchor="left"
              open={drawers.ferryDrawer}
              //variant="persistent"
              onClose={toggleDrawer("ferryDrawer", false)}
              onClick={toggleDrawer("ferryDrawer", false)}
              className={classes.drawer}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("ferryDrawer", false)}
                onKeyDown={toggleDrawer("ferryDrawer", false)}
              />
              <div className="FerryTable">
                <FerryTable />
              </div>
            </Drawer>

            <Drawer
              anchor="left"
              open={drawers.twitterDrawer}
              //variant="persistent"
              onClose={toggleDrawer("twitterDrawer", false)}
              onClick={toggleDrawer("twitterDrawerr", false)}
              className={classes.drawer}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("twitterDrawer", false)}
                onKeyDown={toggleDrawer("twitterDrawer", false)}
              />
              <div id="twitter">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="ferry-content"
                    id="ferry-header"
                  >
                    <Typography className={classes.accordionHeading}>
                      Ferry Division
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Timeline
                      dataSource={{
                        sourceType: "profile",
                        screenName: "NCDOT_Ferry",
                      }}
                      options={{
                        height: "400",
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="NCFerryCTuck-content"
                    id="NCFerryCTuck-header"
                  >
                    <Typography className={classes.accordionHeading}>
                      NCFerryCurrituck
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Timeline
                      dataSource={{
                        sourceType: "profile",
                        screenName: "NCFerryCTuck",
                      }}
                      options={{
                        height: "400",
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="NCFerryPamRiver-content"
                    id="NCFerryPamRiver-header"
                  >
                    <Typography className={classes.accordionHeading}>
                      NCFerryPamRiver
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Timeline
                      dataSource={{
                        sourceType: "profile",
                        screenName: "NCFerryPamRiver",
                      }}
                      options={{
                        height: "400",
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="NCFerryCherryBranch-content"
                    id="NCFerryCherryBranch-header"
                  >
                    <Typography className={classes.accordionHeading}>
                      NCFerryCherryBranch
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Timeline
                      dataSource={{
                        sourceType: "profile",
                        screenName: "NCFerryCHBranch",
                      }}
                      options={{
                        height: "400",
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="NCFerrySouthport-content"
                    id="NCFerrySouthport-header"
                  >
                    <Typography className={classes.accordionHeading}>
                      NCFerrySouthport
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Timeline
                      dataSource={{
                        sourceType: "profile",
                        screenName: "NCFerrySPort",
                      }}
                      options={{
                        height: "400",
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="NCFerryHatteras-content"
                    id="NCFerryHatteras-header"
                  >
                    <Typography className={classes.accordionHeading}>
                      NCFerryHatteras
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Timeline
                      dataSource={{
                        sourceType: "profile",
                        screenName: "NCFerryHatteras",
                      }}
                      options={{
                        height: "400",
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="NCFerryPamSound-content"
                    id="NCFerryPamSound-header"
                  >
                    <Typography className={classes.accordionHeading}>
                      NCFerryPamSound
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Timeline
                      dataSource={{
                        sourceType: "profile",
                        screenName: "NCFerryPamSound",
                      }}
                      options={{
                        height: "400",
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
              </div>
            </Drawer>
            <Drawer
              anchor="left"
              open={drawers.weatherDrawer}
              //variant="persistent"
              onClose={toggleDrawer("weatherDrawer", false)}
              onClick={toggleDrawer("weatherDrawer", false)}
              className={classes.drawer}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("weatherDrawer", false)}
                onKeyDown={toggleDrawer("weatherDrawer", false)}
              />
              <div id="weather" className={classes.drawerDiv}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="h4"
                      className={classes.drawerType}
                    >
                      Weather
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      provided by{" "}
                      <a href="https://www.weather.gov/" target="_blank">
                        National Weather Service
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
                <Weather />
              </div>
            </Drawer>
            <Drawer
              anchor="left"
              open={drawers.contactDrawer}
              //variant="persistent"
              onClose={toggleDrawer("contactDrawer", false)}
              onClick={toggleDrawer("contactDrawer", false)}
              className={classes.drawer}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("contactDrawer", false)}
                onKeyDown={toggleDrawer("contactDrawer", false)}
              />
              <div id="contact" className={classes.drawerDiv}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="h4"
                      className={classes.drawerType}
                    >
                      Links
                    </Typography>
                  </Grid>
                </Grid>
                <Contact />
              </div>
            </Drawer>
          </div>

          <div id="tabHolder" className={(classes.root, classes.tabContainer)}>
            <Paper>
              <Hidden smDown>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  centered
                >
                  <Tab
                    className={classes.tabHeader}
                    icon={<FerryIcon />}
                    label="Ferries"
                    onClick={toggleDrawer("ferryDrawer", true)}
                  />

                  <Tab
                    className={classes.tabHeader}
                    icon={<RouteIcon />}
                    label="Routes"
                    fontSize="small"
                    onClick={toggleDrawer("terminalDrawer", true)}
                  />

                  <Tab
                    className={`${classes.noSmall}, ${classes.tabHeader}`}
                    icon={<TwitterIcon />}
                    label="Twitter"
                    fontSize="small"
                    onClick={toggleDrawer("twitterDrawer", true)}
                  />

                  <Tab
                    className={`${classes.noSmall}, ${classes.tabHeader}`}
                    icon={<WeatherIcon />}
                    label="Weather"
                    onClick={toggleDrawer("weatherDrawer", true)}
                  />

                  <Tab
                    className={classes.tabHeader}
                    icon={<LinksIcon />}
                    label="Links"
                    onClick={toggleDrawer("contactDrawer", true)}
                  />
                </Tabs>
              </Hidden>
              <Hidden mdUp>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  centered
                >
                  <Tab
                    className={classes.tabHeader}
                    icon={<FerryIcon />}
                    label="Ferries"
                    onClick={toggleDrawer("ferryDrawer", true)}
                  />
                  <Tab
                    className={classes.tabHeader}
                    icon={<RouteIcon />}
                    label="Routes"
                    fontSize="small"
                    onClick={toggleDrawer("terminalDrawer", true)}
                  />
                  <Tab
                    className={classes.tabHeader}
                    icon={<LinksIcon />}
                    label="Links"
                    onClick={toggleDrawer("contactDrawer", true)}
                  />
                </Tabs>
              </Hidden>
            </Paper>
          </div>
        </FerryAppStore>
      </div>
    </ThemeProvider>
  );
};

export default App;
