import { RESET_STATE, DELETE_PLACE, SET_COORDS, SET_ERROR, SET_INPUT_VALUE, SET_PLACES, SET_PLACES_OPEN, SET_WEATHER } from "./types";

const initialState = { error: "", coords: {}, weatherData: {}, places: [], placesOpen: false, placesInputValue: "" };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COORDS: {
      return { ...state, coords: { ...action.payload } };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case SET_WEATHER: {
      return { ...state, weatherData: action.payload };
    }
    case RESET_STATE: {
      // clear everything apart from the places list
      return { ...state, error: "", coords: {}, weatherData: {}, placesOpen: false, placesInputValue: "" };
    }
    case SET_PLACES: {
      return { ...state, places: action.payload };
    }
    case SET_PLACES_OPEN: {
      return { ...state, placesOpen: action.payload };
    }
    case SET_INPUT_VALUE: {
      return { ...state, placesInputValue: action.payload };
    }
    case DELETE_PLACE: {
      const _places = [...state.places];
      return { ...state, places: _places.filter((place) => place.id !== Number(action.payload)) };
    }
    default:
      return state;
  }
};
