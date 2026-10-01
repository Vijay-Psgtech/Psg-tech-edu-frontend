import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header.jsx";

/**
 * Principal.jsx — "Principal" page, reached from the About us dropdown.
 *
 * v2: replaces the plain hero + separate spotlight card with a single
 * split hero — the current Principal's portrait uses the same framed
 * "hero-image-frame" / "hero-image-note" treatment the homepage hero
 * already uses, so this page reads as native to the site rather than
 * a bolted-on layout.
 *
 * The nine past Principals are now a horizontal scrubber: a filled
 * progress line, one dot per era, and prev/next controls, with the
 * selected era crossfading in below. This replaces the plain button
 * row — the line communicates "this is a continuous succession"
 * rather than nine unrelated tabs.
 *
 * Swap the `/assets/principals/*.jpg` paths for the real photographs.
 */

const CURRENT_PRINCIPAL = {
  name: "Dr. G. Thilagavathi",
  title: "Principal (FAC)",
  years: "2026 – Present",
  photo: "/assets/principal_FAC.jpg",
};

const PAST_PRINCIPALS = [
  {
    era: "1951–70",
    name: "Dr. G R Damodaran",
    founder: true,
    note: "Founder Principal — led the college's growth from its 1951 beginnings.",
    photo: "/assets/g_r_damodaran.jpg",
  },
  {
    era: "1970–82",
    name: "Dr. R Subbayyan",
    note: "",
    photo: "/assets/princi_subbayyan.jpg",
  },
  {
    era: "1982–86",
    name: "Dr. K Venkataraman",
    note: "",
    photo: "/assets/principals/k-venkataraman.jpg",
  },
  {
    era: "1986–91",
    name: "Dr. A Shanmugasundaram",
    note: "",
    photo: "/assets/principals/a-shanmugasundaram.jpg",
  },
  {
    era: "1991–94",
    name: "Dr. S Subramanyan",
    note: "",
    photo: "/assets/principals/s-subramanyan.jpg",
  },
  {
    era: "1994–2002",
    name: "Dr. P Radhakrishnan",
    note: "",
    photo: "/assets/principals/p-radhakrishnan.jpg",
  },
  {
    era: "2002–2005",
    name: "Dr. S Vijayarangan",
    note: "",
    photo: "/assets/principals/s-vijayarangan.jpg",
  },
  {
    era: "2005–2019",
    name: "Dr. R Rudramoorthy",
    note: "",
    photo: "/assets/principals/r-rudramoorthy.jpg",
  },
  {
    era: "2019–2026",
    name: "Dr. K Prakasan",
    note: "",
    photo: "/assets/principals/k-prakasan.jpg",
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function Principal() {
  const [activeEra, setActiveEra] = useState(0);
  const active = PAST_PRINCIPALS[activeEra];
  const pct = (activeEra / (PAST_PRINCIPALS.length - 1)) * 100;

  const goTo = (i) =>
    setActiveEra(Math.max(0, Math.min(PAST_PRINCIPALS.length - 1, i)));

  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Split hero — copy left, current Principal portrait right */}
      <section className="relative bg-ink overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-90ded-full"
          style={{ border: "1px solid rgba(101,177,229,0.25)" }}
        />
        <div className="relative z-10 max-w-310 mx-auto px-4 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <a
                href="/about"
                className="hover:text-gold-bright transition-colors"
              >
                About
              </a>
              <span className="mx-2">/</span>
              <span className="text-white/85">Principal</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              1951 – Present
            </span>
            <h1 className="mt-4 font-display text-[38px] sm:text-[52px] font-semibold text-white leading-[1.02] tracking-tight">
              Principal
            </h1>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-white/70">
              Ten Principals have led PSG College of Technology across seven
              decades — from the founder's planned growth in 1951 to the present
              day.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-bright">
                Present Principal
              </span>
              <span className="h-px w-10 bg-white/25" />
            </div>
            <p className="mt-2 font-display text-[22px] font-semibold text-white">
              {CURRENT_PRINCIPAL.name}
            </p>
            <p className="mt-0.5 text-[14px] text-white/55">
              {CURRENT_PRINCIPAL.title} &middot; {CURRENT_PRINCIPAL.years}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="home-hero-visual relative w-full max-w-75 mx-auto lg:mx-0 lg:justify-self-end"
          >
            <div className="hero-image-frame">
              <img src={CURRENT_PRINCIPAL.photo} alt={CURRENT_PRINCIPAL.name} />
            </div>
            <div className="hero-image-note">
              <strong>{CURRENT_PRINCIPAL.name}</strong>
              <span>{CURRENT_PRINCIPAL.title}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Past Principals — scrubber timeline */}
      <section className="bg-white">
        <div className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div
            {...reveal}
            className="flex items-end justify-between gap-6 flex-wrap"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                Since 1951
              </span>
              <h2 className="mt-3 font-display text-[26px] sm:text-[28px] font-semibold text-ink leading-tight">
                Past Principals
              </h2>
            </div>
            <p className="text-[13px] text-ink/45 font-semibold uppercase tracking-[0.04em]">
              {activeEra + 1} of {PAST_PRINCIPALS.length}
            </p>
          </motion.div>

          {/* Scrubber track */}
          <motion.div {...reveal} className="mt-10">
            <div className="relative px-2">
              <div className="absolute left-2 right-2 top-2.25 h-0.5 bg-line" />
              <motion.div
                className="absolute left-2 top-2.25 h-0.5 bg-gold"
                animate={{
                  width: `calc(${pct}% - ${pct === 100 ? "16px" : "0px"})`,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="relative flex justify-between">
                {PAST_PRINCIPALS.map((p, i) => (
                  <button
                    key={p.era}
                    type="button"
                    onClick={() => setActiveEra(i)}
                    aria-current={activeEra === i}
                    className="group flex flex-col items-center gap-2.5 px-0.5"
                  >
                    <span
                      className={
                        "h-4.5 w-4.5 rounded-full border-2 transition-colors duration-150 " +
                        (i <= activeEra
                          ? "bg-gold border-gold"
                          : "bg-white border-line group-hover:border-gold")
                      }
                    />
                    <span
                      className={
                        "hidden sm:block text-[10.5px] font-semibold whitespace-nowrap transition-colors duration-150 " +
                        (activeEra === i
                          ? "text-ink"
                          : "text-ink/35 group-hover:text-ink/60")
                      }
                    >
                      {p.era}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected era card */}
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(activeEra - 1)}
                disabled={activeEra === 0}
                aria-label="Previous Principal"
                className="flex-none h-9 w-9 grid place-items-center border border-line text-ink/60 transition-colors duration-150 hover:border-gold hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg
                  viewBox="0 0 10 16"
                  className="h-3 w-3 fill-none stroke-current stroke-[1.6]"
                >
                  <path
                    d="M8 1 2 8l6 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="relative flex-1 min-h-44 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.era}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center p-6 sm:p-7 bg-cream border border-line"
                  >
                    <div className="relative flex-none">
                      <div
                        aria-hidden
                        className="absolute -inset-2 border border-gold pointer-events-none"
                        style={{ zIndex: -1 }}
                      />
                      <img
                        src={active.photo}
                        alt={active.name}
                        className="w-27.5 h-34.5 object-cover"
                      />
                    </div>
                    <div>
                      {active.founder && (
                        <span className="inline-block mb-2 text-[10.5px] font-bold uppercase tracking-widest text-gold">
                          Founder Principal
                        </span>
                      )}
                      <p className="font-display text-[22px] font-semibold text-ink">
                        {active.name}
                      </p>
                      <p className="mt-1 text-[13.5px] text-ink/55">
                        {active.era}
                      </p>
                      {active.note && (
                        <p className="mt-3 max-w-[50ch] text-[14px] leading-relaxed text-ink/7  0">
                          {active.note}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => goTo(activeEra + 1)}
                disabled={activeEra === PAST_PRINCIPALS.length - 1}
                aria-label="Next Principal"
                className="flex-none h-9 w-9 grid place-items-center border border-line text-ink/60 transition-colors duration-150 hover:border-gold hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg
                  viewBox="0 0 10 16"
                  className="h-3 w-3 fill-none stroke-current stroke-[1.6]"
                >
                  <path
                    d="M2 1l6 7-6 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
