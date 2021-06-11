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
  "https://qc.eapps.ncdot.gov/services/ferrytrackerservice-dev/TrackerData";
// const ferryUrl = "https://gist14.dot.nc.net/Ncdotferryfeed/FerryGeoJson.ashx";

const initState = {
  routes: [],
  isLoading: true,
  timeStamp: null,
  cities: [],
  weather: [],
  views: views,
  // currentView: [35.264277, -76.833359, 8],
  fetchingMessage: "Data Loading",
  failMessage: "Data failed to load, try again later.",
};
const FerryAppStore = ({ children }) => {
  //   const [loading, setLoading] = useState(true);
  const [ferries, setFerries] = useState([]);
  const [callFerry, setCallFerry] = useState(false);
  //   const [callFerry, setCallFerry] = useState(false);
  //   const [fetchingMessage, setFetchingMessage] = useState("");
  const [timeStamp, setTimeStamp] = useState(new Date());
  const [views, setViews] = useState(null);
  const [cities, setCities] = useState([]);
  const [currentView, setCurrentView] = useState([35.264277, -76.833359, 8]);
  //   const [routes, setRoutes] = useState([]);
  const [state, setState] = useState(initState);

  const setInitData = () => {
    let newTime = new Date();

    setState({
      ...state,
      timeStamp: newTime.toLocaleTimeString(),
      views: views,
    });
  };
  const getNCFerries = async () => {
    let newTime = new Date();
    axiosRetry(axios, {
      retries: 3,
      shouldResetTimeout: true,
      retryCondition: (_error) => true, // retry no matter what
      retryDelay: (retryCount) => {
        return retryCount * 2000;
      },
    });
    try {
      axios.get(ferryUrl, { timeout: 2000 }).then((response) => {
        // let time = Date.now();
        // setRoutes(views);
        // setFerries(response.data.features);
        // setCallFerry(true);
        // setLoading(false);
        // setFetchingMessage(null);
        // setTimeStamp(newTime.toLocaleTimeString());
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
        setCallFerry(true);
        // console.log(state);
      });
    } catch (error) {
      console.log("error", error);
      setState({
        ...state,
        fetchingMessage:
          "Data failed to load, the service may be temporarily unavailable. Please try again later.",
      });
    }
  };

  useEffect(() => {
    setInitData();

    // const interval = setInterval(() => {
    //   getNCFerries();
    // }, 60000);

    // return () => clearInterval(interval);
  }, []);

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
          // setCities([cityOne, cityTwo, cityThree]);
          setState({
            ...state,
            cities: [cityOne, cityTwo, cityThree],
          });
        })
      );
    } catch (error) {
      setState({
        ...state,
        fetchingMessage:
          "Weather data failed to load, the service may be temporarily unavailable. Please try again later.",
      });
      //   setFetchingMessage(
      //     "Weather data failed to load, the service may be temporarily unavailable. Please try again later."
      //   );
    }
  };

  // useEffect(() => {
  //   getWeather();
  //   const interval = setInterval(() => {
  //     getWeather();
  //   }, 23200000);

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <FerryAppContext.Provider
      value={{
        views,
        setViews,
        currentView,
        setCurrentView,
        ferries,
        setFerries,
        callFerry,
        timeStamp,
      }}
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
