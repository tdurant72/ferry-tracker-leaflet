import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: theme.palette.background.paper,
    padding: 10,
  },
  drawerType: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightBold,
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItemLink
          href="https://ferry.ncdot.gov/#/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary="Online Reservations" />
        </ListItemLink>
        <ListItemLink
          href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/routes/Pages/default.aspx?from=0&to=0"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary="Ferry Schedule" />
        </ListItemLink>
        <ListItemLink
          href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/ticket-prices.aspx"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary="Ticket Prices" />
        </ListItemLink>
        <ListItemLink
          href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/accommodations.aspx"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary="Onboard Accommodations" />
        </ListItemLink>
        <ListItemLink
          href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/destinations.aspx"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary="Destinations" />
        </ListItemLink>
        <ListItemLink
          href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/commuter-pass.aspx"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary="Commuter Pass" />
        </ListItemLink>
        <ListItemLink
          href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/priority-pass.aspx"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary="Priority Passes" />
        </ListItemLink>
        <ListItemLink
          href="https://drivenc.gov/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary="DriveNC" />
        </ListItemLink>
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
