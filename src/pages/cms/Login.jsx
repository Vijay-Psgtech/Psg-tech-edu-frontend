import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/client.js";

export default function CmsLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const { token } = await login(username, password);
      localStorage.setItem("cms_token", token);
      navigate("/cms");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="cms-login-page">
      <div className="cms-login-art"><span className="cms-crest large">PSG</span><p>PSG College of Technology</p><small>Content management portal</small></div>
      <form className="cms-login-box" onSubmit={handleSubmit}>
        <span className="cms-eyebrow">Staff access</span>
        <h1>Welcome back</h1>
        <p className="cms-login-intro">Sign in to keep the PSG Tech digital campus current.</p>
        <label>Username<input name="username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} autoFocus required /></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="status-msg error">{error}</p>}
        <button className="btn primary cms-login-button" type="submit">Sign in <span>→</span></button>
        <Link className="cms-backsite" to="/">← Back to public site</Link>
      </form>
    </div>
  );
}