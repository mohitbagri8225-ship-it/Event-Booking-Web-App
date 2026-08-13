import React from "react";

export default function Loader({ message = "Loading...", fullScreen = false, size = 40 }) {
  const spinner = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "3px solid rgba(246,241,228,0.15)",
          borderTopColor: "var(--marigold, #e8a33d)",
          animation: "loader-spin 0.8s linear infinite",
        }}
      />
      {message && (
        <p style={{ margin: 0, color: "var(--muted, #9a9488)", fontSize: 14 }}>
          {message}
        </p>
      )}
      <style>{`
        @keyframes loader-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--ink, #0f0d09)",
          zIndex: 9999,
        }}
      >
        {spinner}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 0",
        width: "100%",
      }}
    >
      {spinner}
    </div>
  );
}