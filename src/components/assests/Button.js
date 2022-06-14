import React from "react";
import "../styles/button.css";
const Button = ({ type, name, onClick, disabled }) => {
  return (
    <button
      className={type === "SORT" ? "sort" : "newArray"}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
