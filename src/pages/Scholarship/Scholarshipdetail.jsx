import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import { getScholarship } from "./scholarshipsData.js";

/**
 * ScholarshipDetail.jsx — reached at /academics/scholarships/:slug
 * from the Scholarships index. Full-bleed banner image, an optional
 * summary line, a grid of notification link-cards (see the
 * screenshot this was built from — "State And Central Scholarship
 * Notifications" listing Central Government / State Renewal / State
 * Fresh notification links), a full-bleed "detailing image" break,
 * and a back link — same structure as ProgrammeDetail.jsx.
 */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function ScholarshipDetail() {
  const { slug } = useParams();
  const scholarship = getScholarship(slug);

  if (!scholarship) {
    return (
      <div className="font-body text-ink bg-paper min-h-screen">
        <Header />
        <div className="max-w-250 mx-auto px-4 lg:px-8 py-24 text-center">
          <p className="font-display text-[24px] font-semibold text-ink">
            Scholarship category not found
          </p>
          <Link
            to="/academics/scholarships"
            className="mt-4 inline-block text-[14px] text-gold hover:underline"
          >
            &larr; Back to Scholarships
          </Link>
        </div>
      </div>
    );
  }

  const hasItems = scholarship.items && scholarship.items.length > 0;

  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative">
        <div className="relative h-[38vh] min-h-20 max-h-100 w-full overflow-hidden bg-ink">
          <motion.img
            src={scholarship.banner}
            alt={scholarship.name}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/30" />
          <div className="relative z-10 h-full max-w-250 mx-auto px-4 lg:px-8 flex flex-col justify-end pb-10">
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <span className="text-white/60">Academics</span>
              <span className="mx-2">/</span>
              <Link
                to="/academics/scholarships"
                className="hover:text-gold-bright transition-colors"
              >
                Scholarships
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/85">{scholarship.name}</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              Scholarships
            </span>
            <h1 className="mt-3 font-display text-[28px] sm:text-[38px] font-semibold text-white leading-[1.05] max-w-2xl">
              {scholarship.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20">
        {scholarship.summary && (
          <motion.p
            {...reveal}
            className="max-w-[72ch] text-[15.5px] leading-[1.85] text-ink/75 mb-10"
          >
            {scholarship.summary}
          </motion.p>
        )}

        <motion.div {...reveal}>
          {hasItems ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {scholarship.items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 px-5 py-4 bg-white border border-line transition-colors duration-150 hover:border-gold hover:bg-cream"
                >
                  <span className="text-[14.5px] font-semibold text-ink/85 group-hover:text-ink">
                    {item.label}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 flex-none fill-none stroke-current stroke-[1.5] text-gold opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-[15.5px] leading-[1.85] text-ink/55 italic">
              Notifications for {scholarship.name} are being added. Contact
              the Scholarship Cell for current details.
            </p>
          )}
        </motion.div>

        {/* Detailing image break */}
        <motion.figure {...reveal} className="mt-14 relative overflow-hidden">
          <img
            src={scholarship.detail}
            alt={`${scholarship.name} — documentation`}
            className="w-full h-65 sm:h-85 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/10 to-transparent" />
          <figcaption className="absolute bottom-5 left-5 flex flex-col text-white">
            <span className="text-[11px] uppercase tracking-[0.14em] text-white/70">
              Scholarships
            </span>
            <strong className="font-display text-[20px] font-medium">
              {scholarship.name}
            </strong>
          </figcaption>
        </motion.figure>

        <div className="mt-14">
          <Link
            to="/academics/scholarships"
            className="text-[13.5px] font-semibold text-ink/60 hover:text-ink"
          >
            &larr; Back to Scholarships
          </Link>
        </div>
      </section>
    </div>
  );
}