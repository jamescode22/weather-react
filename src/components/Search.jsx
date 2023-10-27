import React, { Component } from "react";

import SearchInputBox from "./SearchInputBox";
import SearchChoicesList from "./SearchChoicesList";

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

  // make some data for testing

  onInputChange = () => {
    // something is typed into the search box
  };

  state = {
    places: [
      { id: 3324234, type: "found", name: "Birmingham", lat: 12, lon: 43, label: "Birmingham, Alabama, US" },
      { id: 45345, type: "saved", name: "Surbiton", lat: 2, lon: 5, label: "Surbiton, UK" },
    ],
    placesOpen: false,
  };

  render() {
    const { places, placesOpen } = this.state || {};
    return (
      <>
        <SearchInputBox />
        {placesOpen ? <SearchChoicesList places={places} /> : <></>}
      </>
    );
  }
}

export default Search;
