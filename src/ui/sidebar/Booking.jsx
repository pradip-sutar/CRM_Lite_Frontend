
import { NavLink } from "react-router-dom";

function Booking() {
  return (
    <li className="menu-item">
      <NavLink
        to="/Booking"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-bookmark-check"></i>
        <div>Booking</div>
      </NavLink>
    </li>
  );
}

export default Booking;
