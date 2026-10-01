// src/pages/Academics/AcademicCalendar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import { CALENDAR_GROUPS } from "./AcademicCalendarData.js";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

/** One semester group: a heading (with a colored dot matching the
 *  group's accent) followed by pill links to each calendar. Odd/Even
 *  semesters get different accent colors (gold / blue) purely so the
 *  two blocks read as distinct at a glance. */
function GroupSection({ group }) {
  const isOdd = group.accent === "gold";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className={`h-2 w-2 rounded-full ${isOdd ? "bg-gold" : "bg-gold-bright"}`} />
        <h2 className="font-display text-[20px] sm:text-[24px] font-semibold text-ink">
          Calendars for {group.title}
        </h2>
        <span className="text-[12.5px] text-ink/45">({group.period})</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-wrap gap-3"
      >
        {group.calendars.map((cal) => {
          const hasData = cal.activities && cal.activities.length > 0;
          return (
            <motion.div key={cal.slug} variants={item}>
              <Link
                to={`/academics/calendar/${cal.slug}`}
                className={`group relative inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[13px] font-medium transition-all duration-200 ${
                  isOdd
                    ? "border-gold/35 bg-cream text-ink hover:bg-gold hover:text-white hover:border-gold hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(196,155,73,0.28)]"
                    : "border-gold-bright/35 bg-[#eef6fc] text-ink hover:bg-[#2d7cb8] hover:text-white hover:border-[#2d7cb8] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(45,124,184,0.24)]"
                }`}
              >
                {cal.label}
                {/* Small live dot signals "this calendar has published
                    activity data" without needing separate copy */}
                {hasData && (
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-current opacity-60 group-hover:opacity-100" aria-hidden="true" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default function AcademicCalendar() {
  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Compact hero — same treatment used across Academics pages */}
      <section className="relative bg-ink overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-75 w-75 rounded-full" style={{ border: "1px solid rgba(101,177,229,0.25)" }} />
        <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-35 h-64 w-64 rounded-full" style={{ border: "1px solid rgba(215,173,90,0.16)" }} />
        <div className="relative z-10 max-w-310 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">Home</a>
              <span className="mx-2">/</span>
              <span className="text-white/60">Academics</span>
              <span className="mx-2">/</span>
              <span className="text-white/85">Academic Calendar</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              Academics
            </span>
            <h1 className="mt-4 font-display text-[34px] sm:text-[46px] font-semibold text-white leading-[1.05]">
              Academic Calendar
            </h1>
            <p className="mt-3 max-w-140 text-[14px] leading-relaxed text-white/60">
              Semester-wise activity schedules for every programme and year — reopening dates, tests, feedback windows, and review deadlines.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-310 mx-auto px-4 lg:px-8 py-16 sm:py-20 space-y-16">
        {CALENDAR_GROUPS.map((group) => (
          <GroupSection key={group.title + group.period} group={group} />
        ))}
      </section>
    </div>
  );
}