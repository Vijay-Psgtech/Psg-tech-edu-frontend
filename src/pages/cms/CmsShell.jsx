import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Same shell contract as before (title, eyebrow, children, sign-out via
 * cms_token) — advanced/innovative pass on top:
 * - Nav links now highlight the active route instead of looking static.
 * - Sidebar links get small icon glyphs so the nav scans faster.
 * - Mobile top bar gets a real nav drawer (hamburger → animated
 *   dropdown with the same links) instead of only a sign-out button.
 */

const NAV_ITEMS = [
  { to: "/cms", label: "Overview", icon: "⌂", end: true },
  { to: "/cms/homepage", label: "Homepage", icon: "▤" },
  { to: "/cms/departments/cse", label: "Departments", icon: "🎓" },
];

function isActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return pathname.startsWith(item.to);
}

export default function CmsShell({ children, title, eyebrow = "Content studio" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function logout() {
    localStorage.removeItem("cms_token");
    navigate("/cms/login");
  }

  return (
    <div className="cms-app">
      <aside className="cms-sidebar">
        <Link className="cms-brand" to="/cms">
          <span className="cms-crest">PSG</span>
          <span><strong>PSG Tech</strong><small>Content studio</small></span>
        </Link>
        <nav className="cms-nav" aria-label="CMS navigation">
          <span className="cms-nav-label">Workspace</span>
          {NAV_ITEMS.map((item) => {
            const active = isActive(location.pathname, item);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  position: "relative",
                  fontWeight: active ? 700 : 500,
                  opacity: active ? 1 : 0.8,
                }}
              >
                {active && (
                  <motion.span
                    layoutId="cms-nav-active"
                    style={{
                      position: "absolute",
                      left: -12,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      borderRadius: 2,
                      background: "currentColor",
                    }}
                  />
                )}
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="cms-sidebar-bottom">
          <Link to="/">View public site</Link>
          <button type="button" onClick={logout}>Sign out</button>
        </div>
      </aside>
      <main className="cms-main">
        <div className="cms-mobilebar">
          <Link to="/cms" className="cms-mobilebrand">PSG Tech <span>CMS</span></Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? "✕" : "☰"}
            </button>
            <button type="button" onClick={logout}>Sign out</button>
          </div>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav
              aria-label="Mobile CMS navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ display: "flex", flexDirection: "column", padding: "4px 0" }}>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileNavOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 4px",
                      fontWeight: isActive(location.pathname, item) ? 700 : 500,
                    }}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <header className="cms-pagehead">
          <div><span className="cms-eyebrow">{eyebrow}</span><h1>{title}</h1></div>
          <Link className="cms-viewsite" to="/">View public site <span>↗</span></Link>
        </header>
        {children}
      </main>
    </div>
  );
}