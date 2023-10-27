import React, { Component } from "react";
import SearchChoicesListItem from "./SearchChoicesListItem";

class SearchChoicesList extends Component {
  state = {};
  render() {
    const { places } = this.props || {};

    // do filtering of places into found and saved here
    const placesFound = places.filter((item) => item.type === "found");
    const placesSaved = places.filter((item) => item.type === "saved");

    return (
      <div className="choices">
        <div className="choices-found">
          <SearchChoicesListItem places={placesFound} showDelete={false} />
        </div>
        <div className="choices-saved">
          <p>Locations Saved</p>
          <div>
            <SearchChoicesListItem places={placesSaved} showDelete={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchChoicesList;
