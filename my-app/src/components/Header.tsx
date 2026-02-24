import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

import { LOGO_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const onlineStatus = useOnlineStatus();
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={LOGO_URL} alt="logo" className="logo" />
        </Link>
      </div>

      <div className="nav-items">
        <ul>
          <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            Online status:
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: onlineStatus ? "#22c55e" : "#ef4444",
              }}
            />
            {onlineStatus ? "Online" : "Offline"}
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <button className="login-btn" onClick={handleClick}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
