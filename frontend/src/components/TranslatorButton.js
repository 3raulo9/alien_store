import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFontFamily, setSelectedLanguage, translateBatch } from "../reducers/translatorSlice";

const languages = [
  "af", "sq", "am", "ar", "hy", "as", "az", "be", "bn", "bs", "bg", "ca", "ceb", "ny", "zh-CN", "zh-TW", 
  "co", "hr", "cs", "da", "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", 
  "ht", "ha", "haw", "he", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jv", "kn", "kk", "km", 
  "rw", "ko", "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", 
  "my", "ne", "no", "or", "ps", "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", 
  "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "tt", "te", "th", "tr", "tk", "uk", "ur", 
  "ug", "uz", "vi", "cy", "xh", "yi", "yo", "zu"
];

const TranslatorButton = () => {
  const dispatch = useDispatch();
  const { selectedLanguage } = useSelector((state) => state.translator);
  const [languageInput, setLanguageInput] = useState(selectedLanguage || "");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      dispatch(setSelectedLanguage(savedLanguage));
      setLanguageInput(savedLanguage);
    }
  }, [dispatch]);

  const handleTranslation = () => {
    if (!languages.includes(languageInput)) {
      alert("Selected language does not exist!");
      return;
    }

    const textElements = Array.from(document.body.querySelectorAll('*'))
      .filter(el => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)
      .map(el => el.innerText);

    dispatch(setSelectedLanguage(languageInput));
    dispatch(translateBatch({ texts: textElements, language: languageInput }));

    localStorage.setItem('selectedLanguage', languageInput);
    
    // Refresh the page to apply the new translations
    window.location.reload();
  };

  const toggleFont = () => {
    dispatch(toggleFontFamily());
  };

  const handleLanguageChange = (e) => {
    setLanguageInput(e.target.value);
    setSuggestions(languages.filter(lang => lang.startsWith(e.target.value)));
  };

  const imgStyle = {
    filter: "hue-rotate(20deg) saturate(90%)",
    width: "90px",
    height: "80px",
    objectFit: "contain",
  };

  return (
    <li className="arshop-button">
      <div className="glow-on-hover">
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
                  list="language-suggestions"
                />
                <datalist id="language-suggestions">
                  {suggestions.map((lang, index) => (
                    <option key={index} value={lang} />
                  ))}
                </datalist>
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
                        d="M7.5 17.5L12.5 22.5L22.5 12.5"
                        strokeWidth="1"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
          Translator
        </div>
      </div>
    </li>
  );
};

export default TranslatorButton;
