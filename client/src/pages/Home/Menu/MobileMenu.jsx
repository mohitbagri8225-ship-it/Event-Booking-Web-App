import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "../../../context/auth.context.jsx";

export default function MobileMenu({ menuOpen, setMenuOpen }) {
  const { user, isLoggedIn } = useAuth();

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
        {user?.role === "user" && (
          <Link
            to="/book-seat"
            onClick={() => setMenuOpen(false)}
            className="btn btn-ghost btn-block"
          >
            Grab a seat
          </Link>
        )}

        {isLoggedIn ? (
          <>
            <Link
              to={user?.role === "admin" ? "/my-events" : "/my-tickets"}
              onClick={() => setMenuOpen(false)}
              className="btn btn-ghost btn-block"
            >
              {user?.role === "admin" ? "My Events" : "My Tickets"}
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary btn-block"
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-ghost btn-block">
              Sign in
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="btn btn-primary btn-block">
              Get started
            </Link>
          </>
        )}
      </div>
    </div>
  );
}