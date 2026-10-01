import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import { getHod } from "./Hoddata.js";

/**
 * HodDetail.jsx — reached at /academics/heads-of-department/:slug.
 *
 * "Personal Profile" layout: photo + quick facts, then every section
 * hodData.js supports (see that file's SCHEMA comment) — In Brief,
 * Educational Qualification(s), Subject Expertise, Research Area,
 * Professional Experience, Membership, Patents, International &
 * National Journals, International & National Conferences, Books
 * Published, Contributions, Programmes Organised, Programmes
 * Attended, Awards and Achievements, Doctoral Guidance/Supervision,
 * Certificate Course(s), and Contact & Links.
 *
 * Every section is conditionally rendered: a HOD with only a name,
 * department, and photo still gets a clean page (just the hero and a
 * "details are being added" line); a HOD with the full profile, like
 * Dr. Karpagam G R, gets all of the above.
 */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function Section({ eyebrow, title, children }) {
  return (
    <motion.div {...reveal}>
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">{eyebrow}</span>
      <h2 className="mt-2 font-display text-[22px] font-semibold text-ink leading-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}

/** Generic responsive table for the list-of-object sections below.
 *  `columns` is [{ key, label }]; `rows` is an array of plain
 *  objects keyed the same way. Wrapped in overflow-x-auto so wide
 *  tables (Patents, Journals, Conferences...) scroll on narrow
 *  screens instead of squeezing the whole page. */
function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full min-w-160 text-[13px] border-collapse">
        <thead>
          <tr className="bg-cream text-left">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 font-semibold text-ink/70 whitespace-nowrap border-b border-line">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-b-0 align-top even:bg-cream/40">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-ink/75">
                  {row[c.key] || <span className="text-ink/30">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const JOURNAL_COLUMNS = [
  { key: "journal", label: "Journal" },
  { key: "title", label: "Paper Title" },
  { key: "year", label: "Year" },
  { key: "role", label: "Role" },
  { key: "volume", label: "Volume" },
];

const CONFERENCE_COLUMNS = [
  { key: "conference", label: "Conference Title" },
  { key: "title", label: "Paper Title" },
  { key: "date", label: "Date" },
  { key: "role", label: "Role" },
  { key: "organizedBy", label: "Organized By" },
];

const BOOK_COLUMNS = [
  { key: "publisher", label: "Publisher" },
  { key: "title", label: "Title" },
  { key: "year", label: "Year" },
  { key: "role", label: "Role" },
  { key: "edition", label: "Edition" },
];

const CONTRIBUTION_COLUMNS = [
  { key: "title", label: "Title" },
  { key: "authors", label: "Author(s)" },
  { key: "nature", label: "Nature" },
  { key: "date", label: "Date" },
];

const PATENT_COLUMNS = [
  { key: "role", label: "Role" },
  { key: "patentId", label: "Patent ID" },
  { key: "title", label: "Patent Title" },
  { key: "level", label: "Patent Level" },
  { key: "registeredWith", label: "Registered With" },
  { key: "year", label: "Year" },
  { key: "status", label: "Status" },
];

const PROGRAMME_ORGANISED_COLUMNS = [
  { key: "title", label: "Title of the Programme" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  { key: "sponsoringAgency", label: "Sponsoring Agency" },
  { key: "audience", label: "No. of Audience" },
];

const PROGRAMME_ATTENDED_COLUMNS = [
  { key: "title", label: "Title of the Programme" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  { key: "organizedBy", label: "Organized By" },
  { key: "sponsoringAgency", label: "Sponsoring Agency" },
];

const AWARD_COLUMNS = [
  { key: "title", label: "Title of the Award" },
  { key: "awardedBy", label: "Awarded By" },
  { key: "date", label: "Date of Achievement" },
];

const DOCTORAL_COLUMNS = [
  { key: "candidate", label: "Name of the Candidate" },
  { key: "thesis", label: "Title of the Thesis" },
  { key: "date", label: "Date of Completion" },
];

export default function HodDetail() {
  const { slug } = useParams();
  const hod = getHod(slug);

  if (!hod) {
    return (
      <div className="font-body text-ink bg-paper min-h-screen">
        <Header />
        <div className="max-w-250 mx-auto px-4 lg:px-8 py-24 text-center">
          <p className="font-display text-[24px] font-semibold text-ink">Profile not found</p>
          <Link to="/academics/heads-of-department" className="mt-4 inline-block text-[14px] text-gold hover:underline">
            &larr; Back to Heads of the Department
          </Link>
        </div>
      </div>
    );
  }

  const hasQuickFacts = hod.title || hod.dateOfJoining;
  const hasSubject = (hod.subjectExpertise && hod.subjectExpertise.length > 0) || hod.subjectBrief;
  const hasResearch = (hod.researchArea && hod.researchArea.length > 0) || hod.researchWork;
  const hasContact = hod.contactEmails?.length > 0 || hod.googleScholarUrl || hod.researchScholarUrl;

  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Compact hero */}
      <section className="relative bg-ink overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-75 w-75 rounded-full"
          style={{ border: "1px solid rgba(101,177,229,0.25)" }}
        />
        <div className="relative z-10 max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">Home</a>
              <span className="mx-2">/</span>
              <span className="text-white/60">Academics</span>
              <span className="mx-2">/</span>
              <Link to="/academics/heads-of-department" className="hover:text-gold-bright transition-colors">Heads of the Department</Link>
              <span className="mx-2">/</span>
              <span className="text-white/85">{hod.name}</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              Head of Department
            </span>
            <h1 className="mt-3 font-display text-[32px] sm:text-[42px] font-semibold text-white leading-[1.05]">
              {hod.name}
            </h1>
            <p className="mt-2 text-[14.5px] text-white/70">{hod.department}</p>
          </motion.div>
        </div>
      </section>

      {/* Profile */}
      <section className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20 space-y-14">
        {/* Photo + quick facts */}
        <motion.div {...reveal} className="grid sm:grid-cols-[220px_1fr] gap-8">
          <div className="relative w-full max-w-55">
            <div aria-hidden className="absolute -inset-3 border border-gold pointer-events-none" style={{ zIndex: -1 }} />
            <img src={hod.photo} alt={hod.name} className="w-full aspect-4/5 object-cover" />
          </div>
          <div>
            <p className="font-display text-[22px] font-semibold text-ink">{hod.name}</p>
            {hasQuickFacts ? (
              <dl className="mt-4 space-y-2 text-[14.5px]">
                {hod.title && (
                  <div className="flex gap-2">
                    <dt className="w-40 flex-none text-ink/45">Academic Title</dt>
                    <dd className="text-ink/80">{hod.title}</dd>
                  </div>
                )}
                <div className="flex gap-2">
                  <dt className="w-40 flex-none text-ink/45">Department</dt>
                  <dd className="text-ink/80">{hod.department}, PSG College of Technology, Coimbatore, Tamil Nadu, India</dd>
                </div>
                {hod.dateOfJoining && (
                  <div className="flex gap-2">
                    <dt className="w-40 flex-none text-ink/45">Date of Joining</dt>
                    <dd className="text-ink/80">{hod.dateOfJoining}</dd>
                  </div>
                )}
                {hod.supervisor && (
                  <div className="flex gap-2">
                    <dt className="w-40 flex-none text-ink/45">Supervisor</dt>
                    <dd className="text-ink/80">{hod.supervisor}</dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className="mt-4 text-[14.5px] text-ink/55 italic">
                Full profile details for {hod.name} are being added.
              </p>
            )}
          </div>
        </motion.div>

        {hod.inBrief && (
          <Section eyebrow="Overview" title="In Brief">
            <p className="max-w-[68ch] text-[15px] leading-[1.85] text-ink/75">{hod.inBrief}</p>
          </Section>
        )}

        {hod.qualifications && hod.qualifications.length > 0 && (
          <Section eyebrow="Education" title="Educational Qualification(s)">
            <ul className="space-y-1.5">
              {hod.qualifications.map((q) => (
                <li key={q} className="text-[14.5px] text-ink/75">{q}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section eyebrow="Teaching" title="Subject Expertise">
          {hasSubject ? (
            hod.subjectExpertise && hod.subjectExpertise.length > 0 ? (
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {hod.subjectExpertise.map((s) => (
                  <li key={s} className="text-[14.5px] text-ink/75">{s}</li>
                ))}
              </ul>
            ) : (
              <p className="max-w-[68ch] text-[15px] leading-[1.85] text-ink/75">{hod.subjectBrief}</p>
            )
          ) : (
            <p className="text-[14.5px] text-ink/50 italic">Subjects and courses taught will be added here.</p>
          )}
        </Section>

        <Section eyebrow="Research" title="Research Area">
          {hasResearch ? (
            <>
              {hod.researchArea && hod.researchArea.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {hod.researchArea.map((r) => (
                    <li key={r} className="text-[14.5px] text-ink/75">{r}</li>
                  ))}
                </ul>
              )}
              {hod.researchWork && (
                <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.85] text-ink/75">{hod.researchWork}</p>
              )}
            </>
          ) : (
            <p className="text-[14.5px] text-ink/50 italic">A brief on current research work will be added here.</p>
          )}
        </Section>

        {hod.professionalExperience && hod.professionalExperience.length > 0 && (
          <Section eyebrow="Career" title="Professional Experience">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink/45 mb-3">Academic</p>
            <ul className="space-y-3">
              {hod.professionalExperience.map((e, i) => (
                <li key={i} className="text-[14.5px]">
                  <span className="text-ink/85 font-medium">{e.role}</span>
                  <span className="text-ink/60">, {e.place}</span>
                  <span className="block text-[13px] text-ink/45 mt-0.5">{e.period}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {hod.membership && hod.membership.length > 0 && (
          <Section eyebrow="Affiliations" title="Membership">
            <ul className="space-y-1.5">
              {hod.membership.map((m) => (
                <li key={m} className="text-[14.5px] text-ink/75">{m}</li>
              ))}
            </ul>
          </Section>
        )}

        {hod.patents && hod.patents.length > 0 && (
          <Section eyebrow="IP" title="Patents">
            <DataTable columns={PATENT_COLUMNS} rows={hod.patents} />
          </Section>
        )}

        {hod.journals && hod.journals.length > 0 && (
          <Section eyebrow="Publications" title="International & National Journals">
            <DataTable columns={JOURNAL_COLUMNS} rows={hod.journals} />
          </Section>
        )}

        {hod.conferences && hod.conferences.length > 0 && (
          <Section eyebrow="Publications" title="International & National Conferences">
            <DataTable columns={CONFERENCE_COLUMNS} rows={hod.conferences} />
          </Section>
        )}

        {hod.booksPublished && hod.booksPublished.length > 0 && (
          <Section eyebrow="Publications" title="Books Published">
            <DataTable columns={BOOK_COLUMNS} rows={hod.booksPublished} />
          </Section>
        )}

        {hod.contributions && hod.contributions.length > 0 && (
          <Section eyebrow="Publications" title="Contributions">
            <DataTable columns={CONTRIBUTION_COLUMNS} rows={hod.contributions} />
          </Section>
        )}

        {(!hod.journals && !hod.conferences && !hod.booksPublished && !hod.contributions) &&
          hod.publications && hod.publications.length > 0 && (
            <Section eyebrow="Publications" title="Published Articles">
              <ul className="space-y-1.5">
                {hod.publications.map((p) => (
                  <li key={p} className="text-[14.5px] text-ink/75">{p}</li>
                ))}
              </ul>
            </Section>
          )}

        {hod.programmesOrganised && hod.programmesOrganised.length > 0 && (
          <Section eyebrow="Outreach" title="Programmes Organised">
            <DataTable columns={PROGRAMME_ORGANISED_COLUMNS} rows={hod.programmesOrganised} />
          </Section>
        )}

        {hod.programmesAttended && hod.programmesAttended.length > 0 && (
          <Section eyebrow="Outreach" title="Programmes Attended">
            <DataTable columns={PROGRAMME_ATTENDED_COLUMNS} rows={hod.programmesAttended} />
          </Section>
        )}

        {hod.awards && hod.awards.length > 0 && (
          <Section eyebrow="Recognition" title="Awards and Achievements">
            <DataTable columns={AWARD_COLUMNS} rows={hod.awards} />
          </Section>
        )}

        {hod.doctoralGuidance && hod.doctoralGuidance.length > 0 && (
          <Section eyebrow="Mentorship" title="Doctoral Guidance / Supervision: Completed">
            <DataTable columns={DOCTORAL_COLUMNS} rows={hod.doctoralGuidance} />
          </Section>
        )}

        {hod.certificateCourses && hod.certificateCourses.length > 0 && (
          <Section eyebrow="Credentials" title="Certificate Course(s)">
            <ul className="space-y-1.5">
              {hod.certificateCourses.map((c) => (
                <li key={c} className="text-[14.5px] text-ink/75">{c}</li>
              ))}
            </ul>
          </Section>
        )}

        {hasContact && (
          <Section eyebrow="Reach out" title="Contact &amp; Links">
            <div className="p-6 bg-cream border border-line space-y-3 max-w-130">
              {hod.contactEmails?.map((email) => (
                <a key={email} href={`mailto:${email}`} className="block text-[13.5px] text-gold hover:underline">
                  {email}
                </a>
              ))}
              {hod.googleScholarUrl && (
                <a
                  href={hod.googleScholarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[13.5px] text-gold hover:underline break-all"
                >
                  Google Scholar profile
                </a>
              )}
              {hod.researchScholarUrl && (
                <a
                  href={hod.researchScholarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[13.5px] text-gold hover:underline break-all"
                >
                  Research Scholar profile (Scopus)
                </a>
              )}
            </div>
          </Section>
        )}

        <div>
          <Link to="/academics/heads-of-department" className="text-[13.5px] font-semibold text-ink/60 hover:text-ink">
            &larr; Back to Heads of the Department
          </Link>
        </div>
      </section>
    </div>
  );
}