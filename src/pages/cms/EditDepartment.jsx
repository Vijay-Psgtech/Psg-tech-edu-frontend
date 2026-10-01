import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getDepartment, saveDepartment, uploadDepartmentFiles } from "../../api/client.js";
import CmsShell from "./CmsShell.jsx";
import RepeatSection from "./RepeatSection.jsx";
import ReportsSection from "./ReportsSection.jsx";

/**
 * Same data flow, fields and top-level API calls as before
 * (getDepartment, saveDepartment, uploadDepartmentFiles; updateField /
 * updateHodField / updateList; upload / uploadHodPhoto; handleSave;
 * dirty-state tracking; completion meter; animated toast; thumbnails).
 *
 * New in this pass — dynamic per-item attachments:
 * - `uploadItemAsset(listKey, index, kind, files)` is one generic
 *   handler that uploads a file and stores the result on
 *   `item.image` or `item.document` for whichever list/index it's
 *   called with. It's wired into Programmes, Faculty, Highlights and
 *   Profile tabs via <RepeatSection allowImage allowDocument ... />,
 *   so every one of those sections can now take an image and/or a PDF
 *   per item — configured through props, not hardcoded per section.
 * - Reports keep their existing multi-photo upload and gain a single
 *   PDF document upload per report via `uploadReportDocument`.
 */

const isImageUrl = (url = "") => /\.(png|jpe?g|webp|gif|svg)$/i.test(url);

function computeCompletion(data) {
  if (!data) return 0;
  const checks = [
    Boolean(data.name),
    Boolean(data.aboutBody),
    Boolean(data.hod?.name),
    Boolean(data.hod?.message),
    Boolean(data.hod?.imageUrl),
    (data.gallery || []).length > 0,
    (data.programmes || []).length > 0,
    (data.faculty || []).length > 0,
    Boolean(data.vision),
    Boolean(data.mission),
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

function CompletionMeter({ percent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 180 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 999,
          background: "rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ height: "100%", borderRadius: 999, background: percent >= 80 ? "#16a34a" : percent >= 40 ? "#d97706" : "#dc2626" }}
        />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.7, whiteSpace: "nowrap" }}>{percent}% complete</span>
    </div>
  );
}

function AssetThumb({ item }) {
  if (item?.url && isImageUrl(item.url)) {
    return (
      <img
        src={item.url}
        alt=""
        style={{ width: 34, height: 34, borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{
        display: "grid",
        placeItems: "center",
        width: 34,
        height: 34,
        borderRadius: 6,
        background: "rgba(0,0,0,0.06)",
        flexShrink: 0,
        fontSize: 14,
      }}
    >
      ▣
    </span>
  );
}

export default function EditDepartment() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const originalRef = useRef(null);

  useEffect(() => {
    setData(null);
    originalRef.current = null;
    getDepartment(slug)
      .then((loaded) => {
        setData(loaded);
        originalRef.current = loaded;
      })
      .catch((err) => setStatus({ type: "error", text: err.message }));
  }, [slug]);

  // Auto-dismiss success toasts; leave error toasts up for the user to read.
  useEffect(() => {
    if (status?.type !== "ok") return undefined;
    const timer = setTimeout(() => setStatus(null), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  const isDirty = useMemo(
    () => Boolean(data && originalRef.current && JSON.stringify(data) !== JSON.stringify(originalRef.current)),
    [data]
  );
  const completion = useMemo(() => computeCompletion(data), [data]);

  function updateField(key, value) { setData((current) => ({ ...current, [key]: value })); }
  function updateHodField(key, value) { setData((current) => ({ ...current, hod: { ...current.hod, [key]: value } })); }
  function updateList(key, value) { setData((current) => ({ ...current, [key]: value })); }

  function discardChanges() {
    if (!originalRef.current) return;
    setData(originalRef.current);
    setStatus({ type: "ok", text: "Reverted to the last published version." });
  }

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

  /**
   * Generic per-item attachment uploader, shared by every repeat
   * section. `kind` is "image" or "document" (the item field to set);
   * it's translated to the multer field name ("images"/"documents")
   * the upload endpoint expects.
   */
  async function uploadItemAsset(listKey, index, kind, files) {
    if (!files?.length) return;
    setStatus({ type: "ok", text: "Uploading file…" });
    try {
      const [uploaded] = await uploadDepartmentFiles(slug, files, kind === "image" ? "images" : "documents");
      setData((current) => {
        const list = (current[listKey] || []).slice();
        list[index] = { ...list[index], [kind]: uploaded };
        return { ...current, [listKey]: list };
      });
      setStatus({ type: "ok", text: "File uploaded. Publish changes to make it public." });
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

  async function uploadReportDocument(reportIndex, files) {
    if (!files?.length) return;
    try {
      const [uploaded] = await uploadDepartmentFiles(slug, files, "documents");
      const reports = (data.reports || []).slice();
      reports[reportIndex] = { ...reports[reportIndex], document: uploaded };
      updateList("reports", reports);
      setStatus({ type: "ok", text: "Report document uploaded. Publish changes to make it public." });
    } catch (err) { setStatus({ type: "error", text: err.message }); }
  }

  async function handleSave() {
    setStatus(null);
    setSaving(true);
    try {
      const saved = await saveDepartment(slug, data);
      setData(saved);
      originalRef.current = saved;
      setStatus({ type: "ok", text: "Department profile published successfully." });
    } catch (err) {
      if (/401|token/i.test(err.message)) { navigate("/cms/login"); return; }
      setStatus({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (!data) {
    return (
      <CmsShell title="Department profile">
        <motion.div
          className="cms-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Loading department profile...
        </motion.div>
      </CmsShell>
    );
  }

  return (
    <CmsShell title={data.shortName ? `${data.shortName} department` : "Department profile"} eyebrow="Academic directory">
      <div className="cms-editor-intro">
        <div>
          <p>Keep this profile current for students, families, researchers, and industry partners.</p>
          <div style={{ marginTop: 10 }}>
            <CompletionMeter percent={completion} />
          </div>
        </div>
        <Link to={`/departments/${slug}`} className="cms-preview-link">Preview department ↗</Link>
      </div>

      <div className="cms-editor-grid">
        <div>
          <motion.section className="cms-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="cms-card-heading"><h2>Department details</h2><span>Identity & overview</span></div>
            <label>Name<input value={data.name || ""} onChange={(event) => updateField("name", event.target.value)} /></label>
            <div className="cms-form-grid">
              <label>Short name<input value={data.shortName || ""} onChange={(event) => updateField("shortName", event.target.value)} /></label>
              <label>Established year<input value={data.establishedYear || ""} onChange={(event) => updateField("establishedYear", event.target.value)} /></label>
            </div>
            <label>About body<textarea rows={6} value={data.aboutBody || ""} onChange={(event) => updateField("aboutBody", event.target.value)} /></label>
          </motion.section>

          <motion.section className="cms-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
            <div className="cms-card-heading"><h2>Head of the Department</h2><span>Leadership message</span></div>
            <label>Name<input value={data.hod?.name || ""} onChange={(event) => updateHodField("name", event.target.value)} /></label>
            <label>Designation<input value={data.hod?.designation || ""} onChange={(event) => updateHodField("designation", event.target.value)} /></label>
            <label>Message<textarea rows={5} value={data.hod?.message || ""} onChange={(event) => updateHodField("message", event.target.value)} /></label>
            <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
              HOD photo
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => uploadHodPhoto(event.target.files)} />
            </label>
            {data.hod?.imageUrl && (
              <img
                src={data.hod.imageUrl}
                alt="HOD preview"
                style={{ marginTop: 8, width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }}
              />
            )}
          </motion.section>

          <motion.section className="cms-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <div className="cms-card-heading"><h2>Gallery</h2><span>JPG, PNG or WEBP · up to 20 files per upload</span></div>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => upload(event.target.files, "images")} />
            {(data.gallery || []).map((item, index) => (
              <div className="cms-asset" key={item.url} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <AssetThumb item={item} />
                <span style={{ flex: 1 }}>{item.label || "Gallery image"}</span>
                <button type="button" className="remove" onClick={() => updateList("gallery", data.gallery.filter((_, i) => i !== index))}>Remove</button>
              </div>
            ))}
          </motion.section>

          <motion.section className="cms-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
            <div className="cms-card-heading"><h2>Contact</h2><span>Public details</span></div>
            <div className="cms-form-grid">
              <label>Email<input value={data.contactEmail || ""} onChange={(event) => updateField("contactEmail", event.target.value)} /></label>
              <label>Phone<input value={data.contactPhone || ""} onChange={(event) => updateField("contactPhone", event.target.value)} /></label>
            </div>
          </motion.section>
        </div>

        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
            <RepeatSection
              title="Programmes offered"
              items={data.programmes}
              onChange={(value) => updateField("programmes", value)}
              addLabel="Add programme"
              blankItem={{ name: "", level: "UG", intake: "" }}
              fields={[{ key: "name", label: "Programme name" }, { key: "level", label: "Level (UG / PG / PhD)" }, { key: "intake", label: "Intake" }]}
              allowImage
              allowDocument
              onUploadImage={(index, files) => uploadItemAsset("programmes", index, "image", files)}
              onUploadDocument={(index, files) => uploadItemAsset("programmes", index, "document", files)}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <RepeatSection
              title="Faculty"
              items={data.faculty}
              onChange={(value) => updateField("faculty", value)}
              addLabel="Add faculty member"
              blankItem={{ name: "", designation: "", qualification: "", email: "" }}
              fields={[{ key: "name", label: "Name" }, { key: "designation", label: "Designation" }, { key: "qualification", label: "Qualification" }, { key: "email", label: "Email" }]}
              allowImage
              allowDocument
              onUploadImage={(index, files) => uploadItemAsset("faculty", index, "image", files)}
              onUploadDocument={(index, files) => uploadItemAsset("faculty", index, "document", files)}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
            <RepeatSection
              title="Department highlights"
              items={data.highlights}
              onChange={(value) => updateField("highlights", value)}
              addLabel="Add highlight"
              blankItem={{ title: "", description: "" }}
              fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", type: "textarea" }]}
              allowImage
              allowDocument
              onUploadImage={(index, files) => uploadItemAsset("highlights", index, "image", files)}
              onUploadDocument={(index, files) => uploadItemAsset("highlights", index, "document", files)}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
            <RepeatSection
              title="Profile tabs"
              items={data.profileSections}
              onChange={(value) => updateField("profileSections", value)}
              addLabel="Add tab"
              blankItem={{ title: "", content: "" }}
              fields={[{ key: "title", label: "Tab title" }, { key: "content", label: "Content", type: "textarea" }]}
              allowImage
              allowDocument
              onUploadImage={(index, files) => uploadItemAsset("profileSections", index, "image", files)}
              onUploadDocument={(index, files) => uploadItemAsset("profileSections", index, "document", files)}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }}>
            <ReportsSection
              reports={data.reports}
              onChange={(value) => updateField("reports", value)}
              onUpload={uploadReportImages}
              onUploadDocument={uploadReportDocument}
            />
          </motion.div>

          <motion.section className="cms-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
            <div className="cms-card-heading"><h2>Vision & mission</h2><span>Public profile</span></div>
            <label>Vision<textarea rows={4} value={data.vision || ""} onChange={(event) => updateField("vision", event.target.value)} /></label>
            <label>Mission<textarea rows={4} value={data.mission || ""} onChange={(event) => updateField("mission", event.target.value)} /></label>
          </motion.section>

          <motion.section className="cms-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.35 }}>
            <div className="cms-card-heading"><h2>Announcements & documents</h2><span>PDF, DOC or DOCX · up to 20 files per upload</span></div>
            <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple onChange={(event) => upload(event.target.files, "documents")} />
            {(data.announcements || []).map((item, index) => (
              <div className="cms-asset" key={item.url} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <AssetThumb item={item} />
                <span style={{ flex: 1 }}>{item.label || "Document"}</span>
                <button type="button" className="remove" onClick={() => updateList("announcements", data.announcements.filter((_, i) => i !== index))}>Remove</button>
              </div>
            ))}
          </motion.section>
        </div>
      </div>

      <div className="cms-savebar" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <button className="btn primary" onClick={handleSave} disabled={saving} style={{ opacity: saving ? 0.7 : 1 }}>
          {saving ? "Publishing…" : "Publish changes"} <span>{saving ? "" : "→"}</span>
        </button>

        {isDirty && !saving && (
          <button type="button" className="btn" onClick={discardChanges}>
            Discard changes
          </button>
        )}

        <AnimatePresence>
          {isDirty && !saving && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 12, fontWeight: 600, color: "#d97706" }}
            >
              ● Unsaved changes
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {status && (
            <motion.p
              key={status.text}
              className={`status-msg ${status.type}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {status.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </CmsShell>
  );
}