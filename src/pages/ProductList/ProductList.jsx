import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import Field from "../../components/Field/Field.jsx";
import Pill from "../../components/Pill/Pill.jsx";
import IconButton from "../../components/IconButton/IconButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { formatMoney } from "../../utils/format.js";
import { api } from "../../api.js";
import "./ProductList.css";

export default function ProductList({ products, setProducts }) {
  const [query, setQuery] = useState("");
  const [modalFor, setModalFor] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "", image: "" });

  const filtered = products.filter((p) => (p.name + p.category).toLowerCase().includes(query.toLowerCase()));

  const openNew = () => { setForm({ name: "", category: "", price: "", stock: "", image: "" }); setModalFor("new"); };
  const openEdit = (p) => { setForm(p); setModalFor(p); };

  const save = async () => {
    if (!form.name.trim()) return;
    const clean = {
      name: form.name,
      category: form.category,
      image: form.image,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
    };
    try {
      if (modalFor === "new") {
        const created = await api("/products", { method: "POST", body: clean });
        setProducts([created, ...products]);
      } else {
        const updated = await api(`/products/${modalFor.id}`, { method: "PUT", body: clean });
        setProducts(products.map((p) => (p.id === modalFor.id ? updated : p)));
      }
      setModalFor(null);
    } catch (e) { alert(e.message); }
  };

  const remove = async (id) => {
    try {
      await api(`/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    } catch (e) { alert(e.message); }
  };

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
          <Field label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. T-shirts" />
          <Field label="Price (Rs)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Field label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          <Field label="Image URL" value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
        </Modal>
      )}
    </div>
  );
}