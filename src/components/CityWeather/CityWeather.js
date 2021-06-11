import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 345,
    display: "flex",
    justifyContent: "center",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    objectFit: "cover",
    width: 100,
    height: 100,
    paddingTop: 16,
    paddingLeft: 16,
  },
};

function Weather(props) {
  const { classes } = props;
  return (
    <div className="cards">
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt="weather icon"
          className={classes.media}
          image={props.icon}
        />
        <div className={classes.details}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {props.timeFrame} in {props.cityName}
            </Typography>
            <Typography variant="h6" component="h2">
              Currently: {props.shortForecast}
              <br />
            </Typography>
            <Typography variant="h6" component="h2">
              Temperature: {props.temperature} {props.temperatureUnit}
              <br />
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.detailedForecast}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Divider />
    </div>
  );
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Weather);
