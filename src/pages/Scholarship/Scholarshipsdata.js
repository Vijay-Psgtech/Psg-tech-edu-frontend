/**
 * scholarshipsData.js — shared source of truth for the Scholarships
 * index (Scholarships.jsx) and the Scholarship category detail page
 * (ScholarshipDetail.jsx). Same pattern as programmesData.js.
 *
 * Transcribed from the college's existing Scholarship page. The
 * source screenshot's category list scrolled below "Scholarships
 * issued in the Year 2018-19" — later entries weren't visible, so
 * they're left out here rather than invented. Add them to
 * SCHOLARSHIPS below once you have the full list.
 *
 * Only "State And Central Scholarship Notifications" has its
 * sub-items (notification links) transcribed — that's the one
 * category page the source screenshot actually showed in detail.
 * Every other category has an empty `items` array; ScholarshipDetail
 * renders a "coming soon" notice for those until real links are
 * added.
 *
 * IMAGES
 * `img(slug)` is only a *default-path generator* — it builds
 * `/assets/scholarships/<slug>/banner.jpg` and `.../detail.jpg` from
 * a slug, for categories that don't have a real photo yet.
 *
 * IMPORTANT: the argument to `img()` must always be the category's
 * SLUG, never a filename — see the note in programmesData.js for
 * what goes wrong when a filename is passed instead.
 *
 * Once you have a real photo for a category, override `banner`
 * and/or `detail` directly on that entry, after the `...img(slug)`
 * spread so it takes precedence.
 */

const img = (slug) => ({
  banner: `/assets/scholarships/${slug}/banner.jpg`,
  detail: `/assets/scholarships/${slug}/detail.jpg`,
});

export const SCHOLARSHIPS = [
  {
    slug: "state-and-central-scholarship-notifications",
    name: "State And Central Scholarship Notifications",
    summary:
      "Notifications for state and central government scholarship schemes, including fresh and renewal applications.",
    items: [
      {
        label: "Central Government Scholarship Notification",
        href: "/assets/scholarships/state-and-central-scholarship-notifications/central-government-scholarship-notification.pdf",
      },
      {
        label: "State Renewal Scholarship Notification",
        href: "/assets/scholarships/state-and-central-scholarship-notifications/state-renewal-scholarship-notification.pdf",
      },
      {
        label: "State Fresh Scholarship Notification",
        href: "/assets/scholarships/state-and-central-scholarship-notifications/state-fresh-scholarship-notification.pdf",
      },
    ],
    ...img("state-and-central-scholarship-notifications"),
  },
  {
    slug: "state-government-scholarship",
    name: "State Government Scholarship",
    items: [],
    ...img("state-government-scholarship"),
  },
  {
    slug: "central-government-scholarship",
    name: "Central Government Scholarship",
    items: [],
    ...img("central-government-scholarship"),
  },
  {
    slug: "private-scholarship",
    name: "Private Scholarship",
    items: [],
    ...img("private-scholarship"),
  },
  {
    slug: "alumni-scholarships",
    name: "Alumni Scholarships",
    items: [],
    ...img("alumni-scholarships"),
  },
  {
    slug: "grd-centenary-scholarship",
    name: "GRD Centenary Scholarship",
    items: [],
    ...img("grd-centenary-scholarship"),
  },
  {
    slug: "scholarships-issued-2018-19",
    name: "Scholarships issued in the Year 2018-19",
    items: [],
    ...img("scholarships-issued-2018-19"),
  },
];

export function getScholarship(slug) {
  return SCHOLARSHIPS.find((s) => s.slug === slug);
}