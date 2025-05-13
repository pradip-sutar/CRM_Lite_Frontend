
import { NavLink } from "react-router-dom";

function Visit() {
  return (
    <li className="menu-item">
      <NavLink
        to="/followUp/Visit"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-handshake-outline"></i>
        <div>Visit</div>
      </NavLink>
    </li>
  );
}

export default Visit;
