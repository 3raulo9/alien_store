import React from "react";
import "../assets/css/Loader.css"; 

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh", 
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
