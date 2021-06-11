import React, { useContext, useEffect, useState } from "react";
// import { useGlobalContext } from "../../contexts/GlobalContext";
// import { FerryAppContext } from "../../contexts/GlobalContext";
import { useQuery } from "react-query";
import { getWeather, getCityOne } from "../../calls";
import axios from "axios";
import axiosRetry from "axios-retry";
import CityWeather from "./CityWeather";
import {
  Grid,
  Typography,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";

const Weather = () => {
  // const [state] = useContext(FerryAppContext);
  // const [cityOne, setCityOne] = useState(null);
  const { data, error, isLoading, isError } = useQuery(
    "weatherAll",
    getWeather
  );
  const { data: cityOne } = useQuery("city1", getCityOne);
  console.log("weather", data, "cityOne", cityOne);
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Something went wrong...</h2>;
  return (
    <>
      {data}
      {/* <CityWeather
        key={cityOne.cityName}
        detailedForecast={cityOne.detailedForecast}
        icon={cityOne.icon}
        timeFrame={cityOne.name}
        shortForecast={cityOne.shortForecast}
        temperature={cityOne.temperature}
        temperatureUnit={cityOne.temperatureUnit}
        cityName={cityOne.cityName}
      />
      <CityWeather
        key={cityTwo.cityName}
        detailedForecast={cityTwo.detailedForecast}
        icon={cityTwo.icon}
        timeFrame={cityTwo.name}
        shortForecast={cityTwo.shortForecast}
        temperature={cityTwo.temperature}
        temperatureUnit={cityTwo.temperatureUnit}
        cityName={cityTwo.cityName}
      />
      <CityWeather
        key={cityThree.cityName}
        detailedForecast={cityThree.detailedForecast}
        icon={cityThree.icon}
        timeFrame={cityThree.name}
        shortForecast={cityThree.shortForecast}
        temperature={cityThree.temperature}
        temperatureUnit={cityThree.temperatureUnit}
        cityName={cityThree.cityName}
      /> */}
      );
    </>
  );
};

export default Weather;
