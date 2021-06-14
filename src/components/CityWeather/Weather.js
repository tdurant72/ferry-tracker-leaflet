import React, { useContext, useEffect, useState } from "react";
// import { useGlobalContext } from "../../contexts/GlobalContext";
// import { FerryAppContext } from "../../contexts/GlobalContext";
import { useQuery } from "react-query";
import { getWeather } from "../../calls";
import axios from "axios";
import axiosRetry from "axios-retry";
import CityWeather from "./CityWeather";
import {
  Grid,
  Typography,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";

const getCityOne = async () => {
  const resCO = await fetch(
    `https://api.weather.gov/gridpoints/AKQ/95,27/forecast`
  );
  if (!resCO.ok) {
    throw new Error("Something went wrong");
  }
  console.log("city one called", resCO.json());
  return resCO.json();
};
const Weather = () => {
  // const [state] = useContext(FerryAppContext);
  // const [cityOne, setCityOne] = useState(null);
  // const { data:dataCO, error, isLoading:isLoadingCO, isError:isErrorCO } = useQuery(
  //   "weatherAll",
  //   getWeather
  // );
  const {
    data: cityOne,
    isLoading: isLoadingCO,
    isError: isErrorCO,
  } = useQuery("city1", getCityOne);
  console.log("weather", cityOne);
  if (isLoadingCO) return <h2>Loading...</h2>;
  if (isErrorCO) return <h2>Something went wrong...</h2>;
  return (
    <>
      {cityOne}
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
