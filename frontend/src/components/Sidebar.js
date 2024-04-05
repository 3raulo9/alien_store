import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, doLogout } from "../reducerApi/loginSlice"; // Adjust this import based on where your login slice is located
import "../assets/css/Sidebar.css";
import TranslatorButton from "../components/TranslatorButton";

const Sidebar = () => {
  const isLogged = useSelector(selectLogged); // Use the selector to get the login state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  const lordIconStyle = {
    width: "60px",
    height: "60px",
    // additional properties specific to lord-icon can go here
  };
  const handleLogout = () => {
    dispatch(doLogout()); // Dispatch the logout action
    navigate("/"); // Redirect to the home page after logging out
  };

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
        style={{
          marginLeft: "7px",
          color: "#21d07a",
          textShadow:
            "0 0 0.75px rgba(0, 255, 0, 0.7), 0 0 1.5px rgba(0, 255, 0, 0.5), 0 0 2.25px rgba(0, 255, 0, 0.3)",
          fontSize: "24px",
        }}
      >
        <span className="arshop-button" style={{ fontSize: "24px" }}>
          <i>Nebuja</i>
        </span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/cart">
            <li className="hover-effect">
              <lord-icon
                style={lordIconStyle}
                src="https://cdn.lordicon.com/odavpkmb.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#21d07a"
              ></lord-icon>
              <div style={{ margin: `${5}px` }}></div>
              <i>CART</i>
            </li>
          </Link>
        </li>

        {!isLogged ? (
          // Show login and register buttons if not logged in
          <>
            <li>
              <Link to="/login">
                <li className="hover-effect">
                  <lord-icon
                    style={lordIconStyle}
                    src="https://cdn.lordicon.com/uecgmesg.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#21d07a"
                    state="hover-squeeze"
                  ></lord-icon>
                  <div style={{ margin: `${5}px` }}></div>
                  <i>LOGIN</i>
                </li>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <li className="hover-effect">
                  <lord-icon
                    style={lordIconStyle}
                    src="https://cdn.lordicon.com/wzwygmng.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#21d07a"
                  ></lord-icon>
                  <div style={{ margin: `${5}px` }}></div>
                  <i>REGISTER</i>
                </li>
              </Link>
            </li>
          </>
        ) : (
          <ul className="nav-links">
            <Link to="/profile">
              <li className="hover-effect">
                <lord-icon
                  style={lordIconStyle}
                  src="https://cdn.lordicon.com/kzrjvkoe.json"
                  colors="primary:#ffffff,secondary:#21d07a"
                  trigger="hover"

                ></lord-icon>
                <div style={{ margin: `${5}px` }}></div>
                <i>Profile</i>
              </li>
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
