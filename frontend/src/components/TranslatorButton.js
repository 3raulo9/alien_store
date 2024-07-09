// TranslatorButton.js
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFontFamily, setSelectedLanguage } from "../reducers/translatorSlice";
import translationAPI from "../APIS/translationAPI";

const TranslatorButton = ({ setLoading }) => {
  const dispatch = useDispatch();
  const { selectedLanguage } = useSelector((state) => state.translation);
  const [languageInput, setLanguageInput] = useState("");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      dispatch(setSelectedLanguage(storedLanguage));
      setLanguageInput(storedLanguage);
    }
  }, [dispatch]);

  const translateDOM = useCallback(async (node, language) => {
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
  }, [setLoading]);

  const handleTranslation = () => {
    localStorage.setItem("selectedLanguage", languageInput);
    translateDOM(document.body, languageInput);
  };

  const toggleFont = () => {
    dispatch(toggleFontFamily());
  };

  const handleLanguageChange = (e) => {
    setLanguageInput(e.target.value);
  };

  useEffect(() => {
    const storedTextNodes = JSON.parse(localStorage.getItem("translatedTextNodes"));
    if (storedTextNodes) {
      translateDOM(document.body, selectedLanguage);
    }
  }, [selectedLanguage, translateDOM]);

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
                  value={languageInput}
                  onChange={handleLanguageChange}
                />
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "5px" }}
                  onClick={handleTranslation}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 30 30"
                    height="30"
                    width="30"
                    id="Input-Box--Streamline-Core"
                  >
                    <desc>
                      Input Box Streamline Icon: https://streamlinehq.com
                    </desc>
                    <g id="input-box--cursor-text-formatting-type-format">
                      <path
                        id="Vector"
                        stroke="#2eff99"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.07142857142857 10.714285714285714H27.857142857142858c0.28414285714285714 0 0.5567142857142856 0.11288571428571428 0.7577142857142858 0.31382142857142853 0.2007857142857143 0.2009142857142857 0.3137142857142857 0.4734428571428571 0.3137142857142857 0.7576071428571428v6.428571428571429c0 0.2841642857142857 -0.11292857142857142 0.5566928571428572 -0.3137142857142857 0.7576071428571428C28.413857142857143 19.17282857142857 28.141285714285715 19.285714285714285 27.857142857142858 19.285714285714285H16.07142857142857"
                        strokeWidth="1"
                      ></path>
                      <path
                        id="Vector_2"
                        stroke="#2eff99"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.357142857142857 19.285714285714285H2.142857142857143c-0.28416 0 -0.5566821428571428 -0.11288571428571428 -0.7576135714285714 -0.31382142857142853C1.18431 18.77097857142857 1.0714285714285714 18.49845 1.0714285714285714 18.214285714285715v-6.428571428571429c0 -0.2841642857142857 0.11288142857142858 -0.5566928571428572 0.31381499999999996 -0.7576071428571428C1.586175 10.827171428571427 1.8586971428571428 10.714285714285714 2.142857142857143 10.714285714285714h3.2142857142857144"
                        strokeWidth="1"
                      ></path>
                      <path
                        id="Vector_3"
                        stroke="#2eff99"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.571428571428571 5.357142857142857h4.285714285714286"
                        strokeWidth="1"
                      ></path>
                      <path
                        id="Vector_4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#2eff99"
                        d="M8.571428571428571 24.642857142857142h4.285714285714286"
                        strokeWidth="1"
                      ></path>
                      <path
                        id="Vector_5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#2eff99"
                        d="M10.714285714285714 5.357142857142857v19.285714285714285"
                        strokeWidth="1"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <p>please enter a human language name to translate the page</p>
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
