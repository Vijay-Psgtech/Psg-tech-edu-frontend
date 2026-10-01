import React from "react";
import { assetUrl } from "../../api/client.js";

/**
 * Same report fields as before (title, date, organisedBy, content,
 * images) plus one addition: each report can now also carry a single
 * PDF document (e.g. the official report/brochure), uploaded the same
 * way as the photos.
 */

export default function ReportsSection({ reports, onChange, onUpload, onUploadDocument }) {
  const list = reports || [];

  function updateItem(index, key, value) {
    const next = list.slice();
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  }

  function removeItem(index) {
    onChange(list.filter((_, i) => i !== index));
  }

  function removeImage(reportIndex, imageIndex) {
    const next = list.slice();
    const images = (next[reportIndex].images || []).filter((_, i) => i !== imageIndex);
    next[reportIndex] = { ...next[reportIndex], images };
    onChange(next);
  }

  function removeDocument(reportIndex) {
    const next = list.slice();
    next[reportIndex] = { ...next[reportIndex], document: undefined };
    onChange(next);
  }

  function addReport() {
    onChange([...list, { title: "", date: "", organisedBy: "", content: "", images: [] }]);
  }

  return (
    <section className="cms-card">
      <div className="cms-card-heading">
        <h2>Reports</h2>
        <span>{list.length} {list.length === 1 ? "ITEM" : "ITEMS"}</span>
      </div>

      {list.map((report, index) => (
        <div
          className="cms-repeat-item"
          key={index}
          style={{
            borderTop: index ? "1px solid rgba(0,0,0,0.08)" : "none",
            paddingTop: index ? 16 : 0,
            marginTop: index ? 16 : 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" className="remove" onClick={() => removeItem(index)}>Remove</button>
          </div>

          <label>Title<input value={report.title || ""} onChange={(event) => updateItem(index, "title", event.target.value)} /></label>
          <div className="cms-form-grid">
            <label>Date<input value={report.date || ""} onChange={(event) => updateItem(index, "date", event.target.value)} /></label>
            <label>Organised by<input value={report.organisedBy || ""} onChange={(event) => updateItem(index, "organisedBy", event.target.value)} /></label>
          </div>
          <label>Content<textarea rows={6} value={report.content || ""} onChange={(event) => updateItem(index, "content", event.target.value)} /></label>

          <div style={{ marginTop: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
              Photos
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(event) => {
                  onUpload(index, event.target.files);
                  event.target.value = "";
                }}
              />
            </label>
            {(report.images || []).length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
                {report.images.map((image, imageIndex) => (
                  <div key={image.url} style={{ textAlign: "center" }}>
                    <img
                      src={assetUrl(image.url)}
                      alt=""
                      style={{ width: 48, height: 48, borderRadius: 6, objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      className="remove"
                      style={{ display: "block", fontSize: 11, marginTop: 2 }}
                      onClick={() => removeImage(index, imageIndex)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
              PDF document
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(event) => {
                  onUploadDocument(index, event.target.files);
                  event.target.value = "";
                }}
              />
            </label>
            {report.document?.url && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 13 }}>📄 {report.document.label || "Report document"}</span>
                <button type="button" className="remove" onClick={() => removeDocument(index)}>Remove</button>
              </div>
            )}
          </div>
        </div>
      ))}

      <button type="button" className="btn" onClick={addReport} style={{ marginTop: list.length ? 16 : 0 }}>
        Add report
      </button>
    </section>
  );
}