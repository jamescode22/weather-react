// TAKES ARRAY OF PLACES AND SORTS A-Z (in place)
export const placesSort = (places) => {
  places.sort((itemA, itemB) => {
    if (itemA.name < itemB.name) return -1;
    if (itemA.name > itemB.name) return 1;
    return 0;
  });
};

export const placesFilterByType = (places, type) => {
  return places.filter((item) => item.type === type);
};
