import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import TowerIllustration from "../components/TowerIllustration.jsx";
import { getHomepage } from "../api/client.js";

const HIGHLIGHT_ICONS = [
  // Library
  <path d="M4 21V7l8-4 8 4v14M4 21h16M4 21v-3M20 21v-3M9 21V11h6v10" />,
  // Hostel
  <path d="M5 21V9l7-6 7 6v12M9 21v-6h6v6M5 21h14" />,
  // Placement
  <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5L12 2z" />,
];

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHomepage()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 bg-paper text-slate-500">
        <p>Couldn't load homepage content.</p>
        <span className="text-sm text-rose-700">{error}</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 bg-paper text-slate-500">
        <div className="w-8 h-8 rounded-full border-[2.5px] border-[#e2dccb] border-t-gold animate-spin" />
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="bg-paper text-[#21283a] font-body overflow-x-hidden">
      <Header />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-ink bg-[radial-gradient(ellipse_at_15%_0%,#16305a_0%,#0c1a33_55%,#081328_100%)] text-white px-5 sm:px-8 lg:px-16 py-14 sm:py-20 lg:py-28">
        {/* grain + glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-1/5 right-[-8%] w-[46%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(230,181,61,0.16), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-310 mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          <div className="animate-home-rise">
            <div className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-gold-bright border border-gold-bright/40 rounded-full py-1.75 pl-3 pr-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-bright shadow-[0_0_0_3px_rgba(230,181,61,0.2)]" />
              {data.badgeText}
            </div>

            <div className="w-13 h-0.75 bg-gold-bright my-5" />

            <h1 className="font-display text-white font-semibold tracking-tight text-[2.2rem] sm:text-5xl lg:text-6xl leading-[1.08] max-w-[14ch]">
              {data.heading}
            </h1>

            <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-white/70">
              {data.subheading}
            </p>

            <div className="flex flex-wrap gap-3.5 mt-9">
              <a
                href={data.ctaPrimaryLink}
                className="inline-flex items-center gap-2 rounded font-semibold text-[0.92rem] px-6 py-3.5 bg-gold-bright text-[#241804] shadow-[0_14px_30px_-14px_rgba(230,181,61,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(230,181,61,0.75)]"
              >
                {data.ctaPrimaryText}
              </a>
              <a
                href={data.ctaSecondaryLink}
                className="inline-flex items-center gap-2 rounded font-semibold text-[0.92rem] px-6 py-3.5 border border-white/30 text-white transition hover:border-white/65 hover:-translate-y-0.5"
              >
                {data.ctaSecondaryText}
              </a>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-10 mt-12 pt-7 border-t border-white/[0.14]">
              {data.stats.map((s, i) => (
                <div className="flex flex-col gap-1" key={i}>
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-gold-bright">
                    {s.value}
                  </span>
                  <span className="text-[0.78rem] tracking-wide text-white/60">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center order-first lg:order-0 max-w-xs mx-auto lg:max-w-none animate-[home-rise_0.8s_0.1s_cubic-bezier(0.16,1,0.3,1)_both]">
            <div
              className="absolute inset-[6%] rounded-full border border-dashed border-gold-bright/35"
              aria-hidden="true"
            />
            <TowerIllustration />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Welcome + sidebar                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="academics"
        className="max-w-310 mx-auto px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-7 lg:gap-12 items-start"
      >
        <div className="bg-white border border-line border-l-[3px] border-l-gold rounded shadow-[0_18px_40px_-22px_rgba(12,26,51,0.35)] p-7 sm:p-9 lg:p-11">
          <span className="block text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-3.5">
            About the institution
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4">
            {data.welcomeTitle}
          </h2>      
          <p className="text-slate-500 leading-[1.75] text-[1.01rem]">
            {data.welcomeBody}
          </p>
        </div>

        <aside className="flex flex-col gap-5">
          <div
            id="announcements"
            className="bg-white border border-line rounded px-6 py-6"
          >
            <h3 className="font-display text-[1.02rem] font-semibold text-ink inline-block pb-3 mb-3.5 border-b-2 border-ink">
              Announcements
            </h3>
            <div className="flex flex-col">
              {data.announcements.map((a, i) => (
                <a
                  href={a.link}
                  key={i}
                  className="group flex gap-3.5 py-3 border-b border-line last:border-b-0 last:pb-0 first:pt-0 transition-transform hover:translate-x-1"
                >
                  <span className="shrink-0 w-11 text-center font-display font-semibold text-[0.78rem] leading-tight bg-ink text-gold-bright rounded-[3px] py-1 whitespace-pre-line">
                    {a.date}
                  </span>
                  <span className="text-[0.92rem] leading-snug text-[#21283a] group-hover:text-gold">
                    {a.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div
            id="downloads"
            className="bg-white border border-line rounded px-6 py-6"
          >
            <h3 className="font-display text-[1.02rem] font-semibold text-ink inline-block pb-3 mb-3.5 border-b-2 border-ink">
              Downloads
            </h3>
            <div className="flex flex-col">
              {data.downloads.map((d, i) => (
                <a
                  href={d.link}
                  key={i}
                  className="group flex items-center justify-between py-3 px-1 text-[0.9rem] font-semibold text-ink border-b border-line last:border-b-0 transition-colors hover:text-gold"
                >
                  {d.label}
                  <span className="text-gold transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Campus highlights                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="campus"
        className="bg-cream px-5 sm:px-8 lg:px-16 py-14 sm:py-20 lg:py-24"
      >
        <div className="max-w-310 mx-auto mb-10">
          <span className="block text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            On campus
          </span>
          <h2 className="font-display text-[1.6rem] sm:text-3xl lg:text-4xl font-semibold text-ink">
            Campus highlights
          </h2>
        </div>

        <div className="max-w-310 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.highlights.map((h, i) => (
            <div
              key={i}
              className="relative bg-white border border-line rounded p-8 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_40px_-22px_rgba(12,26,51,0.35)]"
            >
              <span className="absolute top-5 right-6 font-display text-sm font-semibold text-line">
                {String(i + 1).padStart(2, "0")}
              </span>
              <svg
                className="w-7.5 h-7.5 text-gold mb-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
              </svg>
              <h3 className="text-[1.08rem] font-semibold tracking-wide uppercase text-ink mb-2.5">
                {h.title}
              </h3>
              <p className="text-slate-500 text-[0.94rem] leading-relaxed">
                {h.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
