







import SubItems from "../sideBarItems/SubItems";
import crmStore from "../../Utils/crmStore";
import { setActiveMenu } from "../../Utils/Slices/systemSlice";
import { useDispatch, useSelector } from "react-redux";

const array = [
  { value: "Source Type", to: "/enquiryBucket/sourceType" },
  { value: "Enquiry Table", to: "/enquiryBucket/enquiryTable" },
];

function Bucket() {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.system.activeMenu);

  return (
    <li className={activeMenu === "Enquiry Bucket" ? "menu-item open" : "menu-item"}>
      <div
        onClick={() => {
          dispatch(setActiveMenu("Enquiry Bucket"));
        }}
        className="menu-link menu-toggle waves-effect"
      >
        <i className="menu-icon tf-icons mdi mdi-inbox"></i>
        <div>Enquiry Bucket</div>
      </div>

      <ul className="menu-sub">
        {array.map((el, index) => (
          <SubItems value={el.value} to={el.to} key={index} />
        ))}
      </ul>
    </li>
  );
}

export default Bucket;