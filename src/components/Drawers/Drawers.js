import views from "../../data/views";
import CityWeather from "../CityWeather/CityWeather";
import TerminalTable from "../TerminalTable/TerminalTable";
import FerryTable from "../FerryTable/FerryTable";
import Contact from "../Contact/Contact";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Timeline } from "react-twitter-widgets";
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
  drawerPaper: {
    width: drawerWidth,
    paddingLeft: 10,
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
  contactsType: {
    padding: theme.spacing(3),
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightBold,
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
export const Drawers = ({ ferries, cities }) => {
  const { activeDrawer, setActiveDrawer, tabValue, setTabValue } =
    useContext(AppContext);
  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log("toggleDrawer", side, open);
    setActiveDrawer({
      ...activeDrawer,
      [side]: open,
    });
  };
  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };
  const classes = useStyles();
  return (
    <div
      id="drawers"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Drawer
        open={activeDrawer.terminalDrawer}
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
          <TerminalTable views={views} />
        </div>
      </Drawer>
      <Drawer
        anchor="left"
        open={activeDrawer.ferryDrawer}
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
          <h2>Ferries</h2>
          <FerryTable views={views} ferries={ferries} />
        </div>
      </Drawer>

      <Drawer
        anchor="left"
        open={activeDrawer.twitterDrawer}
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
        open={activeDrawer.weatherDrawer}
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
        <div id="weather">
          <Grid container spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="h4">
                Weather
              </Typography>
              <Typography variant="body1" color="textSecondary">
                provided by{" "}
                <a href="https://www.weather.gov/" target="_blank">
                  NWS
                </a>
              </Typography>
            </Grid>
          </Grid>

          {/* {cities} */}
          {cities.map((city, index) => {
            return (
              <CityWeather
                key={index}
                detailedForecast={city.detailedForecast}
                icon={city.icon}
                timeFrame={city.name}
                shortForecast={city.shortForecast}
                temperature={city.temperature}
                temperatureUnit={city.temperatureUnit}
                cityName={city.cityName}
              />
            );
          })}
        </div>
      </Drawer>
      <Drawer
        anchor="left"
        open={activeDrawer.contactDrawer}
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
        <div id="contact">
          <Grid container spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="h4">
                Contact Links
              </Typography>
            </Grid>
          </Grid>
          <Contact />
        </div>
      </Drawer>
    </div>
  );
};
export default Drawers;
