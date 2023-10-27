import React, { Component } from "react";
import Interface from "./components/Interface";
import { getIPLocation } from "./modules/ipaddress";
import "./App.css";

class App extends Component {
  state = {};

  async componentDidMount() {
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
    this.setState({ lat: null, lon: null, city: null, error: null });
  };

  onError = (message) => {
    this.setState({ error: message });
  };

  changeLatLon = (lat, lon) => {
    console.log("changelatlon", lat, lon);
    this.setState({ lat, lon });
  };

  render() {
    const { lat, lon, city, error } = this.state || {};
    return (
      <Interface lat={lat} lon={lon} city={city} error={error} onError={this.onError} changeLatLon={this.changeLatLon} resetState={this.resetState} />
    );
  }
}

export default App;
