import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { hasTabPermission } from "../../Private/premissionChecker";
import crmStore from "../../Utils/crmStore";

const SystemMonitor = () => {
    const userType = crmStore.getState().user.userInfo.userType;
    const permissions = crmStore.getState().permisions.roleAndRights;
    return (
      <li className="menu-item">
        {(userType === "Super Admin" ||
          hasTabPermission("Power Monitoring", permissions)) && (
          <NavLink
            to="/EmployeeSystemMonitoring"
            className={({ isActive }) =>
              isActive ? "menu-link selected" : "menu-link"
            }
          >
            <i className="menu-icon tf-icons mdi mdi-home-outline"></i>
            <div>SystemMonitor</div>
          </NavLink>
        )}
      </li>
    );
  }
  

export default SystemMonitor
