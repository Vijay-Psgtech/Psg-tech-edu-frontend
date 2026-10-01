import React from "react";
import LeaderContactPage from "../components/LeaderContactPage.jsx";

/**
 * DeanAutonomousFunctioning.jsx — reached from the About us dropdown.
 * Thin wrapper around LeaderContactPage; swap
 * `/assets/dean-autonomous-functioning.jpg` for the real photo.
 */
export default function DeanAutonomousFunctioning() {
  return (
    <LeaderContactPage
      crumb="Dean - Autonomous Functioning"
      title="Dean – Autonomous Functioning"
      name="Dr Vaideki K"
      role="Dean - Autonomous Functioning"
      email="dean.aufn@psgtech.ac.in"
      photo="/assets/dean_autonomous.jpg"
    />
  );
}
