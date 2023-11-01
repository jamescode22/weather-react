import Interface from "./components/Interface";
import { getIPLocation } from "./modules/ipaddress";
import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_COORDS, SET_ERROR } from "./modules/types";

const App = () => {
  // const [coords, setCoords] = useState({});
  // const [error, setError] = useState("");

  // REDUX
  const coords = useSelector((state) => state.coords);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const initLocation = async () => {
      const { lat, lon, error } = (await getIPLocation()) || {};

      if (error) {
        dispatch({ type: SET_ERROR, payload: error });
        return;
      }
      dispatch({ type: SET_COORDS, payload: { lat, lon, city: "" } });
    };
    initLocation();
  }, []);

  // const resetState = () => {
  //   // clears all state - lat, lon, city and error
  //   // - call before any new operation to force the loading screen
  //   dispatch({ type: SET_COORDS, payload: {} });
  //   onError("");
  // };

  // // Global callback to set the error state
  // const onError = (message) => {
  //   dispatch({ type: SET_ERROR, payload: message });
  // };

  // // Global callback to set a new lat and lon and city (a display override)
  // const changeLatLon = (lat, lon, city = "") => {
  //   dispatch({ type: SET_COORDS, payload: { lat, lon, city } });
  // };

  // const { lat, lon, city } = coords || {};

  // return <Interface lat={lat} lon={lon} city={city} error={error} onError={onError} changeLatLon={changeLatLon} resetState={resetState} />;
  return <Interface />;
};

export default App;
