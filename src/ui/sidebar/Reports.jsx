import { NavLink } from "react-router-dom";

function Reports() {
  return (
    <li className="menu-item">
      <NavLink
        to="/report"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-handshake-outline"></i>
        <div>Report</div>
      </NavLink>
    </li>
  );
}

export default Reports;
