import { NavLink } from "react-router-dom";

function Customer() {
  return (
    <li className="menu-item">
      <NavLink
        to="/customer"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-handshake-outline"></i>
        <div>Customer</div>
      </NavLink>
    </li>
  );
}

export default Customer;
