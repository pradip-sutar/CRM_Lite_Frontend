
import { NavLink } from "react-router-dom";

function Quatation() {
  return (
    <li className="menu-item">
      <NavLink
        to="/followUp/Quotation"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-handshake-outline"></i>
        <div>Quatation</div>
      </NavLink>
    </li>
  );
}

export default Quatation;
