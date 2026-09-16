import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProductList from "./pages/ProductList/ProductList.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Customers from "./pages/Customers/Customers.jsx";
import { seedProducts, seedOrders, seedCustomers } from "./data/seedData.js";
import "./App.css";

const titles = {
  dashboard: ["Dashboard", "Overview of your store's performance"],
  products: ["Products", "Manage your catalog and stock"],
  orders: ["Orders", "Track and update order status"],
  customers: ["Customers", "Everyone who has shopped with you"],
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState(seedProducts);
  const [orders, setOrders] = useState(seedOrders);
  const [customers, setCustomers] = useState(seedCustomers);

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="app-main">
        <Navbar title={titles[page][0]} subtitle={titles[page][1]} onMenuClick={() => setSidebarOpen(true)} />
        <div className="app-content">
          {page === "dashboard" && <Dashboard products={products} orders={orders} />}
          {page === "products" && <ProductList products={products} setProducts={setProducts} />}
          {page === "orders" && <Orders orders={orders} setOrders={setOrders} />}
          {page === "customers" && <Customers customers={customers} setCustomers={setCustomers} />}
        </div>
      </main>
    </div>
  );
}
