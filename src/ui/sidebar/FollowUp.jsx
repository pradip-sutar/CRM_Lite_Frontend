import { useState } from "react";
import SubItems from "../sideBarItems/SubItems";
import crmStore from "../../Utils/crmStore";

const array = [
  { value: "Follow Up", to: "/followUp" },
  { value: "Pre Sales Enquiry", to: "/followUp/preSalesEnquiry" },
];

function FollowUp() {
  const [show, setShow] = useState(false);

  return (
    <li className={show ? "menu-item open" : "menu-item"}>
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="menu-link menu-toggle waves-effect"
      >
        <i className="menu-icon tf-icons mdi mdi-flip-to-front"></i>
        <div data-i18n="FollowUp">FollowUp</div>
      </div>
      <ul className="menu-sub">
        {array.map((el, index) => (
          <SubItems value={el.value} to={el.to} key={index} />
        ))}
      </ul>
    </li>
  );
}

export default FollowUp;