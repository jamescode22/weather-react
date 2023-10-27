import React, { Component } from "react";
import SearchChoicesListItems from "./SearchChoicesListItems";
import { placesSort, placesFilterByType } from "../modules/utils";

class SearchChoicesList extends Component {
  state = {};
  render() {
    const { places, onDeletePlace, onClickedPlace } = this.props;

    // sort all places into alphatetical order
    placesSort(places);

    // do filtering of places into found and saved
    const placesFound = placesFilterByType(places, "found");
    const placesSaved = placesFilterByType(places, "saved");

    return (
      <div className="choices">
        <div className="choices-found">
          {placesFound.length === 0 ? <p>Start typing to find a location...</p> : <></>}
          <SearchChoicesListItems places={placesFound} onClickedPlace={onClickedPlace} showDelete={false} />
        </div>
        <div className="choices-saved">
          {placesSaved.length > 0 ? <p>Locations Saved</p> : <></>}
          <SearchChoicesListItems places={placesSaved} showDelete={true} onClickedPlace={onClickedPlace} onDeletePlace={onDeletePlace} />
        </div>
      </div>
    );
  }
}

export default SearchChoicesList;
