import React, { useState, useEffect } from "react";
import "../assets/css/Sidebar.css"; // Reference to the new CSS for sidebar

const TranslatorButton = () => {
  const [fontFamily, setFontFamily] = useState("OuterRimAf-d9Kq7");
  const [showTranslateDropdown, setShowTranslateDropdown] = useState(false);

  const toggleTranslateDropdown = () => {
    setShowTranslateDropdown(!showTranslateDropdown);
  };

  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  const toggleFont = () => {
    const fontFamilies = [
      "OuterRimAf-d9Kq7",
      "Anta",
      "Narcotix-lPJX",
      "KitisakkullianAf-ALWnx",
      "alien",
      "Wingdings, sans-serif",
      "Zdyk Sagittarius",
      "ex-kata2",
      "Mage Script",
      "AlienAlphabet-nRRqJ",
      "ex-hira1",
      "electroharmonix",
      "nyamawemban",
      "kremlin",
    ];
    const currentFontIndex = fontFamilies.indexOf(fontFamily);
    const nextFontIndex = (currentFontIndex + 1) % fontFamilies.length;
    setFontFamily(fontFamilies[nextFontIndex]);
  };

  // Define imgStyle for the image
  const imgStyle = {
    filter: "hue-rotate(20deg) saturate(90%)",

    width: "90px",
    height: "80px",
    objectFit: "contain",
  };

  return (
    <li className="arshop-button">
      <p className="glow-on-hover">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ backgroundColor: "transparent" }}
          >
            <div style={{ margin: `${55}px` }}></div>
            <i>
              <img
                src="/images/translation.gif"
                alt="Language Icon"
                style={imgStyle}
                className="shadow-pop-tr"
              />
              <br />
            </i>
          </button>
          <ul className="dropdown-menu" style={{ backgroundColor: "#21d07b" }}>
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{ backgroundColor: "#0c0c0c" }}
                onClick={toggleFont}
              >
                Alien Language
              </a>
            </li>
            <li>
              <div className="form-group" style={{ display: "flex" }}>
                <label htmlFor="exampleDropdownFormEmail1"></label>
                <input className="form-control" placeholder="Human lang" />
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "5px" }}
                >
                  <i className="fa-solid fa-arrow-up"></i>{" "}
                </button>
              </div>
            </li>
          </ul>
          <i
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: "normal",
            }}
          >
            Translator
          </i>
        </div>
      </p>
    </li>
  );
};

export default TranslatorButton;
