import axios from "axios";
import axiosRetry from "axios-retry";
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  createContext,
} from "react";
import views from "../data/views";

export const FerryAppContext = createContext();
const ferryUrl =
  "https://qc.eapps.ncdot.gov/services/ferrytracker-service-test/TrackerData";
// "https://qc.eapps.ncdot.gov/services/ferrytrackerservice-dev/TrackerData";
// const ferryUrl = "https://gist14.dot.nc.net/Ncdotferryfeed/FerryGeoJson.ashx";
// const ferryUrl = "https://qc.eapps.ncdot.gov/services/ferrytracker-service-test/TrackerData";

const initState = {
  routes: [],
  isLoading: true,
  timeStamp: null,
  // cities: [],
  weather: [],
  views: views,
  // currentView: [35.264277, -76.833359, 8],
  fetchingMessage: "Data Loading",
  failMessage: null,
};
const FerryAppStore = ({ children }) => {
  //   const [loading, setLoading] = useState(true);
  const [ferries, setFerries] = useState([]);
  const [callFerry, setCallFerry] = useState(false);
  //   const [callFerry, setCallFerry] = useState(false);
  //   const [fetchingMessage, setFetchingMessage] = useState("");
  //   const [timeStamp, setTimeStamp] = useState(null);
  const [cities, setCities] = useState([]);
  const [currentView, setCurrentView] = useState([35.264277, -76.833359, 8]);
  //   const [routes, setRoutes] = useState([]);
  const [ferriesLoaded, setFerriesLoaded] = useState(false);
  const [state, setState] = useState(initState);

  const getNCFerries = async () => {
    let newTime = new Date();
    setCallFerry(true);
    setState({
      ...state,
      fetchingMessage: "Data Loading",
      failMessage: null,
    });
    axiosRetry(axios, {
      retries: 3,
      shouldResetTimeout: true,
      retryCondition: (_error) => true, // retry no matter what
      retryDelay: (retryCount) => {
        return retryCount * 2000;
      },
    });
    try {
      axios
        .get(ferryUrl, { timeout: 2000 })
        .then((response) => {
          setState({
            ...state,
            callFerry: true,
            isLoading: false,
            fetchingMessage: null,
            // ferries: response.data.features,
            timeStamp: newTime.toLocaleTimeString(),
            views: views,
          });
          setFerries(response.data.features);
          setCallFerry(false);
          console.log("state from axios call:", state);
          setFerriesLoaded(true);
        })
        .catch((error) => {
          console.log("error", error);
          setState({
            ...state,
            fetchingMessage:
              "Error: Ferry vessel data failed to load. The ferry location service may be temporarily unavailable. Please try again later",
            failMessage: `${error}`,
          });
        });
    } catch (error) {
      console.log("error", state.failMessage);
    }
  };

  useEffect(() => {
    getNCFerries();

    const interval = setInterval(() => {
      getNCFerries();
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  const getWeather = async () => {
    setState({
      ...state,
      fetchingMessage: "Data Loading",
      failMessage: null,
    });
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
      axios
        .all([CITY1, CITY2, CITY3], { timeout: 2000 })
        .then(
          axios.spread((res1, res2, res3) => {
            let cityOne = res1.data.properties.periods[0];
            let cityTwo = res2.data.properties.periods[0];
            let cityThree = res3.data.properties.periods[0];
            console.log(
              "city 1",
              cityOne,
              "city 2",
              cityTwo,
              "city 3",
              cityThree
            );
            Object.assign(cityOne, { cityName: "Elizabeth City" });
            Object.assign(cityTwo, { cityName: "New Bern" });
            Object.assign(cityThree, { cityName: "Wilmington" });
            setCities([cityOne, cityTwo, cityThree]);
            // setState({
            //   ...state,
            //   cities: [cityOne, cityTwo, cityThree],
            // });
          })
        )
        .catch((error) => {
          setState({
            ...state,
            fetchingMessage:
              "Weather data failed to load, the service may be temporarily unavailable. Please try again later.",
            failMessage: `${error}`,
          });
        });
    } catch (error) {
      console.log(state.failMessage);
    }
  };

  useEffect(() => {
    getWeather();
    const interval = setInterval(() => {
      getWeather();
    }, 23200000);

    return () => clearInterval(interval);
  }, []);
  return (
    <FerryAppContext.Provider
      value={[
        state,
        setState,
        currentView,
        setCurrentView,
        ferries,
        setFerries,
        callFerry,
        cities,
        ferriesLoaded,
      ]}
    >
      {children}
    </FerryAppContext.Provider>
  );
};
// export const useGlobalContext = () => {
//   return useContext(FerryAppContext);
// };
// export { FerryAppContext, FerryAppProvider };
export default FerryAppStore;
