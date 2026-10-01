/**
 * programmesData.js — shared source of truth for the Programmes index
 * (Programmes.jsx) and the Programme detail page (ProgrammeDetail.jsx).
 *
 * Transcribed from the college's existing Programmes page. Two notes
 * on completeness:
 *
 * 1. In the source screenshot, the postgraduate list was partly
 *    covered by an open "Academics" dropdown panel, so several
 *    entries were only visible as fragments (e.g. "…ngineering",
 *    "…Cybersecurity", "…ance and Engineering", "…eal-Time Systems",
 *    "…ngineering Design") — those aren't guessable, so they're left
 *    out here rather than invented. Add them to PROGRAMMES below once
 *    you have the full names.
 * 2. The "Postgraduate Programmes in Science" section was cut off
 *    after its first entry (Applied Mathematics) in the screenshot —
 *    same situation, add the rest when you have them.
 *
 * Only Automobile Engineering has real detail copy (coordinator,
 * accreditation, description) — that's the one page the source
 * screenshots actually showed in detail. Every other entry uses the
 * same template with those fields left out, so the detail page still
 * renders cleanly; fill them in as real content becomes available.
 *
 * IMAGES
 * `img(slug)` is only a *default-path generator* — it builds
 * `/assets/programmes/<slug>/young-handsome-business-man-car-showrrom.jpg`
 * (banner) and `/assets/programmes/<slug>/worker-fixes-damaged-car-motor-using-vr.jpg`
 * (detail) from a slug, for programmes that don't have a real photo yet.
 *
 * IMPORTANT: the argument to `img()` must always be the programme's
 * SLUG, never a filename. Passing a filename in its place produces a
 * broken, doubly-nested path, e.g. calling `img("worker-fixes-damaged-
 * car-motor-using-vr")` builds
 * `/assets/programmes/worker-fixes-damaged-car-motor-using-vr/worker-fixes-damaged-car-motor-using-vr.jpg`
 * — a folder that doesn't exist. This is exactly what broke the
 * Automobile Engineering detail image: `banner` was overridden right
 * after the `img(...)` call (masking the bug there), but `detail` was
 * left pointing at that broken nested path, which is why the detail
 * page's image was rendering broken with the fallback alt text.
 *
 * Once you have a real photo for a programme, override `banner`
 * and/or `detail` directly on that entry, after the `...img(slug)`
 * spread so it takes precedence — see automobile-engineering below,
 * which now points its banner at the real uploaded photo while its
 * detail image falls back to the correctly-generated default
 * placeholder path (using the real slug, not a filename).
 *
 * NOTE ON CASING: the real uploaded assets live under
 * `/assets/Programmes/` (capital P, flat — no per-slug subfolder),
 * while every generated default path uses `/assets/programmes/`
 * (lowercase, nested by slug). This works fine on case-insensitive
 * filesystems (e.g. local Windows dev), but will 404 on a
 * case-sensitive production host (Linux/Vercel/Netlify/etc). If
 * images still don't load after deploying, check that the real
 * `/assets/Programmes/` folder's casing matches exactly what's
 * referenced here, or better, rename it to lowercase `programmes` to
 * match the rest of the codebase's convention.
 */

const img = (slug) => ({
  banner: `/assets/programmes/${slug}/young-handsome-business-man-car-showrrom.jpg`,
  detail: `/assets/programmes/${slug}/worker-fixes-damaged-car-motor-using-vr.jpg`,
});

export const LEVELS = {
  ug: { label: "Undergraduate Programmes", degree: "B.E. / B.Tech" },
  pg: { label: "Postgraduate Programmes", degree: "M.E. / M.Tech" },
  pgscience: { label: "Postgraduate Programmes in Science", degree: "M.Sc." },
};

export const PROGRAMMES = [
  // ---- Undergraduate ----
  {
    slug: "automobile-engineering",
    name: "Automobile Engineering",
    level: "ug",
    since: "1999",
    coordinator: "Dr. Karthikeyan P",
    accreditation: "Accredited up to 30/06/2028",
    description:
      "BE Automobile Engineering is a 4-year programme that provides the fundamentals of automobile engineering covering all aspects of design, manufacturing, tooling, electronics, electrical, testing, and service. The curriculum has been designed in consultation with industry experts and largely focuses on the application of theoretical knowledge gained in the classroom through skill-based training in industry-focused laboratories. Students are exposed to the latest industry practices through hands-on learning in laboratories, participation in racing competitions, and industrial visits. They are prepared for a professional career with a broad knowledge of automotive engineering adapted to new trends — hybrid propulsion, electrical vehicles, battery management, fleet management, and emissions — while offering specialisations central to the industry and research needed to meet these requirements.",
    regulationsHref:
      "/assets/programmes/automobile-engineering/regulations.pdf",
    materialsHref:
      "/assets/programmes/automobile-engineering/course-materials.pdf",
    // Real photo for the banner; detail image still falls back to the
    // default placeholder path (correctly generated using the real
    // slug, "automobile-engineering" — not a filename) until a second
    // real photo is uploaded for the detail view.
    ...img("automobile-engineering"),
    banner: "/assets/Programmes/christian-buehner-Fd6osyVbtG4-unsplash.jpg",
    detail: "/assets/Programmes/worker-fixes-damaged-car-motor-using-vr.jpg",
  },
  {
    slug: "biomedical-engineering",
    name: "Biomedical Engineering",
    level: "ug",
     description:
      "Bio Medical Engineering is a 4-year programme that provides the fundamentals of automobile engineering covering all aspects of design, manufacturing, tooling, electronics, electrical, testing, and service. The curriculum has been designed in consultation with industry experts and largely focuses on the application of theoretical knowledge gained in the classroom through skill-based training in industry-focused laboratories. Students are exposed to the latest industry practices through hands-on learning in laboratories, participation in racing competitions, and industrial visits. They are prepared for a professional career with a broad knowledge of automotive engineering adapted to new trends — hybrid propulsion, electrical vehicles, battery management, fleet management, and emissions — while offering specialisations central to the industry and research needed to meet these requirements.",
    regulationsHref:
      "/assets/programmes/automobile-engineering/regulations.pdf",
    ...img("biomedical-engineering"),
    banner: "/assets/Programmes/national-cancer-institute-GcrSgHDrniY-unsplash.jpg",
    detail: "/assets/Programmes/national-cancer-institute-GcrSgHDrniY-unsplash.jpg",
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    level: "ug",
    ...img("civil-engineering"),
     
    description:
      "civil Engineering is a 4-year programme that provides the fundamentals of automobile engineering covering all aspects of design, manufacturing, tooling, electronics, electrical, testing, and service. The curriculum has been designed in consultation with industry experts and largely focuses on the application of theoretical knowledge gained in the classroom through skill-based training in industry-focused laboratories. Students are exposed to the latest industry practices through hands-on learning in laboratories, participation in racing competitions, and industrial visits. They are prepared for a professional career with a broad knowledge of automotive engineering adapted to new trends — hybrid propulsion, electrical vehicles, battery management, fleet management, and emissions — while offering specialisations central to the industry and research needed to meet these requirements.",
    regulationsHref:
      "/assets/programmes/automobile-engineering/regulations.pdf",
    ...img("biomedical-engineering"),
    banner: "/assets/Programmes/ben-allan-BIeC4YK2MTA-unsplash.jpg",
    detail: "/assets/Programmes/raymond-yeung-hbe2OSnR4vU-unsplash.jpg",
  },
  {
    slug: "computer-science-and-engineering",
    name: "Computer Science and Engineering",
    level: "ug",
    ...img("computer-science-and-engineering"),
     description:
      "civil Engineering is a 4-year programme that provides the fundamentals of automobile engineering covering all aspects of design, manufacturing, tooling, electronics, electrical, testing, and service. The curriculum has been designed in consultation with industry experts and largely focuses on the application of theoretical knowledge gained in the classroom through skill-based training in industry-focused laboratories. Students are exposed to the latest industry practices through hands-on learning in laboratories, participation in racing competitions, and industrial visits. They are prepared for a professional career with a broad knowledge of automotive engineering adapted to new trends — hybrid propulsion, electrical vehicles, battery management, fleet management, and emissions — while offering specialisations central to the industry and research needed to meet these requirements.",
    regulationsHref:
      "/assets/programmes/automobile-engineering/regulations.pdf",
    ...img("biomedical-engineering"),
    banner: "/assets/Programmes/cs1.jpg",
    detail: "/assets/Programmes/cs2.jpg",
  },
  {
    slug: "computer-science-and-engineering-ai-ml",
    name: "Computer Science and Engineering (AI and ML)",
    level: "ug",
    ...img("computer-science-and-engineering-ai-ml"),
    description:
      "ai-ml Engineering is a 4-year programme that provides the fundamentals of computerscience engineering covering all aspects of design, manufacturing, tooling, electronics, electrical, testing, and service. The curriculum has been designed in consultation with industry experts and largely focuses on the application of theoretical knowledge gained in the classroom through skill-based training in industry-focused laboratories. Students are exposed to the latest industry practices through hands-on learning in laboratories, participation in racing competitions, and industrial visits. They are prepared for a professional career with a broad knowledge of automotive engineering adapted to new trends — hybrid propulsion, electrical vehicles, battery management, fleet management, and emissions — while offering specialisations central to the industry and research needed to meet these requirements.",
    regulationsHref:
      "/assets/programmes/automobile-engineering/regulations.pdf",
    ...img("biomedical-engineering"),
    banner: "/assets/Programmes/ai1.jpg",
    detail: "/assets/Programmes/ai2.jpg",
  },
  {
    slug: "electrical-and-electronics-engineering",
    name: "Electrical and Electronics Engineering",
    level: "ug",
    ...img("electrical-and-electronics-engineering"),
  },
  {
    slug: "electronics-and-communication-engineering",
    name: "Electronics and Communication Engineering",
    level: "ug",
    ...img("electronics-and-communication-engineering"),
  },
  {
    slug: "instrumentation-and-control-engineering",
    name: "Instrumentation and Control Engineering",
    level: "ug",
    ...img("instrumentation-and-control-engineering"),
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    level: "ug",
    ...img("mechanical-engineering"),
  },
  {
    slug: "production-engineering",
    name: "Production Engineering",
    level: "ug",
    ...img("production-engineering"),
  },
  {
    slug: "robotics-and-automation",
    name: "Robotics and Automation",
    level: "ug",
    ...img("robotics-and-automation"),
  },
  {
    slug: "bio-technology",
    name: "Bio Technology",
    level: "ug",
    ...img("bio-technology"),
  },
  {
    slug: "fashion-technology",
    name: "Fashion Technology",
    level: "ug",
    ...img("fashion-technology"),
  },
  {
    slug: "information-technology",
    name: "Information Technology",
    level: "ug",
    ...img("information-technology"),
  },
  {
    slug: "textile-technology",
    name: "Textile Technology",
    level: "ug",
    ...img("textile-technology"),
  },
  {
    slug: "metallurgical-engineering",
    name: "Metallurgical Engineering",
    level: "ug",
    ...img("metallurgical-engineering"),
  },
  {
    slug: "mechanical-engineering-sandwich",
    name: "Mechanical Engineering (Sandwich)",
    level: "ug",
    ...img("mechanical-engineering-sandwich"),
  },

  // ---- Postgraduate (Engineering) ----
  {
    slug: "industrial-engineering",
    name: "Industrial Engineering",
    level: "pg",
    ...img("industrial-engineering"),
  },
  {
    slug: "manufacturing-engineering",
    name: "Manufacturing Engineering",
    level: "pg",
    ...img("manufacturing-engineering"),
  },
  {
    slug: "power-electronics-and-drives",
    name: "Power Electronics and Drives",
    level: "pg",
    ...img("power-electronics-and-drives"),
  },
  {
    slug: "structural-engineering",
    name: "Structural Engineering",
    level: "pg",
    ...img("structural-engineering"),
  },
  {
    slug: "vlsi-design",
    name: "VLSI Design",
    level: "pg",
    ...img("vlsi-design"),
  },
  {
    slug: "bio-technology-pg",
    name: "Bio Technology",
    level: "pg",
    ...img("bio-technology-pg"),
  },
  {
    slug: "nano-science-and-technology",
    name: "Nano Science and Technology",
    level: "pg",
    ...img("nano-science-and-technology"),
  },
  {
    slug: "textile-technology-pg",
    name: "Textile Technology",
    level: "pg",
    ...img("textile-technology-pg"),
  },
  {
    slug: "industrial-metallurgy",
    name: "ME Industrial Metallurgy",
    level: "pg",
    ...img("industrial-metallurgy"),
  },

  // ---- Postgraduate (Science) ----
  {
    slug: "applied-mathematics",
    name: "Applied Mathematics (2 Years)",
    level: "pgscience",
    ...img("applied-mathematics"),
  },
];

export function getProgramme(slug) {
  return PROGRAMMES.find((p) => p.slug === slug);
}

export function programmesByLevel(level) {
  return PROGRAMMES.filter((p) => p.level === level);
}
