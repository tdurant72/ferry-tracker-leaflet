import React, { useContext, useEffect } from "react";

import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";

import { FerryAppContext } from "../../contexts/GlobalContext";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  noSmall: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
  },
  table: {
    minWidth: 370,
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.dark,
  },
  tableItem: {
    background: theme.palette.white,
  },
  customTableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#dedede",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.white,
    },
  },
  tableHeaderFont: {
    fontSize: "16px",
    color: theme.palette.primary.contrastText,
  },
  links: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontSize: "1em",
    textDecoration: "underline",
  },
}));

const TerminalTable = () => {
  const [state, setState, currentView, setCurrentView, , , ,] =
    useContext(FerryAppContext);
  // const [state, setState, currentView, setCurrentView] = useContext(FerryAppContext);

  const classes = useStyles();
  // const scrollPage = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  //   console.log("window scroll called", window.screenTop);
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", scrollPage);
  //   scrollPage();

  //   return () => {
  //     window.removeEventListener("scroll", scrollPage);
  //   };
  // }, [setCurrentView]);
  useEffect(
    () => () => {
      try {
        window.scroll({
          top: 60,
          left: 0,
          behavior: "smooth",
        });
      } catch (error) {
        window.scrollTo(60, 0);
      }
    },
    [currentView]
  );
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableHeader}>
            <TableCell className={classes.tableHeaderFont}>Routes</TableCell>
            <TableCell className={classes.tableHeaderFont}>
              Routes Type
            </TableCell>
            <TableCell className={classes.tableHeaderFont}>
              Ferry Type
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.views.map((view) => (
            <TableRow
              key={view.properties.id}
              className={classes.customTableRow}
            >
              <TableCell>
                <span
                  className={classes.links}
                  latitude={view.geometry.coordinates[1]}
                  longitude={view.geometry.coordinates[0]}
                  id={view.properties.id}
                  zoom={view.properties.zoom}
                  onClick={() => {
                    // setState({
                    //   ...state,
                    //   currentView: [
                    //     view.geometry.coordinates[0],
                    //     view.geometry.coordinates[1],
                    //     view.properties.zoom,
                    //   ],
                    // });
                    setCurrentView([
                      view.geometry.coordinates[0],
                      view.geometry.coordinates[1],
                      view.properties.zoom,
                    ]);
                    console.log("currentView", currentView);
                  }}
                >
                  {view.properties.title}
                </span>
              </TableCell>
              <TableCell>{view.properties.routeType}</TableCell>
              <TableCell>{view.properties.ferryType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TerminalTable;
