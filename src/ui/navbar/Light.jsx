import { useState } from "react";
import LightItem from "../navbarItem/LightItem";

function Light() {
  const [show, setShow] = useState(false);
  return (
    <li
      onClick={() => setShow(!show)}
      className="nav-item dropdown-style-switcher dropdown me-1 me-xl-0"
    >
      <div
        className={
          show
            ? `nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow waves-effect waves-light show`
            : `nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow waves-effect waves-light`
        }
        data-bs-toggle="dropdown"
      >
        <i className="mdi mdi-24px mdi-weather-sunny"></i>
      </div>
      {
        <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
          <LightItem icon="weather-sunny" light="light" />
          <LightItem icon="weather-night" light="Dark" />
          <LightItem icon="monitor" light="System" />
        </ul>
      }
    </li>
  );
}

export default Light;
