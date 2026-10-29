import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import Field from "../../components/Field/Field.jsx";
import IconButton from "../../components/IconButton/IconButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { formatMoney, statusClass } from "../../utils/format.js";
import { api } from "../../api.js";
import "./Orders.css";

const STATUSES = ["Pending", "Shipped", "Delivered", "Cancelled"];

export default function Orders({ orders, setOrders }) {
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ customer: "", total: "", status: "Pending" });

  const filtered = orders.filter((o) => (o.id + o.customer).toLowerCase().includes(query.toLowerCase()));

  const addOrder = async () => {
    if (!form.customer.trim()) return;
    try {
      const created = await api("/orders", {
        method: "POST",
        body: { customer: form.customer, total: Number(form.total) || 0, status: form.status, items: [] },
      });
      setOrders([...orders, created]);
      setForm({ customer: "", total: "", status: "Pending" });
      setShowNew(false);
    } catch (e) { alert(e.message); }
  };

  const updateStatus = async (id, status) => {
    try {
      const updated = await api(`/orders/${id}`, { method: "PATCH", body: { status } });
      setOrders(orders.map((o) => (o.id === id ? updated : o)));
    } catch (e) { alert(e.message); }
  };

  const remove = async (id) => {
    try {
      await api(`/orders/${id}`, { method: "DELETE" });
      setOrders(orders.filter((o) => o.id !== id));
    } catch (e) { alert(e.message); }
  };

  return (
    <div className="orders">
      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Search orders..." />
        <button className="btn btn-primary" onClick={() => setShowNew(true)}>
          <Plus size={16} /> New order
        </button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="cell-strong">{o.id}</td>
                <td className="cell-muted">{o.customer}</td>
                <td className="cell-muted">{o.date}</td>
                <td>{formatMoney(o.total)}</td>
                <td>
                  <select className={`status-select ${statusClass[o.status]}`} value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td><IconButton onClick={() => remove(o.id)} title="Delete"><Trash2 size={14} /></IconButton></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="empty-row">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showNew && (
        <Modal title="New order" onClose={() => setShowNew(false)} onSubmit={addOrder} submitLabel="Create order">
          <Field label="Customer name" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} placeholder="e.g. Fatima Sheikh" />
          <Field label="Total (Rs)" type="number" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} />
          <div className="field">
            <label>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </Modal>
      )}
    </div>
  );
}