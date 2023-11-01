import { getBrowserLocation } from "../modules/location";
import { useDispatch } from "react-redux";
import { RESET_STATE, SET_COORDS, SET_ERROR } from "../modules/types";

const GPSButton = () => {
  //// GPS BUTTON CLICKED ////
  const dispatch = useDispatch();
  const onClick = async () => {
    dispatch({ type: RESET_STATE });
    try {
      const { latitude: lat, longitude: lon } = await getBrowserLocation();
      dispatch({ type: SET_COORDS, payload: { lat, lon, city: "" } });
    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e });
    }
  };

  return (
    <div onClick={onClick} className="gps-button-container">
      <svg id="gps-button" viewBox="0 0 297 297">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M148.5,0C66.653,0,0.067,66.616,0.067,148.499C0.067,230.383,66.653,297,148.5,297s148.433-66.617,148.433-148.501 C296.933,66.616,230.347,0,148.5,0z M158.597,276.411v-61.274c0-5.575-4.521-10.097-10.097-10.097s-10.097,4.521-10.097,10.097 v61.274c-62.68-4.908-112.845-55.102-117.747-117.814h61.207c5.575,0,10.097-4.521,10.097-10.097s-4.522-10.097-10.097-10.097 H20.656C25.558,75.69,75.723,25.497,138.403,20.589v61.274c0,5.575,4.521,10.097,10.097,10.097s10.097-4.521,10.097-10.097V20.589 c62.681,4.908,112.846,55.102,117.747,117.814h-61.207c-5.575,0-10.097,4.521-10.097,10.097s4.521,10.097,10.097,10.097h61.207 C271.441,221.31,221.276,271.503,158.597,276.411z"></path>
        </g>
      </svg>
    </div>
  );
};

export default GPSButton;
