import React from "react";

export default function RepeatSection({ title, items = [], fields, onChange, addLabel, blankItem }) {
  function updateItem(index, key, value) {
    const next = items.slice();
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  }

  return (
    <section className="cms-card">
      <div className="cms-card-heading"><h2>{title}</h2><span>{items.length} {items.length === 1 ? "item" : "items"}</span></div>
      {items.map((item, index) => (
        <div className="repeat-item" key={index}>
          <button type="button" className="remove" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
          {fields.map((field) => (
            <label key={field.key}>{field.label}
              {field.type === "textarea" ? (
                <textarea rows={2} value={item[field.key] || ""} onChange={(event) => updateItem(index, field.key, event.target.value)} />
              ) : (
                <input value={item[field.key] || ""} onChange={(event) => updateItem(index, field.key, event.target.value)} />
              )}
            </label>
          ))}
        </div>
      ))}
      <button type="button" className="btn add" onClick={() => onChange([...items, { ...blankItem }])}>+ {addLabel}</button>
    </section>
  );
}