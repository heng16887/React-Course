import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import Logo from "../assets/images/logo-white.png";
import MobileLogo from "../assets/images/mobile-logo.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import "./header.css";

export function Header({ cart }) {
  let totalQuantity = 0;
  // Exercise 8j
  const navigate = useNavigate();
  // Exercise 8L
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search');

  const [search, setSearch] = useState(initialSearch || '');

  const searchingButton = () => {
    navigate(`/?search=${search}`);
  };
 
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={Logo} />
          <img className="mobile-logo" src={MobileLogo} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" 
        onChange={(event) => setSearch(event.target.value)}/>

        <button className="search-button" onClick={searchingButton} value={search}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
