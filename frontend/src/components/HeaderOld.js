import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../assets/css/GlowEffect.css"; // Ensure you have this CSS file with the animations
import { Col } from "react-bootstrap";

const Header = () => {
  // State to manage the current font
  const [fontFamily, setFontFamily] = useState("OuterRimAf-d9Kq7");
  const fontFamilies = [
    "OuterRimAf-d9Kq7",
    "Narcotix-lPJX",
    "KitisakkullianAf-ALWnx",
    "alien",
    "Wingdings, sans-serif",
    "Zdyk Sagittarius",
    "ex-kata2",
    "Anta",
    "Mage Script",
    "AlienAlphabet-nRRqJ",
    "ex-hira1",
    "electroharmonix",
    "nyamawemban",
    "kremlin",
  ];

  const toggleFont = () => {
    // Find the index of the current fontFamily
    const currentFontIndex = fontFamilies.indexOf(fontFamily);
    // Determine the next font index (cycle back to 0 if at the end of the array)
    const nextFontIndex = (currentFontIndex + 1) % fontFamilies.length;
    // Set the font family state to the next font
    setFontFamily(fontFamilies[nextFontIndex]);
  };

  // Use effect to apply the font family change to the entire page
  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  // Custom style for larger icons
  const lordIconStyle = {
    width: "60px",
    height: "60px",

    // additional properties specific to lord-icon can go here
  };

  // Separate style for img tag to prevent redeclaration error
  const imgStyle = {
    width: "60px", 
    height: "65px", 
    objectFit: "contain", 
  };

  return (
    <Col style={{ fontFamily }}>
      <nav style={{ backgroundColor: "#0c0c0c" }}>
        <div class="lines">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div className="nav-wrapper">
          <Link
            to="/"
            className="brand-logo" 
            style={{
              marginLeft: "50px",
              color: "#21d07a",
              textShadow:
                "0 0 0.75px rgba(0, 255, 0, 0.7), 0 0 1.5px rgba(0, 255, 0, 0.5), 0 0 2.25px rgba(0, 255, 0, 0.3)",
              fontSize: "24px", 
            }}
          >
            <span className="arshop-button" style={{ fontSize: "24px" }}>
              ARSHOP
            </span>{" "}
          </Link>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              {/* Use Link for navigation to cart */}
              <Link to="/cart">
                <lord-icon
                  style={lordIconStyle}
                  src="https://cdn.lordicon.com/odavpkmb.json"
                  stroke="bold"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#21d07a"
                ></lord-icon>
                CART
              </Link>
            </li>

            <li>
              <Link to="/login">
                <lord-icon
                  style={lordIconStyle}
                  src="https://cdn.lordicon.com/uecgmesg.json"
                  trigger="hover"
                  stroke="bold"
                  state="hover-squeeze"
                  colors="primary:#ffffff,secondary:#21d07a"
                ></lord-icon>
                LOGIN
              </Link>
            </li>
            <li>
              <Link to="/register">
                <lord-icon
                  style={lordIconStyle}
                  src="https://cdn.lordicon.com/wzwygmng.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#ffffff,secondary:#21d07a"
                ></lord-icon>
                REGISTER
              </Link>
            </li>

            <li>
              <a onClick={toggleFont} className="glow-on-hover">
                <i>
                  <img
                    src="/images/translation.gif"
                    alt="Language Icon"
                    style={imgStyle}
                    className="shadow-pop-tr"
                  />
                </i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        style={{
          textAlign: "center",
          fontSize: "0.7rem",
          padding: "0.3rem 0",
          textShadow: "0 0 2px rgba(255, 255, 255, 0.7)",
        }}
      >
        FOR A LIMITED TIME, ALL ORDERS WILL ENJOY FREE SHIPPING TO PROXIMA
        CENTAURI. SHOP NOW
      </div>
    </Col>
  );
};

export default Header;
