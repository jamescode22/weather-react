import React, { Component } from "react";
import Interface from "./components/Interface";
import { getIPLocation } from "./modules/ipaddress";
import "./App.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    // Initial behaviour, try to get an initial lat long based
    // on IP address.
    const { lat, lon, error } = (await getIPLocation()) || {};

    if (error) {
      this.onError(error);
      return;
    }
    this.changeLatLon(lat, lon);
  }

  resetState = () => {
    // clears all state - lat, lon, city and error
    // - call before any new operation to force the loading screen
    this.setState({});
  };

  // Global callback to set the error state
  onError = (message) => {
    this.setState({ error: message });
  };

  // Global callback to set a new lat and lon and city (a display override)
  changeLatLon = (lat, lon, city) => {
    this.setState({ lat, lon, city });
  };

  render() {
    const { lat, lon, city, error } = this.state || {};
    return (
      <Interface lat={lat} lon={lon} city={city} error={error} onError={this.onError} changeLatLon={this.changeLatLon} resetState={this.resetState} />
    );
  }
}

export default App;
