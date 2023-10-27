import { geoCodingURL } from "../modules/config.js";
import axios from "axios";

///
export const getPlacesFromInput = async (placeQuery) => {
  try {
    // If input text is less than three letters, don't do anything
    if (placeQuery.length < 3) return;

    console.log("GET PLACES API");
    const { data } = await axios.get(geoCodingURL(placeQuery));
    if (data.length === 0) return;

    return { data: data };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateFoundPlacesData = (geodata) => {
  // Takes data direct from the geo coding API and converts to
  // local storage format (a "place" object)
  return geodata.map((item) => {
    return {
      id: Math.round(Math.random() * 1000000),
      type: "found",
      name: item.name,
      lat: item.lat,
      lon: item.lon,
      label: `${item.name}${item.state ? ", " + item.state : ""}${item.country ? ", " + item.country : ""}`,
    };
  });
};
