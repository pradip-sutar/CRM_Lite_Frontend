

import { NavLink } from "react-router-dom";

function Employee() {
  return (
    <li className="menu-item">
      <NavLink
        to="/employee/Employee"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-briefcase"></i>
        <div>Employee</div>
      </NavLink>
    </li>
  );
}

export default Employee;
