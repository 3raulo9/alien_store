import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFontFamily, setSelectedLanguage, translateBatch } from "../reducers/translatorSlice";
const languages = [
  "af", // Afrikaans
  "sq", // Albanian
  "am", // Amharic
  "ar", // Arabic
  "hy", // Armenian
  "as", // Assamese
  "az", // Azerbaijani
  "be", // Belarusian
  "bn", // Bengali
  "bs", // Bosnian
  "bg", // Bulgarian
  "ca", // Catalan
  "ceb", // Cebuano
  "ny", // Chichewa
  "zh-CN", // Chinese (Simplified)
  "zh-TW", // Chinese (Traditional)
  "co", // Corsican
  "hr", // Croatian
  "cs", // Czech
  "da", // Danish
  "nl", // Dutch
  "en", // English
  "eo", // Esperanto
  "et", // Estonian
  "tl", // Filipino
  "fi", // Finnish
  "fr", // French
  "fy", // Frisian
  "gl", // Galician
  "ka", // Georgian
  "de", // German
  "el", // Greek
  "gu", // Gujarati
  "ht", // Haitian Creole
  "ha", // Hausa
  "haw", // Hawaiian
  "he", // Hebrew
  "hi", // Hindi
  "hmn", // Hmong
  "hu", // Hungarian
  "is", // Icelandic
  "ig", // Igbo
  "id", // Indonesian
  "ga", // Irish
  "it", // Italian
  "ja", // Japanese
  "jv", // Javanese
  "kn", // Kannada
  "kk", // Kazakh
  "km", // Khmer
  "rw", // Kinyarwanda
  "ko", // Korean
  "ku", // Kurdish
  "ky", // Kyrgyz
  "lo", // Lao
  "la", // Latin
  "lv", // Latvian
  "lt", // Lithuanian
  "lb", // Luxembourgish
  "mk", // Macedonian
  "mg", // Malagasy
  "ms", // Malay
  "ml", // Malayalam
  "mt", // Maltese
  "mi", // Maori
  "mr", // Marathi
  "mn", // Mongolian
  "my", // Myanmar (Burmese)
  "ne", // Nepali
  "no", // Norwegian
  "or", // Oriya
  "ps", // Pashto
  "fa", // Persian
  "pl", // Polish
  "pt", // Portuguese
  "pa", // Punjabi
  "ro", // Romanian
  "ru", // Russian
  "sm", // Samoan
  "gd", // Scottish Gaelic
  "sr", // Serbian
  "st", // Sesotho
  "sn", // Shona
  "sd", // Sindhi
  "si", // Sinhala
  "sk", // Slovak
  "sl", // Slovenian
  "so", // Somali
  "es", // Spanish
  "su", // Sundanese
  "sw", // Swahili
  "sv", // Swedish
  "tg", // Tajik
  "ta", // Tamil
  "tt", // Tatar
  "te", // Telugu
  "th", // Thai
  "tr", // Turkish
  "tk", // Turkmen
  "uk", // Ukrainian
  "ur", // Urdu
  "ug", // Uzbek
  "uz", // Uzbek
  "vi", // Vietnamese
  "cy", // Welsh
  "xh", // Xhosa
  "yi", // Yiddish
  "yo", // Yoruba
  "zu", // Zulu
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
