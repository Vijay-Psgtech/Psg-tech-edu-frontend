import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { assetUrl, getReport, getReports } from "../api/client.js";

export default function Reports() {
  const { slug, reportId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let active = true;
    setData(null);
    setError(null);
    setImage(0);
    setIsVisible(false);
    const request = reportId ? getReport(slug, reportId) : getReports(slug);
    request
      .then((result) => {
        if (!active) return;
        setData(result);
        window.requestAnimationFrame(() => active && setIsVisible(true));
      })
      .catch((err) => active && setError(err.message));
    return () => { active = false; };
  }, [slug, reportId]);

  if (error) return <PageFrame><main className="page-state error">Couldn't load reports: {error}</main></PageFrame>;
  if (!data) return <PageFrame><main className="page-state loading">Loading reports...</main></PageFrame>;

  if (!reportId) {
    return <PageFrame><main className={`reports-page report-page-enter ${isVisible ? "is-visible" : ""}`}>
      <h1>Reports - Department of {data.department}</h1>
      <div className="reports-list">
        {data.reports.length ? data.reports.map((report, index) => <Link style={{ "--item-delay": `${index * 70}ms` }} to={`/departments/${slug}/reports/${report._id}`} key={report._id}>
          {report.title}{report.date && ` [${report.date}]`}
        </Link>) : <p>No reports published.</p>}
      </div>
    </main></PageFrame>;
  }

  const { report } = data;
  const images = report.images || [];
  const current = images[image % images.length];
  return <PageFrame><main className={`report-detail report-page-enter ${isVisible ? "is-visible" : ""}`}>
    <Link className="report-back" to={`/departments/${slug}/reports`}>← All reports</Link>
    <h1>{report.title}</h1>
    <p><b>Date:</b> {report.date}</p>
    <p><b>Organised by:</b> {report.organisedBy || `The Department of ${data.department}`}</p>
    <article className="preserve-lines">{report.content}</article>
    {current && <section className="report-gallery">
      <img src={assetUrl(current.url)} alt={current.label || report.title} />
      {images.length > 1 && <div><button onClick={() => setImage((currentImage) => (currentImage - 1 + images.length) % images.length)} aria-label="Previous report image">‹</button><button onClick={() => setImage((currentImage) => (currentImage + 1) % images.length)} aria-label="Next report image">›</button></div>}
    </section>}
  </main></PageFrame>;
}

function PageFrame({ children }) {
  return <div className="report-page-shell"><Header />{children}<Footer /></div>;
}
