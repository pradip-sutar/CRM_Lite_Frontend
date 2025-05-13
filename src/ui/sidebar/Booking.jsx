import { useState } from "react";
import SubItems from "../sideBarItems/SubItems";
import { setActiveMenu } from "../../Utils/Slices/systemSlice";
import { useDispatch,useSelector} from "react-redux";

function Booking() {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.system.activeMenu);
  return (
    <li className={activeMenu === "Booking Form" ? "menu-item open" : "menu-item"}>
      <div
        onClick={() => {
          dispatch(setActiveMenu("Booking Form"));
        }}
        className="menu-link menu-toggle waves-effect"
      >
        <i className="menu-icon tf-icons mdi mdi-bookmark-check"></i>
        <div>Booking Form</div>
      </div>
      <ul className="menu-sub">
        {/* <SubItems value="allotment" to="/BookingForm/allotment" /> */}
        <SubItems value="Booking" to="/Booking" />
      </ul>
    </li>
  );
}
export default Booking;
