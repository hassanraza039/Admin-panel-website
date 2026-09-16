import React from "react";
import "./Field.css";

export default function Field({ label, ...props }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}
