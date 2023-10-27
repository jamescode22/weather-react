import React from "react";
import Header from "./Header";
import Weather from "./Weather";

export const Interface = (props) => {
  return (
    <>
      <Header {...props} />
      <Weather {...props} />
    </>
  );
};

export default Interface;
