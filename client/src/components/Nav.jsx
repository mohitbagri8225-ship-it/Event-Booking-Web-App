import React, { useEffect,useState } from "react";
import { Ticket, Menu, ArrowUpRight, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/auth.context";

export default function Nav({ scrolled, menuOpen, setMenuOpen }) {
  const { user, logout, isLoggedIn } = useAuth();

  console.log("isLoggedIn:", isLoggedIn);
  // console.log("user:", user); 
  
  
  const [role, setRole] = useState("");
  
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);
  console.log(role);

  return (
    <nav className={`gate-nav ${scrolled ? "scrolled" : ""}`}>

      {/* Logo */}
      <a href="#top" className="logo">
        <span className="logo-mark">
          <Ticket size={16} color="#131022" strokeWidth={2.6} />
        </span>

        <span
          className="font-display"
          style={{ fontSize: 20 }}
        >
          Gate.
        </span>
      </a>

      {/* Main Navigation */}
      <div
        className="nav-links"
        style={{ display: menuOpen ? "none" : undefined }}
      >
        <a href="#discover" className="nav-link">
          Discover
        </a>

        <a href="#categories" className="nav-link">
          Categories
        </a>

        <a href="#how" className="nav-link">
          How it works
        </a>

         {
          user?.role === "user" ? <a href="/book-seat" className="nav-link">
          grab a seat
        </a> :null
         }

        {/* Only show these when logged in */}
        {isLoggedIn && (
          <>
            {
            user?.role === "admin" ? <a href="/my-events" className="nav-link">
             My Events
          </a> :<a href="/my-tickets" className="nav-link">
             My Tickets
          </a>
          }
          </>
        )}
      </div>

      {/* Right side */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >

        {/* DESKTOP BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
          className="desktop-only"
        >

          {!isLoggedIn ? (
            <>
              {/* NOT LOGGED IN */}
              <a href="/login">
                <button className="btn btn-ghost">
                  Sign in
                </button>
              </a>

              <a href="/register">
                <button className="btn btn-primary">
                  Get started
                  <ArrowUpRight size={15} />
                </button>
              </a>
            </>
          ) : (
            <>
              {/* LOGGED IN */}

              <a
                href="/profile"
                className="btn btn-ghost"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <UserIcon size={16} />

                {user?.username || "Profile"}
              </a>

              <button
                className="btn btn-primary"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="icon-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

      </div>
    </nav>
  );
}