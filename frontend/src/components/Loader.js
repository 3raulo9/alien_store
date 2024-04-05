import React from "react";
import "../assets/css/Loader.css"; // Assume you have some CSS for animation

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh", // This assumes you want to center it vertically in the viewport. Adjust as needed.
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
