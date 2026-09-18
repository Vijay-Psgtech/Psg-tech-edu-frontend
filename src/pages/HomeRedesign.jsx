import React, { useEffect, useState } from "react";
import Header from "./../components/Header.jsx";
import Footer from "./../components/Footer.jsx";
import { getHomepage } from "../api/client.js";

const HIGHLIGHT_ICONS = [
  <path d="M4 21V7l8-4 8 4v14M4 21h16M9 21V11h6v10" />,
  <path d="M5 21V9l7-6 7 6v12M9 21v-6h6v6M5 21h14" />,
  <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5L12 2z" />,
];

const IMAGES = {
  campus: "/assets/About3.jpg",
  research: "/assets/bridge.jpg",
  students: "/assets/About3.jpg",
};

// Dynamic gallery source: add/remove/reorder photos here and every
// gallery instance on the page picks it up automatically.
const GALLERY_IMAGES = [
  {
    src: "/assets/AwardCeremony_2026_ElectricalAlliedEngineering.jpg",
    alt: "Award Ceremony 2026 - Electrical and Allied Engineering",
  },
  {
    src: "/assets/AwardCeremony2026-AUT_Mech_MTL_PRO.jpg",
    alt: "Award Ceremony 2026 - Automobile, Mechanical, Metallurgy & Production",
  },
  {
    src: "/assets/AwardCeremony2026-BME-BioTech-CSEIT.jpg",
    alt: "Award Ceremony 2026 - BME, BioTech, CSE & IT",
  },
  {
    src: "/assets/AwardCeremony2026-ScienceStream.jpg",
    alt: "Award Ceremony 2026 - Science Stream",
  },
  {
    src: "/assets/faculty_interaction_section.jpg",
    alt: "Faculty interaction session",
  },
  {
    src: "/assets/Facultyinteraction_1.jpg",
    alt: "Faculty interaction",
  },
  {
    src: "/assets/foundationday_2026.jpg",
    alt: "Foundation Day 2026 celebrations",
  },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

/** Force a set of CSS properties onto a DOM node with !important priority.
 * This is the only thing guaranteed to beat this project's own CSS rules —
 * specifically `.home-photo img { width:100%; aspect-ratio:0.9; ... }` and
 * the `1080px` cap + grid split on `.home-intro` — regardless of Vite's
 * dev-time stylesheet re-injection order or selector specificity.
 * NOT a hook: safe to call from anywhere in render, including JSX that
 * only mounts after this page's data has loaded.
 */
function forceStyles(el, props) {
  if (!el) return;
  Object.entries(props).forEach(([prop, value]) => {
    el.style.setProperty(prop, value, "important");
  });
}

/** Plain (non-hook) ref-callback factory: makes a wrapper give up any capped width. */
function wideWrapperRef(extra = {}) {
  return (el) => {
    if (!el) return;
    forceStyles(el, {
      width: "100%",
      "max-width": "none",
      "flex-basis": "auto",
      height: "auto",
      "min-height": "0",
      ...extra,
    });
  };
}

let galleryKeyframesInjected = false;

/** Injects only the @keyframes rule once (keyframes can't be set inline). */
function useGalleryKeyframes() {
  useEffect(() => {
    if (galleryKeyframesInjected) return;
    galleryKeyframesInjected = true;
    const style = document.createElement("style");
    style.setAttribute("data-home-gallery-keyframes", "true");
    style.textContent = `
      @keyframes homeGalleryKenBurns {
        0%   { transform: scale(1) translate3d(0, 0, 0); }
        100% { transform: scale(1.14) translate3d(-1.5%, -1.5%, 0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .home-gallery-slide { animation: none !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);
}

/**
 * Self-contained, auto-rotating image gallery.
 * - Cycles through `images` one at a time on a timer.
 * - Each active photo slowly zooms/drifts (Ken Burns) for the duration it's shown.
 * - Pauses on hover so people can look at a photo they care about.
 * - Respects prefers-reduced-motion (no auto-advance or zoom, just shows slide 0).
 * - Dots let people jump to a specific photo manually.
 * - Every layout-critical property (position, size, opacity, stacking,
 *   animation) is forced directly on the DOM nodes via refs, so this
 *   project's own `.home-photo img` / `.home-programme-card-image img`
 *   rules can never collapse it into a stacked tile again.
 */
function ImageGallery({ images, interval = 5000, minHeight = 460, aspect = "16 / 10", className = "" }) {
  useGalleryKeyframes();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = React.useRef(null);
  const slideRefs = React.useRef([]);

  // Force the outer frame: full width, relatively positioned, our own shape.
  useEffect(() => {
    forceStyles(rootRef.current, {
      position: "relative",
      display: "block",
      width: "100%",
      "max-width": "none",
      height: "auto",
      "aspect-ratio": aspect,
      "min-height": `${minHeight}px`,
      "border-radius": "14px",
      overflow: "hidden",
      background: "#0f0f0f",
      filter: "none",
      transform: "none",
    });
  }, [aspect, minHeight]);

  // Force every slide's box + stacking on every index change.
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = i === index;
      forceStyles(el, {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "block",
        width: "100%",
        height: "100%",
        "max-width": "none",
        "max-height": "none",
        margin: "0",
        "aspect-ratio": "auto",
        "object-fit": "cover",
        "border-radius": "inherit",
        filter: "none",
        opacity: isActive ? "1" : "0",
        "z-index": isActive ? "2" : "1",
        "pointer-events": isActive ? "auto" : "none",
        transition: "opacity 1.2s ease",
        animation: isActive
          ? `homeGalleryKenBurns ${interval + 400}ms ease-in-out forwards`
          : "none",
      });
    });
  }, [index, images, interval]);

  useEffect(() => {
    if (!images || images.length <= 1 || paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [images, interval, paused]);

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className={`home-gallery-root ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((image, i) => (
        <img
          key={image.src}
          ref={(el) => { slideRefs.current[i] = el; }}
          src={image.src}
          alt={image.alt}
          className="home-gallery-slide"
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Gallery navigation"
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 4,
          }}
        >
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              onClick={() => setIndex(i)}
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === index ? "#ffffff" : "rgba(255,255,255,0.45)",
                transform: i === index ? "scale(1.25)" : "scale(1)",
                transition: "background 0.25s ease, transform 0.25s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomeRedesign() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [typedHeading, setTypedHeading] = useState("");

  useEffect(() => {
    getHomepage().then(setData).catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!data?.heading) return undefined;
    let character = 0;
    setTypedHeading("");
    const timer = window.setInterval(() => {
      character += 1;
      setTypedHeading(data.heading.slice(0, character));
      if (character >= data.heading.length) window.clearInterval(timer);
    }, 34);
    return () => window.clearInterval(timer);
  }, [data?.heading]);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.14 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const updateParallax = () => document.documentElement.style.setProperty("--home-parallax", `${Math.min(window.scrollY, 900) * 0.13}px`);
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => window.removeEventListener("scroll", updateParallax);
  }, []);

  if (error) return <div className="page-state error">Couldn't load homepage content: {error}</div>;
  if (!data) return <div className="page-state loading">Loading PSG Tech...</div>;

  return (
    <div className="home-redesign">
      <Header news={data.newsTicker} />

      <main>
        <section className="home-hero" id="admissions">
          <video className="home-hero-video" autoPlay muted loop playsInline poster={IMAGES.campus} aria-hidden="true">
            <source src="/assets/background.mp4" type="video/mp4" />
          </video>
          <div className="home-hero-shade" aria-hidden="true" />
          <div className="home-hero-content">
            <div className="home-hero-copy">
              <span className="home-kicker"><i /> {data.badgeText}</span>
              <h1 aria-label={data.heading}><span className="typewriter-text">{typedHeading}</span></h1>
              <p>{data.subheading}</p>
              <div className="home-actions">
                <a className="home-button home-button-gold" href={data.ctaPrimaryLink}>{data.ctaPrimaryText}<ArrowIcon /></a>
                <a className="home-button home-button-ghost" href={data.ctaSecondaryLink}>{data.ctaSecondaryText}<ArrowIcon /></a>
              </div>
            </div>
          </div>
          <div className="home-scroll-note"><span>Scroll to explore</span><i /></div>
        </section>

        <section className="home-stats" aria-label="PSG Tech milestones" data-reveal>
          {(data.stats || []).map((stat, index) => <div className="home-stat" key={index}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </section>

        {/*
          The project's own CSS caps `.home-intro` at width: min(1080px, ...)
          and splits it 0.85fr/1fr via CSS Grid. We widen the whole section
          and turn it into a flex row so the photo column can take a bigger,
          explicit share instead of being squeezed by that grid track.
        */}
        <section
          ref={(el) => forceStyles(el, {
            display: "flex",
            "flex-wrap": "wrap",
            "align-items": "center",
            gap: "48px",
            width: "min(1500px, calc(100% - 40px))",
            "max-width": "calc(100% - 40px)",
          })}
          className="home-intro"
          id="academics"
          data-reveal
        >
          <div
            ref={wideWrapperRef({ "flex-grow": "1.6", "flex-basis": "0%" })}
            className="home-photo home-photo-left"
            style={{ flex: "1.6 1 0%" }}
          >
            <ImageGallery images={GALLERY_IMAGES} interval={4500} minHeight={480} aspect="16 / 10" />
            <span>Peelamedu · Coimbatore</span>
          </div>
          <div className="home-intro-copy" style={{ flex: "1 1 380px", minWidth: "320px" }}><span className="home-section-label">An institution with purpose</span><h2>{data.welcomeTitle}</h2><p>{data.welcomeBody}</p><a className="home-text-link" href="/#campus">Discover the campus <ArrowIcon /></a></div>
        </section>

        <section className="home-programmes" id="research" data-reveal>
          <div className="home-section-heading"><div><span className="home-section-label">Inside PSG Tech</span><h2>Where ideas become useful.</h2></div><p>From foundational learning to ambitious research, every pathway is designed to create work that matters.</p></div>
          <div className="home-programme-grid">
            <article
              ref={wideWrapperRef()}
              className="home-programme-card home-programme-card-image"
            >
              <ImageGallery images={GALLERY_IMAGES} interval={5200} minHeight={420} aspect="4 / 3" />
              <div><span>01 · Research</span><h3>Question deeply.<br />Build boldly.</h3></div>
            </article>
            <article className="home-programme-card home-programme-card-text"><span className="home-card-number">02</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 21V7l8-4 8 4v14M4 21h16M9 21V11h6v10" /></svg><h3>Learning that travels beyond the classroom.</h3><p>Industry-ready programmes, active labs, and a community that keeps moving forward.</p><a className="home-text-link" href="/departments/cse">Explore departments <ArrowIcon /></a></article>
            <article className="home-programme-card home-programme-card-maroon"><span className="home-card-number">03</span><span className="home-section-label">Campus life</span><h3>A place to find your people.</h3><p>Clubs, hostels, libraries, and shared spaces turn a college into a lasting community.</p><a className="home-light-link" href="/#campus">See campus life <ArrowIcon /></a></article>
          </div>
        </section>

        <section className="home-latest" id="campus" data-reveal>
          <div className="home-latest-header"><div><span className="home-section-label">Stay in the know</span><h2>Latest from campus</h2></div><a className="home-text-link" href="#announcements">All announcements <ArrowIcon /></a></div>
          <div className="home-latest-grid"><div className="home-announcements" id="announcements">{(data.announcements || []).map((item, index) => <a className="home-announcement" href={item.link || "#announcements"} key={index}><span>{item.date}</span><strong>{item.title}</strong><ArrowIcon /></a>)}</div><div className="home-latest-image"><img src={IMAGES.students} alt="PSG Tech students on campus" /><div><span>One campus.</span><strong>Many beginnings.</strong></div></div></div>
        </section>

        <section className="home-downloads" id="downloads" data-reveal>
          <div className="home-section-heading"><div><span className="home-section-label">Resources</span><h2>Downloads</h2></div></div>
          <div className="home-download-list">
            {(data.downloads || []).map((item, index) => <a href={item.link || "#downloads"} key={index}>{item.label}<ArrowIcon /></a>)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}