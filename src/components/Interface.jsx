import React, { Component } from "react";
import Header from "./Header";
import Weather from "./Weather";

class Interface extends Component {
  render() {
    console.log("INTER", this.props);
    return (
      <>
        <Header {...this.props} />
        <Weather {...this.props} />
      </>
    );
  }
}

export default Interface;
