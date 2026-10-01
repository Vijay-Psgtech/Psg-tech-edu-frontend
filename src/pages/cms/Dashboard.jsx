import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CmsShell from "./CmsShell.jsx";

/**
 * Same content and route as before — animation + polish pass:
 * - Welcome banner and the module card fade/slide in on load instead
 *   of appearing flat.
 * - The department module card gets a subtle hover lift and an
 *   animated arrow, matching the interaction language used on the
 *   public site.
 * - A short "quick tips" list replaces the single publishing note, so
 *   a new HOD editor has a starting checklist rather than one line.
 */

const TIPS = [
  "Update the HOD's message first — it's the first thing visitors read.",
  "Keep gallery photos landscape and under 2 MB for fast loading.",
  "Publish after every change — edits only go live once you hit Publish.",
];

export default function CmsDashboard() {
  return (
    <CmsShell title="CSE HOD workspace" eyebrow="Overview">
      <motion.div
        className="cms-welcome"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p>Manage the Computer Science and Engineering department profile, publications, images, and documents.</p>
        <span>CSE HOD workspace · Ready</span>
      </motion.div>

      <motion.div
        className="cms-dashboard-grid"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
          <Link className="cms-module cms-module-primary" to="/cms/departments/cse">
            <span className="cms-module-icon">01</span>
            <motion.span
              className="cms-module-arrow"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              ↗
            </motion.span>
            <div>
              <span className="cms-eyebrow">Academic directory</span>
              <h2>Computer Science & Engineering</h2>
              <p>Department profile, HOD desk, gallery, documents, tabs, programmes, vision, and mission.</p>
            </div>
            <strong>Edit CSE profile <span>→</span></strong>
          </Link>
        </motion.div>
      </motion.div>

      <motion.section
        className="cms-note"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16 }}
      >
        <span className="cms-note-mark">i</span>
        <div>
          <strong>Publishing note</strong>
          <p>Changes are published to the public department website as soon as they are saved.</p>
          <ul style={{ margin: "10px 0 0", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {TIPS.map((tip) => (
              <li key={tip} style={{ fontSize: 13, lineHeight: 1.5 }}>{tip}</li>
            ))}
          </ul>
        </div>
      </motion.section>
    </CmsShell>
  );
}