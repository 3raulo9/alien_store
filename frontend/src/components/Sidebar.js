import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, doLogout, selectToken } from "../reducers/loginSlice"; // Adjust this import based on where your login slice is located
import { selectCartItems } from "../reducers/cartSlice"; // Adjust based on where your cart slice is located
import "../assets/css/Sidebar.css";
import TranslatorButton from "../components/TranslatorButton";
// Make sure to adjust the path based on your project structure

const Sidebar = () => {
  const isLogged = useSelector(selectLogged); // Use the selector to get the login state
  const token = useSelector(selectToken); // Use the selector to get the token
  const cartItems = useSelector(selectCartItems); // Use the selector to get the cart items
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "");

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  const lordIconStyle = {
    width: "60px",
    height: "60px",
  };

  const handleLogout = () => {
    dispatch(doLogout()); // Dispatch the logout action
    navigate("/");
    setRefresh(!refresh); // Redirect to the home page after logging out
  };

  // Calculate the total number of items in the cart
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="sidebar">
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <Link to="/" className="brand-logo">
        <span className="arshop-button">
          <i>Nebuja</i>
        </span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/cart/">
            <div className="hover-effect link-button" style={{ position: "relative" }}>
              <lord-icon
                style={lordIconStyle}
                src="https://cdn.lordicon.com/odavpkmb.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#21d07a"
              ></lord-icon>
              {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
              <div style={{ margin: `${5}px` }}></div>
              <i>CART</i>
            </div>
          </Link>
        </li>

        {!isLogged ? (
          // Show login and register buttons if not logged in
          <>
            <li>
              <Link to="/login">
                <div className="hover-effect link-button">
                  <lord-icon
                    style={lordIconStyle}
                    src="https://cdn.lordicon.com/uecgmesg.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#21d07a"
                    state="hover-squeeze"
                  ></lord-icon>
                  <div style={{ margin: `${5}px` }}></div>
                  <i>LOGIN</i>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <div className="hover-effect link-button">
                  <lord-icon
                    style={lordIconStyle}
                    src="https://cdn.lordicon.com/wzwygmng.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#21d07a"
                  ></lord-icon>
                  <div style={{ margin: `${5}px` }}></div>
                  <i>REGISTER</i>
                </div>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile">
                <div className="hover-effect link-button">
                  <lord-icon
                    style={lordIconStyle}
                    src="https://cdn.lordicon.com/kzrjvkoe.json"
                    colors="primary:#ffffff,secondary:#21d07a"
                    trigger="hover"
                  ></lord-icon>
                  <div style={{ margin: `${5}px` }}></div>
                  <i>Profile</i>
                </div>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout}>
                <div className="hover-effect link-button">
                  <lord-icon
                    style={lordIconStyle}
                    src="https://cdn.lordicon.com/rljrflzd.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#21d07a"
                  ></lord-icon>
                  <div style={{ margin: `${5}px` }}></div>
                  <i>LOGOUT</i>
                </div>
              </Link>
            </li>
            {isLogged && token && (
              <li>
                <Link to="/admin">
                  <div className="hover-effect link-button">
                    <lord-icon
                      style={lordIconStyle}
                      src="https://cdn.lordicon.com/zzcjjxew.json"
                      trigger="hover"
                      colors="primary:#ffffff,secondary:#21d07a"
                    ></lord-icon>
                    <div style={{ margin: `${5}px` }}></div>
                    <i>Admin</i>
                  </div>
                </Link>
              </li>
            )}
          </>
        )}

        <TranslatorButton />
      </ul>

      <div className="promo-message">
        FOR A LIMITED TIME, ALL ORDERS WILL ENJOY FREE SHIPPING TO PROXIMA CENTAURI. SHOP NOW
      </div>
    </div>
  );
};

export default Sidebar;
