import React from "react";

const Rating = ({ value, text, color }) => {

  const rotateStyle = {
    color: color,
    transform: "rotate(90deg)", 
    textShadow: "0 0 8px rgba(255, 255, 255, 0.3)", 

  };

  return (
    <div className="rating">
      <span>
        <i
          style={rotateStyle}
          className={
            value >= 1
              ? "fa-solid fa-eye"
              : value >= 0.5
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
        ></i>
        <i
          style={rotateStyle}
          className={
            value >= 2
              ? "fa-solid fa-eye"
              : value >= 1.5
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
        ></i>
        <i
          style={rotateStyle}
          className={
            value >= 3
              ? "fa-solid fa-eye"
              : value >= 2.5
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
        ></i>
        <i
          style={rotateStyle}
          className={
            value >= 4
              ? "fa-solid fa-eye"
              : value >= 3.5
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
        ></i>
        <i
          style={rotateStyle}
          className={
            value >= 5
              ? "fa-solid fa-eye"
              : value >= 4.5
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
        ></i>
      </span>

      <span><br />
        {text && text}
      </span>
    </div>
  );
};

export default Rating;
 