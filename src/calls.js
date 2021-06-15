import axios from "axios";
export const getFerries = async () => {
  try {
    const ferries = await (
      await fetch(
        `https://qc.eapps.ncdot.gov/services/ferrytrackerservice-dev/TrackerData`
      )
    ).json();
    return ferries;
  } catch (error) {
    console.log(error);
  }
};
// export const getCityOne = async () => {
//   const resCO = await fetch(
//     `https://api.weather.gov/gridpoints/AKQ/95,27/forecast`
//   );
//   if (!resCO.ok) {
//     throw new Error("Something went wrong");
//   }
//   console.log("city one called", resCO.json());
//   return resCO.json();
// };
// export const getCityTwo = async () => {
//   const response = await fetch(
//     `https://api.weather.gov/gridpoints/MHX/44,41/forecast`
//   );
//   if (!response.ok) {
//     throw new Error("Something went wrong");
//   }
//   return response.json();
// };
// export const getCityThree = async () => {
//   const response = await fetch(
//     `https://api.weather.gov/gridpoints/ILM/88,67/forecast`
//   );
//   if (!response.ok) {
//     throw new Error("Something went wrong");
//   }
//   return response.json();
// };
export const getWeather = async () => {
  const CITY1 = axios.get(
    "https://api.weather.gov/gridpoints/AKQ/95,27/forecast"
  );
  const CITY2 = axios.get(
    "https://api.weather.gov/gridpoints/MHX/44,41/forecast"
  );
  const CITY3 = axios.get(
    "https://api.weather.gov/gridpoints/ILM/88,67/forecast"
  );

  try {
    const { data } = axios.all([CITY1, CITY2, CITY3], { timeout: 2000 }).then(
      axios.spread((res1, res2, res3) => {
        let cityOne = res1.data.properties.periods[0];
        let cityTwo = res2.data.properties.periods[0];
        let cityThree = res3.data.properties.periods[0];
        console.log("city 1", cityOne, "city 2", cityTwo, "city 3", cityThree);
        Object.assign(cityOne, { cityName: "Elizabeth City" });
        Object.assign(cityTwo, { cityName: "New Bern" });
        Object.assign(cityThree, { cityName: "Wilmington" });
        // setCities([cityOne, cityTwo, cityThree]);
      })
    );
    return data;
  } catch (error) {
    console.log(error);
    //   setFetchingMessage(
    //     "Weather data failed to load, the service may be temporarily unavailable. Please try again later."
    //   );
  }
};
