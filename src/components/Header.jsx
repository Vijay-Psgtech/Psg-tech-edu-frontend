import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getHomepage } from "../api/client.js";

/**
 * Rebuilt around the same structure as your reference: a thin utility
 * topbar, a main nav row (brand + 75yr logo on the left, centered links,
 * 100yr logo on the right), and an optional jubilee banner underneath —
 * but reskinned in the site's navy/brass heritage theme (bg-paper,
 * text-ink, border-line, bg-gold, font-display/font-body) instead of the
 * blue/yellow reference colors.
 *
 * Deliberately simpler than the previous version:
 * - Dropdowns are native <details>/<summary> with a shared `name`
 *   attribute, so the browser closes any other open menu for free —
 *   no JS state, no dropdown bugs.
 * - No scrolling/centering flex tricks on the nav (that's what caused
 *   the clipped "About us" / "NIRF & ARIIA" text before). The nav just
 *   sits in a normal flex row; below `xl` it moves into the mobile
 *   drawer instead of trying to squeeze into one line.
 * - The ticker no longer marquees — it truncates with an ellipsis.
 *   Scrolling text is hard to read; a clean truncated line matches your
 *   reference and is more legible.
 *
 * Usage: <Header news={...} banner={...} />
 * - `news`   optional override for the ticker: { text, link }
 * - `banner` optional strip under the nav: { title, cta, link }.
 *   Pass banner={null} to hide it entirely.
 */

const DEFAULT_NEWS = {
  text: "PSG Centenary Celebrations | Products of PSG Products Expo 2026 - Visit the Official Expo Website.",
  link: "#announcements",
};

const DEFAULT_BANNER = {
  title: "Platinum Jubilee Celebrations",
  cta: "Click here for more details",
  link: "#announcements",
};

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About us", items: [["Institution", "/#about"], ["Leadership", "/#leadership"], ["Governance", "/#governance"]] },
  { label: "Academics", items: [["Departments", "/departments"], ["Programmes", "/#academics"], ["Academic calendar", "/#academics"]] },
  { label: "Admissions", items: [["Undergraduate", "/#admissions"], ["Postgraduate", "/#admissions"], ["International admissions", "/#admissions"]] },
  { label: "Exams", href: "/#exams" },
  { label: "NAAC", href: "/#naac" },
  { label: "Research", items: [["Research overview", "/#research"], ["Centres & labs", "/#research"]] },
  { label: "Industry", items: [["Industry collaboration", "/#industry"], ["Placements", "/#industry"]] },
  { label: "InduTech", href: "/#indutech" },
  { label: "NIRF & ARIIA", href: "/#nirf" },
  { label: "Contact", href: "/#contact" },
];

const utilityLinks = [
  ["Campus Map", "#campus-map"],
  ["Mail", "mailto:info@psgtech.ac.in"],
  ["Students", "#students"],
  ["Parents", "#parents"],
  ["Alumni", "#alumni"],
  ["Careers", "#careers"],
  ["IIC", "#iic"],
  ["Help Desk", "#help-desk"],
];

const cx = (...classes) => classes.filter(Boolean).join(" ");

const HeaderStyles = () => (
  <style>{`
    .psg-nav-item > summary { list-style: none; }
    .psg-nav-item > summary::-webkit-details-marker { display: none; }
    .psg-nav-item > summary::marker { content: ""; }

    /* Animated dropdown panel: override the browser's abrupt show/hide
       (native details content is display:none when closed, which can't
       transition) so the panel fades and slides in instead of popping. */
    .psg-nav-item .nav-panel {
      display: block;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transform: translateY(-6px);
      pointer-events: none;
      transition: max-height .22s ease, opacity .16s ease, transform .18s ease;
    }
    .psg-nav-item[open] .nav-panel {
      max-height: 420px;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      transition: max-height .22s ease, opacity .2s ease .04s, transform .2s ease .04s;
    }

    /* Sliding gold underline under each top-level desktop link */
    .psg-nav-underline {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 3px;
      height: 2px;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform .2s ease;
    }
    .psg-nav-item:hover .psg-nav-underline,
    .psg-nav-item[open] .psg-nav-underline,
    .psg-nav-link:hover .psg-nav-underline {
      transform: scaleX(1);
    }
  `}</style>
);

/** Renders one nav entry as a plain link or a details/summary dropdown.
 *  `variant` controls desktop (centered, panel dropdown) vs mobile
 *  (stacked, inline expand) styling. */
function NavItem({ item, variant }) {
  if (!item.items) {
    return (
      <a
        href={item.href}
        className={
          variant === "desktop"
            ? "psg-nav-link relative px-3 py-2 text-[13px] font-semibold uppercase tracking-wider text-ink/75 hover:text-ink rounded-md transition-colors duration-150 whitespace-nowrap"
            : "block py-3.5 text-[15px] font-semibold uppercase tracking-[0.06em] text-ink border-b border-line transition-colors duration-150 active:text-gold"
        }
      >
        {item.label}
        {variant === "desktop" && <span className="psg-nav-underline bg-gold" />}
      </a>
    );
  }

  if (variant === "desktop") {
    return (
      <details name="psg-desktop-nav" className="psg-nav-item group relative">
        <summary className="relative flex cursor-pointer select-none items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold uppercase tracking-wider text-ink/75 transition-colors duration-150 hover:bg-cream hover:text-ink">
          {item.label}
          <svg viewBox="0 0 10 6" className="h-2 w-2 flex-none stroke-current stroke-[1.6] fill-none transition-transform duration-200 group-open:rotate-180">
            <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="psg-nav-underline bg-gold" />
        </summary>
        <div className="nav-panel absolute left-1/2 top-[calc(100%+10px)] z-20 w-56 -translate-x-1/2 rounded-lg border border-line bg-white py-2 shadow-[0_18px_40px_rgba(11,47,80,0.14)]">
          {item.items.map(([label, href]) => (
            <a key={label} href={href} className="block px-4 py-2.5 text-[12.5px] tracking-[0.02em] text-ink/75 hover:bg-cream hover:text-ink hover:pl-5 transition-all duration-150">
              {label}
            </a>
          ))}
        </div>
      </details>
    );
  }

  return (
    <details name="psg-mobile-nav" className="psg-nav-item group border-b border-line">
      <summary className="flex cursor-pointer select-none items-center justify-between py-3.5 text-[15px] font-semibold uppercase tracking-[0.06em] text-ink">
        {item.label}
        <svg viewBox="0 0 10 6" className="h-3 w-3 flex-none stroke-ink stroke-[1.6] fill-none transition-transform duration-150 group-open:rotate-180">
          <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="flex flex-col pb-3 pl-3">
        {item.items.map(([label, href]) => (
          <a key={label} href={href} className="py-2 text-[13.5px] tracking-[0.03em] text-ink/65">
            {label}
          </a>
        ))}
      </div>
    </details>
  );
}

export default function Header({ overlay = false, news, banner = DEFAULT_BANNER, staffLoginHref = "/staff-login" }) {
  const [ticker, setTicker] = useState(news || DEFAULT_NEWS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => { if (news) setTicker(news); }, [news]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (news) return undefined;
    getHomepage().then((data) => data.newsTicker && setTicker(data.newsTicker)).catch(() => {});
    return undefined;
  }, [news]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close any open desktop dropdown when clicking outside the nav, or on Escape.
  useEffect(() => {
    const closeOpenDetails = (root) => {
      root.querySelectorAll("details[open]").forEach((d) => d.removeAttribute("open"));
    };
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) closeOpenDetails(navRef.current);
    };
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) setMobileOpen(false);
      if (navRef.current) closeOpenDetails(navRef.current);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div
      className={cx(
        "font-body text-ink sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled && "shadow-[0_10px_28px_rgba(11,47,80,0.14)]"
      )}
    >
      <HeaderStyles />

      {/* Utility topbar */}
      <div className="bg-ink text-white/80">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-11 flex items-center justify-between gap-6">
          <a href={ticker.link || "#announcements"} className="flex min-w-0 items-center gap-2.5 text-[12.5px]">
            <span className="flex-none rounded border border-gold/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
              News
            </span>
            <span className="truncate font-medium text-white/90">{ticker.text}</span>
          </a>
          <nav aria-label="Utility navigation" className="hidden lg:flex flex-none items-center gap-5 text-[11px] uppercase tracking-[0.08em] text-white/60">
            {utilityLinks.map(([label, href]) => (
              <a key={label} href={href} className="hover:text-gold transition-colors duration-150 whitespace-nowrap">{label}</a>
            ))}
            <a
              href="/cms/login"
              className="ml-1 flex-none flex items-center gap-1.5 whitespace-nowrap normal-case tracking-normal text-white/80 hover:text-gold transition-colors duration-150"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 flex-none fill-none stroke-current stroke-[1.4]">
                <circle cx="8" cy="5.2" r="2.6" />
                <path d="M2.8 13.4c.8-2.6 2.9-4 5.2-4s4.4 1.4 5.2 4" strokeLinecap="round" />
              </svg>
              Staff Login
            </a>
            <a
              href={ticker.link || "#announcements"}
              className="flex-none rounded-full border border-gold/50 px-3 py-1 text-gold transition-all duration-150 normal-case tracking-normal whitespace-nowrap hover:bg-gold hover:text-ink hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(196,155,73,0.35)]"
            >
              75 Years
            </a>
          </nav>
        </div>
      </div>

      {/* Main nav row */}
      <div className="bg-paper border-b border-line">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3.5 flex items-center gap-5">
          <a href="/" aria-label="PSG College of Technology home" className="group flex flex-none items-center gap-3">
            <img src="/assets/logo1" alt="PSG College of Technology" className="h-14 w-auto flex-none transition-transform duration-200 group-hover:scale-[1.04]" />
            {/* <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-[19px] font-semibold text-ink whitespace-nowrap">PSG College of Technology</span>
              <span className="mt-1 text-[10.5px] uppercase tracking-[0.16em] text-ink/45">Peelamedu · Coimbatore</span>
            </span> */}
            <img src="/assets/75yearsLogo_PSGCollegeofTech.png" alt="75 years of PSG College of Technology" className="h-12 w-12 flex-none object-contain transition-transform duration-200 group-hover:rotate-[8deg]" />
          </a>

          <nav ref={navRef} aria-label="Primary navigation" className="hidden xl:flex flex-1 items-center justify-center gap-0.5 flex-wrap">
            {menuItems.map((item) => (
              <NavItem key={item.label} item={item} variant="desktop" />
            ))}
          </nav>

          <a
            href="/#admissions"
            className="hidden xl:inline-flex flex-none items-center rounded-full bg-gold px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-150 whitespace-nowrap hover:bg-ink hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(11,47,80,0.25)]"
          >
            Apply Now
          </a>

          <img
            src="/assets/100yearsLogo_PsgSonsCharities.png"
            alt="100 years of PSG & Sons' Charities"
            className="hidden md:block h-14 w-14 flex-none object-contain ml-auto xl:ml-0 transition-transform duration-200 hover:rotate-[-8deg] hover:scale-[1.04]"
          />

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="xl:hidden flex flex-none flex-col justify-center gap-1.5 w-9 h-9 text-ink"
          >
            <span className="h-[1.5px] bg-current" />
            <span className="h-[1.5px] bg-current" />
            <span className="h-[1.5px] bg-current w-2/3" />
          </button>
        </div>
      </div>

      {/* Jubilee banner */}
      {banner && (
        <a href={banner.link || "#"} className="block bg-cream border-b border-line">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-11 flex items-center justify-center gap-2.5 text-center">
            <strong className="text-[13.5px] font-semibold text-ink">{banner.title}</strong>
            {banner.cta && <span className="text-[12.5px] text-gold hover:underline">{banner.cta}</span>}
          </div>
        </a>
      )}

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="xl:hidden fixed inset-0 bg-paper z-50 flex flex-col text-ink"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-line flex-none">
              <div className="flex items-center gap-2">
                <img src="/assets/logo1" alt="PSG College of Technology" className="h-9 w-auto" />
                <img src="/assets/75yearsLogo_PSGCollegeofTech.png" alt="75 years" className="h-7 w-7 object-contain" />
                <img src="/assets/100yearsLogo_PsgSonsCharities.png" alt="100 years" className="h-7 w-7 object-contain" />
              </div>
              <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="w-9 h-9 relative flex-none">
                <span className="absolute inset-0 m-auto w-5 h-[1.5px] bg-ink rotate-45" />
                <span className="absolute inset-0 m-auto w-5 h-[1.5px] bg-ink -rotate-45" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Primary navigation, mobile">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                >
                  <NavItem item={item} variant="mobile" />
                </motion.div>
              ))}
            </nav>

            <div className="flex-none border-t border-line px-5 py-4 space-y-4">
              <a
                href="/#admissions"
                className="block w-full text-center rounded-full bg-gold px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-transform duration-150 active:scale-95"
              >
                Apply Now
              </a>
              <a href="/cms/login" className="flex items-center justify-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink/70">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 flex-none fill-none stroke-current stroke-[1.4]">
                  <circle cx="8" cy="5.2" r="2.6" />
                  <path d="M2.8 13.4c.8-2.6 2.9-4 5.2-4s4.4 1.4 5.2 4" strokeLinecap="round" />
                </svg>
                Staff Login
              </a>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12.5px] uppercase tracking-wider text-ink/55">
                {utilityLinks.map(([label, href]) => (
                  <a key={label} href={href} className="hover:text-gold transition-colors duration-150">{label}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}