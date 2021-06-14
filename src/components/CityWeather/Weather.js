import React, { useContext, useEffect } from "react";
// import { useGlobalContext } from "../../contexts/GlobalContext";
import { FerryAppContext } from "../../contexts/GlobalContext";
import axios from "axios";
import axiosRetry from "axios-retry";
import CityWeather from "./CityWeather";
import {
  Grid,
  Typography,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";

const Weather = () => {
  const [, , , , , , , cities] = useContext(FerryAppContext);
  return (
    <>
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
    </>
  );
};

export default Weather;
