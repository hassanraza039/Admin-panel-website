import React from "react";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "customers", label: "Customers", icon: Users },
];

export default function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <span className="sidebar-logo">B</span>
          Bazaar Admin
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`sidebar-nav-item ${page === id ? "active" : ""}`}
              onClick={() => { setPage(id); setOpen(false); }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">Data resets on refresh — this is a live demo.</div>
      </aside>
    </>
  );
}
