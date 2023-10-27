import { IP_API_URL } from "./config.js";
import axios from "axios";

// Calls the IPAPI.co API to get the lat/long of IP address of
// the User.
export const getIPLocation = async () => {
  try {
    const {
      data: { latitude, longitude },
    } = await axios.get(IP_API_URL);

    return { lat: latitude, lon: longitude };
  } catch (error) {
    return { error: error.message };
  }
};
