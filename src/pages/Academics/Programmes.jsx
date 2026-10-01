import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import { LEVELS, programmesByLevel } from "./Programmesdata.js";

/**
 * Programmes.jsx — "Programmes" index, reached from the Academics
 * dropdown at /academics/programmes. Groups PROGRAMMES (see
 * programmesData.js) by level and renders each as a link card to its
 * detail page at /academics/programmes/:slug.
 *
 * Styled to match the About/Principal family: compact hero, Fraunces
 * display type, gold accents, one restrained scroll-reveal per
 * section.
 */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function ProgrammeGroup({ levelKey }) {
  const { label, degree } = LEVELS[levelKey];
  const items = programmesByLevel(levelKey);
  if (items.length === 0) return null;

  return (
    <motion.div {...reveal}>
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6">
        <h2 className="font-display text-[24px] font-semibold text-ink leading-tight">
          {label}
        </h2>
        <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink/40">
          {degree}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((p) => (
          <Link
            key={p.slug}
            to={`/academics/programmes/${p.slug}`}
            className="group flex items-center justify-between gap-4 px-5 py-4 bg-white border border-line transition-colors duration-150 hover:border-gold hover:bg-cream"
          >
            <span className="text-[14.5px] font-semibold text-ink/85 group-hover:text-ink">
              {p.name}
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
      </div>
    </motion.div>
  );
}

export default function Programmes() {
  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Compact hero */}
      <section className="relative bg-ink overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-75 w-75 rounded-full"
          style={{ border: "1px solid rgba(101,177,229,0.25)" }}
        />
        <div className="relative z-10 max-w-310 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <span className="text-white/60">Academics</span>
              <span className="mx-2">/</span>
              <span className="text-white/85">Programmes</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              Academics
            </span>
            <h1 className="mt-4 font-display text-[34px] sm:text-[46px] font-semibold text-white leading-[1.05]">
              Programmes
            </h1>
            <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-white/70">
              Undergraduate and postgraduate programmes offered at PSG College
              of Technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programme groups */}
      <section className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20 space-y-16">
        <ProgrammeGroup levelKey="ug" />
        <ProgrammeGroup levelKey="pg" />
        <ProgrammeGroup levelKey="pgscience" />
      </section>
    </div>
  );
}
