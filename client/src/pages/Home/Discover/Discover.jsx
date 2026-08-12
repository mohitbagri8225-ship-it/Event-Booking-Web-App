import React from "react";
import { CATEGORIES } from "../data/constants.js"
import TicketCard from "../Ticket/TicketCard.jsx"

export default function Discover({ filtered, activeCategory, query, favorites, onToggleFavorite }) {
  return (
    <section id="discover" className="section">
      <div className="section-head">
        <h2 className="section-title font-display">Happening soon</h2>
        <p className="section-note">
          {filtered.length} event{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" ? ` in ${CATEGORIES.find((c) => c.id === activeCategory)?.label}` : ""}
          {query ? ` matching "${query}"` : ""}.
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="events-grid">
          {filtered.map((ev, i) => (
            <div key={ev.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <TicketCard
                event={ev}
                favorited={favorites.has(ev.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="font-display" style={{ fontSize: 20, marginBottom: 6 }}>Nothing here yet</p>
          <p style={{ fontSize: 14 }}>Try a different category or clear your search.</p>
        </div>
      )}
    </section>
  );
}