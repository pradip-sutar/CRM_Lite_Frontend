import { NavLink } from "react-router-dom";

function PaymentReceipt() {
  return (
    <li className="menu-item">
      <NavLink
        to="/sales/paymentRecipt"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-handshake-outline"></i>
        <div>Payment Receipt</div>
      </NavLink>
    </li>
  );
}

export default PaymentReceipt;
