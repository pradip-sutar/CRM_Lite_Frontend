import { useState } from "react";
import SubItems from "../sideBarItems/SubItems";
import { setActiveMenu } from "../../Utils/Slices/systemSlice";
import { useDispatch, useSelector } from "react-redux";

function SystemAdmin() {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.system.activeMenu);

  return (
    <li
      className={activeMenu === "SystemAdmin" ? "menu-item open" : "menu-item"}
    >
      <div
        onClick={() => {
          dispatch(setActiveMenu("SystemAdmin"));
        }}
        className="menu-link menu-toggle waves-effect"
      >
        <span className="menu-icon tf-icons mdi mdi-account-key"></span>
        <div>System Admin</div>
      </div>
      <ul className="menu-sub">
        <SubItems value="Company Info" to={"systemAdmin/companyInfo"} />
        <SubItems value="Bank Info" to={"systemAdmin/bankInfo"} />
      </ul>
    </li>
  );
}

export default SystemAdmin;