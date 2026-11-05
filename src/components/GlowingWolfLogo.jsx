import React from 'react';

export default function GlowingWolfLogo({ size = 32 }) {
  return (
    <div className="relative inline-flex items-center justify-center group select-none">
      {/* Ambient Neon Backlight Glow */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#ff7900] via-amber-400 to-orange-600 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

      {/* 3D Stylized Geometric Wolf Head SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_4px_10px_rgba(255,121,0,0.8)] transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          {/* Metallic Orange & Gold Gradients */}
          <linearGradient id="wolfGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#FFA100" />
            <stop offset="70%" stopColor="#FF7900" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          <linearGradient id="wolfDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272A" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>

          <filter id="wolfGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Ears */}
        {/* Left Ear */}
        <path
          d="M 22 18 L 38 32 L 28 48 Z"
          fill="url(#wolfGoldGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* Right Ear */}
        <path
          d="M 78 18 L 62 32 L 72 48 Z"
          fill="url(#wolfGoldGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />

        {/* Inner Ears (Dark facets) */}
        <path d="M 28 26 L 36 34 L 32 44 Z" fill="url(#wolfDarkGrad)" />
        <path d="M 72 26 L 64 34 L 68 44 Z" fill="url(#wolfDarkGrad)" />

        {/* Forehead & Brow Structure */}
        <path
          d="M 50 20 L 38 32 L 50 44 L 62 32 Z"
          fill="url(#wolfGoldGrad)"
          stroke="#FFE082"
          strokeWidth="1"
        />

        {/* Cheeks */}
        {/* Left Cheek */}
        <path
          d="M 28 48 L 40 44 L 35 62 L 20 54 Z"
          fill="url(#wolfGoldGrad)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
        {/* Right Cheek */}
        <path
          d="M 72 48 L 60 44 L 65 62 L 80 54 Z"
          fill="url(#wolfGoldGrad)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />

        {/* Bridge of the Nose */}
        <path
          d="M 50 44 L 42 62 L 50 72 L 58 62 Z"
          fill="url(#wolfDarkGrad)"
          stroke="#FF7900"
          strokeWidth="1.2"
        />

        {/* Glowing Wolf Eyes */}
        <polygon points="40,46 46,47 42,50" fill="#00FFFF" filter="url(#wolfGlow)" />
        <polygon points="60,46 54,47 58,50" fill="#00FFFF" filter="url(#wolfGlow)" />

        {/* Muzzle & Nose */}
        <path
          d="M 50 72 L 43 82 L 50 90 L 57 82 Z"
          fill="url(#wolfGoldGrad)"
          stroke="#FFFFFF"
          strokeWidth="1"
        />
        {/* Nose Tip (Jet Black with Gold Highlight) */}
        <polygon points="50,84 46,81 54,81" fill="#000000" />

        {/* Lower Chin / Jaw */}
        <path
          d="M 50 90 L 45 96 L 55 96 Z"
          fill="#FF7900"
        />
      </svg>
    </div>
  );
}
