import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";

/**
 * About.jsx — "About the College" page, v2.
 *
 * Redesigned to match the site's own visual language (the same
 * eyebrow/kicker treatment, Fraunces display type, and card idioms
 * used on the department and home pages) rather than a generic
 * Tailwind layout bolted on top. Nothing new was added to
 * styles/theme.css — every non-utility visual here reuses tokens
 * (--color-ink, --color-gold, font-display, font-body) that already
 * exist there.
 *
 * Sections:
 * 1. Hero — full-bleed photograph (`/assets/bridge.jpg`), eyebrow,
 *    Fraunces headline, breadcrumb, with a stat strip overlapping
 *    its lower edge so the numbers read as part of the hero, not a
 *    separate block.
 * 2. Overview — label + copy row, in the site's two-column intro
 *    pattern.
 * 3. Location & campus — copy paired with a supporting photo.
 * 4. Full-bleed photo break (`/assets/convention hall.jpg`) with a
 *    caption, the same idiom the homepage uses for its "latest"
 *    image.
 * 5. Leadership — Managing Trustees as a numbered card grid (a
 *    genuine historical succession, so the numbering is meaningful),
 *    and Principals as a connected vertical timeline with the
 *    current principal called out.
 * 6. Academics & accreditation — copy plus a three-card fact strip.
 *
 * A sticky in-page index runs down the left rail on desktop and
 * scroll-spies the active section. Each major section gets one
 * restrained fade/rise-in on scroll (matching the reveal language
 * already used on the homepage), not a per-paragraph effect.
 */

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "campus", label: "Location & campus" },
  { id: "leadership", label: "Leadership" },
  { id: "academics", label: "Academics & accreditation" },
];

const STATS = [
  { value: "1951", label: "Year established" },
  { value: "45", label: "Acres of campus" },
  { value: "15+", label: "Engineering & technology departments" },
  { value: "8,518", label: "Students on roll" },
];

const TRUSTEES = [
  "Sri G R Govindarajulu",
  "Dr G R Damodaran",
  "Sri G Varadaraj",
  "Sri G R Karthikeyan",
  "Sri V. Rajan",
  "Sri G. Rangaswamy",
  "Sri L Gopalakrishnan",
];

const PRINCIPALS = [
  { name: "Dr G R Damodaran", note: "Founder Principal — led the college's growth from its 1951 beginnings." },
  { name: "Dr R Subbayyan", note: "" },
  { name: "Dr K Venkataraman", note: "" },
  { name: "Dr A Shanmugasundaram", note: "" },
  { name: "Dr S Subramanyan", note: "" },
  { name: "Dr P Radhakrishnan", note: "" },
  { name: "Dr S Vijayarangan", note: "" },
  { name: "Dr R Rudramoorthy", note: "" },
  { name: "Dr K Prakasan", note: "" },
  { name: "Dr G Thilagavathi", note: "Principal (FAC) — present day.", current: true },
];

const ACADEMIC_FACTS = [
  { value: "21", label: "Undergraduate programmes", detail: "BE / BTech / BSc" },
  { value: "24", label: "Postgraduate programmes", detail: "ME / MTech / MSc / MBA / MCA" },
  { value: "18", label: "NBA-accredited programmes", detail: "Accredited as early as 1997" },
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function SectionIndex({ active }) {
  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <div className="sticky top-28">
        <p className="font-display text-[13px] font-semibold text-ink mb-3">On this page</p>
        <ul className="space-y-1 border-l border-line">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={
                  "block pl-4 py-1.5 -ml-px border-l-2 text-[13px] transition-colors duration-150 " +
                  (active === s.id
                    ? "border-gold text-ink font-semibold"
                    : "border-transparent text-ink/55 hover:text-ink hover:border-line")
                }
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function About() {
  const ids = useRef(SECTIONS.map((s) => s.id)).current;
  const active = useScrollSpy(ids);

  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[64vh] min-h-115erflow-hidden bg-ink">
          <motion.img
            src="/assets/bridge.jpg"
            alt="PSG College of Technology campus"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.78, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/15" />
          <div className="absolute inset-0 bg-linear-to-rk/90 via-ink/20 to-transparent" />

          {/* decorative ring, echoes the hero-shade motif used on the homepage */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-85 w-85ded-full"
            style={{ border: "1px solid rgba(101,177,229,0.3)" }}
          />

          <div className="relative z-10 h-full max-w-310 mx-auto px-4 lg:px-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-[12px] uppercase tracking-widest text-white/60 mb-3">
                <a href="/" className="hover:text-gold-bright transition-colors">Home</a>
                <span className="mx-2">/</span>
                <span className="text-white/85">About</span>
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
                <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
                Est. 1951 · PSG &amp; Sons&rsquo; Charities Trust
              </span>
              <h1 className="mt-4 font-display text-[38px] sm:text-[54px] font-semibold text-white leading-[1.02] tracking-tight">
                About the College
              </h1>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/75">
                Seventy-five years of engineering education, built on the same
                campus as the industrial institute that founded it — for close,
                everyday contact between the classroom and industry.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stat strip, overlapping the hero's lower edge */}
        <div className="relative z-10 max-w-280 mx-auto px-4 -mt-12 sm:-mt-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 bg-white border border-line shadow-[0_20px_50px_rgba(11,47,80,0.16)]"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "px-6 py-6 sm:py-7 transition-colors duration-200 hover:bg-cream " +
                  (i !== 0 ? "border-l border-line" : "")
                }
              >
                <p className="font-display text-[26px] sm:text-[30px] font-semibold text-ink leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.04em] text-ink/50 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-310 mx-auto px-4 lg:px-8 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
        <SectionIndex active={active} />

        <article className="space-y-20">
          {/* Overview */}
          <motion.div id="overview" {...reveal} className="scroll-mt-28 grid sm:grid-cols-[220px_1fr] gap-8 sm:gap-14">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">01 — Overview</span>
              <h2 className="mt-3 font-display text-[28px] font-semibold text-ink leading-tight">
                A Trust-founded institution
              </h2>
            </div>
            <div className="max-w-[62ch] space-y-4 pt-1">
              <p className="text-[15.5px] leading-[1.85] text-ink/75">
                PSG College of Technology is a Government-aided, autonomous
                institution affiliated to Anna University and certified to
                ISO&nbsp;9001:2015 — one of the foremost institutions founded by
                the PSG &amp; Sons&rsquo; Charities Trust, established in 1926.
              </p>
              <p className="text-[15.5px] leading-[1.85] text-ink/75">
                The College itself was established in 1951. Its founders chose to
                locate it on the same campus as the PSG Industrial Institute — a
                deliberate decision meant to keep the College in close, everyday
                contact with industry.
              </p>
            </div>
          </motion.div>

          {/* Location & campus */}
          <motion.div id="campus" {...reveal} className="scroll-mt-28 grid sm:grid-cols-2 gap-8 sm:gap-14 items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">02 — Location &amp; campus</span>
              <h2 className="mt-3 font-display text-[28px] font-semibold text-ink leading-tight">
                45 acres, purpose-built
              </h2>
              <p className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/75">
                The campus sits about 8&nbsp;km from Coimbatore Railway Station
                and 5&nbsp;km from the airport, spread across 45 acres shared
                between the College, hostels, staff quarters, play fields, and
                gardens.
              </p>
            </div>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 border border-gold pointer-events-none"
                style={{ zIndex: -1 }}
              />
              <img
                src="/assets/bridge.jpg"
                alt="PSG College of Technology campus grounds"
                className="w-full aspect-4/3 object-cover"
              />
            </div>
          </motion.div>

          {/* Full-bleed photo break */}
          <motion.figure {...reveal} className="scroll-mt-28 relative -mx-4 lg:-mx-8 overflow-hidden">
            <img
              src="/assets/about4.jpg"
              alt="Convention Hall at PSG College of Technology"
              className="w-full h-65 sm:h-95 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
            <figcaption className="absolute bottom-5 left-4 lg:left-8 flex flex-col text-white">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/70">On campus</span>
              <strong className="font-display text-[22px] font-medium">Convention Hall</strong>
            </figcaption>
          </motion.figure>

          {/* Leadership */}
          <div id="leadership" className="scroll-mt-28 space-y-14">
            <motion.div {...reveal}>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">03 — Leadership</span>
              <h2 className="mt-3 font-display text-[28px] font-semibold text-ink leading-tight">
                Trustees &amp; Principals
              </h2>
            </motion.div>

            {/* Trustees */}
            <motion.div {...reveal}>
              <p className="max-w-[62ch] text-[15.5px] leading-[1.85] text-ink/75 mb-7">
                The College has been guided, in succession, by the following
                Managing Trustees:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {TRUSTEES.map((name, i) => {
                  const current = i === TRUSTEES.length - 1;
                  return (
                    <div
                      key={name}
                      className={
                        "relative p-5 border-t-[3px] bg-white transition-transform duration-200 hover:-translate-y-0.5 " +
                        (current ? "border-gold shadow-[0_10px_26px_rgba(11,47,80,0.1)]" : "border-line")
                      }
                    >
                      <span className="font-display text-[13px] font-semibold text-ink/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-4 text-[14.5px] font-semibold text-ink leading-snug">{name}</p>
                      {current && (
                        <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.06em] text-gold">
                          Present Managing Trustee
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Principals timeline */}
            <motion.div {...reveal}>
              <p className="max-w-[62ch] text-[15.5px] leading-[1.85] text-ink/75 mb-8">
                From the founder Principal&rsquo;s planned growth of the
                institution in 1951 to its present-day standing, the College has
                been led by:
              </p>
              <ol className="relative pl-7 space-y-7">
                <div aria-hidden className="absolute left-1.25 top-1 bottom-1 w-px bg-line" />
                {PRINCIPALS.map((p) => (
                  <li key={p.name} className="relative">
                    <span
                      className={
                        "absolute -left-7 top-1 h-2.5 w-2.5 rounded-full border-2 " +
                        (p.current ? "bg-gold border-gold" : "bg-paper border-line")
                      }
                    />
                    <p className={"text-[15px] " + (p.current ? "font-semibold text-ink" : "text-ink/85")}>
                      {p.name}
                    </p>
                    {p.note && <p className="text-[13px] text-ink/55 mt-0.5">{p.note}</p>}
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* Academics & accreditation */}
          <motion.div id="academics" {...reveal} className="scroll-mt-28 space-y-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">04 — Academics &amp; accreditation</span>
              <h2 className="mt-3 font-display text-[28px] font-semibold text-ink leading-tight">
                21 UG, 24 PG programmes
              </h2>
            </div>
            <p className="max-w-[62ch] text-[15.5px] leading-[1.85] text-ink/75">
              The College today has a student strength of about 8,518, across 15
              engineering and technology departments alongside computer
              applications, management sciences, basic sciences, and humanities.
              Each department is supported by more than 15 visiting faculty from
              renowned institutions and industries, and conducts at least one
              national or international conference, seminar, or workshop every
              year — with an average of five short-term programmes run annually
              for teaching faculty, funded by AICTE, ISTE, and other agencies.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {ACADEMIC_FACTS.map((fact) => (
                <div key={fact.label} className="p-6 bg-cream border border-line">
                  <p className="font-display text-[32px] font-semibold text-ink leading-none">{fact.value}</p>
                  <p className="mt-2 text-[13.5px] font-semibold text-ink/80">{fact.label}</p>
                  <p className="mt-1 text-[12.5px] text-ink/50">{fact.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </article>
      </section>
    </div>
  );
}