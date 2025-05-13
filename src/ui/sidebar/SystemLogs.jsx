import { NavLink } from "react-router-dom";

function SystemLogs() {
  return (
    <li className="menu-item ">
      <NavLink
        to="/systemLogs"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-home-outline"></i>
        <div>System Logs</div>
      </NavLink>
    </li>
  );
}

export default SystemLogs;
