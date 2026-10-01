import React from "react";
import { assetUrl } from "../../api/client.js";

/**
 * Generic repeat-item editor used for Programmes, Faculty, Highlights
 * and Profile tabs.
 *
 * Each section decides for itself whether its items can carry an image
 * and/or a PDF — nothing is hardcoded per section, it's configured by
 * the caller:
 *
 *   <RepeatSection
 *     title="Faculty"
 *     items={data.faculty}
 *     onChange={(value) => updateField("faculty", value)}
 *     addLabel="Add faculty member"
 *     blankItem={{ name: "", designation: "", qualification: "", email: "" }}
 *     fields={[...]}
 *     allowImage
 *     allowDocument
 *     onUploadImage={(index, files) => uploadItemAsset("faculty", index, "image", files)}
 *     onUploadDocument={(index, files) => uploadItemAsset("faculty", index, "document", files)}
 *   />
 *
 * The uploaded asset is stored as `item.image` / `item.document`
 * ({ url, label }), matching the AssetSchema used everywhere else in
 * the backend model.
 */

const isImageUrl = (url = "") => /\.(png|jpe?g|webp|gif|svg)$/i.test(url);

function AttachmentField({ label, accept, asset, onUpload, onRemove }) {
  return (
    <div style={{ marginTop: 10 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {label}
        <input
          type="file"
          accept={accept}
          onChange={(event) => {
            onUpload(event.target.files);
            event.target.value = "";
          }}
        />
      </label>
      {asset?.url && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          {isImageUrl(asset.url) ? (
            <img
              src={assetUrl(asset.url)}
              alt=""
              style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 13 }}>📄 {asset.label || "Attached file"}</span>
          )}
          <button type="button" className="remove" onClick={onRemove}>Remove</button>
        </div>
      )}
    </div>
  );
}

export default function RepeatSection({
  title,
  items,
  onChange,
  addLabel,
  blankItem,
  fields,
  allowImage = false,
  allowDocument = false,
  onUploadImage,
  onUploadDocument,
}) {
  const list = items || [];

  function updateItem(index, key, value) {
    const next = list.slice();
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  }

  function removeItem(index) {
    onChange(list.filter((_, i) => i !== index));
  }

  function removeAsset(index, key) {
    const next = list.slice();
    next[index] = { ...next[index], [key]: undefined };
    onChange(next);
  }

  function addItem() {
    onChange([...list, { ...blankItem }]);
  }

  return (
    <section className="cms-card">
      <div className="cms-card-heading">
        <h2>{title}</h2>
        <span>{list.length} {list.length === 1 ? "ITEM" : "ITEMS"}</span>
      </div>

      {list.map((item, index) => (
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

          {fields.map((field) => (
            <label key={field.key}>
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  rows={4}
                  value={item[field.key] || ""}
                  onChange={(event) => updateItem(index, field.key, event.target.value)}
                />
              ) : (
                <input
                  value={item[field.key] || ""}
                  onChange={(event) => updateItem(index, field.key, event.target.value)}
                />
              )}
            </label>
          ))}

          {allowImage && (
            <AttachmentField
              label="Image"
              accept="image/jpeg,image/png,image/webp"
              asset={item.image}
              onUpload={(files) => onUploadImage?.(index, files)}
              onRemove={() => removeAsset(index, "image")}
            />
          )}

          {allowDocument && (
            <AttachmentField
              label="PDF document"
              accept=".pdf,application/pdf"
              asset={item.document}
              onUpload={(files) => onUploadDocument?.(index, files)}
              onRemove={() => removeAsset(index, "document")}
            />
          )}
        </div>
      ))}

      <button type="button" className="btn" onClick={addItem} style={{ marginTop: list.length ? 16 : 0 }}>
        {addLabel}
      </button>
    </section>
  );
}