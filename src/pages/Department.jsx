import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { assetUrl, getDepartment } from "../api/client.js";

/**
 * Department.jsx — restyled to match the Programmes / ProgrammeDetail
 * design language (ink/gold/cream/paper theme, Fraunces display type,
 * flat bordered cards, full-bleed banner with bottom-overlaid
 * breadcrumb + badge + title, restrained scroll-reveal motion).
 *
 * Same data flow, fallback logic and fields as before:
 * - getDepartment(slug) drives everything; loading/error states
 *   unchanged.
 * - Gallery keeps its slideshow (prev/next, dot indicators, onError
 *   auto-advance) and mount-time crossfade, now inside a full-bleed
 *   banner with the breadcrumb / "Department" badge / title overlaid
 *   at the bottom — the same layout ProgrammeDetail uses for its
 *   banner — instead of a separate boxed gallery + title section.
 * - Every other section (profile tabs, announcements, HOD's Desk,
 *   programmes, faculty, highlights, vision/mission, contact) keeps
 *   its scroll-reveal-once animation and consumes the same fields.
 */

const fallbackGallery = [
  "/assets/convention hall.jpg",
  "/assets/About3.jpg",
  "/assets/bridge.jpg",
];

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function PageShell({ children }) {
  return (
    <div className="font-body text-ink bg-paper min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function CenteredNotice({ title, body, action }) {
  return (
    <div className="max-w-250 mx-auto px-4 lg:px-8 py-24">
      <div className="mx-auto max-w-md border border-line bg-white p-8 text-center">
        <p className="font-display text-[20px] font-semibold text-ink">
          {title}
        </p>
        {body && <p className="mt-2 text-[14px] text-ink/55">{body}</p>}
        {action}
      </div>
    </div>
  );
}

function BarHeading({ children, className = "" }) {
  return (
    <h2
      className={`flex items-center gap-3.5 font-display text-[24px] sm:text-[28px] font-semibold text-ink ${className}`}
    >
      <span className="h-8 w-1 flex-none bg-gold" />
      {children}
    </h2>
  );
}

function PeopleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function ChatIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4.6 3.45A.5.5 0 0 1 2.6 20V5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 7v11H5V9h14z" />
    </svg>
  );
}

function CheckBoxIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path
        d="M7.5 12.5l2.7 2.7 6.3-6.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 12l8-5.99V6H4zm16 2.24-7.4 5.55a1 1 0 0 1-1.2 0L4 8.24V18h16V8.24z" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
    </svg>
  );
}

function DocumentIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      {...props}
    >
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5z" />
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 flex-none fill-none stroke-current stroke-[1.5] text-gold"
      {...props}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ItemAttachments({ item }) {
  if (!item?.image?.url && !item?.document?.url) return null;
  return (
    <div className="mt-3 flex items-center gap-4">
      {item.image?.url && (
        <img
          src={assetUrl(item.image.url)}
          alt=""
          className="h-24 w-24 flex-none border border-line object-cover"
        />
      )}
      {item.document?.url && (
        <a
          href={assetUrl(item.document.url)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-gold hover:text-gold-bright transition-colors duration-150"
        >
          <DocumentIcon />
          {item.document.label || "View PDF"}
        </a>
      )}
    </div>
  );
}

export default function Department() {
  const { slug } = useParams();
  const [dept, setDept] = useState(null);
  const [error, setError] = useState(null);
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState(0);
  const [hodImageFailed, setHodImageFailed] = useState(false);

  useEffect(() => {
    setDept(null);
    setError(null);
    setSlide(0);
    setTab(0);
    setHodImageFailed(false);
    getDepartment(slug)
      .then(setDept)
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <PageShell>
        <CenteredNotice
          title="Couldn't load this department"
          body={error}
          action={
            <a
              href="/departments"
              className="mt-5 inline-flex items-center border border-gold px-5 py-2.5 text-[13.5px] font-semibold text-ink transition-colors duration-150 hover:bg-gold hover:text-white"
            >
              Back to departments
            </a>
          }
        />
      </PageShell>
    );
  }

  if (!dept) {
    return (
      <PageShell>
        <div className="max-w-250 mx-auto px-4 lg:px-8 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-[46vh] min-h-20 max-h-120 w-full bg-cream" />
            <div className="h-6 w-64 bg-cream" />
            <div className="h-40 bg-cream" />
          </div>
        </div>
      </PageShell>
    );
  }

  const gallery = dept.gallery?.length
    ? dept.gallery
    : fallbackGallery.map((url) => ({ url, label: "Department event" }));
  const sections = dept.profileSections?.length
    ? dept.profileSections
    : [{ title: "About", content: dept.aboutBody }];
  const current = gallery[slide % gallery.length];
  const programmes = dept.programmes || [];
  const announcements = dept.announcements || [];
  const faculty = dept.faculty || [];
  const highlights = dept.highlights || [];
  const activeSection = sections[tab];

  return (
    <PageShell>
      {/* Banner — gallery + breadcrumb/badge/title overlay, same
          layout as ProgrammeDetail's banner */}
      <section className="relative">
        <div className="relative h-[46vh] min-h-20 max-h-120 w-full overflow-hidden bg-ink">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.url}
              src={assetUrl(current.url)}
              onError={() => setSlide((slide + 1) % gallery.length)}
              alt={current.label || `${dept.name} event`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.78, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/15" />

          {dept.establishedYear && (
            <span className="absolute top-6 right-4 lg:right-8 z-10 text-[11px] font-bold uppercase tracking-widest text-ink bg-gold-bright px-3 py-1.5 shadow-md">
              Est. {dept.establishedYear}
            </span>
          )}

          {gallery.length > 1 && (
            <>
              <button
                onClick={() =>
                  setSlide((slide - 1 + gallery.length) % gallery.length)
                }
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-md transition-colors duration-150 hover:bg-gold hover:text-white"
              >
                ‹
              </button>
              <button
                onClick={() => setSlide((slide + 1) % gallery.length)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-md transition-colors duration-150 hover:bg-gold hover:text-white"
              >
                ›
              </button>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${i === slide % gallery.length ? "w-6 bg-gold-bright" : "w-1.5 bg-white/70"}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="relative z-10 h-full max-w-250 mx-auto px-4 lg:px-8 flex flex-col justify-end pb-10">
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <a
                href="/departments"
                className="hover:text-gold-bright transition-colors"
              >
                Departments
              </a>
              <span className="mx-2">/</span>
              <span className="text-white/85">{dept.name}</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              Department
            </span>
            <h1 className="mt-3 font-display text-[30px] sm:text-[40px] font-semibold text-white leading-[1.05] max-w-2xl">
              Department of {dept.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[13.5px] text-white/70">
              <span className="flex items-center gap-1.5">
                <PeopleIcon />
                {programmes.length} Programmes
              </span>
              <span className="flex items-center gap-1.5">
                <ChatIcon />
                {announcements.length} Announcements
              </span>
              {dept.establishedYear && (
                <span className="flex items-center gap-1.5">
                  <CalendarIcon />
                  Established {dept.establishedYear}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-20">
        {/* Profile tabs + content */}
        <motion.section {...revealProps}>
          <div role="tablist" className="flex flex-wrap items-center gap-3">
            {sections.map((section, index) => (
              <button
                key={section.title}
                role="tab"
                aria-selected={tab === index}
                onClick={() => setTab(index)}
                className={`px-6 py-2.5 text-[13.5px] font-semibold uppercase tracking-wide transition-colors duration-150 ${
                  tab === index
                    ? "bg-ink text-white"
                    : "bg-white text-ink/60 border border-line hover:border-gold hover:text-ink"
                }`}
              >
                {section.title}
              </button>
            ))}
            <a
              href={`/departments/${slug}/reports`}
              className="ml-auto text-[13.5px] font-semibold text-ink/50 hover:text-gold transition-colors duration-150"
            >
              Reports &rarr;
            </a>
          </div>
          <div className="mt-7 max-w-[72ch] whitespace-pre-line text-[16.5px] leading-[1.9] text-ink/75">
            {activeSection?.content}
          </div>
          {activeSection?.image?.url && (
            <img
              src={assetUrl(activeSection.image.url)}
              alt={activeSection.title}
              className="mt-5 w-full max-h-96 border border-line object-cover"
            />
          )}
          {activeSection?.document?.url && (
            <a
              href={assetUrl(activeSection.document.url)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-gold hover:text-gold-bright transition-colors duration-150"
            >
              <DocumentIcon />
              {activeSection.document.label || "View document"}
            </a>
          )}
        </motion.section>

        {/* Announcements */}
        <motion.section {...revealProps} className="border border-line bg-white p-8 sm:p-10">
          <BarHeading>Announcements</BarHeading>
          {announcements.length ? (
            <div className="mt-8 divide-y divide-line">
              {announcements.map((item, index) => (
                <a
                  key={index}
                  href={assetUrl(item.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-5 text-[15.5px] text-ink/75 transition-colors duration-150 hover:text-ink"
                >
                  <span className="grid h-10 w-10 flex-none place-items-center border border-line text-gold text-[16px] transition-colors duration-150 group-hover:bg-gold group-hover:text-white group-hover:border-gold">
                    &#9635;
                  </span>
                  <span className="flex-1">
                    {item.label || "Department document"}
                  </span>
                  <ArrowIcon className="h-4 w-4 flex-none fill-none stroke-current stroke-[1.5] text-gold opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0" />
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[14px] text-ink/45">
              No announcements have been published.
            </p>
          )}
        </motion.section>

        {/* HOD's Desk */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-line bg-white p-8 sm:p-12"
        >
          <BarHeading>HOD&rsquo;s Desk</BarHeading>

          <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10 text-center sm:text-left">
            <div className="relative flex-none">
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gold-bright/25"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {dept.hod?.imageUrl && !hodImageFailed ? (
                <motion.img
                  src={assetUrl(dept.hod.imageUrl)}
                  onError={() => setHodImageFailed(true)}
                  alt={dept.hod.name}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
                  className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
                  className="relative grid h-40 w-40 sm:h-44 sm:w-44 place-items-center rounded-full bg-cream text-[16px] font-semibold text-gold border-4 border-white shadow-lg"
                >
                  HOD
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="min-w-0 max-w-[62ch]"
            >
              <p className="font-display text-[24px] sm:text-[28px] font-semibold text-ink leading-tight">
                {dept.hod?.name || "Head of the Department"}
              </p>
              <p className="mt-1.5 text-[13.5px] font-semibold uppercase tracking-wide text-gold">
                {dept.hod?.designation || "Head of Department"}
              </p>
              <p className="mt-5 whitespace-pre-line text-[16.5px] leading-[1.9] text-ink/70">
                {dept.hod?.message ||
                  "The Head of the Department's message will be published here."}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Academic Programmes */}
        {programmes.length > 0 && (
          <motion.section {...revealProps} className="border border-line bg-white p-8 sm:p-10">
            <BarHeading>Academic Programmes</BarHeading>
            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {programmes.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 border border-line bg-cream/40 p-5"
                >
                  <CheckBoxIcon className="mt-0.5 h-5 w-5 flex-none text-gold" />
                  <div className="min-w-0">
                    <span className="text-[15px] font-semibold text-ink">
                      {item.name}
                      {item.level ? ` (${item.level})` : ""}
                    </span>
                    <ItemAttachments item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Faculty */}
        {faculty.length > 0 && (
          <motion.section {...revealProps} className="border border-line bg-white p-8 sm:p-10">
            <BarHeading>Faculty</BarHeading>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.map((member, index) => (
                <article key={index} className="border border-line p-6">
                  <div className="flex items-center gap-4">
                    {member.image?.url ? (
                      <img
                        src={assetUrl(member.image.url)}
                        alt={member.name}
                        className="h-20 w-20 flex-none rounded-full object-cover border border-line"
                      />
                    ) : (
                      <div className="grid h-20 w-20 flex-none place-items-center rounded-full bg-cream text-[15px] font-semibold text-gold">
                        {member.name
                          ? member.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")
                          : "?"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[16px] font-bold text-ink truncate">
                        {member.name}
                      </p>
                      <p className="text-[13px] text-ink/50 truncate">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                  {member.qualification && (
                    <p className="mt-4 text-[13px] text-ink/50">
                      {member.qualification}
                    </p>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-gold hover:text-gold-bright transition-colors duration-150"
                    >
                      <MailIcon width={14} height={14} />
                      {member.email}
                    </a>
                  )}
                  {member.document?.url && (
                    <a
                      href={assetUrl(member.document.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2.5 flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:text-gold-bright transition-colors duration-150"
                    >
                      <DocumentIcon />
                      {member.document.label || "View CV"}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Department highlights */}
        {highlights.length > 0 && (
          <motion.section {...revealProps} className="border border-line bg-white p-8 sm:p-12">
            <BarHeading>Department Highlights</BarHeading>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((item, index) => (
                <article key={index} className="border border-line p-6">
                  {item.image?.url && (
                    <img
                      src={assetUrl(item.image.url)}
                      alt={item.title}
                      className="mb-4 h-48 w-full object-cover"
                    />
                  )}
                  <p className="font-display text-[17px] font-semibold text-ink">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink/65">
                    {item.description}
                  </p>
                  {item.document?.url && (
                    <a
                      href={assetUrl(item.document.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:text-gold-bright transition-colors duration-150"
                    >
                      <DocumentIcon />
                      {item.document.label || "Learn more"}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Vision / Mission */}
        {(dept.vision || dept.mission) && (
          <motion.section {...revealProps} className="grid sm:grid-cols-2 gap-6">
            {dept.vision && (
              <article className="border border-line border-t-4 border-t-gold bg-white p-9 sm:p-10">
                <h2 className="font-display text-[22px] font-semibold text-ink">
                  Vision
                </h2>
                <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-ink/70">
                  {dept.vision}
                </p>
              </article>
            )}
            {dept.mission && (
              <article className="border border-line border-t-4 border-t-gold bg-white p-9 sm:p-10">
                <h2 className="font-display text-[22px] font-semibold text-ink">
                  Mission
                </h2>
                <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-ink/70">
                  {dept.mission}
                </p>
              </article>
            )}
          </motion.section>
        )}

        {/* Contact */}
        {(dept.contactEmail || dept.contactPhone) && (
          <motion.section {...revealProps} className="border border-line bg-white p-8 sm:p-10">
            <BarHeading>Contact</BarHeading>
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {dept.contactEmail && (
                <a
                  href={`mailto:${dept.contactEmail}`}
                  className="flex items-center gap-2.5 text-[15px] font-medium text-ink/70 hover:text-gold transition-colors duration-150"
                >
                  <MailIcon width={18} height={18} />
                  {dept.contactEmail}
                </a>
              )}
              {dept.contactPhone && (
                <a
                  href={`tel:${dept.contactPhone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 text-[15px] font-medium text-ink/70 hover:text-gold transition-colors duration-150"
                >
                  <PhoneIcon width={18} height={18} />
                  {dept.contactPhone}
                </a>
              )}
            </div>
          </motion.section>
        )}
      </div>
    </PageShell>
  );
}