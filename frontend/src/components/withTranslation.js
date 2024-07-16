import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedLanguage, selectTranslations, fetchTranslations } from '../reducers/translatorSlice';

const withTranslation = (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const selectedLanguage = useSelector(selectSelectedLanguage);
    const translations = useSelector(selectTranslations);

    useEffect(() => {
      const savedLanguage = localStorage.getItem('selectedLanguage') || selectedLanguage;
      dispatch(fetchTranslations(savedLanguage));
    }, [dispatch, selectedLanguage]);

    const translate = (text) => {
      return translations[text] || text;
    };

    return <WrappedComponent translate={translate} {...props} />;
  };
};

export default withTranslation;
