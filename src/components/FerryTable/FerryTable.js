import React, { Component, useContext } from "react";
import { useQuery } from "react-query";
import { getFerries } from "../../calls";
import PropTypes from "prop-types";
import { FerryAppContext } from "../../contexts/GlobalContext";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Hidden,
} from "@material-ui/core";
// import Moment from "react-moment";
const useStyles = makeStyles((theme) => ({
  root: { width: "100%", overflowX: "auto" },
  noSmall: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
  },
  onSmallTable: {
    padding: 5,
    [theme.breakpoints.down("sm")]: {
      padding: 10,
    },
  },
  // table: {
  //   minWidth: 350,
  //   padding: "4px 8px",
  //   margin: "10px",
  // },
  table: {
    minWidth: 370,
    // maxWidth: 600,
    // padding: theme.spacing(3),
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.dark,
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

const FerryTable = () => {
  const {
    data: ferries,
    status,
    error,
    isLoading,
    isError,
  } = useQuery("ferries", getFerries, {
    staleTime: 2000,
    cacheTime: 6000,
    refetchInterval: 60000,
  });
  const { views, setViews, currentView, setCurrentView } =
    useContext(FerryAppContext);
  const classes = useStyles();
  // let { latitude, longitude } = data;
  // let { tlatitude, tlongitude } = views;
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Something went wrong...</h2>;
  return (
    <>
      {status === "loading" && <h2>Loading...</h2>},
      {status === "error" && (
        <h4>Ferries service appears to be down try again later.</h4>
      )}
      ,
      {status === "success" && (
        <div>
          <TableContainer component={Paper} className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell className={classes.tableHeaderFont}>
                    Ferry Name
                  </TableCell>
                  <Hidden smDown>
                    <TableCell className={classes.tableHeaderFont}>
                      Speed
                    </TableCell>
                    <TableCell className={classes.tableHeaderFont}>
                      Status
                    </TableCell>

                    <TableCell className={classes.tableHeaderFont}>
                      As of
                    </TableCell>
                  </Hidden>
                  <TableCell className={classes.tableHeaderFont}>
                    Destination
                  </TableCell>

                  <TableCell className={classes.tableHeaderFont}>ETA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ferries.features.map((boat) => (
                  <TableRow
                    key={boat.id}
                    boat={boat}
                    title={boat.properties.VesselName}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.onSmallTable}
                    >
                      <span
                        className={classes.links}
                        latitude={boat.geometry.coordinates[1]}
                        longitude={boat.geometry.coordinates[0]}
                        onClick={
                          () =>
                            setCurrentView([
                              boat.geometry.coordinates[1],
                              boat.geometry.coordinates[0],
                              16,
                            ])
                          // setState({
                          //   ...state,
                          //   currentView: [
                          //     boat.geometry.coordinates[1],
                          //     boat.geometry.coordinates[0],
                          //     16,
                          //   ],
                          // })
                        }
                      >
                        {boat.properties.VesselName}
                      </span>
                    </TableCell>
                    <Hidden smDown>
                      <TableCell className={classes.onSmallTable}>
                        {boat.properties.SOG}
                      </TableCell>
                      <TableCell className={classes.onSmallTable}>
                        {boat.properties.SOG === "0 knots"
                          ? "stopped"
                          : " underway"}
                      </TableCell>

                      <TableCell className={classes.onSmallTable}>
                        {/* <Moment format=" h:mm a, MM/DD/YY">
                    {boat.properties.Time}
                  </Moment> */}
                        {new Date(boat.properties.Time).toLocaleTimeString()}
                      </TableCell>
                    </Hidden>
                    <TableCell className={classes.onSmallTable}>
                      {/* <span
                    className={classes.links}
                    tlatitude={boat.geometry.coordinates[1]}
                    tlongitude={boat.geometry.coordinates[0]}
                    onClick={() =>
                      setCurrentView([
                        boat.geometry.coordinates[1],
                        boat.geometry.coordinates[0],
                        16,
                      ])
                    }
                  >
                    {boat.properties.Destination}
                  </span> */}
                      {boat.properties.Destination !== ""
                        ? boat.properties.Destination
                        : "no data reported"}
                    </TableCell>
                    <TableCell className={classes.onSmallTable}>
                      {boat.properties.ETA !== null
                        ? new Date(boat.properties.ETA).toLocaleTimeString()
                        : "no data reported"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

// FerryTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default FerryTable;
