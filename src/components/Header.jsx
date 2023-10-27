import React, { Component } from "react";
import GPSButton from "./GPSButton";
import Search from "./Search";

class Header extends Component {
  render() {
    // get event handlers

    const { onError, changeLatLon, resetState } = this.props;

    return (
      <header>
        <h1>
          <a href="index.html">Weather</a>
        </h1>
        <Search />
        <GPSButton onError={onError} changeLatLon={changeLatLon} resetState={resetState} />
      </header>
    );
  }
}

export default Header;
