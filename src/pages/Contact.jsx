import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

/**
 * Contact.jsx — reached at /contact from the top-level "Contact" nav
 * link (previously "/#contact", updated in Header.jsx to point here).
 *
 * Transcribed from the college's existing Contact Us page:
 * - A directory table of who to email for specific queries (fee
 *   payment, exams, certificates, scholarships, placement, hostel).
 *   The source screenshot's table scrolled past row 6 ("Hostel") —
 *   later rows weren't visible, so they're left out rather than
 *   invented. Add them to CONTACT_ROWS below once you have them.
 * - A quick address / phone / fax strip, matching the icon row at
 *   the top of the source screenshot's footer area.
 *
 * The map / "MY PSG" / "GLANCE AT PSG" block further down that same
 * screenshot reads as the site's global footer (it's generic, not
 * contact-query-specific, and would appear on every page) — that's
 * assumed to already live in Footer.jsx, so it isn't duplicated here.
 */

const CONTACT_ROWS = [
  {
    query: "Fee payment",
    office: ["Dean Administration"],
    emails: ["dean.admn@psgtech.ac.in", "acs@psgtech.ac.in"],
  },
  {
    query:
      "Examination Timetable/Fee Payment and Verification of Qualification/Transcripts",
    office: ["Controller of Examinations/Deputy Controller of Examination"],
    emails: ["coe@psgtech.ac.in", "deputy.coe@psgtech.ac.in"],
  },
  {
    query: "Bona fide Certificates /Certificate for Medium of Instruction",
    office: ["Dean Academic"],
    emails: ["dean.acad@psgtech.ac.in", "academic@psgtech.ac.in"],
  },
  {
    query: "Student Scholarships",
    office: ["Dean Administration"],
    emails: ["dsection.admn@psgtech.ac.in", "dean.admn@psgtech.ac.in"],
  },
  {
    query: "Placement",
    office: [
      "Dean- Placement and Training",
      "Associate Dean- Placement and Training",
      "Internships",
    ],
    emails: [
      "placement@psgtech.ac.in",
      "dean.pat@psgtech.ac.in",
      "associatedean.pat@psgtech.ac.in",
      "internship.pat@psgtech.ac.in",
    ],
  },
  {
    query: "Hostel",
    office: ["Warden - Mens Hostel", "Warden - Ladies Hostel"],
    emails: ["warden.gentshostel@psgtech.ac.in", "warden.ladieshostel@psgtech.ac.in"],
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function FaxIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 3.5h9L19 8v3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="11" width="16" height="8.5" rx="1.3" />
      <path d="M8 14.5h8M8 17h4" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 12l8-5.99V6H4zm16 2.24-7.4 5.55a1 1 0 0 1-1.2 0L4 8.24V18h16V8.24z" />
    </svg>
  );
}
  
export default function Contact() {
  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative">  
        <div className="relative h-[32vh] min-h-20 max-h-80 w-full overflow-hidden bg-auto">
          <motion.img
            src="/assets/About3.jpg"
            alt=" PSG Tech" 
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/90 to-ink/70" />
          <div className="relative z-10 h-full max-w-250 mx-auto px-4 lg:px-8 flex flex-col justify-end pb-10">
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">
                Home
              </a> 
              <span className="mx-2">/</span>
              <span className="text-white/85">Contact</span>
            </p>  
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              Get in touch
            </span>
            <h1 className="mt-3 font-display text-[30px] sm:text-[40px] font-semibold text-white leading-[1.05]">
              Contact Us 
            </h1>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20 space-y-14">
        <motion.p {...reveal} className="max-w-[72ch] text-[15.5px] leading-[1.85] text-ink/75">
          <a href="mailto:principal@psgtech.edu" className="text-gold hover:text-gold-bright">
            principal@psgtech.edu
          </a>
          ,{" "}
          <a href="mailto:principal@psgtech.ac.in" className="text-gold hover:text-gold-bright">
            principal@psgtech.ac.in
          </a>{" "}
          can be contacted for clarifications.
          <br />
          However, for specific queries and quick service the following
          offices can be contacted by email.
        </motion.p>

        {/* Directory table */}
        <motion.div {...reveal} className="border border-line bg-white overflow-x-auto">
          <table className="w-full min-w-180 border-collapse text-left">
            <thead>
              <tr className="bg-cream border-b border-line">
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/55 w-14">
                  No.
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/55">
                  Related query
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/55">
                  Office/Section
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/55">
                  Email-Id
                </th>
              </tr>
            </thead>
            <tbody>
              {CONTACT_ROWS.map((row, index) => (
                <tr key={index} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-5 text-[14px] font-semibold text-ink/60 align-top">
                    {index + 1}
                  </td>
                  <td className="px-5 py-5 text-[14.5px] text-ink/80 align-top">
                    {row.query}
                  </td>
                  <td className="px-5 py-5 text-[14.5px] text-ink/80 align-top">
                    {row.office.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </td>
                  <td className="px-5 py-5 align-top">
                    {row.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block text-[13.5px] text-gold hover:text-gold-bright hover:underline"
                      >
                        {email}
                      </a>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Quick address / phone / fax strip */}
        <motion.div
          {...reveal}
          className="grid sm:grid-cols-3 gap-4 border-t border-line pt-10"
        >
          <div className="flex items-start gap-3.5 border border-line bg-cream/50 p-5">
            <HomeIcon className="flex-none text-gold mt-0.5" />
            <p className="text-[14px] leading-relaxed text-ink/75">
              Post Box No. 1611,
              <br />
              Peelamedu,
              <br />
              Coimbatore - 641004
            </p>
          </div>
          <div className="flex items-start gap-3.5 border border-line bg-cream/50 p-5">
            <PhoneIcon className="flex-none text-gold mt-0.5" />
            <div className="text-[14px] leading-relaxed text-ink/75">
              <a href="tel:04222572177" className="block hover:text-gold">0422-2572177</a>
              <a href="tel:04222572477" className="block hover:text-gold">0422-2572477</a>
              <a href="tel:04224344777" className="block hover:text-gold">0422-4344777</a>
            </div>
          </div>
          <div className="flex items-start gap-3.5 border border-line bg-cream/50 p-5">
            <FaxIcon className="flex-none text-gold mt-0.5" />
            <p className="text-[14px] leading-relaxed text-ink/75">0422-2573833</p>
          </div>
        </motion.div>

        {/* Detailing image break */}
        <motion.figure {...reveal} className="relative overflow-hidden">
          <img
            src="/assets/about4.jpg"
            alt="PSG College of Technology — campus and administrative block"
            className="w-full h-65 sm:h-85 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/10 to-transparent" />
          <figcaption className="absolute bottom-5 left-5 flex flex-col text-white">
            <span className="text-[11px] uppercase tracking-[0.14em] text-white/70">
              On campus
            </span>
            <strong className="font-display text-[20px] font-medium">
              Get in touch
            </strong>
          </figcaption>
        </motion.figure>

        <motion.div {...reveal} className="flex items-center gap-2.5">
          <MailIcon className="text-gold" />
          <a
            href="mailto:principal@psgtech.ac.in"
            className="text-[13.5px] font-semibold text-ink/70 hover:text-gold transition-colors duration-150"
          >
            principal@psgtech.ac.in
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}