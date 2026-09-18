import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { getDepartments } from "../api/client.js";

/**
 * Same data flow as before (getDepartments → departments / error state),
 * restyled in the site's navy/brass heritage theme (bg-paper, text-ink,
 * border-line, bg-gold, bg-cream, font-display/font-body) to match the
 * redesigned Header:
 * - A navy hero band with a breadcrumb and a short intro line, instead of
 *   a bare <h1> sitting on white.
 * - Cards get a monogram badge, a gold hover rule, and a slight lift —
 *   consistent with the card treatment used elsewhere.
 * - Loading state is skeleton cards (same grid shape as the real content)
 *   instead of a plain "Loading…" line, so the page doesn't jump.
 * - Error state is a proper inline panel with a retry button rather than
 *   a stray red sentence.
 */

function DepartmentSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-line bg-white p-6 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-cream" />
          <div className="mt-5 h-4 w-3/4 rounded bg-cream" />
          <div className="mt-2 h-4 w-1/2 rounded bg-cream" />
          <div className="mt-6 h-3 w-24 rounded bg-cream" />
        </div>
      ))}
    </div>
  );
}

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError(null);
    getDepartments()
      .then((data) => setDepartments(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="bg-paper min-h-screen font-body text-ink">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-ink text-white">
          <div className="max-w-300 mx-auto px-4 lg:px-8 py-14 lg:py-16">
            <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.14em] text-white/45">
              <a href="/" className="hover:text-gold transition-colors duration-150">Home</a>
              <span className="mx-2">/</span>
              <span className="text-gold">Departments</span>
            </nav>
            <h1 className="mt-4 font-display text-[32px] sm:text-[40px] font-semibold tracking-[0.005em]">
              Academic Departments
            </h1>
            <p className="mt-3 max-w-140 text-[14px] leading-relaxed text-white/60">
              Explore programmes, faculty and research across the college's undergraduate and postgraduate departments.
            </p>
          </div>
        </section>

        {/* Directory */}
        <section className="max-w-300 mx-auto px-4 lg:px-8 py-12 lg:py-16">
          {error ? (
            <div className="mx-auto max-w-md rounded-xl border border-line bg-white p-8 text-center">
              <p className="font-display text-[17px] font-semibold text-ink">Couldn't load departments</p>
              <p className="mt-2 text-[13px] text-ink/55">{error}</p>
              <button
                type="button"
                onClick={load}
                className="mt-5 inline-flex items-center rounded-full bg-gold px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-ink transition-colors duration-150"
              >
                Try again
              </button>
            </div>
          ) : loading ? (
            <DepartmentSkeleton />
          ) : departments.length === 0 ? (
            <p className="text-center text-[14px] text-ink/55">No departments to show yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {departments.map((department, i) => (
                <motion.a
                  key={department.slug}
                  href={`/departments/${department.slug}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.25, ease: "easeOut" }}
                  className="group relative flex flex-col rounded-xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_16px_32px_rgba(11,47,80,0.10)]"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 flex-none place-items-center rounded-full border border-gold/40 bg-cream font-display text-[13px] font-semibold text-ink transition-colors duration-200 group-hover:bg-gold group-hover:text-white"
                  >
                    {department.shortName || "PSG"}
                  </span>
                  <h2 className="mt-5 font-display text-[16.5px] font-semibold leading-snug text-ink">
                    {department.name}
                  </h2>
                  <span className="mt-auto pt-6 flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-gold">
                    View department
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </motion.a>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}