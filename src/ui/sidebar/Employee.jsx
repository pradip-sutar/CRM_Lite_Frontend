import { useState } from "react";
import SubItems from "../sideBarItems/SubItems";
import crmStore from "../../Utils/crmStore";
import { setActiveMenu } from "../../Utils/Slices/systemSlice";
import { useDispatch, useSelector } from "react-redux";

const array = [
  { value: "Employee", to: "/employee/Employee" },
];

function Employee() {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.system.activeMenu);

  return (
    <li className={activeMenu === "Employee Management" ? "menu-item open" : "menu-item"}>
      <div
        onClick={() => {
          dispatch(setActiveMenu("Employee Management"));
        }}
        className="menu-link menu-toggle waves-effect"
      >
        <span className="menu-icon tf-icons mdi mdi-briefcase"></span>
        <div>Employee Management</div>
      </div>
      <ul className="menu-sub">
        {array.map((el, index) => (
          <SubItems value={el.value} to={el.to} key={index} />
        ))}
      </ul>
    </li>
  );
}

export default Employee;