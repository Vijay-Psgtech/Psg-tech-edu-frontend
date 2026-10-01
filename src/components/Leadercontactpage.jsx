import React from "react";
import { motion } from "framer-motion";
import Header from "./Header.jsx";

/**
 * LeaderContactPage.jsx — shared layout for a single-officer "About"
 * page that has no biography, just a name, title, and email: the
 * split hero (same hero-image-frame / hero-image-note portrait
 * treatment as Principal.jsx and ProfessorOfPractice.jsx) paired
 * with a compact contact card.
 *
 * Extracted out of VicePrincipalWomenWelfare.jsx so the Dean pages
 * (Autonomous Functioning, Administration, Academic) — which are the
 * same layout with different names/titles/emails — don't each carry
 * a duplicate copy of this markup.
 *
 * Props:
 * - crumb   breadcrumb label (e.g. "Dean - Administration")
 * - eyebrow small kicker above the h1 (defaults to the institution)
 * - title   h1 text; pass a string or JSX (e.g. with a <br/>)
 * - name    officer's name
 * - role    officer's title, shown under the hero-image-note and on
 *           the contact card
 * - email   officer's email address
 * - photo   path to the officer's photo
 */
export default function LeaderContactPage({
  crumb,
  eyebrow = "PSG College of Technology",
  title,
  name,
  role,
  email,
  photo,
}) {
  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Split hero */}
      <section className="relative bg-ink overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-90 w-90 rounded-full"
          style={{ border: "1px solid rgba(101,177,229,0.25)" }}
        />
        <div className="relative z-10 max-w-310 mx-auto px-4 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href="/about" className="hover:text-gold-bright transition-colors">About</a>
              <span className="mx-2">/</span>
              <span className="text-white/85">{crumb}</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              {eyebrow}
            </span>
            <h1 className="mt-4 font-display text-[38px] sm:text-[52px] font-semibold text-white leading-[1.02] tracking-tight">
              {title}
            </h1>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-bright">{role}</span>
              <span className="h-px w-10 bg-white/25" />
            </div>
            <p className="mt-2 font-display text-[22px] font-semibold text-white">{name}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="home-hero-visual relative w-full max-w-75 mx-auto lg:mx-0 lg:justify-self-end"
          >
            <div className="hero-image-frame">
              <img src={photo} alt={name} />
            </div>
            <div className="hero-image-note">
              <strong>{name}</strong>
              <span>{role}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white">
        <div className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-110 p-6 bg-cream border border-line"
          >
            <p className="font-display text-[17px] font-semibold text-ink">{name}</p>
            <p className="mt-1 text-[13.5px] text-ink/60">{role}</p>
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-gold hover:underline"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 flex-none fill-none stroke-current stroke-[1.4]">
                <rect x="1.5" y="3" width="13" height="10" rx="1.4" />
                <path d="M2 4.2l6 4.6 6-4.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {email}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}