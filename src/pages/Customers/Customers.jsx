import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import Field from "../../components/Field/Field.jsx";
import IconButton from "../../components/IconButton/IconButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { uid, formatMoney } from "../../utils/format.js";
import "./Customers.css";

const AVATAR_COLORS = ["avatar-blue", "avatar-purple", "avatar-orange", "avatar-green", "avatar-pink"];

export default function Customers({ customers, setCustomers }) {
  const [query, setQuery] = useState("");
  const [modalFor, setModalFor] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const filtered = customers.filter((c) => (c.name + c.email).toLowerCase().includes(query.toLowerCase()));

  const openNew = () => { setForm({ name: "", email: "" }); setModalFor("new"); };
  const openEdit = (c) => { setForm(c); setModalFor(c); };

  const save = () => {
    if (!form.name.trim()) return;
    if (modalFor === "new") {
      setCustomers([...customers, { ...form, id: uid("c"), orders: 0, spent: 0 }]);
    } else {
      setCustomers(customers.map((c) => (c.id === modalFor.id ? { ...c, ...form } : c)));
    }
    setModalFor(null);
  };

  const remove = (id) => setCustomers(customers.filter((c) => c.id !== id));

  return (
    <div className="customers">
      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Search customers..." />
        <button className="btn btn-primary" onClick={openNew}>
          <Plus size={16} /> Add customer
        </button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr><th>Customer</th><th>Orders</th><th>Total spent</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id}>
                <td>
                  <div className="customer-cell">
                    <span className={`avatar ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>{c.name.charAt(0)}</span>
                    <div>
                      <div className="customer-name">{c.name}</div>
                      <div className="customer-email">{c.email}</div>
                    </div>
                  </div>
                </td>
                <td>{c.orders}</td>
                <td>{formatMoney(c.spent)}</td>
                <td>
                  <div className="row-actions">
                    <IconButton onClick={() => openEdit(c)} title="Edit"><Pencil size={14} /></IconButton>
                    <IconButton onClick={() => remove(c.id)} title="Delete"><Trash2 size={14} /></IconButton>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="empty-row">No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modalFor && (
        <Modal title={modalFor === "new" ? "Add customer" : "Edit customer"} onClose={() => setModalFor(null)} onSubmit={save} submitLabel="Save customer">
          <Field label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Fatima Sheikh" />
          <Field label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="e.g. fatima.sheikh@mail.com" />
        </Modal>
      )}
    </div>
  );
}
