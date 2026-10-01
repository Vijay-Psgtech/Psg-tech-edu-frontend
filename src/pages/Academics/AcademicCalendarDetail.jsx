// src/pages/Academics/AcademicCalendarDetail.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import { getCalendar } from "./AcademicCalendarData.js";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

function parseCalDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function isSameDay(a, b) {
  return a && b && a.toDateString() === b.toDateString();
}

/** Circular "how far into this calendar are we" ring, drawn from the
 *  gap between the calendar's start date and its last activity date.
 *  Purely informational — silently omitted on the page below when
 *  there isn't a valid date range to compute from. */
function ProgressRing({ percent }) {
  const clamped = Math.max(0, Math.min(100, percent ?? 0));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="relative h-28 w-28 flex-none">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
        <motion.circle
          cx="50" cy="50" r={radius} fill="none"
          stroke="#d7ad5a" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[19px] font-semibold text-white">{Math.round(clamped)}%</span>
        <span className="text-[9px] uppercase tracking-widest text-white/50">elapsed</span>
      </div>
    </div>
  );
}

function StatusBadge({ status, isToday }) {
  if (isToday) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        Today
      </span>
    );
  }
  if (status === "COMPLETED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink/50">
        <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-current stroke-[1.6]">
          <path d="M2.5 6.2l2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-gold/40 bg-white px-2.5 py-1 text-[11px] font-semibold text-gold">
      {status}
    </span>
  );
}

export default function AcademicCalendarDetail() {
  const { slug } = useParams();
  const calendar = getCalendar(slug);

  if (!calendar) {
    return (
      <div className="font-body text-ink bg-paper min-h-screen">
        <Header />
        <div className="max-w-250 mx-auto px-4 lg:px-8 py-24 text-center">
          <p className="font-display text-[24px] font-semibold text-ink">Calendar not found</p>
          <Link to="/academics/calendar" className="mt-4 inline-block text-[14px] text-gold hover:underline">
            &larr; Back to Academic Calendar
          </Link>
        </div>
      </div>
    );
  }

  const hasActivities = calendar.activities && calendar.activities.length > 0;
  const today = new Date();
  const startDate = parseCalDate(calendar.startDate);
  const lastActivity = hasActivities ? calendar.activities[calendar.activities.length - 1] : null;
  const endDate = lastActivity ? parseCalDate(lastActivity.date) : null;

  let percent = null;
  if (startDate && endDate && endDate > startDate) {
    percent = ((today - startDate) / (endDate - startDate)) * 100;
  }

  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Hero: title + stats on the left, progress ring on the right */}
      <section className="relative bg-ink overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-75 w-75 rounded-full" style={{ border: "1px solid rgba(101,177,229,0.25)" }} />
        <div className="relative z-10 max-w-250 mx-auto px-4 lg:px-8 py-14 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8"
          >
            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
                <a href="/" className="hover:text-gold-bright transition-colors">Home</a>
                <span className="mx-2">/</span>
                <span className="text-white/60">Academics</span>
                <span className="mx-2">/</span>
                <Link to="/academics/calendar" className="hover:text-gold-bright transition-colors">Academic Calendar</Link>
                <span className="mx-2">/</span>
                <span className="text-white/85 truncate">{calendar.groupTitle}</span>
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
                <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
                {calendar.year} Calendar &middot; {calendar.groupPeriod}
              </span>
              <h1 className="mt-3 font-display text-[26px] sm:text-[34px] font-semibold text-white leading-[1.15] max-w-160">
                {calendar.label}
              </h1>

              {hasActivities && (
                <div className="mt-6 flex flex-wrap gap-8">
                  <div>
                    <p className="text-[10.5px] uppercase tracking-widest text-white/45">Total Working Days</p>
                    <p className="mt-1 font-display text-[22px] font-semibold text-white">{calendar.totalWorkingDays}</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] uppercase tracking-widest text-white/45">Start Date</p>
                    <p className="mt-1 font-display text-[22px] font-semibold text-white">{calendar.startDate}</p>
                  </div>
                </div>
              )}
            </div>

            {percent !== null && <ProgressRing percent={percent} />}
          </motion.div> 
        </div>
      </section>

      {/* Activity table */}
      <section className="max-w-250 mx-auto px-4 lg:px-8 py-14 sm:py-16">
        {hasActivities ? (
          <motion.div {...reveal} className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-160 text-[13px] border-collapse">
              <thead>
                <tr className="bg-gold text-left">
                  {["Activity Name", "Days/Date", "Days From Start", "Calculated Date", "Days Left"].map((h) => (
                    <th key={h} className="px-4 py-3.5 font-semibold text-white whitespace-nowrap uppercase tracking-[0.03em] text-[11.5px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendar.activities.map((a, i) => {
                  const activityDate = parseCalDate(a.date);
                  const isToday = isSameDay(activityDate, today);
                  return (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.3 }}
                      className={`border-b border-line last:border-b-0 align-top transition-colors duration-150 ${
                        isToday ? "bg-cream" : "even:bg-cream/40 hover:bg-cream/70"
                      }`}
                    >
                      <td className="px-4 py-3.5 text-ink/85 font-medium max-w-100">{a.name}</td>
                      <td className="px-4 py-3.5 text-ink/60">{a.days}</td>
                      <td className="px-4 py-3.5 text-ink/60">{a.daysFromStart}</td>
                      <td className="px-4 py-3.5 text-ink/75 whitespace-nowrap">{a.date}</td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={a.status} isToday={isToday} />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div {...reveal} className="rounded-xl border border-line bg-white p-10 text-center">
            <p className="font-display text-[18px] font-semibold text-ink">This calendar is being updated</p>
            <p className="mt-2 text-[13.5px] text-ink/55 max-w-100 mx-auto">
              Activity dates for {calendar.label} will appear here once published.
            </p>
          </motion.div>
        )}

        <div className="mt-10">
          <Link to="/academics/calendar" className="text-[13.5px] font-semibold text-ink/60 hover:text-ink">
            &larr; Back to Academic Calendar
          </Link>
        </div>
      </section>
    </div>
  );
}