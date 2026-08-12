import React from "react";
import { Mail, Check } from "lucide-react";

export default function Footer({ email, setEmail, subscribed, onSubscribe }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <span className="font-display" style={{ fontSize: 22 }}>Gate.</span>
          <p className="footer-tagline">
            The verified way in — every event checked, every ticket real.
          </p>
        </div>
        <div>
          <div className="footer-heading">Explore</div>
          <a href="#discover" className="footer-link">Discover</a>
          <a href="#categories" className="footer-link">Categories</a>
          <a href="#how" className="footer-link">How it works</a>
        </div>
        <div>
          <div className="footer-heading">Company</div>
          <a href="#" className="footer-link">About</a>
          <a href="#" className="footer-link">Careers</a>
          <a href="#" className="footer-link">Contact</a>
        </div>
        <div>
          <div className="footer-heading">Stay in the loop</div>
          {subscribed ? (
            <div className="subscribed-msg">
              <Check size={16} /> You're on the list.
            </div>
          ) : (
            <form className="newsletter-box" onSubmit={onSubscribe}>
              <Mail size={15} style={{ marginLeft: 8, color: "#6a6584", flexShrink: 0 }} />
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" style={{ padding: "8px 16px" }}>
                Join
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Gate. All rights reserved.</span>
        <span>Terms · Privacy · Support</span>
      </div>
    </footer>
  );
}