import React from "react";
import "./Pill.css";

export default function Pill({ children, className = "" }) {
  return <span className={`pill ${className}`}>{children}</span>;
}
