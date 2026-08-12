import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Ticket, Heart } from "lucide-react";
import { CATEGORIES } from "../data/constants";

export default function TicketCard({ event, favorited, onToggleFavorite, rotate }) {
  const navigate = useNavigate();
  const eventId = event.id ?? event._id ?? event.code ?? `${event.title}-${event.venue}`;
  const catMeta = CATEGORIES.find((c) => c.id === (event.category || "all"));
  const CatIcon = catMeta?.icon ?? Ticket;
  const availableSeats = Number(event.availableSeats ?? event.seats ?? 0);
  const soldOutSoon = availableSeats <= 12;
  const ticketPrice = Number(event.ticketPrice ?? event.price ?? 0);
  const venue = event.venue || event.location || "Venue TBD";
  const imageUrl = event.img || event.imageUrl || "https://picsum.photos/seed/gate-fallback/640/480";

  const eventDate =
    event.date && !Number.isNaN(new Date(event.date).getTime()) ? new Date(event.date) : null;

  const displayDay = event.day ||
    (eventDate ? eventDate.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase() : "TBA");

  const displayDate =
    event.date && /^[A-Z]{3}\s\d{1,2}$/i.test(event.date)
      ? event.date.toUpperCase()
      : eventDate
        ? eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()
        : "DATE TBA";

  const displayTime =
    event.time ||
    (eventDate ? eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "Time TBA");

  const handleCardClick = () => {
    navigate(`/${eventId}`);
  };

  return (
    <article
      className="ticket-card"
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${event.title}`}
    >
      <div className="ticket-stub">
        <div className="ticket-image-wrap">
          <img src={imageUrl} alt="" className="ticket-image" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(eventId);
            }}
            aria-pressed={favorited}
            aria-label={favorited ? "Remove from saved" : "Save event"}
            className="fav-btn"
          >
            <Heart
              size={16}
              strokeWidth={2.4}
              fill={favorited ? "#EF5D5D" : "transparent"}
              color={favorited ? "#EF5D5D" : "#F6F1E4"}
            />
          </button>
          <span className="cat-chip">
            <CatIcon size={12} strokeWidth={2.4} />
            {catMeta?.label}
          </span>
          {soldOutSoon && <span className="urgency-chip">Few seats left</span>}
        </div>

        <div className="ticket-info">
          <div className="ticket-info-top">
            <h3 className="ticket-title">{event.title}</h3>
            <div className="ticket-price">
              {ticketPrice === 0 ? "FREE" : `$${ticketPrice}`}
            </div>
          </div>
          <p className="ticket-venue">
            <MapPin size={13} strokeWidth={2.2} /> {venue}
          </p>
          <p className="ticket-date">
            <Calendar size={13} strokeWidth={2.2} /> {displayDay} · {displayDate} · {displayTime}
          </p>
        </div>
      </div>

      <div className="ticket-perf" aria-hidden="true">
        <span className="notch notch-top" aria-hidden="true" />
        <span className="notch notch-bottom" aria-hidden="true" />
      </div>

      <div className="ticket-side">
        <span className="ticket-side-label">ADMIT ONE</span>
        <div className="barcode-dark" aria-hidden="true" />
        <span className="ticket-code">{event.code || String(eventId).slice(-8).toUpperCase()}</span>
      </div>
    </article>
  );
}