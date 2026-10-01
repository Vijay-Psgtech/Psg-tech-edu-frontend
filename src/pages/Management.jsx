import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";

/**
 * Management.jsx — "The Management" page, reached from the About us
 * dropdown. Transcribed from the college's existing Management /
 * Managing Trustee page: a portrait + caption, followed by the
 * Managing Trustee's message and signature/contact block.
 *
 * Styled to match About.jsx: same compact hero treatment, Fraunces
 * display type, gold accents, and one restrained scroll-reveal per
 * section rather than per-paragraph effects. Swap
 * `/assets/managing-trustee.jpg` for the real portrait.
 */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const MESSAGE_PARAGRAPHS = [
  `Ever since the wheel was invented, man has undergone phenomenal changes. His mobility has been vibrant. Along the path, his constant urge for making himself comfortable was realized with every new invention. It has now reached a stage where he could become a misfit without technology. Falling a prey to technology is not contended as long as it is used for the betterment of the society.`,
  `Being bestowed with the monumental responsibility of leading the rich heritage of the PSG & Sons' Charities Trust is a challenge by itself. I am proud that the rise to fame engendered not from its high rise concrete structures or from its technological knowhow, but from its intricately intertwined human resource, which has been through the thick and thin of its years of existence.`,
  `PSG College of Technology has made deep forays into the advancing world. It has helped to successfully shape the minds of our future people with elan. Similarly, it is noteworthy that every institution sheltered under the PSG & Sons' Charities umbrella has become one with the world community for the human values it inculcates in its people.`,
];

const CONTACT = [
  {
    label: "Address",
    value:
      "Post Box No. 1609, Avinashi Road, Coimbatore 641004, Tamil Nadu, India",
  },
  { label: "Phone", value: "+91 422 2572265" },
  { label: "Fax", value: "+91 422 2573833" },
  {
    label: "Email",
    value: "charity@psgtech.edu",
    href: "mailto:charity@psgtech.edu",
  },
];

export default function Management() {
  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Compact hero */}
      <section className="relative bg-ink overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -bottom-24 h-70 w-70 rounded-full"
          style={{ border: "1px solid rgba(101,177,229,0.25)" }}
        />
        <div className="relative z-10 max-w-310 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <a
                href="/about"
                className="hover:text-gold-bright transition-colors"
              >
                About
              </a>
              <span className="mx-2">/</span>
              <span className="text-white/85">Management</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              PSG &amp; Sons&rsquo; Charities Trust
            </span>
            <h1 className="mt-4 font-display text-[34px] sm:text-[46px] font-semibold text-white leading-[1.05]">
              The Management
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Portrait + quick facts */}
      <section className="max-w-310 mx-auto px-4 lg:px-8 py-16 sm:py-20">
        <motion.div
          {...reveal}
          className="grid sm:grid-cols-[260px_1fr] gap-10 sm:gap-16 items-start"
        >
          <div className="relative mx-auto sm:mx-0 w-full max-w-65">
            <div
              aria-hidden
              className="absolute -inset-3 border border-gold pointer-events-none"
              style={{ zIndex: -1 }}
            />
            <img
              src="/assets/patron1.jpg"
              alt="Shri L. Gopalakrishnan, Managing Trustee"
              className="w-full aspect-4/5 object-cover"
            />
            <div className="mt-4 text-center sm:text-left">
              <p className="font-display text-[18px] font-semibold text-ink">
                Shri. L. Gopalakrishnan
              </p>
              <p className="mt-0.5 text-[13px] uppercase tracking-[0.06em] text-ink/55">
                Managing Trustee
              </p>
            </div>
          </div>

          <div className="pt-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
              At the helm
            </span>
            <h2 className="mt-3 font-display text-[26px] font-semibold text-ink leading-tight">
              Leading a heritage built on people, not just buildings
            </h2>
            <p className="mt-5 max-w-[56ch] text-[15.5px] leading-[1.85] text-ink/75">
              Shri L. Gopalakrishnan leads the PSG &amp; Sons&rsquo; Charities
              Trust — the body that founded PSG College of Technology and the
              wider group of institutions under its umbrella. His message below
              reflects on that responsibility and the human values the Trust has
              carried through its history.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Message from the Managing Trustee */}
      <section className="border-t border-line bg-cream">
        <div className="max-w-310 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div {...reveal}>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
              Message
            </span>
            <h2 className="mt-3 font-display text-[28px] sm:text-[32px] font-semibold text-ink leading-tight">
              From the Managing Trustee
            </h2>
          </motion.div>

          <motion.div
            {...reveal}
            className="mt-10 grid lg:grid-cols-[3px_1fr] gap-6 sm:gap-10"
          >
            <div aria-hidden className="hidden lg:block bg-gold rounded-full" />
            <div className="max-w-[68ch] space-y-5 border-l-[3px] border-gold pl-6 lg:border-l-0 lg:pl-0">
              {MESSAGE_PARAGRAPHS.map((para, i) => (
                <p key={i} className="text-[15.5px] leading-[1.85] text-ink/80">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Signature + contact */}
          <motion.div {...reveal} className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-line">
              <p className="font-display text-[17px] font-semibold text-ink">
                L. Gopalakrishnan
              </p>
              <p className="mt-1 text-[13.5px] text-ink/60">Managing Trustee</p>
              <p className="mt-1 text-[13.5px] text-ink/60">
                PSG &amp; Sons&rsquo; Charities Trust
              </p>
            </div>
            <div className="p-6 bg-white border border-line">
              <ul className="space-y-3">
                {CONTACT.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 text-[13.5px]"
                  >
                    <span className="flex-none w-16 uppercase tracking-[0.04em] text-[11px] font-semibold text-ink/45 pt-0.5">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-gold hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-ink/75">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
