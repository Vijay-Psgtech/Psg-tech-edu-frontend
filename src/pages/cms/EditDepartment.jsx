import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDepartment, saveDepartment, uploadDepartmentFiles } from "../../api/client.js";
import CmsShell from "./CmsShell.jsx";
import RepeatSection from "./RepeatSection.jsx";
import ReportsSection from "./ReportsSection.jsx";

export default function EditDepartment() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData(null);
    getDepartment(slug).then(setData).catch((err) => setStatus({ type: "error", text: err.message }));
  }, [slug]);

  function updateField(key, value) { setData((current) => ({ ...current, [key]: value })); }
  function updateHodField(key, value) { setData((current) => ({ ...current, hod: { ...current.hod, [key]: value } })); }
  function updateList(key, value) { setData((current) => ({ ...current, [key]: value })); }

  async function upload(files, kind) {
    if (!files?.length) return;
    setStatus({ type: "ok", text: "Uploading files…" });
    try {
      const uploaded = await uploadDepartmentFiles(slug, files, kind);
      if (kind === "images") updateList("gallery", [...(data.gallery || []), ...uploaded]);
      else updateList("announcements", [...(data.announcements || []), ...uploaded]);
      setStatus({ type: "ok", text: "Upload complete. Publish changes to make it public." });
    } catch (err) { setStatus({ type: "error", text: err.message }); }
  }

  async function uploadHodPhoto(files) {
    if (!files?.length) return;
    try {
      const [uploaded] = await uploadDepartmentFiles(slug, files, "images");
      updateHodField("imageUrl", uploaded.url);
      setStatus({ type: "ok", text: "HOD photo uploaded. Publish changes to make it public." });
    } catch (err) { setStatus({ type: "error", text: err.message }); }
  }

  async function uploadReportImages(reportIndex, files) {
    if (!files?.length) return;
    try {
      const uploaded = await uploadDepartmentFiles(slug, files, "images");
      const reports = (data.reports || []).slice();
      reports[reportIndex] = { ...reports[reportIndex], images: [...(reports[reportIndex].images || []), ...uploaded] };
      updateList("reports", reports);
      setStatus({ type: "ok", text: "Report photos uploaded. Publish changes to make them public." });
    } catch (err) { setStatus({ type: "error", text: err.message }); }
  }

  async function handleSave() {
    setStatus(null);
    try {
      const saved = await saveDepartment(slug, data);
      setData(saved);
      setStatus({ type: "ok", text: "Department profile published successfully." });
    } catch (err) {
      if (/401|token/i.test(err.message)) { navigate("/cms/login"); return; }
      setStatus({ type: "error", text: err.message });
    }
  }

  if (!data) return <CmsShell title="Department profile"><div className="cms-loading">Loading department profile...</div></CmsShell>;

  return (
    <CmsShell title={data.shortName ? `${data.shortName} department` : "Department profile"} eyebrow="Academic directory">
      <div className="cms-editor-intro"><div><p>Keep this profile current for students, families, researchers, and industry partners.</p></div><Link to={`/departments/${slug}`} className="cms-preview-link">Preview department ↗</Link></div>
      <div className="cms-editor-grid">
        <div>
          <section className="cms-card"><div className="cms-card-heading"><h2>Department details</h2><span>Identity & overview</span></div><label>Name<input value={data.name || ""} onChange={(event) => updateField("name", event.target.value)} /></label><div className="cms-form-grid"><label>Short name<input value={data.shortName || ""} onChange={(event) => updateField("shortName", event.target.value)} /></label><label>Established year<input value={data.establishedYear || ""} onChange={(event) => updateField("establishedYear", event.target.value)} /></label></div><label>About body<textarea rows={6} value={data.aboutBody || ""} onChange={(event) => updateField("aboutBody", event.target.value)} /></label></section>
          <section className="cms-card"><div className="cms-card-heading"><h2>Head of the Department</h2><span>Leadership message</span></div><label>Name<input value={data.hod?.name || ""} onChange={(event) => updateHodField("name", event.target.value)} /></label><label>Designation<input value={data.hod?.designation || ""} onChange={(event) => updateHodField("designation", event.target.value)} /></label><label>Message<textarea rows={5} value={data.hod?.message || ""} onChange={(event) => updateHodField("message", event.target.value)} /></label><label>HOD photo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => uploadHodPhoto(event.target.files)} /></label></section>
          <section className="cms-card"><div className="cms-card-heading"><h2>Gallery</h2><span>JPG, PNG or WEBP · up to 20 files per upload</span></div><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => upload(event.target.files, "images")} />{(data.gallery || []).map((item, index) => <div className="cms-asset" key={item.url}><span>{item.label || "Gallery image"}</span><button type="button" className="remove" onClick={() => updateList("gallery", data.gallery.filter((_, i) => i !== index))}>Remove</button></div>)}</section>
          <section className="cms-card"><div className="cms-card-heading"><h2>Contact</h2><span>Public details</span></div><div className="cms-form-grid"><label>Email<input value={data.contactEmail || ""} onChange={(event) => updateField("contactEmail", event.target.value)} /></label><label>Phone<input value={data.contactPhone || ""} onChange={(event) => updateField("contactPhone", event.target.value)} /></label></div></section>
        </div>
        <div>
          <RepeatSection title="Programmes offered" items={data.programmes} onChange={(value) => updateField("programmes", value)} addLabel="Add programme" blankItem={{ name: "", level: "UG", intake: "" }} fields={[{ key: "name", label: "Programme name" }, { key: "level", label: "Level (UG / PG / PhD)" }, { key: "intake", label: "Intake" }]} />
          <RepeatSection title="Faculty" items={data.faculty} onChange={(value) => updateField("faculty", value)} addLabel="Add faculty member" blankItem={{ name: "", designation: "", qualification: "", email: "" }} fields={[{ key: "name", label: "Name" }, { key: "designation", label: "Designation" }, { key: "qualification", label: "Qualification" }, { key: "email", label: "Email" }]} />
          <RepeatSection title="Department highlights" items={data.highlights} onChange={(value) => updateField("highlights", value)} addLabel="Add highlight" blankItem={{ title: "", description: "" }} fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", type: "textarea" }]} />
          <RepeatSection title="Profile tabs" items={data.profileSections} onChange={(value) => updateField("profileSections", value)} addLabel="Add tab" blankItem={{ title: "", content: "" }} fields={[{ key: "title", label: "Tab title" }, { key: "content", label: "Content", type: "textarea" }]} />
          <ReportsSection reports={data.reports} onChange={(value) => updateField("reports", value)} onUpload={uploadReportImages} />
          <section className="cms-card"><div className="cms-card-heading"><h2>Vision & mission</h2><span>Public profile</span></div><label>Vision<textarea rows={4} value={data.vision || ""} onChange={(event) => updateField("vision", event.target.value)} /></label><label>Mission<textarea rows={4} value={data.mission || ""} onChange={(event) => updateField("mission", event.target.value)} /></label></section>
          <section className="cms-card"><div className="cms-card-heading"><h2>Announcements & documents</h2><span>PDF, DOC or DOCX · up to 20 files per upload</span></div><input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple onChange={(event) => upload(event.target.files, "documents")} />{(data.announcements || []).map((item, index) => <div className="cms-asset" key={item.url}><span>{item.label || "Document"}</span><button type="button" className="remove" onClick={() => updateList("announcements", data.announcements.filter((_, i) => i !== index))}>Remove</button></div>)}</section>
        </div>
      </div>
      <div className="cms-savebar"><button className="btn primary" onClick={handleSave}>Publish changes <span>→</span></button>{status && <p className={`status-msg ${status.type}`}>{status.text}</p>}</div>
    </CmsShell>
  );
}
