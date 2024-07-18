import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, doLogout } from "../reducers/loginSlice"; // Adjust this import based on where your login slice is located
import { selectCartItems } from "../reducers/cartSlice"; // Adjust based on where your cart slice is located
import "../assets/css/Sidebar.css";
import TranslatorButton from "../components/TranslatorButton";


const Sidebar = () => {
  const isLogged = useSelector(selectLogged); 
  const cartItems = useSelector(selectCartItems); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "");

useEffect(() => {
}, [refresh])


  const lordIconStyle = {
    width: "60px",
    height: "60px",
  };

  const handleLogout = () => {
    dispatch(doLogout()); 
    navigate("/");
    setRefresh(!refresh); 
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="sidebar">
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <Link
        to="/"
        className="brand-logo"
      >
        <span className="arshop-button">
          <i>Nebuja</i>
        </span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/cart/">
            <div className="hover-effect link-button" style={{ position: 'relative' }}>
              <lord-icon
                style={lordIconStyle}
                src="https://cdn.lordicon.com/odavpkmb.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#21d07a"
              ></lord-icon>
              {totalCartItems > 0 && (
                <span className="cart-badge">{totalCartItems}</span>
              )}
              <div style={{ margin: `${5}px` }}></div>
              <i>CART</i>
            </div>
          </Link>
        </li>

        {!isLogged ? (
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
          <ul className="nav-links">
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

            <Link onClick={handleLogout}>
              <li className="hover-effect">
                <lord-icon
                  style={lordIconStyle}
                  src="https://cdn.lordicon.com/rljrflzd.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#21d07a"
                ></lord-icon>
                <div style={{ margin: `${5}px` }}></div>
                <i>LOGOUT</i>
              </li>
            </Link>
          </ul>
        )}

        <TranslatorButton />
        
      </ul>

      <div className="promo-message">
        FOR A LIMITED TIME, ALL ORDERS WILL ENJOY FREE SHIPPING TO PROXIMA
        CENTAURI. SHOP NOW
      </div>
    </div>
  );
};

export default Sidebar;
