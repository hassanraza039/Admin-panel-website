import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import "./StatCard.css";

export default function StatCard({ label, value, delta, tone, gradient, icon: Icon }) {
  if (gradient) {
    return (
      <div className="stat-card stat-card-gradient">
        <div className="stat-card-blob-1" />
        <div className="stat-card-blob-2" />
        <div className="stat-card-top">
          <div className="stat-card-icon stat-card-icon-light"><Icon size={20} /></div>
          {delta && (
            <span className="stat-card-delta stat-card-delta-light">
              <ArrowUpRight size={14} /> {delta}
            </span>
          )}
        </div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label stat-card-label-light">{label}</div>
      </div>
    );
  }
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-card-icon"><Icon size={20} /></div>
        {delta && (
          <span className={`stat-card-delta ${tone === "up" ? "tone-up" : tone === "down" ? "tone-down" : ""}`}>
            {tone === "up" ? <ArrowUpRight size={14} /> : tone === "down" ? <ArrowDownRight size={14} /> : null}
            {delta}
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}
