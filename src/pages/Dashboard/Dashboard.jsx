import React, { useMemo } from "react";
import { ShoppingCart, Package, Users, LayoutDashboard } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import StatCard from "../../components/StatCard/StatCard.jsx";
import Pill from "../../components/Pill/Pill.jsx";
import { formatMoney, statusClass } from "../../utils/format.js";
import "./Dashboard.css";

export default function Dashboard({ products, orders }) {
  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "Pending").length;
  const lowStock = products.filter((p) => p.stock < 10).length;

  const chartData = useMemo(() => {
    const byDay = {};
    orders.forEach((o) => {
      byDay[o.date] = (byDay[o.date] || 0) + (o.status !== "Cancelled" ? o.total : 0);
    });
    return Object.entries(byDay).map(([date, total]) => ({ date, total }));
  }, [orders]);

  const recentOrders = [...orders].slice(-5).reverse();
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <StatCard label="Total revenue" value={formatMoney(revenue)} delta="12%" icon={ShoppingCart} gradient />
        <StatCard label="Orders" value={orders.length} delta={`${pending} pending`} icon={Package} />
        <StatCard label="Customers" value={new Set(orders.map((o) => o.customer)).size} delta="8%" tone="up" icon={Users} />
        <StatCard label="Low stock" value={lowStock} delta={lowStock > 0 ? "review" : "steady"} tone={lowStock > 0 ? "down" : "up"} icon={LayoutDashboard} />
      </div>

      <div className="dashboard-chart-card">
        <h3>Revenue by day</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f2f5" vertical={false} />
            <XAxis dataKey="date" stroke="#9aa0b0" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9aa0b0" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #edeef2", borderRadius: 10, fontSize: 12 }}
              formatter={(v) => [formatMoney(v), "Revenue"]}
              cursor={{ fill: "#f7f8fa" }}
            />
            <Bar dataKey="total" fill="#2296f3" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-tables">
        <div className="dashboard-panel dashboard-panel-wide">
          <h3>Recent orders</h3>
          <table>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="cell-strong">{o.id}</td>
                  <td className="cell-muted">{o.customer}</td>
                  <td>{formatMoney(o.total)}</td>
                  <td><Pill className={statusClass[o.status]}>{o.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dashboard-panel">
          <h3>Top products</h3>
          <table>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td className="cell-muted cell-right">{p.sold} sold</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
