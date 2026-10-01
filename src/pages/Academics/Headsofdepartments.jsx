// HeadsOfDepartments.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import { HODS } from "./Hoddata.js";

/**
 * HeadsOfDepartments.jsx — "Head of the Departments" index, reached
 * from the Academics dropdown at /academics/heads-of-department.
 * Grid of larger profile cards (photo, name, department) linking to
 * each HOD's detail page at /academics/heads-of-department/:slug.
 */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

// Turns "Computer Science & Engineering" into "CS" for the small
// department-badge overlapping each photo — same monogram idea used
// on the Departments.jsx directory cards, just circular here.
function initials(department = "") {
  const words = department.replace(/&/g, " ").split(/\s+/).filter(Boolean);
  return (words[0]?.[0] || "") + (words[1]?.[0] || "");
}

export default function HeadsOfDepartments() {
  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Compact hero — same treatment as HodDetail's hero, plus a
          second smaller ring for a bit more depth */}
      <section className="relative bg-ink overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-75 w-75 rounded-full"
          style={{ border: "1px solid rgba(101,177,229,0.25)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -bottom-35 h-64 w-64 rounded-full"
          style={{ border: "1px solid rgba(215,173,90,0.16)" }}
        />
        <div className="relative z-10 max-w-310 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">Home</a>
              <span className="mx-2">/</span>
              <span className="text-white/60">Academics</span>
              <span className="mx-2">/</span>
              <span className="text-white/85">Heads of the Department</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              Academics
            </span>
            <h1 className="mt-4 font-display text-[34px] sm:text-[46px] font-semibold text-white leading-[1.05]">
              Heads of the Department
            </h1>
            <p className="mt-3 max-w-140 text-[14px] leading-relaxed text-white/60">
              {HODS.length} department heads leading teaching, research, and mentorship across the institution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid — bigger cards: larger photo, name, department, and a
          "View profile" link that slides in on hover */}
      <section className="max-w-310 mx-auto px-4 lg:px-8 py-16 sm:py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {HODS.map((h) => (
            <motion.div
              key={h.slug}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="group"
            >
              <Link
                to={`/academics/heads-of-department/${h.slug}`}
                className="relative flex flex-col items-center text-center rounded-2xl border border-line bg-white px-8 pt-12 pb-9 h-full transition-colors duration-200 hover:border-gold/60 hover:shadow-[0_22px_44px_rgba(11,47,80,0.12)]"
              >
                {/* Photo with a gold ring that fades in on hover,
                    echoing HodDetail's frame-around-photo device */}
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -inset-2.5 rounded-full border border-gold opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                  />
                  <img
                    src={h.photo}
                    alt={h.name}
                    className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover border border-line transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-ink text-[10px] font-bold text-gold-bright border-2 border-white">
                    {initials(h.department)}
                  </span>
                </div>

                <p className="mt-6 font-display text-[18px] font-semibold leading-snug text-ink">
                  {h.name}
                </p>
                <p className="mt-1.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-gold">
                  {h.department}
                </p>

                <span className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink/35 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-gold">
                  View profile
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}