import { NavLink } from "react-router-dom";

function SubItems({ value, to }) {
  return (
    <li className="menu-item">
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <div>{value}</div>
      </NavLink>
    </li>
  );
}

export default SubItems;
