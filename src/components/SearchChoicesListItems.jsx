import React from "react";

const SearchChoicesListItems = (props) => {
  const { places, showDelete, onDeletePlace, onClickedPlace } = props;

  return places.map((item) => {
    const { label, id } = item;

    const pJSX = <p onClick={() => onClickedPlace(id)}>{item.label}</p>;

    const deleteJSX = showDelete ? (
      <div onClick={() => onDeletePlace(id)} className="delete-button">
        <div></div>
      </div>
    ) : (
      <></>
    );

    return (
      <div key={id}>
        {pJSX}
        {deleteJSX}
      </div>
    );
  });
};

export default SearchChoicesListItems;
