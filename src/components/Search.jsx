import React, { Component } from "react";

import SearchInputBox from "./SearchInputBox";
import SearchChoicesList from "./SearchChoicesList";

import { getPlacesFromInput, updateFoundPlacesData } from "../modules/geodata";

class Search extends Component {
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

  state = {
    places: [],
    placesOpen: false,
    inputValue: "",
  };

  componentDidMount() {
    // load saved places from localstorage
    const savedPlaces = JSON.parse(localStorage.getItem("savedplaces-react")) || [];
    this.setState({ places: savedPlaces });
  }

  onInputClick = () => {
    // search input box clicked - clear global errors,
    // open menu and clear input box
    this.props.resetState();
    this.setState({ placesOpen: true });
    this.setState({ inputValue: "" });
  };

  onInputChange = async (value) => {
    // something is typed into the search box

    const { places } = this.state;
    const { onError } = this.props;

    // set value of input box
    this.setState({ inputValue: value });

    // clear any existing found places from drop down list, keep saved only
    const savedPlaces = places.filter((item) => item.type !== "found");
    this.setState({ places: savedPlaces });

    // do the API call
    const geoDataRes = await getPlacesFromInput(value);

    // If no result, exit
    if (!geoDataRes) return;

    // If there's an error returned, call the global error handler
    if (geoDataRes.error) {
      onError(geoDataRes.error);
      return;
    }

    // convert the API data into clean places objects
    const foundPlaces = updateFoundPlacesData(geoDataRes.data);

    // add the new found places to the existing saved places
    // back to the state.
    this.setState({ places: [...savedPlaces, ...foundPlaces] });
  };

  onDeletePlace = (id) => {
    // remove a place from the place list
    const { places } = this.state;
    this.setState({ places: places.filter((place) => place.id !== Number(id)) });
  };

  ////// A PLACE IS CLICKED ON THE DROP DOWN LIST //////
  onClickedPlace = (id) => {
    const { places } = this.state;
    const { changeLatLon, resetState } = this.props;

    // get the place that was clicked
    const chosenPlace = places.find((item) => item.id === Number(id));
    const { lon, lat, name, label } = chosenPlace;

    // get all the other non-clicked places from the state
    const notChosenPlaces = places.filter((item) => item.id !== Number(id));

    // only keep the non-click places that are saved - i.e. delete older found items
    const notChosenSavedPlaces = notChosenPlaces.filter((item) => item.type == "saved");

    // Close dropdown list
    this.setState({ placesOpen: false });

    // save this place as a saved place, along with older non-clicked saved places
    chosenPlace.type = "saved";
    localStorage.setItem("savedplaces-react", JSON.stringify([...notChosenSavedPlaces, chosenPlace]));

    // save back to the state
    this.setState({ places: [chosenPlace, ...notChosenPlaces] });

    // set input box value
    this.setState({ inputValue: label });

    // Clear top level state and errors
    resetState();

    // Set a new lat lon on the app
    changeLatLon(lat, lon, name);
  };

  render() {
    const { places = [], placesOpen = false, inputValue = "" } = this.state;
    const { error } = this.props;

    // ONLY SHOW POPUP PLACES SEARCH IF THERE'S NO GLOBAL ERROR
    return (
      <>
        <SearchInputBox onInputChange={this.onInputChange} onInputClick={this.onInputClick} inputValue={inputValue} />
        {placesOpen && !error ? <SearchChoicesList places={places} onDeletePlace={this.onDeletePlace} onClickedPlace={this.onClickedPlace} /> : <></>}
      </>
    );
  }
}

export default Search;
