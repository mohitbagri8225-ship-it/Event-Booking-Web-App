import React from "react";
import { Zap, Search, MapPin, ArrowRight, ShieldCheck, Ticket } from "lucide-react";
import TicketCard from "../Ticket/TicketCard.jsx";

export default function Hero({ query, setQuery, favorites, onToggleFavorite, events = [] }) {
  return (
    <header id="top" className="hero">
      <div>
        <span className="eyebrow">
          <Zap size={13} strokeWidth={2.4} /> Verified live events, every city
        </span>
        <h1 className="hero-title font-display">
          Your gate to<br /> what's <span className="accent">live</span> tonight.
        </h1>
        <p className="hero-sub">
          Real seats, real venues, checked at the door. Find something happening
          near you, verify with a one-time code, and walk in with a ticket that
          actually works.
        </p>

        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="search-field">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search events or venues"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="search-divider" />
          <div className="search-field" style={{ flex: "0 0 130px" }}>
            <MapPin size={16} />
            <input type="text" placeholder="City" />
          </div>
          <button type="submit" className="search-submit">
            Search <ArrowRight size={15} />
          </button>
        </form>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" })}
          >
            Browse events <ArrowRight size={15} />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
          >
            How booking works
          </button>
        </div>

        <div className="trust-row">
          <span className="trust-item"><ShieldCheck size={16} /> Verified listings only</span>
          <span className="trust-item"><Zap size={16} /> Instant confirmation</span>
          <span className="trust-item"><Ticket size={16} /> No printer needed</span>
        </div>
      </div>

      <div className="hero-stage">
        {events.slice(0, 3).map((ev) => (
          <TicketCard
            key={ev.id || ev._id}
            event={ev}
            favorited={favorites.has(ev.id || ev._id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </header>
  );
}