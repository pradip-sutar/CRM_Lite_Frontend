import { NavLink } from "react-router-dom";

function Product() {
  return (
    <li className="menu-item">
      <NavLink
        to="/product/product-details"
        className={({ isActive }) =>
          isActive ? "menu-link selected" : "menu-link"
        }
      >
        <i className="menu-icon tf-icons mdi mdi-handshake-outline"></i>
        <div>Product</div>
      </NavLink>
    </li>
  );
}

export default Product;
