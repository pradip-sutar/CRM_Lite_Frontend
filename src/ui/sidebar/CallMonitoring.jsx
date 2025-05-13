




import React from 'react';
import { NavLink } from 'react-router-dom';

const CallMonitoring = () => {
  return (
    <li className="menu-item">
      <NavLink
        to="/callMonitoring"
        className={({ isActive }) => (isActive ? 'menu-link selected' : 'menu-link')}
      >
        <i className="menu-icon tf-icons mdi mdi-home-outline"></i>
        <div>Call Monitoring</div>
      </NavLink>
    </li>
  );
};

export default CallMonitoring;