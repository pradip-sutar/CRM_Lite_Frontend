
import { NavLink } from "react-router-dom";

function DeadTable() {
  return (
    <li className="menu-item">
      <NavLink
        to="/enquiryBucket/deadTable"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-handshake-outline"></i>
        <div>Dead Table</div>
      </NavLink>
    </li>
  );
}

export default DeadTable;
