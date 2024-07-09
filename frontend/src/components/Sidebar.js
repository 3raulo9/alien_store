// Sidebar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, doLogout } from "../reducers/loginSlice";
import { selectCartItems } from "../reducers/cartSlice";
import "../assets/css/Sidebar.css";
import TranslatorButton from "../components/TranslatorButton";
import translationAPI from "../APIS/translationAPI";
import LoaderMain from "../components/LoaderMain"; // Import LoaderMain

const Sidebar = () => {
  const isLogged = useSelector(selectLogged);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "");
  const [loading, setLoading] = useState(false); // State to manage loader visibility

  useEffect(() => {
    if (selectedLanguage) {
      translateDOM(document.body, selectedLanguage);
    }
  }, [selectedLanguage]);

  const translateDOM = async (node, language) => {
    setLoading(true); // Show loader
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
    } finally {
      setTimeout(() => setLoading(false), 4000); // Hide loader after 4 seconds
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

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
      <LoaderMain loading={loading} /> {/* Add LoaderMain component */}
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

        <TranslatorButton setLoading={setLoading} /> {/* Pass setLoading to TranslatorButton */}
      </ul>

      <div className="promo-message">
        FOR A LIMITED TIME, ALL ORDERS WILL ENJOY FREE SHIPPING TO PROXIMA
        CENTAURI. SHOP NOW
      </div>
    </div>
  );
};

export default Sidebar;
