import { NavLink } from "react-router-dom";

function Board() {
  return (
    <li className="menu-item ">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-home-outline"></i>
        <div>Dashboards</div>
      </NavLink>
    </li>
  );
}

export default Board;
