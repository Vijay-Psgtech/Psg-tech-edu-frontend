import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import { LEVELS, getProgramme } from "./Programmesdata.js";

/**
 * ProgrammeDetail.jsx — reached at /academics/programmes/:slug from
 * the Programmes index. Full-bleed banner image, a coordinator /
 * accreditation info row (only rendered when that data exists — see
 * the note in programmesData.js about which programmes have real
 * copy), the description, a full-bleed "detailing" image break, and
 * resource links (Regulations / Online Course Materials).
 */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function ProgrammeDetail() {
  const { slug } = useParams();
  const programme = getProgramme(slug);

  if (!programme) {
    return (
      <div className="font-body text-ink bg-paper min-h-screen">
        <Header />
        <div className="max-w-250 mx-auto px-4 lg:px-8 py-24 text-center">
          <p className="font-display text-[24px] font-semibold text-ink">
            Programme not found
          </p>
          <Link
            to="/academics/programmes"
            className="mt-4 inline-block text-[14px] text-gold hover:underline"
          >
            &larr; Back to Programmes
          </Link>
        </div>
      </div>
    );
  }

  const { label: levelLabel, degree } = LEVELS[programme.level];
  const hasDetails = Boolean(programme.description);

  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative">
        <div className="relative h-[46vh] min-h-20 max-h-120 w-full overflow-hidden bg-ink">
          <motion.img
            src={programme.banner}
            alt={programme.name}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.78, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/15" />
          <div className="relative z-10 h-full max-w-250 mx-auto px-4 lg:px-8 flex flex-col justify-end pb-10">
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <span className="text-white/60">Academics</span>
              <span className="mx-2">/</span>
              <Link
                to="/academics/programmes"
                className="hover:text-gold-bright transition-colors"
              >
                Programmes
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/85">{programme.name}</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              {levelLabel}
            </span>
            <h1 className="mt-3 font-display text-[30px] sm:text-[40px] font-semibold text-white leading-[1.05] max-w-2xl">
              {degree} {programme.name}
            </h1>
            {programme.since && (
              <p className="mt-2 text-[14px] text-white/70">
                Since {programme.since}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20">
        {(programme.coordinator || programme.accreditation) && (
          <motion.div {...reveal} className="grid sm:grid-cols-2 gap-4 mb-10">
            {programme.coordinator && (
              <div className="p-5 bg-cream border border-line">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink/45">
                  Programme Coordinator
                </p>
                <p className="mt-1.5 text-[15px] font-semibold text-ink">
                  {programme.coordinator}
                </p>
              </div>
            )}
            {programme.accreditation && (
              <div className="p-5 bg-cream border border-line">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink/45">
                  Accreditation Status
                </p>
                <p className="mt-1.5 text-[15px] font-semibold text-ink">
                  {programme.accreditation}
                </p>
              </div>
            )}
          </motion.div>
        )}

        <motion.div {...reveal} className="max-w-[72ch] space-y-5">
          {hasDetails ? (
            <p className="text-[15.5px] leading-[1.85] text-ink/75">
              {programme.description}
            </p>
          ) : (
            <p className="text-[15.5px] leading-[1.85] text-ink/55 italic">
              Full programme details for {degree} {programme.name} are being
              added. Contact the department for curriculum, faculty, and
              admission details.
            </p>
          )}
        </motion.div>

        {/* Detailing image break */}
        <motion.figure {...reveal} className="mt-14 relative overflow-hidden">
          <img
            src={programme.detail}
            alt={`${programme.name} — labs and facilities`}
            className="w-full h-65 sm:h-85 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/10 to-transparent" />
          <figcaption className="absolute bottom-5 left-5 flex flex-col text-white">
            <span className="text-[11px] uppercase tracking-[0.14em] text-white/70">
              On campus
            </span>
            <strong className="font-display text-[20px] font-medium">
              {programme.name}
            </strong>
          </figcaption>
        </motion.figure>

        {/* Resources */}
        {(programme.regulationsHref || programme.materialsHref) && (
          <motion.div
            {...reveal}
            className="mt-14 grid sm:grid-cols-2 gap-3 max-w-140"
          >
            {programme.regulationsHref && (
              <a
                href={programme.regulationsHref}
                className="flex items-center justify-between gap-4 px-5 py-4 border border-line text-ink font-semibold text-[13.5px] transition-colors duration-150 hover:border-gold hover:bg-cream"
              >
                Regulations
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 flex-none fill-none stroke-current stroke-[1.4] text-gold"
                >
                  <path
                    d="M8 2v9M4.5 7.5 8 11l3.5-3.5M3 13.5h10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
            {programme.materialsHref && (
              <a
                href={programme.materialsHref}
                className="flex items-center justify-between gap-4 px-5 py-4 border border-line text-ink font-semibold text-[13.5px] transition-colors duration-150 hover:border-gold hover:bg-cream"
              >
                Online Course Materials
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 flex-none fill-none stroke-current stroke-[1.4] text-gold"
                >
                  <path
                    d="M8 2v9M4.5 7.5 8 11l3.5-3.5M3 13.5h10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </motion.div>
        )}

        <div className="mt-14">
          <Link
            to="/academics/programmes"
            className="text-[13.5px] font-semibold text-ink/60 hover:text-ink"
          >
            &larr; Back to Programmes
          </Link>
        </div>
      </section>
    </div>
  );
}
