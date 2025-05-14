import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../../Utils/Slices/systemSlice";
import SubItems from "../sideBarItems/SubItems";

function SystemAdmin() {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.system.activeMenu);

  return (
    <li
      className={activeMenu === "SystemAdmin" ? "menu-item open" : "menu-item"}
    >
      <style>
        {`
          .menu-item {
            list-style: none;
            position: relative;
          }

          .menu-link {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .menu-icon {
            margin-right: 0.75rem;
          }

          .menu-sub {
            display: none;
            overflow: hidden;
            padding-left: 2.5rem;
          }
          .submenu-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding-bottom: 0.3rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submenu-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}



          .menu-item.open .menu-sub {
            display: block;
            animation: slideDown 0.3s ease forwards;
          }

          .menu-sub li {
            opacity: 0;
            transform: translateX(-20px);
            animation: slideIn 0.3s ease forwards;
            transition: background-color 0.2s ease, transform 0.2s ease;
          }

          .menu-sub li:nth-child(1) {
            animation-delay: 0.1s;
          }

          .menu-sub li:nth-child(2) {
            animation-delay: 0.2s;
          }

        

          @keyframes slideDown {
            from {
              height: 0;
              opacity: 0;
            }
            to {
              height: auto;
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .menu-item:not(.open) .menu-sub {
            animation: slideUp 0.3s ease forwards;
          }

          @keyframes slideUp {
            from {
              height: auto;
              opacity: 1;
            }
            to {
              height: 0;
              opacity: 0;
            }
          }
        `}
      </style>

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
        <li className="submenu-card">
          <SubItems value="Company Info" to={"systemAdmin/companyInfo"} />
        </li>
        <li className="submenu-card">
          <SubItems value="Bank Info" to={"systemAdmin/bankInfo"} />
        </li>
      </ul>

    </li>
  );
}

export default SystemAdmin;
