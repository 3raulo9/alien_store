import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, doLogout } from "../reducers/loginSlice"; // Adjust this import based on where your login slice is located
import { selectCartItems } from "../reducers/cartSlice"; // Adjust based on where your cart slice is located
import "../assets/css/Sidebar.css";
import TranslatorButton from "../components/TranslatorButton";
import translationAPI from "../APIS/translationAPI"; // Make sure to adjust the path based on your project structure

const Sidebar = () => {
  const isLogged = useSelector(selectLogged); // Use the selector to get the login state
  const cartItems = useSelector(selectCartItems); // Use the selector to get the cart items
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "");

  useEffect(() => {
    if (selectedLanguage) {
      translateDOM(document.body, selectedLanguage);
    }
  }, [selectedLanguage]);

  const translateDOM = async (node, language) => {
    const textNodes = [];
    const gatherTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textNodes.push(node);
      } else {
        for (const childNode of node.childNodes) {
          gatherTextNodes(childNode);
        }
      }
    };

    gatherTextNodes(node);

    const textsToTranslate = textNodes.map((node) => node.textContent.trim());
    if (textsToTranslate.length === 0) return;

    try {
      const translatedTexts = await translationAPI.translateBatch(textsToTranslate, language);
      textNodes.forEach((node, index) => {
        node.textContent = translatedTexts[index] || node.textContent;
      });
      localStorage.setItem("translatedTextNodes", JSON.stringify(textNodes.map(node => node.textContent)));
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

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
          <Link to="/cart/">
            <li className="hover-effect" style={{ position: 'relative' }}>
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
