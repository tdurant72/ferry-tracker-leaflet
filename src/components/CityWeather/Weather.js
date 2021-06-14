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

// const getCityOne = async () => {
//   const resCO = await (await fetch(
//     "https://api.weather.gov/gridpoints/AKQ/95,27/forecast"
//   )).json();
// };
const getCityOne = async () => {
  const res = await fetch(
    "https://api.weather.gov/gridpoints/AKQ/95,27/forecast"
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  // console.log("city one called", resCO.json());
  return res.json();
};
const getCityTwo = async () => {
  const res = await fetch(
    "https://api.weather.gov/gridpoints/MHX/44,41/forecast"
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  // console.log("city one called", resCO.json());
  return res.json();
};
const getCityThree = async () => {
  const res = await fetch(
    "https://api.weather.gov/gridpoints/ILM/88,67/forecast"
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  // console.log("city one called", resCO.json());
  return res.json();
};
const Weather = () => {
  const { data: cityOne, status: statusCO } = useQuery(
    "cityOneFetch",
    getCityOne,
    {
      staleTime: 23000000,
      cacheTime: 23100000,
      refetchInterval: 23200000,
    }
  );
  const { data: cityTwo, status: statusTw } = useQuery(
    "cityTwoFetch",
    getCityTwo,
    {
      staleTime: 23000000,
      cacheTime: 23100000,
      refetchInterval: 23200000,
    }
  );
  const { data: cityThree, status: statusTH } = useQuery(
    "cityThreeFetch",
    getCityThree,
    {
      staleTime: 23000000,
      cacheTime: 23100000,
      refetchInterval: 23200000,
    }
  );
  return (
    <>
      {statusCO === "loading" && <h2>Loading...</h2>},
      {statusCO === "error" && <h2>Something went wrong...</h2>},
      {statusCO === "success" && (
        <>
          <CityWeather
            cityName="Elizabeth City"
            detailedForecast={cityOne.properties.periods[0].detailedForecast}
            icon={cityOne.properties.periods[0].icon}
            timeFrame={cityOne.properties.updated}
            shortForecast={cityOne.properties.periods[0].shortForecast}
            temperature={cityOne.properties.periods[0].temperature}
            temperatureUnit={cityOne.properties.periods[0].temperatureUnit}
          />
        </>
      )}
      {statusTw === "loading" && <h2>Loading...</h2>},
      {statusTw === "error" && <h2>Something went wrong...</h2>},
      {statusTw === "success" && (
        <>
          <CityWeather
            cityName="New Bern"
            detailedForecast={cityTwo.properties.periods[0].detailedForecast}
            icon={cityTwo.properties.periods[0].icon}
            timeFrame={cityTwo.properties.updated}
            shortForecast={cityTwo.properties.periods[0].shortForecast}
            temperature={cityTwo.properties.periods[0].temperature}
            temperatureUnit={cityTwo.properties.periods[0].temperatureUnit}
          />
        </>
      )}
      {statusTH === "loading" && <h2>Loading...</h2>},
      {statusTH === "error" && <h2>Something went wrong...</h2>},
      {statusTH === "success" && (
        <>
          <CityWeather
            cityName="Wilmington"
            detailedForecast={cityThree.properties.periods[0].detailedForecast}
            icon={cityThree.properties.periods[0].icon}
            timeFrame={cityThree.properties.updated}
            shortForecast={cityThree.properties.periods[0].shortForecast}
            temperature={cityThree.properties.periods[0].temperature}
            temperatureUnit={cityThree.properties.periods[0].temperatureUnit}
          />
        </>
      )}
    </>
  );
};

export default Weather;
