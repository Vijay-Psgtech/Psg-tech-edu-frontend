
import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";

/**
 * Office of the Controller of Examinations.
 *
 * Layout follows the reference screenshots: page title bar, a vertical
 * section menu on the left, the active section's content on the right,
 * and the two CoE contact cards underneath. Colours use the site's
 * navy/brass theme tokens (bg-paper, bg-cream, text-ink, border-line,
 * bg-gold) instead of the reference blue.
 *
 * Routes (see main.jsx):
 *   /exams                 -> About COE
 *   /exams/notifications
 *   /exams/instructions
 *   /exams/timetable
 *   /exams/apply
 *   /exams/faq
 *
 * To publish real content, edit the data arrays below. Each document
 * entry is { title, href } where href is a PDF or page URL.
 */

/* ---------------------------------------------------------------- */
/* Content — edit these                                             */
/* ---------------------------------------------------------------- */

const ABOUT_PARAGRAPHS = [
  "The office of the controller of examinations plays a vital role in the academic activities of the college and is an important part of the autonomy. It is headed by the Controller of Examinations (CoE), who reports directly to the Head of the Institution, and is supported by the Deputy Controller of Examinations along with a dedicated team of staff members.",
  "The core responsibility of the office is to plan and conduct all examinations in a fair and systematic manner in accordance with the academic calendar prepared at the beginning of every academic year. This office plays a crucial role in upholding the integrity, transparency, and academic standards of the examination and evaluation process. Through continuous improvement and adherence to best practices, this office enhances the quality of examination services, thereby fostering academic excellence and institutional credibility.",
  "The Office of the Controller of Examinations is committed to student welfare by ensuring that all genuine requests and grievances related to examinations are addressed promptly and efficiently.",
];

const NOTIFICATIONS = [
  // { title: "End Semester Examinations - Notification", href: "/files/exams/notification.pdf" },
];

const INSTRUCTIONS = [
  { title: "Exam Instructions", href: "#" },
];

const TIMETABLES = [
  // { title: "Semester Exam Time Table", href: "/files/exams/timetable.pdf" },
];

const APPLY_FOR = [
  // { title: "Revaluation / Retotalling", href: "/files/exams/revaluation.pdf" },
];

const FAQS = [
  // { q: "How do I apply for revaluation?", a: "..." },
];

const CONTACTS = [
  {
    name: "Dr.M. Haridass",
    role: "Controller of Examinations",
    email: "coe@psgtech.ac.in",
    phone: "0422 4344170",
  },
  {
    name: "Dr.M. Karthikeyan",
    role: "Deputy Controller of Examinations",
    email: "deputycoe@psgtech.ac.in",
    phone: "0422 4344132",
  },
];

/* ---------------------------------------------------------------- */
/* Sections                                                         */
/* ---------------------------------------------------------------- */

function EmptyState({ children }) {
  return (
    <p className="rounded-md border border-dashed border-line bg-white px-5 py-6 text-[14px] text-ink/60">
      {children}
    </p>
  );
}

function DocList({ items, empty }) {
  if (!items.length) return <EmptyState>{empty}</EmptyState>;
  return (
    <ul className="flex flex-col gap-3">
      {items.map((doc) => (
        <li key={doc.title}>
          <a
            href={doc.href}
            target={doc.href.startsWith("#") ? undefined : "_blank"}
            rel="noreferrer"
            className="block max-w-md rounded-md border border-line border-l-4 border-l-gold bg-white px-5 py-4 text-[14px] font-semibold text-ink shadow-sm transition-colors duration-150 hover:bg-paper focus-visible:outline focus-visible:outline-gold"
          >
            {doc.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Faq({ items }) {
  if (!items.length) {
    return <EmptyState>Frequently asked questions will be published here.</EmptyState>;
  }
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-md border border-line border-l-4 border-l-gold bg-white"
        >
          <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg
              viewBox="0 0 10 6"
              aria-hidden="true"
              className="h-2.5 w-2.5 flex-none fill-none stroke-current stroke-[1.6] transition-transform duration-200 group-open:rotate-180"
            >
              <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <p className="px-5 pb-4 text-[14px] leading-relaxed text-ink/75">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

const SECTIONS = [
  {
    key: "about",
    path: "",
    label: "About COE",
    title: "About Controller of Examinations",
    render: () => (
      <div className="max-w-[80ch] space-y-5 text-justify text-[14.5px] leading-[1.75] text-ink/80">
        {ABOUT_PARAGRAPHS.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    ),
  },
  {
    key: "notifications",
    path: "notifications",
    label: "Notifications",
    title: "Notification",
    render: () => (
      <DocList items={NOTIFICATIONS} empty="No notifications have been published yet." />
    ),
  },
  {
    key: "instructions",
    path: "instructions",
    label: "Exam Instructions",
    title: "Exam Instructions",
    render: () => (
      <DocList items={INSTRUCTIONS} empty="Exam instructions have not been published yet." />
    ),
  },
  {
    key: "timetable",
    path: "timetable",
    label: "Semester Exam Time Table",
    title: "Semester Exam Time Table",
    render: () => (
      <DocList items={TIMETABLES} empty="The time table has not been published yet." />
    ),
  },
  {
    key: "apply",
    path: "apply",
    label: "Apply For",
    title: "Apply For",
    render: () => (
      <DocList items={APPLY_FOR} empty="No application forms are open right now." />
    ),
  },
  {
    key: "faq",
    path: "faq",
    label: "FAQ",
    title: "Frequently Asked Questions",
    render: () => <Faq items={FAQS} />,
  },
];

/* ---------------------------------------------------------------- */
/* Contact card                                                     */
/* ---------------------------------------------------------------- */

function ContactCard({ name, role, email, phone }) {
  return (
    <div className="relative w-full max-w-67.5 overflow-hidden border border-ink/25 bg-white px-4 py-5 text-center shadow-sm">
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 h-11 w-11 bg-ink [clip-path:polygon(0_0,100%_0,100%_100%)]"
      />
      <h3 className="font-display text-[17px] font-bold tracking-wide text-[#7a1f1f]">
        {name}
      </h3>
      <p className="mt-1 text-[13px] font-bold text-ink">{role}</p>
      <p className="mt-1.5 text-[12.5px] text-ink/70">
        Email:{" "}
        <a href={`mailto:${email}`} className="hover:text-gold hover:underline">
          {email}
        </a>
      </p>
      <p className="text-[12.5px] text-ink/70">
        Phone:{" "}
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="hover:text-gold hover:underline"
        >
          {phone}
        </a>
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                             */
/* ---------------------------------------------------------------- */

export default function Exams() {
  const { section } = useParams();
  const active =
    SECTIONS.find((s) => s.path === (section || "")) || SECTIONS[0];

  return (
    <div className="min-h-screen bg-paper font-body text-ink">
      <Header />

      <main className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">
        <div className="border-b border-line bg-cream px-5 py-4">
          <h1 className="font-display text-[22px] font-bold text-ink md:text-[26px]">
            Office of the Controller of Examinations
          </h1>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[266px_1fr]">
          <nav
            aria-label="Examinations sections"
            className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
          >
            {SECTIONS.map((s) => {
              const isActive = s.key === active.key;
              return (
                <Link
                  key={s.key}
                  to={s.path ? `/exams/${s.path}` : "/exams"}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    "flex-none whitespace-nowrap px-6 py-3.5 text-[13.5px] font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-gold " +
                    (isActive
                      ? "bg-ink text-white"
                      : "bg-cream text-ink/70 hover:bg-white hover:text-ink")
                  }
                >
                  {s.label}
                </Link>
              );
            })}
          </nav>

          <motion.section
            key={active.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="min-h-70 bg-cream p-6"
          >
            <h2 className="mb-5 font-display text-[19px] font-bold text-ink">
              {active.title}
            </h2>
            {active.render()}
          </motion.section>
        </div>

        <section
          aria-label="Contact the Office of the Controller of Examinations"
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          {CONTACTS.map((c) => (
            <ContactCard key={c.email} {...c} />
          ))}
        </section>
      </main>
    </div>
  );
}