import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function getTimeParts(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (Number.isNaN(diff)) return null;
  if (diff <= 0) return { ended: true };

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { ended: false, days, hours, minutes, seconds };
}

/**
 * Compact countdown block. Pass any parseable date — pairs well with
 * the raw `event.date` timestamp (not a pre-formatted string).
 */
export default function EventCountdown({ date, className = "" }) {
  const [parts, setParts] = useState(() => getTimeParts(date));

  useEffect(() => {
    setParts(getTimeParts(date));
    const id = setInterval(() => setParts(getTimeParts(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  return (
    <div className={`countdown-block ${className}`}>
      <style>{`
        .countdown-block {
          width: 92px;
          flex-shrink: 0;
          background: var(--ink-3, #262040);
          border: 1px solid rgba(246,241,228,0.1);
          border-radius: 12px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }
        .countdown-label {
          display: flex; align-items: center; gap: 4px;
          font-family: 'Space Mono', monospace;
          font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--marigold, #f3a93b);
        }
        .countdown-ended-label { color: var(--muted, #b6afd1); }
        .countdown-days {
          font-family: 'Anton', sans-serif;
          font-size: 26px; line-height: 1;
          color: var(--paper, #f6f1e4);
        }
        .countdown-days-suffix {
          font-family: 'Space Mono', monospace;
          font-size: 9px; color: var(--muted, #b6afd1);
          text-transform: uppercase;
          margin-top: 2px;
        }
        .countdown-clock {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--paper, #f6f1e4);
          letter-spacing: 0.02em;
        }
        .countdown-ended {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--muted, #b6afd1);
          padding: 8px 0;
        }
      `}</style>

      {!parts ? (
        <div className="countdown-ended">—</div>
      ) : parts.ended ? (
        <>
          <span className="countdown-label countdown-ended-label">
            <Clock size={10} /> Event
          </span>
          <div className="countdown-ended">Started</div>
        </>
      ) : (
        <>
          <span className="countdown-label">
            <Clock size={10} /> Starts in
          </span>
          {parts.days > 0 ? (
            <>
              <div className="countdown-days">{parts.days}</div>
              <div className="countdown-days-suffix">{parts.days === 1 ? "day" : "days"}</div>
            </>
          ) : (
            <div className="countdown-clock">
              {String(parts.hours).padStart(2, "0")}:
              {String(parts.minutes).padStart(2, "0")}:
              {String(parts.seconds).padStart(2, "0")}
            </div>
          )}
        </>
      )}
    </div>
  );
}