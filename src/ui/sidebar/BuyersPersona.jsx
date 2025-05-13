import { useState } from "react";
import SubItems from "../sideBarItems/SubItems";
import { setActiveMenu } from "../../Utils/Slices/systemSlice";
import { useDispatch,useSelector} from "react-redux";

function BuyersPersona() {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.system.activeMenu);
  return (
    <li className={activeMenu === "Buyers Persona" ? "menu-item open" : "menu-item"}>
      <div
        onClick={() => {
          dispatch(setActiveMenu("Buyers Persona"));
        }}
        className="menu-link menu-toggle waves-effect"
      >
        <i className="menu-icon tf-icons mdi mdi-account-tie"></i>
        <div>Buyers Persona</div>
      </div>
      <ul className="menu-sub">
        <SubItems value="Masters" to="/BuyersPersona/Masters" />
        <SubItems value="Expectation" to="/BuyersPersona/Expectation" />
      </ul>
    </li>
  );
}
export default BuyersPersona;
