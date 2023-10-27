import React from "react";

const SearchInputBox = ({ onInputChange, onInputClick, inputValue }) => {
  return (
    <input
      type="text"
      name="location"
      id="location"
      value={inputValue}
      placeholder="Enter a city or town"
      onChange={(e) => onInputChange(e.target.value)}
      onClick={onInputClick}
    />
  );
};

export default SearchInputBox;
