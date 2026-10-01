import React from "react";
import MapEmbed from "./MapEmbed.jsx";

/**
 * Footer.jsx — rebuilt from the plain placeholder version to match
 * the college's existing footer:
 * - Column 1: crest + name, postal address, phone, fax, "Contact Us"
 *   link (now to /contact, the new Contact page).
 * - Column 2: embedded Google map (no API key needed for the basic
 *   `output=embed` form).
 * - Column 3: "MY PSG" — Library / PSG Mail / Our Websites /
 *   Community Radio / UGC-AICTE Mandatory Committees.
 * - Column 4: "GLANCE AT PSG" — a 4x3 campus photo grid. The source
 *   screenshot's photos aren't available as real assets yet, so
 *   GLANCE_IMAGES below points at placeholder paths under
 *   /assets/footer/ — swap in real photos once you have them.
 * - A dark bottom bar with a copyright line, matching the black
 *   strip visible at the very bottom of the source screenshot.
 *
 * Styled with the site's design tokens (ink/gold/cream/paper/line,
 * font-display/font-body) rather than the old plain `.footer` CSS
 * class, to match every other page rebuilt so far.
 */

const MY_PSG_LINKS = [
  ["Library", "#library"],
  ["Community Radio", "#community-radio"],
  ["PSG Mail", "#psg-mail"],
  ["UGC/AICTE Mandatory Committees", "#ugc-aicte-committees"],
  ["Our Websites", "#our-websites"],
];

// Placeholder paths — replace with real campus photos once available.
const GLANCE_IMAGES = [
  "/assets/75yearsLogo_PSGCollegeofTech.png",
  "/assets/100yearsLogo_PsgSonsCharities.png",
  "/assets/About3.jpg",
  "/assets/AwardCeremony_2026_ElectricalAlliedEngineering.jpg",
  "/assets/about4.jpg",
  "/assets/AwardCeremony2026-AUT_Mech_MTL_PRO.jpg",
  "/assets/AwardCeremony2026-BME-BioTech-CSEIT.jpg",
  "/assets/AwardCeremony2026-ScienceStream.jpg",
  "/assets/bridge.jpg",
  "/assets/convention hall.jpg",
  "/assets/faculty_interaction_section.jpg",
  "/assets/Facultyinteraction_1.jpg",
];

function PinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <path
        d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaxIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <path d="M6 3.5h9L19 8v3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="11" width="16" height="8.5" rx="1.3" />
      <path d="M8 14.5h8M8 17h4" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="1.6" />
      <path
        d="m4 6.5 8 6.2 8-6.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon(props) {
  return (
    <svg
      viewBox="0 0 10 10"
      width="9"
      height="9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <path
        d="M3 1.5 7 5l-4 3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="font-body text-ink bg-white border-t border-line"
    >
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-12">
          {/* College info */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/logo1"
                alt="PSG College of Technology"
                className="h-9 w-auto flex-none"
              />
              {/* <span className="font-display text-[15px] font-semibold leading-tight text-ink">
                PSG
                <br />
                College of Technology
              </span> */}
            </div>

            <div className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ink/70">
              <PinIcon className="flex-none mt-0.5 text-gold" />
              <span>
                Post Box No. 1611
                <br />
                Peelamedu
                <br />
                Coimbatore - 641004
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-[13.5px] text-ink/70">
              <PhoneIcon className="flex-none text-gold" />
              <a
                href="tel:04222572177"
                className="hover:text-gold transition-colors duration-150"
              >
                0422-2572177, 2572477, 4344777
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-[13.5px] text-ink/70">
              <FaxIcon className="flex-none text-gold" />
              <span>0422-2592277</span>
            </div>

            <div className="flex items-center gap-2.5 text-[13.5px]">
              <MailIcon className="flex-none text-gold" />
              <a
                href="/contact"
                className="font-semibold text-gold hover:text-gold-bright transition-colors duration-150"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="md:col-span-1">
            <MapEmbed className="h-56 md:h-full min-h-56" />
          </div>

          {/* My PSG */}
          <div>
            <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.06em] text-ink pb-3 border-b border-line">
              My PSG
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {MY_PSG_LINKS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-start gap-1.5 text-[13.5px] leading-snug text-ink/70 hover:text-gold transition-colors duration-150"
                >
                  <ChevronIcon className="flex-none mt-1 text-gold/70 group-hover:text-gold" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Glance at PSG */}
          <div>
            <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.06em] text-ink pb-3 border-b border-line">
              Glance at PSG
            </h3>
            <div className="mt-4 grid grid-cols-4 gap-1.5">
              {GLANCE_IMAGES.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Campus glimpse ${index + 1}`}
                  className="h-14 w-full object-cover border border-line"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-ink text-white/55">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4 text-center text-[12px]">
          &copy; {year} PSG College of Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
