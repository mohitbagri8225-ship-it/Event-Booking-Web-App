import React from "react";

// All CSS is unchanged from the original file — just lifted into its own
// component so Home.jsx isn't 500+ lines of template string.
export default function GateStyles() {
  return (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        .gate-root {
          --ink: #131022;
          --ink-2: #1c1830;
          --ink-3: #262040;
          --paper: #f6f1e4;
          --paper-dim: #e9e2cf;
          --marigold: #f3a93b;
          --coral: #ef5d5d;
          --violet: #8b7bff;
          --muted: #b6afd1;
          font-family: 'Space Grotesk', sans-serif;
          background: var(--ink);
          color: var(--paper);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .gate-root * { box-sizing: border-box; }
        .font-display {
          font-family: 'Anton', sans-serif;
          font-weight: 400;
          letter-spacing: 0.01em;
          text-transform: uppercase;
        }
        .font-mono { font-family: 'Space Mono', monospace; }

        /* background texture */
        .bg-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle at 18% 20%, rgba(139,123,255,0.16), transparent 40%),
                             radial-gradient(circle at 85% 8%, rgba(243,169,59,0.14), transparent 38%),
                             radial-gradient(circle at 75% 85%, rgba(239,93,93,0.10), transparent 40%);
          z-index: 0;
        }

        /* nav */
        .gate-nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 6vw;
          transition: background 0.25s ease, border-color 0.25s ease, padding 0.25s ease;
          border-bottom: 1px solid transparent;
        }
        .desktop-only { display:flex; align-items:center; }
        @media (max-width: 840px) {
          .nav-links { display:none !important; }
          .desktop-only { display:none; }
        }
        @media (max-width: 640px) {
          .gate-nav { padding: 12px 4vw; }
          .logo span { font-size: 18px; }
        }
        .gate-nav.scrolled {
          background: rgba(19,16,34,0.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(246,241,228,0.08);
          padding: 12px 6vw;
        }
        .logo { display:flex; align-items:center; gap: 8px; }
        .logo-mark {
          width: 30px; height: 30px; border-radius: 7px;
          background: var(--marigold);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-6deg);
        }
        .nav-links { display: flex; gap: 32px; align-items:center; }
        .nav-link {
          font-size: 14px; color: var(--muted); text-decoration:none;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .nav-link:hover { color: var(--paper); transform: translateY(-1px); }
        .btn {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border-radius: 999px;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, opacity 0.18s ease;
        }
        .btn:focus-visible { outline: 2px solid var(--marigold); outline-offset: 3px; }
        .btn-primary { background: var(--marigold); color: var(--ink); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(243,169,59,0.28); }
        .btn-ghost { background: transparent; color: var(--paper); border: 1px solid rgba(246,241,228,0.28); }
        .btn-ghost:hover { border-color: var(--paper); transform: translateY(-2px); }
        .btn-danger { background: transparent; color: var(--coral); border: 1px solid rgba(239,93,93,0.12); }
        .btn-danger:hover { background: rgba(239,93,93,0.06); transform: translateY(-2px); }
        .btn-block { width: 100%; justify-content: center; }

        .icon-btn {
          background: rgba(246,241,228,0.08);
          border: 1px solid rgba(246,241,228,0.14);
          color: var(--paper);
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }

        .mobile-menu {
          position: fixed; inset: 0; z-index: 60;
          background: var(--ink);
          display: flex; flex-direction: column;
          padding: 22px 6vw;
          animation: fadeInSlide 0.24s ease forwards;
        }
        @keyframes fadeInSlide { from { opacity:0; transform: translateY(-12px); } to { opacity:1; transform: translateY(0); } }
        .mobile-link {
          font-family:'Anton', sans-serif;
          text-transform: uppercase;
          font-size: 34px;
          color: var(--paper);
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(246,241,228,0.1);
        }

        /* hero */
        .hero {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          padding: 64px 6vw 90px;
          align-items: center;
        }
        @media (max-width: 920px) {
          .hero { grid-template-columns: 1fr; padding: 40px 6vw 60px; }
        }
        .eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'Space Mono', monospace;
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--marigold);
          background: rgba(243,169,59,0.1);
          border: 1px solid rgba(243,169,59,0.3);
          padding: 6px 12px; border-radius: 999px;
          margin-bottom: 22px;
        }
        .hero-title {
          font-size: clamp(2.6rem, 6vw, 4.6rem);
          line-height: 0.98;
          margin: 0 0 22px;
        }
        .hero-title .accent { color: var(--marigold); }
        .hero-sub {
          font-size: 17px; line-height: 1.6; color: var(--muted);
          max-width: 480px; margin-bottom: 32px;
        }
        .hero-actions { display:flex; gap: 14px; flex-wrap: wrap; margin-bottom: 34px; }
        .trust-row { display:flex; gap: 26px; flex-wrap: wrap; }
        .trust-item {
          display:flex; align-items:center; gap:8px;
          font-size: 13px; color: var(--muted);
        }
        .trust-item svg { color: var(--marigold); flex-shrink:0; }

        /* search bar */
        .search-bar {
          display:flex; align-items:stretch; gap: 0;
          background: var(--paper);
          border-radius: 16px;
          padding: 6px; margin-bottom: 30px;
          max-width: 560px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .search-field {
          display:flex; align-items:center; gap:8px;
          padding: 10px 14px;
          flex: 1;
          color: var(--ink);
        }
        .search-field input {
          border:none; outline:none; background:transparent;
          font-family:'Space Grotesk',sans-serif;
          font-size: 14px; width: 100%; color: var(--ink);
        }
        .search-field input::placeholder { color: #8a8474; }
        .search-divider { width:1px; background: rgba(19,16,34,0.12); margin: 6px 0; }
        @media (max-width: 680px) {
          .search-bar { flex-wrap: wrap; }
          .search-field { min-width: 0; }
          .search-field:nth-child(1), .search-field:nth-child(3) { flex: 1 1 100%; }
          .search-field:nth-child(2) { flex: 1 1 180px; }
          .search-divider { display: none; }
          .search-submit { width: 100%; border-radius: 14px; }
        }
        .search-submit {
          background: var(--ink); color: var(--paper);
          border-radius: 12px; border:none; padding: 0 20px;
          display:flex; align-items:center; gap:8px; cursor:pointer;
          font-weight:600; font-size:14px;
          transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
        }
        .search-submit:hover { background: #221d3b; transform: translateY(-1px); }

        /* fanned hero tickets */
        .hero-stage { position: relative; height: 420px; overflow: hidden; }
        @media (max-width: 920px) { .hero-stage { height: 340px; margin-top: 10px; } }
        .hero-stage .ticket-card {
          position: absolute; width: min(300px, 78vw);
          top: 10px; left: 50%;
          transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
        }
        .hero-stage .ticket-card:hover { box-shadow: 0 36px 70px rgba(0,0,0,0.4); }
        .hero-stage .ticket-card:hover { z-index: 5 !important; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
        .hero-stage .ticket-card:nth-child(1) { transform: translateX(-72%) rotate(-9deg); z-index: 1; }
        .hero-stage .ticket-card:nth-child(2) { transform: translateX(-50%) rotate(2deg) translateY(-14px); z-index: 3; }
        .hero-stage .ticket-card:nth-child(3) { transform: translateX(-24%) rotate(10deg); z-index: 2; }
        .hero-stage .ticket-card:nth-child(1):hover { transform: translateX(-72%) rotate(-3deg) translateY(-10px) scale(1.03); }
        .hero-stage .ticket-card:nth-child(2):hover { transform: translateX(-50%) rotate(0deg) translateY(-26px) scale(1.04); }
        .hero-stage .ticket-card:nth-child(3):hover { transform: translateX(-24%) rotate(4deg) translateY(-10px) scale(1.03); }

        /* categories */
        .cat-row {
          display:flex; gap: 10px; overflow-x:auto;
          padding: 0 6vw 36px;
          scrollbar-width: none;
        }
        @media (max-width: 740px) {
          .cat-row { gap: 8px; padding: 0 4vw 32px; }
        }
        .cat-row::-webkit-scrollbar { display:none; }
        .cat-pill {
          font-family:'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 600;
          display:flex; align-items:center; gap:7px;
          padding: 10px 16px; border-radius: 999px;
          background: var(--ink-2); color: var(--muted);
          border: 1px solid rgba(246,241,228,0.1);
          cursor:pointer; white-space:nowrap;
          transition: all 0.18s ease;
        }
        .cat-pill:hover { border-color: rgba(246,241,228,0.3); color: var(--paper); }
        .cat-pill.active { background: var(--marigold); color: var(--ink); border-color: var(--marigold); }

        /* section headers */
        .section { padding: 10px 6vw 80px; position:relative; z-index:1; }
        .section-head {
          display:flex; justify-content:space-between; align-items:flex-end;
          margin-bottom: 30px; gap: 20px; flex-wrap: wrap;
        }
        .section-title {
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          margin: 0;
        }
        .section-note { color: var(--muted); font-size: 14px; max-width: 380px; }

        /* ticket card component */
        .ticket-card {
          display:flex;
          background: var(--paper);
          border-radius: 18px;
          overflow: hidden;
          color: var(--ink);
          box-shadow: 0 16px 34px rgba(0,0,0,0.28);
          position: relative;
        }
        .booking-card { padding: 18px; border-radius: 16px; display: grid; grid-template-columns: 1fr 200px; align-items: center; gap: 18px; }
        @media (max-width: 760px) { .booking-card { grid-template-columns: 1fr; } }
        .ticket-stub { flex: 1; display:flex; flex-direction:column; min-width:0; }
        .ticket-image-wrap { position: relative; height: 150px; }
        .ticket-image { width:100%; height:100%; object-fit:cover; display:block; }
        .fav-btn {
          position:absolute; top:10px; right:10px;
          width:30px; height:30px; border-radius:999px;
          background: rgba(19,16,34,0.55);
          border: none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          backdrop-filter: blur(4px);
          transition: transform 0.15s ease;
        }
        .fav-btn:hover { transform: scale(1.1); }
        .cat-chip {
          position:absolute; top:10px; left:10px;
          display:flex; align-items:center; gap:5px;
          background: rgba(19,16,34,0.65);
          color: var(--paper);
          font-size: 11px; font-weight:600; text-transform:uppercase; letter-spacing:0.04em;
          padding: 5px 9px; border-radius: 999px;
          backdrop-filter: blur(4px);
        }
        .urgency-chip {
          position:absolute; bottom:10px; left:10px;
          background: var(--coral); color: var(--paper);
          font-size: 10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em;
          padding: 5px 9px; border-radius: 999px;
        }
        .ticket-info { padding: 14px 16px 18px; display:flex; flex-direction:column; gap:8px; flex:1; }
        .ticket-info-top { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }
        .ticket-title { font-family:'Anton', sans-serif; text-transform:uppercase; font-size: 18px; margin:0; line-height:1.05; }
        .ticket-price { font-family:'Space Mono', monospace; font-weight:700; font-size:14px; color: var(--coral); white-space:nowrap; }
        .ticket-venue, .ticket-date {
          display:flex; align-items:center; gap:6px;
          font-size: 12.5px; color: #55503f; margin:0;
        }
        .ticket-perf {
          position: relative;
          width: 0;
          border-left: 2px dashed rgba(19,16,34,0.25);
        }
        .notch {
          position: absolute; left: -8px;
          width: 16px; height: 16px; border-radius: 999px;
          background: var(--ink);
        }
        .notch-top { top: -8px; }
        .notch-bottom { bottom: -8px; }
        .ticket-side {
          width: 58px; flex-shrink:0;
          background: var(--paper-dim);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap: 10px; padding: 12px 0;
        }
        .ticket-side-label {
          writing-mode: vertical-rl; transform: rotate(180deg);
          font-family:'Space Mono', monospace; font-size: 10px; letter-spacing: 0.15em;
          color: #6b6552; font-weight:700;
        }
        .barcode {
          width: 16px; height: 70px;
          background-image: repeating-linear-gradient(90deg, #1c1830 0px, #1c1830 2px, transparent 2px, transparent 4px, #1c1830 4px, #1c1830 5px, transparent 5px, transparent 8px);
        }
        .ticket-code {
          writing-mode: vertical-rl; transform: rotate(180deg);
          font-family:'Space Mono', monospace; font-size: 9px; color:#8a8471;
        }

        .events-grid {
          display:grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
          transition: all 0.2s ease;
        }
        @media (max-width: 980px) { .events-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 760px) { .events-grid { grid-template-columns: 1fr; } }
        .events-grid .ticket-card { animation: rise 0.4s ease both; }
        @keyframes rise { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform:translateY(0);} }

        .empty-state {
          border: 1px dashed rgba(246,241,228,0.2);
          border-radius: 18px;
          padding: 50px 24px;
          text-align:center;
          color: var(--muted);
        }

        /* how it works */
        .how-wrap {
          background: var(--ink-2);
          border-radius: 26px;
          padding: 56px 6vw;
          margin: 0 6vw 80px;
          position: relative; z-index: 1;
          border: 1px solid rgba(246,241,228,0.06);
        }
        .how-grid {
          display:grid; grid-template-columns: repeat(3, 1fr); gap: 34px; margin-top: 36px;
        }
        @media (max-width: 820px) { .how-grid { grid-template-columns: 1fr; } }
        .how-step { position: relative; padding-left: 6px; }
        .how-num {
          font-family:'Anton', sans-serif;
          font-size: 42px; color: var(--marigold);
          opacity: 0.9; line-height:1; margin-bottom: 12px; display:block;
        }
        .how-title { font-size: 19px; font-weight:700; margin: 0 0 8px; }
        .how-body { font-size: 14px; color: var(--muted); line-height:1.6; margin:0; }

        /* CTA */
        .cta-wrap {
          margin: 0 6vw 80px;
          border-radius: 26px;
          background: linear-gradient(120deg, var(--marigold), #f0c375);
          color: var(--ink);
          padding: 56px 6vw;
          display:flex; align-items:center; justify-content:space-between; gap: 30px;
          flex-wrap: wrap;
          position: relative; overflow:hidden; z-index:1;
        }
        .cta-wrap::before {
          content:""; position:absolute; right:-40px; top:-40px;
          width: 220px; height: 220px; border-radius:999px;
          border: 2px dashed rgba(19,16,34,0.18);
        }
        .cta-title { font-size: clamp(1.7rem, 3.4vw, 2.6rem); margin: 0 0 10px; max-width: 520px; }
        .cta-body { font-size: 14.5px; max-width: 420px; opacity: 0.8; margin: 0; }

        .auth-shell {
          position: relative; z-index: 1;
          padding: 64px 6vw 90px;
          min-height: calc(100vh - 180px);
          display: flex; align-items: center; justify-content: center;
        }
        .auth-card {
          width: min(1000px, 100%);
          display: grid; grid-template-columns: 1.05fr 0.95fr;
          gap: 24px;
          background: rgba(246,241,228,0.04);
          border: 1px solid rgba(246,241,228,0.08);
          border-radius: 28px;
          padding: 24px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.28);
        }
        .auth-panel, .auth-side {
          background: var(--ink-2);
          border-radius: 22px;
          padding: 28px;
        }
        .auth-form {
          display: flex; flex-direction: column; gap: 14px;
          max-width: 420px;
          margin-top: 8px;
        }
        .auth-field {
          display: flex; align-items: center; gap: 10px;
          background: rgba(246,241,228,0.06);
          border: 1px solid rgba(246,241,228,0.1);
          border-radius: 14px;
          padding: 12px 14px;
          color: var(--paper);
        }
        .auth-field input {
          background: transparent; border: none; outline: none;
          color: var(--paper); font-family: 'Space Grotesk', sans-serif; font-size: 14px; width: 100%;
        }
        .auth-field input::placeholder { color: #8a8474; }
        .auth-hint {
          margin-top: 14px; color: var(--muted); font-size: 13px;
        }
        .auth-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 12px; border-radius: 999px;
          background: rgba(243,169,59,0.12);
          color: var(--marigold);
          font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;
          margin-bottom: 16px;
        }
        .auth-list {
          list-style: none; padding: 0; margin: 0 0 20px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .auth-list li {
          display: flex; align-items: flex-start; gap: 8px;
          color: var(--muted); font-size: 14px; line-height: 1.5;
        }
        .auth-list li svg { color: var(--marigold); margin-top: 2px; flex-shrink: 0; }
        @media (max-width: 820px) {
          .auth-card { grid-template-columns: 1fr; }
          .auth-panel, .auth-side { padding: 24px; }
        }

        /* footer */
        .footer {
          border-top: 1px solid rgba(246,241,228,0.08);
          padding: 50px 6vw 30px;
          position: relative; z-index: 1;
        }
        .footer-top {
          display:grid; grid-template-columns: 1.3fr 1fr 1fr 1.3fr; gap: 40px;
          margin-bottom: 40px;
        }
        @media (max-width: 780px) { .footer-top { grid-template-columns: 1fr 1fr; } }
        .footer-tagline { color: var(--muted); font-size: 14px; margin-top: 12px; max-width: 260px; line-height: 1.6; }
        .footer-heading {
          font-family:'Space Mono', monospace; text-transform:uppercase; letter-spacing:0.1em;
          font-size: 12px; color: var(--marigold); margin-bottom: 16px;
        }
        .footer-link { display:block; color: var(--muted); text-decoration:none; font-size: 14px; padding: 6px 0; }
        .footer-link:hover { color: var(--paper); }
        .newsletter-box {
          display:flex; gap: 0; background: var(--ink-2); border-radius: 12px; padding: 5px;
          border: 1px solid rgba(246,241,228,0.1);
        }
        .newsletter-box input {
          flex:1; background:transparent; border:none; outline:none; color:var(--paper);
          padding: 9px 12px; font-size: 13px; font-family:'Space Grotesk',sans-serif;
        }
        .newsletter-box input::placeholder { color: #6a6584; }
        .subscribed-msg { display:flex; align-items:center; gap:8px; color: var(--marigold); font-size: 13px; padding: 10px 4px; }
        .footer-bottom {
          display:flex; justify-content:space-between; align-items:center;
          padding-top: 24px; border-top: 1px solid rgba(246,241,228,0.06);
          font-size: 12.5px; color: #6a6584; flex-wrap: wrap; gap: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          .gate-root * { animation: none !important; transition: none !important; }
        }
      `}</style>
  );
}