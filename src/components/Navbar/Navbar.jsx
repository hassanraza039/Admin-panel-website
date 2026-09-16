import React from "react";
import { Menu } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ title, subtitle, onMenuClick }) {
  return (
    <header className="navbar">
      <button className="navbar-menu-btn" onClick={onMenuClick}>
        <Menu size={20} />
      </button>
      <div>
        <h1 className="navbar-title">{title}</h1>
        <p className="navbar-subtitle">{subtitle}</p>
      </div>
    </header>
  );
}
