// src/pages/Academics/AcademicCalendarData.js
/**
 * Static data backing the Academic Calendar pages.
 *
 * SCHEMA:
 *   CALENDAR_GROUPS: [{ title, period, accent, calendars: [Calendar] }]
 *   Calendar: {
 *     slug, label, year, totalWorkingDays, startDate,
 *     activities?: [{ name, days, daysFromStart, date, status }]
 *   }
 *   `status` is either the literal "COMPLETED" or a string like "12 days"
 *   (days left, inclusive of holidays/weekends, per the source sheet).
 *   Calendars without `activities` render a "being updated" placeholder
 *   on the detail page — same pattern HodDetail uses for optional sections.
 */

export const CALENDAR_GROUPS = [
  {
    title: "Odd Semester",
    period: "2026 – 2027",
    accent: "gold",
    calendars: [
      {
        slug: "second-year-mca1-odd",
        label: "Second Year BE/BTech (Reg & SW) and I year MCA",
        year: 2026,
        totalWorkingDays: 79,
        startDate: "Mon Aug 03 2026",
        activities: [
          { name: "Reopening for the ODD Semester of the Academic year 2026-27", days: 0, daysFromStart: 0, date: "Mon Aug 03 2026", status: "COMPLETED" },
          { name: "Intermediate Feedback 1", days: 23, daysFromStart: 23, date: "Mon Sep 07 2026", status: "COMPLETED" },
          { name: "Assessment Tutorial 1", days: 8, daysFromStart: 31, date: "Fri Sep 18 2026", status: "COMPLETED" },
          { name: "Practice Test 1", days: 6, daysFromStart: 37, date: "Mon Sep 28 2026", status: "2 days" },
          { name: "CA Test 1 From", days: 4, daysFromStart: 41, date: "Mon Oct 05 2026", status: "9 days" },
          { name: "Attendance Review 1", days: 3, daysFromStart: 44, date: "Thu Oct 08 2026", status: "12 days" },
          { name: "CA Test 1 - Mark Entry Last Date", days: 8, daysFromStart: 52, date: "Thu Oct 22 2026", status: "26 days" },
          { name: "Intermediate Feedback 2", days: 1, daysFromStart: 53, date: "Fri Oct 23 2026", status: "27 days" },
        ],
      },
      { slug: "senior-pg-odd", label: "3rd & 4th Year BE/BTech, 1st & 2nd Year ME/MTech/MCA, All BSc and All MSc", year: 2026, totalWorkingDays: null, startDate: null },
      { slug: "fourth-year-be-sw-odd", label: "FOURTH Year BE SW", year: 2026, totalWorkingDays: null, startDate: null },
      { slug: "fifth-year-be-sw-odd", label: "FIFTH Year BE SW", year: 2026, totalWorkingDays: null, startDate: null },
      { slug: "first-year-be-btech-odd", label: "First Year BE / BTech (Reg & SW)", year: 2026, totalWorkingDays: null, startDate: null },
    ],
  },
  {
    title: "Even Semester",
    period: "2025 – 2026",
    accent: "blue",
    calendars: [
      { slug: "fourth-fifth-year-even", label: "FOURTH Year BE/BTech (Reg. & SW) and FIFTH Year BE (SW) – EVEN Semester", year: 2026, totalWorkingDays: null, startDate: null },
      { slug: "third-year-pg-even", label: "THIRD Year BE/BTech (Reg. & SW), 2nd Year ME/MTech/MCA, All BSc and All MSc – EVEN Semester", year: 2026, totalWorkingDays: null, startDate: null },
      { slug: "second-year-mca-even", label: "SECOND Year BE/BTech (Reg. & SW) and FIRST YEAR MCA – EVEN Semester", year: 2026, totalWorkingDays: null, startDate: null },
      { slug: "first-year-me-even", label: "First Year BE/BTech (Reg. & SW) & FIRST YEAR ME/MTech – EVEN Semester", year: 2026, totalWorkingDays: null, startDate: null },
    ],
  },
];

export function getCalendar(slug) {
  for (const group of CALENDAR_GROUPS) {
    const found = group.calendars.find((c) => c.slug === slug);
    if (found) return { ...found, groupTitle: group.title, groupPeriod: group.period, groupAccent: group.accent };
  }
  return null;
}