import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translateBatch, selectTranslatedTexts } from '../reducers/translatorSlice';

const withTranslation = (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const selectedLanguage = useSelector((state) => state.translator.selectedLanguage);
    const translatedTexts = useSelector(selectTranslatedTexts);
    const [originalTexts, setOriginalTexts] = useState([]);
    const [textElements, setTextElements] = useState([]);

    // Effect to handle text extraction and translation
    useEffect(() => {
      if (selectedLanguage) {
        // Extract texts from the DOM
        const elements = Array.from(document.body.querySelectorAll('*'))
          .filter(el => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3);

        const texts = elements.map(el => el.innerText);

        setOriginalTexts(texts); // Save original texts
        setTextElements(elements); // Save elements reference

        // Translate the texts
        dispatch(translateBatch({ texts, language: selectedLanguage }));
      }
    }, [selectedLanguage, dispatch]);

    // Effect to handle text replacement with translations
    useEffect(() => {
      if (translatedTexts.length > 0 && translatedTexts.length === originalTexts.length) {
        textElements.forEach((el, index) => {
          // Replace the text while keeping the position
          el.innerText = translatedTexts[index];
        });
      }
    }, [translatedTexts, textElements, originalTexts]);

    // Wrap the original component
    return <WrappedComponent {...props} />;
  };
};

export default withTranslation;
