import React from "react";
import { Link } from "react-router-dom";
import CmsShell from "./CmsShell.jsx";

export default function CmsDashboard() {
  return <CmsShell title="CSE HOD workspace" eyebrow="Overview">
    <div className="cms-welcome"><p>Manage the Computer Science and Engineering department profile, publications, images, and documents.</p><span>CSE HOD workspace · Ready</span></div>
    <div className="cms-dashboard-grid"><Link className="cms-module cms-module-primary" to="/cms/departments/cse"><span className="cms-module-icon">01</span><span className="cms-module-arrow">↗</span><div><span className="cms-eyebrow">Academic directory</span><h2>Computer Science & Engineering</h2><p>Department profile, HOD desk, gallery, documents, tabs, programmes, vision, and mission.</p></div><strong>Edit CSE profile <span>→</span></strong></Link></div>
    <section className="cms-note"><span className="cms-note-mark">i</span><div><strong>Publishing note</strong><p>Changes are published to the public department website as soon as they are saved.</p></div></section>
  </CmsShell>;
}
