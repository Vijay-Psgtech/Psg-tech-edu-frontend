import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";

/**
 * ProfessorOfPractice.jsx — reached from the About us dropdown.
 * Same split-hero portrait treatment as Principal.jsx (the
 * hero-image-frame / hero-image-note idiom the homepage hero also
 * uses), followed by a single Profile section. Simpler than
 * Principal.jsx since there's one person and no timeline.
 *
 * Content transcribed from the college's existing page. The third
 * profile paragraph was cut off in the source screenshot after
 * "...the Financial" — replace PROFILE[2] with the rest of that
 * paragraph once you have it.
 *
 * Swap `/assets/professor-of-practice.jpg` for the real photograph.
 */

const PROFESSOR = {
  name: "Shri. K.M. Chandrasekhar",
  title: "Professor of Practice",
  photo: "/assets/professor_practice.png",
};

const PROFILE = [
  `Shri. K.M. Chandrasekhar, Professor of Practice at PSG College of Technology, mentors students on transformational leadership with his vast and rich experience. He worked in the Indian Administrative Service from 1970 to 2011. During the last four years of his career, he held the apex position of Union Cabinet Secretary, reporting directly to Prime Minister, Dr. Manmohan Singh. After his retirement in 2011, he was the Vice Chairman of the State Planning Board with the rank of State Cabinet Minister, a position he held for the next five years, until 2016. He has varied experience, particularly in public finance, industry, agriculture, fisheries, international trade, and diplomacy, and has been Revenue Secretary in the Ministry of Finance, Government of India, and Finance Secretary in his State Government. He has diplomatic and negotiating experience as Indian Ambassador to the World Trade Organisation, Geneva, and as Deputy Chief of Mission, Embassy of India, Brussels, dealing with the European Union, Belgium, and Luxembourg.`,
  `He has been, at various times, Chairman, Managing Director, or Director of about 50 companies in the public, private, joint, and cooperative sectors. He was on the Boards of ten large private companies. He has been Chairman of the Federal Bank, President of the Sri Chithra Institute of Medical Sciences and Technology, Trivandrum, and has chaired, in an elected capacity, the Centre for Development Studies, Trivandrum, affiliated to Jawaharlal Nehru University, New Delhi. He is presently a Distinguished Fellow of the Gulati Institute of Finance and Taxation, a Member of the Council of Management of the National Institute of Advanced Studies, Bengaluru, and Honorary Adviser to the Arya Vaidya Sala, Kottakkal. He has spoken at several institutions, including IIT Hyderabad, Christ University Bangalore, NALSAR University of Law Hyderabad, and IIT Bombay.`,
  `He has written and published extensively in various newspapers and magazines, including the Times of India, Indian Express, the Hindustan Times, the Economic Times, and the Financial…`,
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function ProfessorOfPractice() {
  return (
    <div className="font-body text-ink bg-paper min-h-screen">
      <Header />

      {/* Split hero */}
      <section className="relative bg-ink overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-90 w-90 rounded-full"
          style={{ border: "1px solid rgba(101,177,229,0.25)" }}
        />
        <div className="relative z-10 max-w-310 mx-auto px-4 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[12px] uppercase tracking-widest text-white/55 mb-3">
              <a href="/" className="hover:text-gold-bright transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href="/about" className="hover:text-gold-bright transition-colors">About</a>
              <span className="mx-2">/</span>
              <span className="text-white/85">Professor of Practice</span>
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright">
              <i className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(101,177,229,0.18)]" />
              PSG College of Technology
            </span>
            <h1 className="mt-4 font-display text-[38px] sm:text-[52px] font-semibold text-white leading-[1.02] tracking-tight">
              Professor of Practice
            </h1>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-white/70">
              Mentoring students in transformational leadership, drawn from a
              career at the apex of India&rsquo;s public service and diplomacy.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-bright">Professor of Practice</span>
              <span className="h-px w-10 bg-white/25" />
            </div>
            <p className="mt-2 font-display text-[22px] font-semibold text-white">{PROFESSOR.name}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="home-hero-visual relative w-full max-w-75 mx-auto lg:mx-0 lg:justify-self-end"
          >
            <div className="hero-image-frame">
              <img src={PROFESSOR.photo} alt={PROFESSOR.name} />
            </div>
            <div className="hero-image-note">
              <strong>{PROFESSOR.name}</strong>
              <span>{PROFESSOR.title}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile */}
      <section className="bg-white">
        <div className="max-w-250 mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <motion.div {...reveal}>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">Profile</span>
            <h2 className="mt-3 font-display text-[26px] sm:text-[28px] font-semibold text-ink leading-tight">
              A career in public service and diplomacy
            </h2>
          </motion.div>

          <motion.div {...reveal} className="mt-8 max-w-[72ch] space-y-5">
            {PROFILE.map((para, i) => (
              <p key={i} className="text-[15.5px] leading-[1.85] text-ink/75">
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}