import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProductList from "./pages/ProductList/ProductList.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Customers from "./pages/Customers/Customers.jsx";
import Login from "./pages/Login/Login.jsx";
import { api, getToken, clearToken } from "./api.js";
import { buildCustomers } from "./utils/format.js";
import "./App.css";

const titles = {
  dashboard: ["Dashboard", "Overview of your store's performance"],
  products: ["Products", "Manage your catalog and stock"],
  orders: ["Orders", "Track and update order status"],
  customers: ["Customers", "Everyone who has shopped with you"],
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const customers = useMemo(() => buildCustomers(orders), [orders]);

  // token expire ho jaye to login page par wapas
  useEffect(() => {
    const onExpired = () => setLoggedIn(false);
    window.addEventListener("auth-expired", onExpired);
    return () => window.removeEventListener("auth-expired", onExpired);
  }, []);

  // login ke baad products load hon
  useEffect(() => {
    if (!loggedIn) return;
    api("/products").then(setProducts).catch(console.error);
  }, [loggedIn]);

  // login ke baad orders load hon, har 10 second mein refresh
  useEffect(() => {
    if (!loggedIn) return;
    const loadOrders = () => api("/orders").then(setOrders).catch(console.error);
    loadOrders();
    const timer = setInterval(loadOrders, 10000);
    return () => clearInterval(timer);
  }, [loggedIn]);

  const logout = () => {
    clearToken();
    setProducts([]);
    setOrders([]);
    setPage("dashboard");
    setLoggedIn(false);
  };

  // login nahi hai to sirf login page dikhao
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="app-main">
        <Navbar title={titles[page][0]} subtitle={titles[page][1]} onMenuClick={() => setSidebarOpen(true)} />

        <button
          onClick={logout}
          style={{
            position: "fixed",
            top: 14,
            right: 20,
            zIndex: 50,
            padding: "8px 16px",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>

        <div className="app-content">
          {page === "dashboard" && <Dashboard products={products} orders={orders} />}
          {page === "products" && <ProductList products={products} setProducts={setProducts} />}
          {page === "orders" && <Orders orders={orders} setOrders={setOrders} />}
          {page === "customers" && <Customers customers={customers} setCustomers={() => {}} />}
        </div>
      </main>
    </div>
  );
}