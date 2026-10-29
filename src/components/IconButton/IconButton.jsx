import React from "react";
import "./IconButton.css";

export default function IconButton({ onClick, children, title }) {
  return (
    <button className="icon-btn" onClick={onClick} title={title}>
      {children}
    </button>
  );
}
