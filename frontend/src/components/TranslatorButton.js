import React, { useState, useEffect } from "react";
import axios from 'axios';

const TranslatorButton = () => {
  const [fontFamily, setFontFamily] = useState("Anta");
  const [showTranslateDropdown, setShowTranslateDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const toggleTranslateDropdown = () => {
    setShowTranslateDropdown(!showTranslateDropdown);
  };

  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  const toggleFont = () => {
    const fontFamilies = [
      "Anta",
      "OuterRimAf-d9Kq7",
      "KitisakkullianAf-ALWnx",
      "alien",
      "Wingdings, sans-serif",
      "Zdyk Sagittarius",
      "Mage Script",
      "AlienAlphabet-nRRqJ",
      "nyamawemban",
    ];
    const currentFontIndex = fontFamilies.indexOf(fontFamily);
    const nextFontIndex = (currentFontIndex + 1) % fontFamilies.length;
    setFontFamily(fontFamilies[nextFontIndex]);
  };

  const handleTranslation = () => {
    // Recursively translate text content of all nodes in the DOM tree
    translateDOM(document.body);
  };

  const translateDOM = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Translate text content of text nodes
      translateTextNode(node);
    } else {
      // Recursively translate child nodes of non-text nodes
      node.childNodes.forEach(childNode => translateDOM(childNode));
    }
  };

  const translateTextNode = (node) => {
    const originalText = node.textContent.trim();
    axios.post('/api/translate/', { input_text: originalText, language: selectedLanguage })
      .then(response => {
        const translatedText = response.data.translated_text;
        node.textContent = translatedText; // Update text content with translated text
      })
      .catch(error => {
        console.error('Error translating text:', error);
      });
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
                Alien Languages
              </a>
            </li>
            <li>
              <div className="form-group" style={{ display: "flex" }}>
                <label htmlFor="exampleDropdownFormEmail1"></label>
                <input
                  className="form-control"
                  placeholder="Human lang"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "5px" }}
                  onClick={handleTranslation}
                >
                  <i className="fa-solid fa-arrow-up"></i>{" "}
                </button>
              </div>
              <p>
            please enter a human language name to translate the page
          </p>
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
