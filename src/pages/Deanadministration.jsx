import React from "react";
import LeaderContactPage from "../components/Leadercontactpage.jsx";

/**
 * DeanAdministration.jsx — reached from the About us dropdown.
 * Thin wrapper around LeaderContactPage; swap
 * `/assets/dean-administration.jpg` for the real photo.
 */
export default function DeanAdministration() {
  return (
    <LeaderContactPage
      crumb="Dean - Administration"
      title="Dean – Administration"
      name="Dr S Saravanan"
      role="Dean - Administration"
      email="dean.admn@psgtech.ac.in"
      photo="/assets/Q3754.png"
    />
  );
}
