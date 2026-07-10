"use client";

import * as React from "react";
import { motion } from "framer-motion";

/** Custom illustrated mango cube — isometric IQF cube */
export function MangoCube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <defs>
        <linearGradient id="mango-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5A653" />
          <stop offset="100%" stopColor="#D97414" />
        </linearGradient>
        <linearGradient id="mango-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D97414" />
          <stop offset="100%" stopColor="#A35410" />
        </linearGradient>
        <linearGradient id="mango-right" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F28C28" />
          <stop offset="100%" stopColor="#D97414" />
        </linearGradient>
      </defs>
      {/* Top face */}
      <path d="M100 30 L160 65 L100 100 L40 65 Z" fill="url(#mango-top)" />
      {/* Left face */}
      <path d="M40 65 L100 100 L100 170 L40 135 Z" fill="url(#mango-left)" />
      {/* Right face */}
      <path d="M160 65 L100 100 L100 170 L160 135 Z" fill="url(#mango-right)" />
      {/* Highlights */}
      <path d="M100 30 L160 65 L100 100 L40 65 Z" stroke="#FFD89E" strokeWidth="1.2" opacity="0.6" />
      <circle cx="80" cy="55" r="3" fill="#FFE4B5" opacity="0.7" />
      <circle cx="120" cy="65" r="2" fill="#FFE4B5" opacity="0.5" />
    </svg>
  );
}

/** Strawberry SVG */
export function Strawberry({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <defs>
        <linearGradient id="straw-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E94560" />
          <stop offset="100%" stopColor="#B8202E" />
        </linearGradient>
      </defs>
      {/* Body */}
      <path d="M100 50 C 60 50, 45 90, 70 145 C 80 165, 95 175, 100 175 C 105 175, 120 165, 130 145 C 155 90, 140 50, 100 50 Z" fill="url(#straw-body)" />
      {/* Leaves */}
      <path d="M70 55 L60 35 L85 50 L75 25 L100 45 L100 20 L115 45 L135 25 L120 50 L145 35 L130 55 Z" fill="#1F6F5F" />
      {/* Seeds */}
      {[
        [85, 90], [110, 95], [95, 115], [120, 120], [80, 125], [105, 140], [90, 155], [115, 150],
        [75, 105], [125, 105], [100, 100],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="2.2" ry="3.5" fill="#FFE4B5" transform={`rotate(${i * 30} ${x} ${y})`} />
      ))}
      {/* Highlight */}
      <path d="M85 75 Q 80 95 88 120" stroke="#FF8FA0" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none" />
    </svg>
  );
}

/** Mango slice SVG */
export function MangoSlice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <defs>
        <linearGradient id="slice-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD180" />
          <stop offset="55%" stopColor="#F5A653" />
          <stop offset="100%" stopColor="#D97414" />
        </linearGradient>
      </defs>
      <path d="M30 100 C 30 50, 90 30, 140 60 C 175 80, 175 120, 140 140 C 90 170, 30 150, 30 100 Z" fill="url(#slice-grad)" />
      {/* Inner flesh highlight */}
      <path d="M55 100 C 55 70, 95 55, 130 75 C 155 90, 155 110, 130 125 C 95 145, 55 130, 55 100 Z" fill="#FFE4B5" opacity="0.5" />
      {/* Pit */}
      <ellipse cx="100" cy="100" rx="22" ry="14" fill="#A35410" opacity="0.6" />
      <ellipse cx="100" cy="100" rx="14" ry="8" fill="#7A3D0C" opacity="0.7" />
    </svg>
  );
}

/** Mixed fruit bowl */
export function MixedFruit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <defs>
        <radialGradient id="bowl-bg" cx="0.5" cy="0.4">
          <stop offset="0%" stopColor="#4FAE96" />
          <stop offset="100%" stopColor="#1F6F5F" />
        </radialGradient>
      </defs>
      {/* Bowl */}
      <ellipse cx="100" cy="170" rx="80" ry="14" fill="#155448" opacity="0.4" />
      <path d="M20 130 C 30 175, 170 175, 180 130 Z" fill="url(#bowl-bg)" />
      <ellipse cx="100" cy="130" rx="80" ry="22" fill="#2E8C79" />
      <ellipse cx="100" cy="130" rx="80" ry="22" stroke="#155448" strokeWidth="2" fill="none" />
      {/* Fruits */}
      <circle cx="70" cy="110" r="18" fill="#F28C28" />
      <circle cx="100" cy="100" r="22" fill="#E94560" />
      <circle cx="130" cy="110" r="16" fill="#F5A653" />
      <circle cx="85" cy="120" r="10" fill="#1F6F5F" />
      <circle cx="120" cy="120" r="9" fill="#FFD180" />
      {/* Highlights */}
      <circle cx="65" cy="105" r="3" fill="#FFE4B5" opacity="0.7" />
      <circle cx="95" cy="93" r="4" fill="#FFCDD2" opacity="0.7" />
      <circle cx="125" cy="105" r="3" fill="#FFE4B5" opacity="0.7" />
    </svg>
  );
}

/** Cold chain reefer container */
export function ReeferContainer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 160" className={className} fill="none">
      <defs>
        <linearGradient id="reefer-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E8C79" />
          <stop offset="100%" stopColor="#155448" />
        </linearGradient>
      </defs>
      {/* Trailer */}
      <rect x="20" y="40" width="200" height="80" rx="6" fill="url(#reefer-body)" />
      {/* Lines on trailer */}
      <line x1="60" y1="40" x2="60" y2="120" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      <line x1="100" y1="40" x2="100" y2="120" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      <line x1="140" y1="40" x2="140" y2="120" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      <line x1="180" y1="40" x2="180" y2="120" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      {/* Cab */}
      <path d="M220 50 L290 50 L295 90 L220 90 Z" fill="#F28C28" />
      <rect x="230" y="58" width="50" height="22" rx="3" fill="#FFE4B5" opacity="0.8" />
      {/* Wheels */}
      <circle cx="60" cy="125" r="10" fill="#1A2A26" />
      <circle cx="60" cy="125" r="4" fill="#5A6862" />
      <circle cx="100" cy="125" r="10" fill="#1A2A26" />
      <circle cx="100" cy="125" r="4" fill="#5A6862" />
      <circle cx="240" cy="125" r="10" fill="#1A2A26" />
      <circle cx="240" cy="125" r="4" fill="#5A6862" />
      <circle cx="270" cy="125" r="10" fill="#1A2A26" />
      <circle cx="270" cy="125" r="4" fill="#5A6862" />
      {/* Snowflake */}
      <g transform="translate(110 75)">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line key={deg} x1="0" y1="0" x2="0" y2="-12" stroke="#FFFFFF" strokeWidth="1.5" transform={`rotate(${deg})`} strokeLinecap="round" />
          ))}
          <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
        </motion.g>
      </g>
      {/* Temp badge */}
      <rect x="150" y="60" width="50" height="20" rx="3" fill="#FFFFFF" />
      <text x="175" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1F6F5F" fontFamily="monospace">-18°C</text>
    </svg>
  );
}

/** Egypt → GCC animated map */
export function EgyptGccMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" className={className} fill="none">
      <defs>
        <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1F6F5F" />
          <stop offset="100%" stopColor="#F28C28" />
        </linearGradient>
      </defs>

      {/* Simplified landmasses — stylized, not geographically perfect */}
      {/* Egypt */}
      <path d="M120 130 L240 130 L260 220 L220 280 L140 280 L100 220 Z" fill="#1F6F5F" opacity="0.18" stroke="#1F6F5F" strokeWidth="1.5" />
      <text x="170" y="200" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1F6F5F">EGYPT</text>

      {/* Red Sea */}
      <path d="M260 130 L320 130 L340 230 L300 280 L260 280 L280 220 Z" fill="#4FAE96" opacity="0.08" />

      {/* Saudi Arabia */}
      <path d="M340 100 L520 100 L560 200 L520 280 L380 280 L340 230 Z" fill="#F28C28" opacity="0.15" stroke="#F28C28" strokeWidth="1.5" />
      <text x="450" y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="#D97414">SAUDI</text>

      {/* UAE */}
      <path d="M540 180 L580 175 L590 220 L555 230 Z" fill="#1F6F5F" opacity="0.18" stroke="#1F6F5F" strokeWidth="1.5" />
      <text x="565" y="208" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1F6F5F">UAE</text>

      {/* Kuwait */}
      <path d="M460 95 L490 92 L495 115 L465 118 Z" fill="#1F6F5F" opacity="0.18" stroke="#1F6F5F" strokeWidth="1.5" />
      <text x="478" y="110" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1F6F5F">KW</text>

      {/* Qatar */}
      <path d="M510 165 L525 165 L528 195 L512 195 Z" fill="#1F6F5F" opacity="0.18" stroke="#1F6F5F" strokeWidth="1.5" />
      <text x="518" y="185" textAnchor="middle" fontSize="7" fontWeight="600" fill="#1F6F5F">QA</text>

      {/* Bahrain */}
      <circle cx="490" cy="155" r="5" fill="#1F6F5F" opacity="0.25" stroke="#1F6F5F" strokeWidth="1.2" />
      <text x="490" y="148" textAnchor="middle" fontSize="7" fontWeight="600" fill="#1F6F5F">BH</text>

      {/* Oman */}
      <path d="M590 200 L625 195 L635 250 L600 260 Z" fill="#1F6F5F" opacity="0.18" stroke="#1F6F5F" strokeWidth="1.5" />
      <text x="613" y="232" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1F6F5F">OM</text>

      {/* Routes from Egypt to each GCC market */}
      {[
        { d: "M230 180 Q 350 100, 480 160", dur: 3, delay: 0 },
        { d: "M230 180 Q 400 130, 565 200", dur: 3.5, delay: 0.5 },
        { d: "M230 180 Q 380 90, 478 110", dur: 3, delay: 1 },
        { d: "M230 180 Q 400 150, 518 180", dur: 3.2, delay: 1.4 },
        { d: "M230 180 Q 400 140, 490 155", dur: 2.8, delay: 1.8 },
        { d: "M230 180 Q 420 180, 613 225", dur: 4, delay: 2.2 },
      ].map((r, i) => (
        <g key={i}>
          <path d={r.d} stroke="url(#route-grad)" strokeWidth="1.5" fill="none" opacity="0.4" />
          <motion.path
            d={r.d}
            stroke="#F28C28"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -32 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
          {/* Moving ship dot */}
          <motion.circle
            r="3"
            fill="#F28C28"
            initial={{ offsetDistance: "0%" }}
          >
            <animateMotion dur={`${r.dur}s`} repeatCount="indefinite" begin={`${r.delay}s`} path={r.d} />
          </motion.circle>
        </g>
      ))}

      {/* Origin marker Egypt */}
      <motion.g
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "230px 180px" }}
      >
        <circle cx="230" cy="180" r="7" fill="#1F6F5F" />
        <circle cx="230" cy="180" r="12" fill="none" stroke="#1F6F5F" strokeWidth="1.5" opacity="0.5" />
      </motion.g>
    </svg>
  );
}

/** Snowflake icon — animated */
export function Snowflake({ className, animate = true }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <motion.g
        animate={animate ? { rotate: 360 } : undefined}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      >
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 20 20)`}>
            <line x1="20" y1="20" x2="20" y2="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="20" y1="6" x2="16" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="20" y1="6" x2="24" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </g>
        ))}
        <circle cx="20" cy="20" r="2.5" fill="currentColor" />
      </motion.g>
    </svg>
  );
}

/** Crate / carton SVG */
export function Carton({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none">
      <defs>
        <linearGradient id="carton-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C89A" />
          <stop offset="100%" stopColor="#A87B45" />
        </linearGradient>
      </defs>
      {/* Top */}
      <path d="M40 50 L100 30 L160 50 L100 70 Z" fill="#C9A06A" />
      {/* Body */}
      <path d="M40 50 L100 70 L100 140 L40 120 Z" fill="url(#carton-grad)" />
      <path d="M160 50 L100 70 L100 140 L160 120 Z" fill="#8B6432" />
      {/* Tape */}
      <path d="M40 50 L100 70 L160 50" stroke="#5A4020" strokeWidth="2" fill="none" />
      <path d="M70 60 L70 130" stroke="#5A4020" strokeWidth="1" opacity="0.5" />
      <path d="M130 60 L130 130" stroke="#5A4020" strokeWidth="1" opacity="0.5" />
      {/* Label */}
      <rect x="55" y="85" width="40" height="22" fill="#FFFFFF" opacity="0.85" />
      <text x="75" y="96" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#1F6F5F" fontFamily="monospace">SNACK</text>
      <text x="75" y="103" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#F28C28" fontFamily="monospace">FRUITS</text>
      {/* IQF badge */}
      <rect x="120" y="80" width="25" height="20" fill="#1F6F5F" />
      <text x="132.5" y="93" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF" fontFamily="monospace">IQF</text>
    </svg>
  );
}

/** Factory / industry icon */
export function FactoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 56 L60 56 L60 28 L40 28 L40 36 L24 36 L24 12 L4 12 Z" />
      <path d="M14 20 L14 26 M14 32 L14 38 M14 44 L14 50" />
      <path d="M30 20 L34 20 M30 28 L34 28 M30 44 L34 44" />
      <path d="M48 36 L52 36 M48 44 L52 44" />
      <path d="M48 8 L48 16 M44 12 L52 12" />
    </svg>
  );
}

/** Quality shield */
export function QualityShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M32 4 L56 12 L56 32 C 56 46, 44 56, 32 60 C 20 56, 8 46, 8 32 L8 12 Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M22 32 L30 40 L44 22" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Truck icon */
export function TruckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16 L36 16 L36 44 L2 44 Z" />
      <path d="M36 24 L48 24 L58 32 L58 44 L36 44" />
      <circle cx="14" cy="48" r="5" />
      <circle cx="46" cy="48" r="5" />
    </svg>
  );
}

/** Thermometer icon */
export function ThermometerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M26 8 a6 6 0 0 1 12 0 v28 a10 10 0 1 1 -12 0 Z" />
      <circle cx="32" cy="44" r="4" fill="currentColor" />
      <line x1="32" y1="16" x2="32" y2="36" />
    </svg>
  );
}

/** Port / ship icon */
export function PortIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 40 L60 40 L54 50 L10 50 Z" />
      <path d="M16 40 L16 24 L40 24 L40 40" />
      <path d="M22 24 L22 16 L34 16 L34 24" />
      <line x1="50" y1="14" x2="50" y2="36" />
      <line x1="44" y1="20" x2="56" y2="20" />
    </svg>
  );
}
