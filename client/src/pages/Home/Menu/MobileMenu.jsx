import React from "react";
import { X } from "lucide-react";

export default function MobileMenu({ menuOpen, setMenuOpen }) {
  if (!menuOpen) return null;

  return (
    <div className="mobile-menu">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <span className="font-display" style={{ fontSize: 20 }}>Gate.</span>
        <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X size={18} />
        </button>
      </div>
      <a href="#discover" onClick={() => setMenuOpen(false)} className="mobile-link">Discover</a>
      <a href="#categories" onClick={() => setMenuOpen(false)} className="mobile-link">Categories</a>
      <a href="#how" onClick={() => setMenuOpen(false)} className="mobile-link">How it works</a>
      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 12 }}>
        <button className="btn btn-ghost btn-block">Sign in</button>
        <button className="btn btn-primary btn-block">Get the app</button>
      </div>
    </div>
  );
}