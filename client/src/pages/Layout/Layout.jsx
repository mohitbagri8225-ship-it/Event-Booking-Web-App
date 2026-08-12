// components/Layout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; 
import GateStyles from "../Home/GateStyles/GateStyles.jsx";
import Nav from "../../components/Nav.jsx";
import MobileMenu from "../Home/Menu/MobileMenu.jsx";
import Footer from "../Home/Footer/Footer.jsx";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <div className="gate-root">
      <GateStyles />
      <div className="bg-noise" />

      <Nav scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* page-specific content renders here */}
      <Outlet />

      <Footer
        email={email}
        setEmail={setEmail}
        subscribed={subscribed}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
}