// components/Layout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; 
import GateStyles from "../Home/GateStyles/GateStyles.jsx";
import Nav from "../../components/Nav.jsx";
import MobileMenu from "../Home/Menu/MobileMenu.jsx";
import Footer from "../Home/Footer/Footer.jsx";
import SmoothScroll from "../../hooks/useSmoothScroll.jsx";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 },
};
const pageTransition = { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] };

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

  const location = useLocation();

  return (
    <SmoothScroll>
      <div className="gate-root">
        <GateStyles />
        <LayoutScrollHandler />
        <div className="bg-noise" />

        <Nav scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Scroll to section if navigation provided a state.scrollTo */}
        {/* Uses native scrollIntoView (CSS has smooth behavior) */}
        

        <Footer
          email={email}
          setEmail={setEmail}
          subscribed={subscribed}
          onSubscribe={handleSubscribe}
        />
      </div>
    </SmoothScroll>
  );
}

// ensure scroll on navigate with state or hash
export function LayoutScrollHandler() {
  const location = useLocation();
  useEffect(() => {
    const id = location?.state?.scrollTo || (location.hash ? location.hash.replace("#", "") : null);
    if (!id) return;
    // delay slightly to allow page content to render
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      }
    }, 120);
    return () => clearTimeout(t);
  }, [location]);
  return null;
}