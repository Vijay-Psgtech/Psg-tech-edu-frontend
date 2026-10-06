import React from "react";
import LeaderContactPage from "../components/Leadercontactpage.jsx";

/**
 * DeanAcademic.jsx — reached from the About us dropdown.
 * Thin wrapper around LeaderContactPage; swap
 * `/assets/dean-academic.jpg` for the real photo.
 */
export default function DeanAcademic() {
  return (
    <LeaderContactPage
      crumb="Dean - Academic"
      title="Dean – Academic"
      name="Dr J V Ramasamy"
      role="Dean - Academic"
      email="dean.acad@psgtech.ac.in"
      photo="/assets/jvr.png"
    />
  );
}