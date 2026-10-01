import React from "react";

/**
 * MapEmbed.jsx — the Google Maps embed used in Footer.jsx, pulled out
 * as a standalone component so it can be dropped into other pages
 * (e.g. a future "Location & campus" section on /about, or a campus
 * map page) without repeating the themed wrapper each time.
 *
 * Uses the site's design tokens (border-line) rather than an
 * unstyled bare <iframe> — the iframe itself has no visual chrome of
 * its own, so it needs a sized, bordered container to sit inside.
 */

export default function MapEmbed({
  query = "PSG College of Technology, Peelamedu, Coimbatore",
  title = "PSG College of Technology location",
  className = "h-56 md:h-80",
}) {
  return (
    <div className={`border border-line bg-cream overflow-hidden ${className}`}>
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}