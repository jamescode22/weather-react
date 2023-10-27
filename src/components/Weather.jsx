import React, { Component } from "react";
import { currentWeatherURL, forecastWeatherURL } from "../modules/config.js";
import axios from "axios";
import Error from "./Error";
import Spinner from "./Spinner";
import { getWeatherDataFromLatLon, setDefaultWeatherData } from "../modules/weather";

class Weather extends Component {
  // props: lat, lon, city, error
  // state: weatherdata

  async componentDidUpdate(prevProps, prevState) {
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
    const { error } = this.props || {};

    // is weatherData empty?
    const weatherEmpty = (weatherData && Object.keys(weatherData).length === 0) == null;

    // If weatherdata is empty, fill with default data:
    if (weatherEmpty) {
      weatherData = setDefaultWeatherData();
    }

    // // show loading spinner if weatherdata is empty and there's no error
    const loading = weatherEmpty && !error;

    // // blur the weather interface if loading is true
    // // or an error message is present
    const blur = loading || error;

    ///////// GOT HERE?  GREAT!  SHOW THE WEATHER ///////
    const { city, today, time, icon, temp, description, sunset, sunrise, forecast, latertoday } = weatherData;

    return (
      <main>
        <div className={blur ? "weather weather-loading" : "weather"}>
          {error ? <Error error={error} /> : <></>}
          {loading ? <Spinner /> : <></>}

          <div id="auto-gen">
            <div className="loc-and-time">
              <div>
                <h2>{city}</h2>
                <p>
                  <span>{today}</span>
                </p>
                <p>Weather updated at {time}</p>
              </div>
              <div>
                <p>Sunrise: {sunrise}</p>
                <p>Sunset: {sunset}</p>
              </div>
            </div>

            <div className="weather-data">
              <img src={icon} />
              <div>
                <h3>{temp}&deg;C</h3>
              </div>
              <p>{description}</p>
            </div>

            <div className="later-today">
              {latertoday.map((item) => (
                <div>
                  <h4>{item.time}</h4>
                  <img src={item.icon} />
                  <p>{item.main}</p>
                  <p>{item.temp}&deg;C</p>
                </div>
              ))}
            </div>

            <div className="weather-forecast">
              {forecast.map((item) => (
                <div>
                  <h3>{item.day}</h3>
                  <img src={item.icon} />
                  <p>{item.temp}&deg;C</p>
                  <p>{item.main}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="powered-by">Powered by OpenWeatherMap</div>
        </div>
      </main>
    );
  }
}

export default Weather;
