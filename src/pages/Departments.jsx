import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { getDepartments } from "../api/client.js";

/**
 * Same data flow as before (getDepartments → departments / error state).
 * Restyled to match the reference "course card" layout screenshot, plus:
 * - Course-related icons: a graduation cap badge on every banner, and
 *   book / cap / pin icons in the meta row instead of plain numbers.
 * - Animation pass: hero copy fades/slides in on mount, the card grid
 *   staggers in, cards lift + the banner badge rotates in on hover, and
 *   the red "View" pill nudges right on hover.
 * - Site fonts kept as-is (font-display for headings, font-body for
 *   copy) — only chrome/colour/motion changed.
 * - Loading state is skeleton cards in the same grid shape.
 * - Error state is a proper inline panel with a retry button.
 *
 * Note: the department API only returns { slug, name, shortName, ... }.
 * Fields the screenshot shows (instructor, rating, price) don't exist
 * for departments, so the footer meta below uses department-appropriate
 * stats (faculty / programmes / location) when present and degrades
 * gracefully when they're not, instead of inventing fake data.
 */

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function DepartmentSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-lg border border-line bg-white"
        >
          <div className="h-40 w-full animate-pulse bg-cream" />
          <div className="p-5">
            <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-cream" />
            <div className="mx-auto mt-3 h-3 w-full animate-pulse rounded bg-cream" />
            <div className="mx-auto mt-2 h-3 w-5/6 animate-pulse rounded bg-cream" />
            <div className="mt-6 flex items-center justify-between">
              <div className="h-3 w-20 animate-pulse rounded bg-cream" />
              <div className="h-7 w-16 animate-pulse rounded bg-cream" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GraduationCapIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 13.5L4.5 12.5V16c0 2.21 3.36 4 7.5 4s7.5-1.79 7.5-4v-3.5L12 16.5Z" />
    </svg>
  );
}

function BookOpenIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      {...props}
    >
      <path d="M12 6.5C10.4 5.25 8.2 4.5 6 4.5c-1.06 0-2.1.15-3 .43v13.5c.9-.28 1.94-.43 3-.43 2.2 0 4.4.75 6 2 1.6-1.25 3.8-2 6-2 1.06 0 2.1.15 3 .43V4.93c-.9-.28-1.94-.43-3-.43-2.2 0-4.4.75-6 2Zm0 11V8c1.34-1 3.12-1.5 4.86-1.5.4 0 .77.03 1.14.08v9.02a10.6 10.6 0 0 0-1.14-.08c-1.74 0-3.52.5-4.86 1.5Z" />
    </svg>
  );
}

function PinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
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

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-paper min-h-screen font-body text-ink">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-ink text-white">
          <div className="max-w-300 mx-auto px-4 lg:px-8 py-14 lg:py-16">
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              aria-label="Breadcrumb"
              className="text-[11px] uppercase tracking-[0.14em] text-white/45"
            >
              <a
                href="/"
                className="hover:text-red-500 transition-colors duration-150"
              >
                Home
              </a>
              <span className="mx-2">/</span>
              <span className="text-red-500">Departments</span>
            </motion.nav>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-4 flex items-center gap-3 font-display text-[32px] sm:text-[40px] font-semibold tracking-[0.005em]"
            >
              <motion.span
                initial={{ rotate: -18, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
                className="grid h-11 w-11 flex-none place-items-center rounded-full bg-red-600/20 text-red-400"
              >
                <GraduationCapIcon width={22} height={22} />
              </motion.span>
              Academic Departments
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-3 max-w-140 text-[14px] leading-relaxed text-white/60"
            >
              Explore programmes, faculty and research across the college's
              undergraduate and postgraduate departments.
            </motion.p>
          </div>
        </section>

        {/* Directory */}
        <section className="max-w-300 mx-auto px-4 lg:px-8 py-12 lg:py-16">
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md rounded-lg border border-line bg-white p-8 text-center"
            >
              <p className="font-display text-[17px] font-semibold text-ink">
                Couldn't load departments
              </p>
              <p className="mt-2 text-[13px] text-ink/55">{error}</p>
              <button
                type="button"
                onClick={load}
                className="mt-5 inline-flex items-center rounded bg-red-600 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-red-700 transition-colors duration-150"
              >
                Try again
              </button>
            </motion.div>
          ) : loading ? (
            <DepartmentSkeleton />
          ) : departments.length === 0 ? (
            <p className="text-center text-[14px] text-ink/55">
              No departments to show yet.
            </p>
          ) : (
            <motion.div
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {departments.map((department) => (
                <motion.a
                  key={department.slug}
                  href={`/departments/${department.slug}`}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(11,47,80,0.12)]"
                >
                  {/* Banner */}
                  <div className="relative h-40 w-full overflow-hidden bg-ink">
                    {department.image ? (
                      <img
                        src={department.image}
                        alt={department.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-ink to-ink/70">
                        <span className="font-display text-[28px] font-semibold tracking-wide text-white/85">
                          {department.shortName ||
                            department.name?.slice(0, 3).toUpperCase() ||
                            "PSG"}
                        </span>
                      </div>
                    )}

                    {/* Course-badge icon */}
                    <motion.span
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-red-600 text-white shadow-md"
                      aria-hidden="true"
                    >
                      <GraduationCapIcon />
                    </motion.span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col px-6 pt-5 pb-4 text-center">
                    <h2 className="font-display text-[14px] font-bold uppercase tracking-[0.04em] text-ink">
                      {department.name}
                    </h2>

                    <p className="mt-3 text-[12.5px] leading-relaxed text-ink/55">
                      {department.description ||
                        "Undergraduate and postgraduate programmes, faculty profiles and ongoing research."}
                    </p>

                    {/* Meta footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink/50">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <GraduationCapIcon width={14} height={14} />
                          {department.facultyCount ?? "—"}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpenIcon />
                          {department.programCount ?? "—"}
                        </span>
                        {department.location && (
                          <span className="flex items-center gap-1">
                            <PinIcon />
                            {department.location}
                          </span>
                        )}
                      </div>
                      <motion.span
                        whileHover={{ x: 3 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                        className="inline-flex items-center rounded bg-red-600 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-white group-hover:bg-red-700"
                      >
                        View
                      </motion.span>
                    </div>
                  </div>

                  {/* Accent strip */}
                  <div className="h-0.75 w-full bg-red-100 transition-colors duration-200 group-hover:bg-red-600" />
                </motion.a>
              ))}
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
