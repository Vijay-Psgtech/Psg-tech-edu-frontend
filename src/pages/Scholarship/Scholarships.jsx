import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import { SCHOLARSHIPS } from "./Scholarshipsdata.js";

/**
 * Scholarships.jsx — "Scholarships" index, reached from the
 * Academics dropdown at /academics/scholarships. Full-bleed banner
 * (same treatment as ProgrammeDetail's banner, since this index needs
 * a hero image too, not just the compact ink hero Programmes.jsx
 * uses), an acknowledgement line, then each SCHOLARSHIPS entry
 * (see scholarshipsData.js) as a link card to its detail page at
 * /academics/scholarships/:slug.
 *
 * Styled to match the Programmes/ProgrammeDetail family: Fraunces
 * display type, gold accents, flat bordered cards, one restrained
 * scroll-reveal per section.
 */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function Scholarships() {
  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Banner — same full-bleed overlay layout as ProgrammeDetail */}
      <section className="relative">
        <div className="relative h-[38vh] min-h-20 max-h-100 w-full overflow-hidden bg-ink">
          <motion.img
            src={SCHOLARSHIPS[0]?.banner}
            alt=""
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
              <span className="text-white/85">Scholarships</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              Academics
            </span>
            <h1 className="mt-3 font-display text-[30px] sm:text-[40px] font-semibold text-white leading-[1.05]">
              Scholarships
            </h1>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20">
        <motion.p
          {...reveal}
          className="max-w-[72ch] text-[15.5px] leading-[1.85] text-ink/70 border-b border-line pb-10 mb-10"
        >
          PSG Management acknowledges and thanks all the noble hearts for
          contributing towards scholarships to the needy and deserving
          students.
        </motion.p>

        <motion.div {...reveal} className="grid sm:grid-cols-2 gap-3">
          {SCHOLARSHIPS.map((s) => (
            <Link
              key={s.slug}
              to={`/academics/scholarships/${s.slug}`}
              className="group flex items-center justify-between gap-4 px-5 py-4 bg-white border border-line transition-colors duration-150 hover:border-gold hover:bg-cream"
            >
              <span className="text-[14.5px] font-semibold text-ink/85 group-hover:text-ink">
                {s.name}
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
            </Link>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
