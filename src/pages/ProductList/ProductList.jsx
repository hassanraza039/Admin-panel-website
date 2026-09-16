import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import Field from "../../components/Field/Field.jsx";
import Pill from "../../components/Pill/Pill.jsx";
import IconButton from "../../components/IconButton/IconButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { uid, formatMoney } from "../../utils/format.js";
import "./ProductList.css";

export default function ProductList({ products, setProducts }) {
  const [query, setQuery] = useState("");
  const [modalFor, setModalFor] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "" });

  const filtered = products.filter((p) => (p.name + p.category).toLowerCase().includes(query.toLowerCase()));

  const openNew = () => { setForm({ name: "", category: "", price: "", stock: "" }); setModalFor("new"); };
  const openEdit = (p) => { setForm(p); setModalFor(p); };

  const save = () => {
    if (!form.name.trim()) return;
    const clean = { ...form, price: Number(form.price) || 0, stock: Number(form.stock) || 0 };
    if (modalFor === "new") {
      setProducts([...products, { ...clean, id: uid("p"), sold: 0 }]);
    } else {
      setProducts(products.map((p) => (p.id === modalFor.id ? { ...p, ...clean } : p)));
    }
    setModalFor(null);
  };

  const remove = (id) => setProducts(products.filter((p) => p.id !== id));

  return (
    <div className="product-list">
      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Search products..." />
        <button className="btn btn-primary" onClick={openNew}>
          <Plus size={16} /> Add product
        </button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Sold</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="cell-strong">{p.name}</td>
                <td className="cell-muted">{p.category}</td>
                <td>{formatMoney(p.price)}</td>
                <td><Pill className={p.stock < 10 ? "stock-low" : "stock-ok"}>{p.stock} left</Pill></td>
                <td className="cell-muted">{p.sold}</td>
                <td>
                  <div className="row-actions">
                    <IconButton onClick={() => openEdit(p)} title="Edit"><Pencil size={14} /></IconButton>
                    <IconButton onClick={() => remove(p.id)} title="Delete"><Trash2 size={14} /></IconButton>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="empty-row">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modalFor && (
        <Modal title={modalFor === "new" ? "Add product" : "Edit product"} onClose={() => setModalFor(null)} onSubmit={save} submitLabel="Save product">
          <Field label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Cotton Kurta" />
          <Field label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Fashion" />
          <Field label="Price (Rs)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Field label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        </Modal>
      )}
    </div>
  );
}
