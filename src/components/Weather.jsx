import WeatherInterface from "./WeatherInterface.jsx";
import { getWeatherDataFromLatLon, setDefaultWeatherData } from "../modules/weather";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERROR, SET_WEATHER } from "../modules/types.js";

const Weather = () => {
  const coords = useSelector((state) => state.coords);
  const error = useSelector((state) => state.error);
  let weatherData = useSelector((state) => state.weatherData);
  const dispatch = useDispatch();

  useEffect(() => {
    const weatherUpdate = async () => {
      const { lat, lon, city } = coords || {};
      if (!lat && !lon) return;

      let weatherData = await getWeatherDataFromLatLon(lat, lon, city);
      if (weatherData.error) {
        dispatch({ type: SET_ERROR, payload: weatherData.error });
        return;
      }
      dispatch({ type: SET_WEATHER, payload: weatherData });
    };
    weatherUpdate();
  }, [coords]);

  const weatherEmpty = (weatherData && Object.keys(weatherData).length !== 0) == false;

  if (weatherEmpty) weatherData = setDefaultWeatherData();

  // show loading spinner if weatherdata is empty and there's no error
  const loading = weatherEmpty && !error;

  // blur the weather interface if loading is true or an error message is present
  const blur = loading || error;

  ///////// GOT HERE?  GREAT!  SHOW THE WEATHER ///////
  return <WeatherInterface weatherData={weatherData} loading={loading} blur={blur} error={error} />;
};

export default Weather;
