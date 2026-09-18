import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CmsShell({ children, title, eyebrow = "Content studio" }) {
  const navigate = useNavigate();

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
          <Link to="/cms">Overview</Link>
          <Link to="/cms/homepage">Homepage</Link>
          <Link to="/cms/departments/cse">Departments</Link>
        </nav>
        <div className="cms-sidebar-bottom">
          <Link to="/">View public site</Link>
          <button type="button" onClick={logout}>Sign out</button>
        </div>
      </aside>
      <main className="cms-main">
        <div className="cms-mobilebar">
          <Link to="/cms" className="cms-mobilebrand">PSG Tech <span>CMS</span></Link>
          <button type="button" onClick={logout}>Sign out</button>
        </div>
        <header className="cms-pagehead">
          <div><span className="cms-eyebrow">{eyebrow}</span><h1>{title}</h1></div>
          <Link className="cms-viewsite" to="/">View public site <span>↗</span></Link>
        </header>
        {children}
      </main>
    </div>
  );
}