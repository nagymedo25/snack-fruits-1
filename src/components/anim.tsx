"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import * as React from "react";

/** Reveal-on-scroll wrapper — uses `whileInView` so content is visible by default
 *  even if JS is disabled or animations fail to fire (prevents post-deploy flicker). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  // Start visible (opacity 1) by default — only animate when scrolled into view
  // and only if reduce-motion is NOT requested. This prevents the "hidden content"
  // flash that happens during initial paint or after deploy.
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Frost/snow particle field — fixed, low cost */
export function FrostField({ count = 30, className }: { count?: number; className?: string }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        // Deterministic pseudo-random based on index — avoids hydration mismatch
        const seed = (i * 9301 + 49297) % 233280;
        const rnd1 = seed / 233280;
        const rnd2 = ((seed * 2) % 233280) / 233280;
        const rnd3 = ((seed * 3) % 233280) / 233280;
        const rnd4 = ((seed * 5) % 233280) / 233280;
        const rnd5 = ((seed * 7) % 233280) / 233280;
        return {
          id: i,
          left: rnd1 * 100,
          size: 2 + rnd2 * 5,
          duration: 12 + rnd3 * 18,
          delay: -rnd4 * 20,
          opacity: 0.2 + rnd5 * 0.5,
        };
      }),
    [count]
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (reduce || !mounted) return null;
  return (
    <div
      data-frost-field
      className={`pointer-events-none absolute inset-0 overflow-hidden frost-field-container ${className ?? ""}`}
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="frost-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `frost-fall ${p.duration}s linear ${p.delay}s infinite`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Floating fruit/shape SVG decorations */
export function FloatingShape({
  shape,
  className,
  size = 80,
  delay = 0,
}: {
  shape: "circle" | "leaf" | "drop" | "cube" | "star";
  className?: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -18, 0],
        rotate: [0, 8, -3, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 6 + (delay % 4), repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ width: size, height: size }}
    >
      <ShapeSvg shape={shape} />
    </motion.div>
  );
}

function ShapeSvg({ shape }: { shape: "circle" | "leaf" | "drop" | "cube" | "star" }) {
  const common = "w-full h-full";
  switch (shape) {
    case "circle":
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none">
          <path
            d="M50 10 C 80 30, 80 70, 50 90 C 20 70, 20 30, 50 10 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <path d="M50 10 L50 90" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 30 L65 40 M50 50 L70 55 M50 30 L35 40 M50 50 L30 55" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </svg>
      );
    case "drop":
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none">
          <path
            d="M50 5 C 50 5, 85 50, 85 70 A 35 35 0 1 1 15 70 C 15 50, 50 5, 50 5 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.18"
          />
          <circle cx="38" cy="65" r="6" fill="currentColor" opacity="0.5" />
        </svg>
      );
    case "cube":
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none">
          <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 10 L50 50 L15 30 M50 50 L85 30 M50 50 L50 90" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none">
          <path
            d="M50 5 L61 38 L95 38 L67 58 L78 92 L50 72 L22 92 L33 58 L5 38 L39 38 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.12"
          />
        </svg>
      );
  }
}

/** Marquee text strip */
export function Marquee({
  children,
  reverse = false,
  fast = false,
  slow = false,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  fast?: boolean;
  slow?: boolean;
  className?: string;
}) {
  const speedClass = fast ? "marquee-track-fast" : slow ? "marquee-track-slow" : "";
  const trackClass = reverse ? "marquee-track-reverse" : "marquee-track";
  return (
    <div className={`marquee-pause overflow-hidden ${className ?? ""}`}>
      <div className={`${trackClass} ${speedClass}`}>
        {children}
        {children}
      </div>
    </div>
  );
}

/** Animated temperature gauge */
export function TempGauge({ value = -18, className }: { value?: number; className?: string }) {
  const pct = ((value + 30) / 30) * 100; // -30..0 -> 0..100
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="flex items-baseline gap-1.5">
        <motion.span
          className="font-serif-display text-4xl font-bold text-teal tabular-nums"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {value}°
        </motion.span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">C</span>
      </div>
      <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden w-32">
        <motion.div
          className="h-full bg-gradient-to-r from-teal via-cyan-400 to-blue-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/** Counter that animates from 0 to value on scroll */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = React.useRef(false);
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !inView.current) {
          inView.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const t = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/** Section divider — animated wave */
export function SectionDivider({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <div className={`relative w-full h-12 ${flip ? "rotate-180" : ""} ${className ?? ""}`} aria-hidden>
      <svg
        className="absolute inset-0 w-full h-full text-teal/10"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <motion.path
          d="M0,30 C240,60 480,0 720,20 C960,40 1200,10 1440,30 L1440,60 L0,60 Z"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </svg>
    </div>
  );
}

/** Magnetic-style hover for any element */
export function Magnetic({
  children,
  strength = 0.2,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`transition-transform duration-300 ease-out ${className ?? ""}`}
      style={{ transition: "transform 0.3s ease-out" }}
    >
      {children}
    </div>
  );
}

/** Parallax wrapper driven by scroll */
export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [entry, setEntry] = React.useState(0);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      setEntry(Math.max(-1, Math.min(1, progress - 0.5)) * offset);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset, reduce]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${entry}px)` }}>
      {children}
    </div>
  );
}

/** Animated underline for headings */
export function AnimatedUnderline({ className }: { className?: string }) {
  return (
    <motion.div
      className={`h-[3px] bg-orange rounded-full ${className ?? ""}`}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/** Kicker label */
export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 ${className ?? ""}`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="h-px w-8 bg-orange" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange">
        {children}
      </span>
    </motion.div>
  );
}
