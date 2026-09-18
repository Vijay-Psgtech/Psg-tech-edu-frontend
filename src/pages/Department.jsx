import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { assetUrl, getDepartment } from "../api/client.js";

/**
 * Same data flow and fallback logic as before (gallery fallback list,
 * broken-image handling for gallery + HOD photo, tabbed profile
 * sections) — restyled in a standard corporate/education theme instead
 * of the navy/brass heritage look:
 * - Default Tailwind palette only (blue-600 accent, slate text/borders,
 *   white cards) — no custom design tokens, so this renders correctly
 *   regardless of the project's Tailwind theme config.
 * - Plain system/sans typography throughout, no serif display font.
 * - Flatter, boxier cards (shadow-sm, slate-200 borders, blue-50 tints)
 *   instead of gold rules and cream panels.
 */

const fallbackGallery = ["/assets/convention hall.jpg", "/assets/About3.jpg", "/assets/bridge.jpg"];

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function CenteredNotice({ title, body, action }) {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-20">
      <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-800">{title}</p>
        {body && <p className="mt-2 text-sm text-slate-500">{body}</p>}
        {action}
      </div>
    </div>
  );
}

export default function Department() {
  const { slug } = useParams();
  const [dept, setDept] = useState(null);
  const [error, setError] = useState(null);
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState(0);
  const [hodImageFailed, setHodImageFailed] = useState(false);

  useEffect(() => {
    setDept(null);
    setError(null);
    setSlide(0);
    setTab(0);
    setHodImageFailed(false);
    getDepartment(slug).then(setDept).catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <PageShell>
        <CenteredNotice
          title="Couldn't load this department"
          body={error}
          action={
            <a
              href="/departments"
              className="mt-5 inline-flex items-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-150"
            >
              Back to departments
            </a>
          }
        />
      </PageShell>
    );
  }

  if (!dept) {
    return (
      <PageShell>
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-64 rounded bg-slate-200" />
            <div className="h-85 rounded-lg bg-slate-200" />
            <div className="h-40 rounded-lg bg-slate-200" />
          </div>
        </div>
      </PageShell>
    );
  }

  const gallery = dept.gallery?.length ? dept.gallery : fallbackGallery.map((url) => ({ url, label: "Department event" }));
  const sections = dept.profileSections?.length ? dept.profileSections : [{ title: "About", content: dept.aboutBody }];
  const current = gallery[slide % gallery.length];

  return (
    <PageShell>
      {/* Titlebar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-slate-400">
            <a href="/" className="hover:text-blue-600 transition-colors duration-150">Home</a>
            <span className="mx-2">/</span>
            <a href="/departments" className="hover:text-blue-600 transition-colors duration-150">Departments</a>
            <span className="mx-2">/</span>
            <span className="text-slate-600">{dept.name}</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Department of {dept.name}
            </h1>
            {dept.establishedYear && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Est. {dept.establishedYear}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-10 space-y-8">
        {/* Gallery */}
        <section aria-label="Department gallery" className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.url}
              src={assetUrl(current.url)}
              onError={() => setSlide((slide + 1) % gallery.length)}
              alt={current.label || `${dept.name} event`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="h-60 sm:h-85 lg:h-105 w-full object-cover"
            />
          </AnimatePresence>

          {gallery.length > 1 && (
            <>
              <button
                onClick={() => setSlide((slide - 1 + gallery.length) % gallery.length)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-700 shadow-md transition-colors duration-150 hover:bg-blue-600 hover:text-white"
              >
                ‹
              </button>
              <button
                onClick={() => setSlide((slide + 1) % gallery.length)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-700 shadow-md transition-colors duration-150 hover:bg-blue-600 hover:text-white"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${i === slide % gallery.length ? "w-5 bg-blue-600" : "w-1.5 bg-white/80"}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* HOD desk */}
        <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6">
            {dept.hod?.imageUrl && !hodImageFailed ? (
              <img
                src={assetUrl(dept.hod.imageUrl)}
                onError={() => setHodImageFailed(true)}
                alt={dept.hod.name}
                className="h-24 w-24 flex-none rounded-full object-cover border-2 border-slate-100"
              />
            ) : (
              <div className="grid h-24 w-24 flex-none place-items-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 border-2 border-slate-100">
                HOD
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900">HOD's Desk</h2>
              <p className="mt-1 text-sm font-semibold text-blue-600">
                {dept.hod?.name || "Head of the Department"}
              </p>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {dept.hod?.message || "The Head of the Department's message will be published here."}
              </p>

              {(dept.programmes || []).length > 0 && (
                <>
                  <h3 className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-400">Academic Programmes</h3>
                  <ul className="mt-2.5 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {dept.programmes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-blue-600" />
                        {item.name}{item.level ? ` (${item.level})` : ""}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Announcements */}
        <section>
          <h2 className="text-lg font-bold text-slate-900">Announcements</h2>
          {(dept.announcements || []).length ? (
            <div className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
              {dept.announcements.map((item, index) => (
                <a
                  key={index}
                  href={assetUrl(item.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 px-5 py-3.5 text-sm text-slate-700 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-md bg-blue-50 text-sm text-blue-600 transition-colors duration-150 group-hover:bg-blue-600 group-hover:text-white">▣</span>
                  <span className="flex-1">{item.label || "Department document"}</span>
                  <span className="text-slate-300 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-blue-600">→</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No announcements have been published.</p>
          )}
        </section>

        {/* Profile tabs */}
        <section>
          <div role="tablist" className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
            {sections.map((section, index) => (
              <button
                key={section.title}
                role="tab"
                aria-selected={tab === index}
                onClick={() => setTab(index)}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                  tab === index ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {section.title}
              </button>
            ))}
            <a
              href={`/departments/${slug}/reports`}
              className="ml-auto text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors duration-150"
            >
              Reports →
            </a>
          </div>
          <div className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-slate-700">
            {sections[tab]?.content}
          </div>

          {(dept.vision || dept.mission) && (
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {dept.vision && (
                <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">Vision</h2>
                  <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-slate-600">{dept.vision}</p>
                </article>
              )}
              {dept.mission && (
                <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">Mission</h2>
                  <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-slate-600">{dept.mission}</p>
                </article>
              )}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}