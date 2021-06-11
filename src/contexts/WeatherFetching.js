import React, { useReducer, useEffect } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";

const initialState = {
  loading: true,
  error: "",
  weather: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        weather: action.payload,
        error: "",
      };

    case "FETCH_ERROR":
      return {
        loading: false,
        weather: [],
        error: "Error while fetchig",
      };
    default:
      return state;
  }
};

function WeatherFetching() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getWeather = async () => {
    const CITY1 = axios.get(
      "https://api.weather.gov/gridpoints/AKQ/95,27/forecast"
    );
    const CITY2 = axios.get(
      "https://api.weather.gov/gridpoints/MHX/44,41/forecast"
    );
    const CITY3 = axios.get(
      "https://api.weather.gov/gridpoints/ILM/88,67/forecast"
    );
    axiosRetry(axios, {
      retries: 3,
      shouldResetTimeout: true,
      retryCondition: (_error) => true, // retry no matter what
      retryDelay: (retryCount) => {
        return retryCount * 2000;
      },
    });
    try {
      axios.all([CITY1, CITY2, CITY3], { timeout: 2000 }).then(
        axios.spread((res1, res2, res3) => {
          let cityOne = res1.data.properties.periods[0];
          let cityTwo = res2.data.properties.periods[0];
          let cityThree = res3.data.properties.periods[0];
          Object.assign(cityOne, { cityName: "Elizabeth City" });
          Object.assign(cityTwo, { cityName: "New Bern" });
          Object.assign(cityThree, { cityName: "Wilmington" });
          dispatch({
            type: "FETCH_SUCCESS",
            payload: [cityOne, cityTwo, cityThree],
          });
          //   setWeather([cityOne, cityTwo, cityThree]);
          //   setState({
          //     ...state,
          //     cities: [cityOne, cityTwo, cityThree],
          //   });
        })
      );
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
      //   setState({
      //     ...state,
      //     fetchingMessage:
      //       "Weather data failed to load, the service may be temporarily unavailable. Please try again later.",
      //   });
      setFetchingMessage(
        "Weather data failed to load, the service may be temporarily unavailable. Please try again later."
      );
    }
  };

  useEffect(() => {
    getWeather();
    const interval = setInterval(() => {
      getWeather();
    }, 23200000);

    return () => clearInterval(interval);
  }, [cities]);
  return (
    <div>
      {state.loading
        ? "Loading..."
        : state.weather.map((city) => {
            <p>{city.name}</p>;
          })}
      {state.error ? state.error : null}
    </div>
  );
}

export default WeatherFetching;
