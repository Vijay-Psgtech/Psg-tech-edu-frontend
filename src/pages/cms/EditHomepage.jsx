import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getHomepage, saveHomepage } from "../../api/client.js";
import CmsShell from "./CmsShell.jsx";
import RepeatSection from "./RepeatSection.jsx";

export default function EditHomepage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getHomepage().then(setData).catch((err) => setStatus({ type: "error", text: err.message }));
  }, []);

  function updateField(key, value) { setData((current) => ({ ...current, [key]: value })); }

  async function handleSave() {
    setStatus(null);
    try {
      const saved = await saveHomepage(data);
      setData(saved);
      setStatus({ type: "ok", text: "Homepage published successfully." });
    } catch (err) {
      if (/401|token/i.test(err.message)) { navigate("/cms/login"); return; }
      setStatus({ type: "error", text: err.message });
    }
  }

  if (!data) return <CmsShell title="Homepage content"><div className="cms-loading">Loading homepage content...</div></CmsShell>;

  return (
    <CmsShell title="Homepage content" eyebrow="Public site">
      <div className="cms-editor-intro"><div><p>Shape the first impression of PSG Tech. Keep language concise, confident, and welcoming.</p></div><Link to="/" className="cms-preview-link">Preview homepage ↗</Link></div>
      <div className="cms-editor-grid">
        <div>
          <section className="cms-card"><div className="cms-card-heading"><h2>News bar</h2><span>Top navigation</span></div><label>News text<input value={data.newsTicker?.text || ""} onChange={(event) => updateField("newsTicker", { ...(data.newsTicker || {}), text: event.target.value })} /></label><label>News link<input value={data.newsTicker?.link || ""} onChange={(event) => updateField("newsTicker", { ...(data.newsTicker || {}), link: event.target.value })} /></label></section>
          <section className="cms-card">
            <div className="cms-card-heading"><h2>Hero section</h2><span>Above the fold</span></div>
            <label>Badge text<input value={data.badgeText || ""} onChange={(event) => updateField("badgeText", event.target.value)} /></label>
            <label>Heading<input value={data.heading || ""} onChange={(event) => updateField("heading", event.target.value)} /></label>
            <label>Subheading<textarea rows={3} value={data.subheading || ""} onChange={(event) => updateField("subheading", event.target.value)} /></label>
            <div className="cms-form-grid"><label>Primary button text<input value={data.ctaPrimaryText || ""} onChange={(event) => updateField("ctaPrimaryText", event.target.value)} /></label><label>Primary button link<input value={data.ctaPrimaryLink || ""} onChange={(event) => updateField("ctaPrimaryLink", event.target.value)} /></label></div>
            <div className="cms-form-grid"><label>Secondary button text<input value={data.ctaSecondaryText || ""} onChange={(event) => updateField("ctaSecondaryText", event.target.value)} /></label><label>Secondary button link<input value={data.ctaSecondaryLink || ""} onChange={(event) => updateField("ctaSecondaryLink", event.target.value)} /></label></div>
          </section>
          <section className="cms-card"><div className="cms-card-heading"><h2>Welcome section</h2><span>Institutional voice</span></div><label>Title<input value={data.welcomeTitle || ""} onChange={(event) => updateField("welcomeTitle", event.target.value)} /></label><label>Body<textarea rows={5} value={data.welcomeBody || ""} onChange={(event) => updateField("welcomeBody", event.target.value)} /></label></section>
        </div>
        <div>
          <RepeatSection title="Stats row" items={data.stats} onChange={(value) => updateField("stats", value)} addLabel="Add stat" blankItem={{ value: "", label: "" }} fields={[{ key: "value", label: "Value" }, { key: "label", label: "Label" }]} />
          <RepeatSection title="Campus highlights" items={data.highlights} onChange={(value) => updateField("highlights", value)} addLabel="Add highlight" blankItem={{ title: "", description: "", icon: "building" }} fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", type: "textarea" }]} />
          <RepeatSection title="Announcements" items={data.announcements} onChange={(value) => updateField("announcements", value)} addLabel="Add announcement" blankItem={{ date: "", title: "", link: "#" }} fields={[{ key: "date", label: "Date label" }, { key: "title", label: "Title" }, { key: "link", label: "Link" }]} />
          <RepeatSection title="Downloads" items={data.downloads} onChange={(value) => updateField("downloads", value)} addLabel="Add download" blankItem={{ label: "", link: "" }} fields={[{ key: "label", label: "Label" }, { key: "link", label: "Link" }]} />
        </div>
      </div>
      <div className="cms-savebar"><button className="btn primary" onClick={handleSave}>Publish changes <span>→</span></button>{status && <p className={`status-msg ${status.type}`}>{status.text}</p>}</div>
    </CmsShell>
  );
}
