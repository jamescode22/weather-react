import React from "react";
import Error from "./Error";
import Spinner from "./Spinner";

const WeatherInterface = (props) => {
  console.log("WI", props);
  const { blur, error, loading } = props;
  const { city, today, time, icon, temp, description, sunset, sunrise, forecast, latertoday } = props.weatherData;

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
};

export default WeatherInterface;
