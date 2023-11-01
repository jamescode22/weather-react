import React, { Component } from "react";
import GPSButton from "./GPSButton";
import Search from "./Search";

class Header extends Component {
  render() {
    const { onError, changeLatLon, resetState, error } = this.props;

    return (
      <header>
        <h1>
          <a href="index.html">Weather</a>
        </h1>
        <Search changeLatLon={changeLatLon} resetState={resetState} onError={onError} error={error} />
        <GPSButton />
      </header>
    );
  }
}

export default Header;
