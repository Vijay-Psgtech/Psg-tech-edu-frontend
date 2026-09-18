import React from "react";

export default function TowerIllustration() {
  return (
    <svg
      viewBox="0 0 400 460"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Line-art illustration of the college's domed tower"
    >
      <g fill="none" stroke="#c7ae74" strokeWidth="1.4">
        <rect x="60" y="260" width="280" height="160" strokeWidth="1.6" />
        <line x1="60" y1="300" x2="340" y2="300" />
        <line x1="60" y1="340" x2="340" y2="340" />
        <path d="M95 300 v-30 a20 20 0 0 1 40 0 v30 z" />
        <path d="M175 300 v-30 a20 20 0 0 1 40 0 v30 z" />
        <path d="M255 300 v-30 a20 20 0 0 1 40 0 v30 z" />
        <line x1="115" y1="340" x2="115" y2="400" />
        <line x1="195" y1="340" x2="195" y2="400" />
        <line x1="275" y1="340" x2="275" y2="400" />
        <rect x="150" y="150" width="100" height="110" strokeWidth="1.6" />
        <path d="M150 150 v-20 a50 50 0 0 1 100 0 v20 z" />
        <ellipse cx="200" cy="130" rx="50" ry="14" />
        <path d="M200 40 a30 30 0 0 1 30 30 h-60 a30 30 0 0 1 30 -30 z" />
        <rect x="196" y="18" width="8" height="22" />
        <circle cx="200" cy="16" r="4" />
        <line x1="170" y1="180" x2="170" y2="230" />
        <line x1="200" y1="180" x2="200" y2="230" />
        <line x1="230" y1="180" x2="230" y2="230" />
        <path d="M40 260 h320" strokeWidth="1.6" />
        <path d="M30 420 h340" strokeWidth="1.2" opacity="0.6" />
      </g>
    </svg>
  );
}
