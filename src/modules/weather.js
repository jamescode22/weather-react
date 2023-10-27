// BUNDLE ALL WEATHER DATA STUFF IN HERE FOR NOW
import { currentWeatherURL, forecastWeatherURL } from "../modules/config.js";
import axios from "axios";

const dateToString = (date) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
const dateToTimeUTC = (date) => `${String(date.getUTCHours()).padStart(2, 0)}:${String(date.getUTCMinutes()).padStart(2, 0)}`;
const dateToTimeLocal = (date) => `${String(date.getHours()).padStart(2, 0)}:${String(date.getMinutes()).padStart(2, 0)}`;

// Takes the latitude, longitude and an optional city name and returns an object with current and forecast weather

export const getWeatherDataFromLatLon = async (lat, lon, city) => {
  try {
    console.log("GETWEATHER API CALL");
    const { data: currentData } = await axios.get(currentWeatherURL(lat, lon));
    const { data: forecastData } = await axios.get(forecastWeatherURL(lat, lon));
    if (city) currentData.name = city;

    ////// MAKE FORECAST DATA ARRAY //////
    const laterTodayItems = [];
    const forecastItems = [];

    forecastData.list.forEach((item, i) => {
      const itemWeatherDate = new Date(item.dt * 1000);
      const day = dateToString(itemWeatherDate);
      const time = dateToTimeUTC(itemWeatherDate);

      // If forecast item is for today, and a forecast with a time
      // stamp of 06:00, 09:00, 12:00, 15:00 or 18:00, add to later today
      // items

      if (
        (time === "06:00" || time === "09:00" || time === "12:00" || time === "15:00" || time === "18:00" || time === "21:00") &&
        day === dateToString(new Date())
      ) {
        laterTodayItems.push({
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          time,
          main: item.weather[0].main,
          temp: Math.round(item.main.temp),
        });
      }

      // if tiem is for "12:00" and the day is not today, add to forecastitems
      if (time !== "12:00") return;
      if (day === dateToString(new Date())) return;

      forecastItems.push({
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        day,
        time,
        main: item.weather[0].main,
        temp: Math.round(item.main.temp),
      });
    });

    // this to 3 maximum later today periods
    laterTodayItems.length = 3;
    // Trim to 4 maximum forecast days
    forecastItems.length = 4;

    ////// CURRENT WEATHER ///////

    const currentWeatherDate = new Date(currentData.dt * 1000);
    const today = currentWeatherDate.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      temp: Math.round(currentData.main.temp),
      tempMin: Math.round(currentData.main.temp_min),
      tempMax: Math.round(currentData.main.temp_max),
      city: currentData.name,
      today,
      time: dateToTimeLocal(currentWeatherDate),
      icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
      description: currentData.weather[0].description,
      forecast: forecastItems,
      latertoday: laterTodayItems,
      sunrise: dateToTimeLocal(new Date(currentData.sys.sunrise * 1000)),
      sunset: dateToTimeLocal(new Date(currentData.sys.sunset * 1000)),
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

export const setDefaultWeatherData = () => {
  // return an object of default boilerplate weather data
  // to populate loading screens, etc

  return {
    city: "City or Town",
    today: "1st January 1000",
    time: "12:00",
    icon: "https://openweathermap.org/img/wn/03n@2x.png",
    temp: "50",
    description: "Some weather",
    sunset: "00:00",
    sunrise: "00:00",
    forecast: [
      { day: "Someday", icon: "https://openweathermap.org/img/wn/03n@2x.png", temp: "99", main: "Weather" },
      { day: "Someday", icon: "https://openweathermap.org/img/wn/03n@2x.png", temp: "99", main: "Weather" },
      { day: "Someday", icon: "https://openweathermap.org/img/wn/03n@2x.png", temp: "99", main: "Weather" },
      { day: "Someday", icon: "https://openweathermap.org/img/wn/03n@2x.png", temp: "99", main: "Weather" },
    ],
    latertoday: [
      { time: "00:00", icon: "https://openweathermap.org/img/wn/03n@2x.png", temp: "99", main: "Weather" },
      { time: "00:00", icon: "https://openweathermap.org/img/wn/03n@2x.png", temp: "99", main: "Weather" },
      { time: "00:00", icon: "https://openweathermap.org/img/wn/03n@2x.png", temp: "99", main: "Weather" },
    ],
  };
};
