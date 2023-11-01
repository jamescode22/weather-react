import SearchInputBox from "./SearchInputBox";
import SearchChoicesList from "./SearchChoicesList";

import { getPlacesFromInput, updateFoundPlacesData } from "../modules/geodata";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DELETE_PLACE, RESET_STATE, SET_COORDS, SET_ERROR, SET_INPUT_VALUE, SET_PLACES, SET_PLACES_OPEN } from "../modules/types";
import { getByDisplayValue } from "@testing-library/react";

const Search = () => {
  // all logic for searching for places goes here
  // state - places, placesOpen
  // --- places is an array of objects with keys:
  ///   -- id - randomly generated unique id
  ///   -- name (the city or town)
  ///   -- type - either "found" for places returned by geo search API, or "saved" for places saved by user
  ///   -- latitude
  ///   -- longitude
  ///   -- label (nice format for display in list or input)
  ///    --    -- eg Birmingham, Alabama, US

  /// placesOpen - boolean, is the places dropdown list showing on the screen?

  const places = useSelector((state) => state.places);
  const placesOpen = useSelector((state) => state.placesOpen);
  const inputValue = useSelector((state) => state.placesInputValue);

  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedPlaces = JSON.parse(localStorage.getItem("savedplaces-react")) || [];
    dispatch({ type: SET_PLACES, payload: savedPlaces });
  }, []);

  const onInputClick = () => {
    // search input box clicked - clear global errors,
    // open menu and clear input box
    dispatch({ type: RESET_STATE });
    dispatch({ type: SET_PLACES_OPEN, payload: true });
    dispatch({ type: SET_INPUT_VALUE, payload: "" });
  };

  const onInputChange = async (value) => {
    // something is typed into the search box

    // set value of input box
    dispatch({ type: SET_INPUT_VALUE, payload: value });

    // clear any existing found places from drop down list, keep saved only
    const savedPlaces = places.filter((item) => item.type !== "found");

    // do the API call
    const geoDataRes = await getPlacesFromInput(value);

    // If no result, exit
    if (!geoDataRes) return;

    // If there's an error returned, call the global error handler
    if (geoDataRes.error) {
      dispatch({ type: SET_ERROR, payload: geoDataRes.error });
      return;
    }

    // convert the API data into clean places objects
    const foundPlaces = updateFoundPlacesData(geoDataRes.data);

    // add the new found places to the existing saved places
    // back to the state.
    dispatch({ type: SET_PLACES, payload: [...savedPlaces, ...foundPlaces] });
  };

  const onDeletePlace = (id) => {
    // remove a place from the place list
    dispatch({ type: DELETE_PLACE, payload: id });
  };

  ////// A PLACE IS CLICKED ON THE DROP DOWN LIST //////
  const onClickedPlace = (id) => {
    // get the place that was clicked
    const chosenPlace = places.find((item) => item.id === Number(id));
    const { lon, lat, name, label } = chosenPlace;

    // get all the other non-clicked places from the state
    const notChosenPlaces = places.filter((item) => item.id !== Number(id));

    // only keep the non-click places that are saved - i.e. delete older found items
    const notChosenSavedPlaces = notChosenPlaces.filter((item) => item.type == "saved");

    // Close dropdown list
    dispatch({ type: SET_PLACES_OPEN, payload: false });

    // save this place as a saved place, along with older non-clicked saved places
    chosenPlace.type = "saved";
    localStorage.setItem("savedplaces-react", JSON.stringify([...notChosenSavedPlaces, chosenPlace]));

    // save back to the state
    dispatch({ type: SET_PLACES, payload: [chosenPlace, ...notChosenPlaces] });

    // Clear top level state and errors
    dispatch({ type: RESET_STATE });

    // set input box value
    dispatch({ type: SET_INPUT_VALUE, payload: label });

    // Set a new lat lon on the app
    const coords = { lon, lat, city: name };
    dispatch({ type: SET_COORDS, payload: coords });
  };

  return (
    <>
      <SearchInputBox onInputChange={onInputChange} onInputClick={onInputClick} inputValue={inputValue} />
      {placesOpen && !error ? <SearchChoicesList places={places} onDeletePlace={onDeletePlace} onClickedPlace={onClickedPlace} /> : <></>}
    </>
  );
};

export default Search;
