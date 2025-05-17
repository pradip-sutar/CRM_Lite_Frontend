import { useState } from "react";
import SubItems from "../sideBarItems/SubItems";
import crmStore from "../../Utils/crmStore";
import { hasSubTabPermission } from "../../Private/premissionChecker";
import { setActiveMenu } from "../../Utils/Slices/systemSlice";
import { useDispatch, useSelector } from "react-redux";
function Agent() {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.system.activeMenu);
  const userType = crmStore.getState().user?.userInfo?.userType;
  const permissions = crmStore.getState().permisions?.roleAndRights;
  const [show, setShow] = useState(false);
  return (
    <li className={activeMenu === "Agent Management" ? "menu-item open" : "menu-item"}>
      <div
        onClick={() => {
          dispatch(setActiveMenu("Agent Management"));
        }}
        className="menu-link menu-toggle waves-effect"
      >
        <i className="menu-icon tf-icons mdi mdi-account-star "></i>
        <div>Agent Management</div>
      </div>
      <ul className="menu-sub">

        <SubItems value="Agent Type" to={"AgentManagement/Agent_Type"} />


        <SubItems value="Agent Profile" to={"AgentManagement/AgentProfile"} />

        <SubItems value="Commission" to={"/AgentManagement/Commission"} />

      </ul>
    </li>
  );
}

export default Agent;
