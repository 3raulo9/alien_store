import React, { useEffect, useState } from 'react';
import '../assets/css/LoaderMain.css';

const LoaderMain = ({ loading }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!loading) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [loading]);

  return (
    <div className={`loader-main-overlay ${hidden ? 'hidden' : ''}`}>
      <div className={`LoaderMain ${hidden ? 'hidden' : ''}`}></div>
    </div>
  );
};

export default LoaderMain;
