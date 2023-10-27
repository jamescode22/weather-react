import React from "react";

const SearchChoicesListItem = (props) => {
  const { places, showDelete } = props || {};

  return places.map((item) => {
    const { label, id } = item;

    const deleteJSX = (
      <div key={id} id={id} className="delete-button">
        <div></div>
      </div>
    );

    return (
      <>
        <p key={id} id={id}>
          {item.label}
        </p>
        {showDelete ? deleteJSX : <></>}
      </>
    );
  });
};

export default SearchChoicesListItem;
