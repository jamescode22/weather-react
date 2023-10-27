import React, { Component } from "react";
import { currentWeatherURL, forecastWeatherURL } from "../modules/config.js";
import axios from "axios";
import WeatherInterface from "./WeatherInterface.jsx";
import { getWeatherDataFromLatLon, setDefaultWeatherData } from "../modules/weather";

class Weather extends Component {
  // props: lat, lon, city, error
  // state: weatherdata

  async componentDidUpdate(prevProps, prevState) {
    // If the lat/long passed via props has changed, fetch the weatherdata
    if (this.props.lat && this.props.lon && this.props.lat !== prevProps.lat && this.props.lon !== prevProps.lon) {
      let weatherData = await getWeatherDataFromLatLon(this.props.lat, this.props.lon, this.props.city);

      if (weatherData.error) {
        this.props.onError(weatherData.error);
        return;
      }

      this.setState({ weatherData: weatherData });
    }
  }

  render() {
    let { weatherData } = this.state || {};
    const { error } = this.props;

    // is weatherData empty?
    const weatherEmpty = (weatherData && Object.keys(weatherData).length === 0) == null;

    // If weatherdata is empty, fill with default data:
    if (weatherEmpty) weatherData = setDefaultWeatherData();

    // show loading spinner if weatherdata is empty and there's no error
    const loading = weatherEmpty && !error;

    // blur the weather interface if loading is true or an error message is present
    const blur = loading || error;

    ///////// GOT HERE?  GREAT!  SHOW THE WEATHER ///////
    return <WeatherInterface weatherData={weatherData} loading={loading} blur={blur} error={error} />;
  }
}

export default Weather;
