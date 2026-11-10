import { useState, useEffect, useRef, useMemo } from "react";

// Top paragraph text from the user's reference image
const ABOUT_PARAGRAPH =
  "We house a team of experts with proficiency in custom Web Application Development, Mobile Apps Development, AI Development, Software Development, Ecommerce Development, Internet of things (IoT) and Data Science. We have decades of digital solutions experience for companies from all over the world.";

/* ──────────────────────────────────────────────────────────
   Graph 1: Diagnostic Radar & Intelligence Health Matrix
   ────────────────────────────────────────────────────────── */
function RadarGraph() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Background Micro Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      {/* SVG Multi-Axis Diagnostic Radar */}
      <svg className="w-full h-full max-w-[280px] max-h-[190px]" viewBox="0 0 240 180" fill="none">
        <defs>
          <radialGradient id="darkRadarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="darkPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Concentric Coordinate Rings */}
        <circle cx="120" cy="90" r="22" stroke="rgba(129,140,248,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="120" cy="90" r="44" stroke="rgba(129,140,248,0.25)" strokeWidth="1" />
        <circle cx="120" cy="90" r="66" stroke="rgba(129,140,248,0.35)" strokeWidth="1" />

        {/* Radial Axis Spines */}
        <line x1="120" y1="24" x2="120" y2="156" stroke="rgba(129,140,248,0.25)" strokeWidth="1" />
        <line x1="62" y1="57" x2="178" y2="123" stroke="rgba(129,140,248,0.25)" strokeWidth="1" />
        <line x1="62" y1="123" x2="178" y2="57" stroke="rgba(129,140,248,0.25)" strokeWidth="1" />

        {/* Animated Rotating Radar Sweep */}
        <g className="origin-[120px_90px] animate-[spin_8s_linear_infinite]">
          <path
            d="M 120 90 L 120 24 A 66 66 0 0 1 178 57 Z"
            fill="url(#darkRadarGlow)"
          />
          <line x1="120" y1="90" x2="120" y2="24" stroke="#818cf8" strokeWidth="1.5" />
        </g>

        {/* Active Polygon Data Surface */}
        <polygon
          points="120,38 165,68 152,118 120,138 82,112 88,64"
          fill="url(#darkPolyGrad)"
          stroke="#818cf8"
          strokeWidth="1.8"
          className="transition-all duration-700 group-hover:scale-105 origin-[120px_90px]"
        />

        {/* Data Coordinate Landmark Nodes */}
        <circle cx="120" cy="38" r="3.5" fill="#818cf8" className="animate-ping [animation-duration:3s]" />
        <circle cx="120" cy="38" r="3" fill="#818cf8" />
        <circle cx="165" cy="68" r="3" fill="#38bdf8" />
        <circle cx="152" cy="118" r="3" fill="#a855f7" />
        <circle cx="120" cy="138" r="3" fill="#818cf8" />
        <circle cx="82" cy="112" r="3" fill="#38bdf8" />
        <circle cx="88" cy="64" r="3" fill="#a855f7" />
        <circle cx="120" cy="90" r="3.5" fill="#c7d2fe" />
      </svg>

      {/* Floating Telemetry Chips */}
      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#0d1024]/90 border border-indigo-500/30 shadow-sm backdrop-blur">
        <span className="font-mono text-[9px] font-bold text-indigo-300 tracking-wider">
          ANALYSIS // 99.8%
        </span>
      </div>
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-500/30 shadow-sm backdrop-blur">
        <span className="font-mono text-[9px] font-bold text-emerald-400 tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          STATUS: OPTIMAL
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Graph 2: Exponential Skill Growth & Curriculum Hierarchy
   ────────────────────────────────────────────────────────── */
function AcademyGraph() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* SVG Exponential Skill Curve & Milestone Bars */}
      <svg className="w-full h-full max-w-[280px] max-h-[190px]" viewBox="0 0 240 180" fill="none">
        <defs>
          <linearGradient id="darkCurveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="darkAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal Metric Guidelines */}
        <line x1="25" y1="145" x2="225" y2="145" stroke="rgba(129,140,248,0.25)" strokeWidth="1" />
        <line x1="25" y1="110" x2="225" y2="110" stroke="rgba(129,140,248,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="25" y1="75" x2="225" y2="75" stroke="rgba(129,140,248,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="25" y1="40" x2="225" y2="40" stroke="rgba(129,140,248,0.15)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Vertical Axis */}
        <line x1="25" y1="25" x2="25" y2="145" stroke="rgba(129,140,248,0.25)" strokeWidth="1" />

        {/* Progression Step Histogram Bars */}
        <rect x="45" y="125" width="16" height="20" rx="3" fill="#4338ca" fillOpacity="0.6" />
        <rect x="85" y="105" width="16" height="40" rx="3" fill="#4f46e5" fillOpacity="0.7" />
        <rect x="125" y="80" width="16" height="65" rx="3" fill="#6366f1" fillOpacity="0.8" />
        <rect x="165" y="50" width="16" height="95" rx="3" fill="#818cf8" fillOpacity="0.85" />
        <rect x="205" y="30" width="16" height="115" rx="3" fill="#a855f7" fillOpacity="0.9" />

        {/* Shaded Area Under Exponential Curve */}
        <path
          d="M 30 145 C 75 140, 110 115, 140 85 C 170 55, 195 38, 225 28 L 225 145 Z"
          fill="url(#darkAreaGrad)"
        />

        {/* Main Smooth Trajectory Line */}
        <path
          d="M 30 145 C 75 140, 110 115, 140 85 C 170 55, 195 38, 225 28"
          stroke="url(#darkCurveGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Milestone Knowledge Nodes */}
        <circle cx="30" cy="145" r="3.5" fill="#6366f1" />
        <circle cx="95" cy="120" r="3.5" fill="#6366f1" />
        <circle cx="140" cy="85" r="4" fill="#818cf8" />
        <circle cx="185" cy="48" r="4.5" fill="#a855f7" />
        <circle cx="225" cy="28" r="6" fill="#38bdf8" fillOpacity="0.3" className="animate-ping" />
        <circle cx="225" cy="28" r="4.5" fill="#38bdf8" />
      </svg>

      {/* Floating Badge */}
      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#0d1024]/90 border border-indigo-500/30 shadow-sm backdrop-blur">
        <span className="font-mono text-[9px] font-bold text-indigo-300 tracking-wider">
          TALENT VELOCITY // +184%
        </span>
      </div>
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-sky-950/70 border border-sky-500/30 shadow-sm backdrop-blur">
        <span className="font-mono text-[9px] font-bold text-sky-300 tracking-wider">
          STAGE: ENTERPRISE READY
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Graph 3: Strategic Forecast & Vector Trajectory Projection
   ────────────────────────────────────────────────────────── */
function StrategyGraph() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:18px_18px] opacity-20" />

      {/* SVG Strategic Forecast & Confidence Funnel */}
      <svg className="w-full h-full max-w-[280px] max-h-[190px]" viewBox="0 0 240 180" fill="none">
        <defs>
          <linearGradient id="darkCorridorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="darkLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="65%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Coordinate Grid Box */}
        <rect x="25" y="25" width="195" height="120" rx="4" stroke="rgba(129,140,248,0.25)" strokeWidth="1" />
        <line x1="25" y1="65" x2="220" y2="65" stroke="rgba(129,140,248,0.12)" strokeWidth="1" />
        <line x1="25" y1="105" x2="220" y2="105" stroke="rgba(129,140,248,0.12)" strokeWidth="1" />
        <line x1="90" y1="25" x2="90" y2="145" stroke="rgba(129,140,248,0.12)" strokeWidth="1" />
        <line x1="155" y1="25" x2="155" y2="145" stroke="rgba(129,140,248,0.12)" strokeWidth="1" />

        {/* Upper & Lower Confidence Corridor Shading */}
        <path
          d="M 25 125 Q 90 115, 140 85 T 220 32 L 220 78 Q 170 100, 140 115 T 25 135 Z"
          fill="url(#darkCorridorGrad)"
        />
        <path
          d="M 25 125 Q 90 115, 140 85 T 220 32"
          stroke="rgba(168,85,247,0.5)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M 25 135 Q 90 125, 140 115 T 220 78"
          stroke="rgba(168,85,247,0.5)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Primary Vector Trajectory Line */}
        <path
          d="M 25 130 C 70 124, 105 106, 140 92 C 175 78, 195 55, 220 46"
          stroke="url(#darkLineGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Historical Candlestick Volatility Markers */}
        <line x1="60" y1="116" x2="60" y2="134" stroke="#818cf8" strokeWidth="1.2" />
        <rect x="57" y="120" width="6" height="8" rx="1" fill="#6366f1" />

        <line x1="105" y1="96" x2="105" y2="114" stroke="#818cf8" strokeWidth="1.2" />
        <rect x="102" y="99" width="6" height="9" rx="1" fill="#a855f7" />

        <line x1="150" y1="78" x2="150" y2="98" stroke="#818cf8" strokeWidth="1.2" />
        <rect x="147" y="82" width="6" height="10" rx="1" fill="#38bdf8" />

        {/* Project Target Waypoint with Ping */}
        <circle cx="220" cy="46" r="8" fill="#f59e0b" fillOpacity="0.25" className="animate-ping" />
        <circle cx="220" cy="46" r="4.5" fill="#f59e0b" />
        <circle cx="220" cy="46" r="2" fill="#ffffff" />
      </svg>

      {/* Floating Target Waypoint Badge */}
      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#0d1024]/90 border border-indigo-500/30 shadow-sm backdrop-blur">
        <span className="font-mono text-[9px] font-bold text-indigo-300 tracking-wider">
          TARGET VECTOR // ROI: 4.8X
        </span>
      </div>
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-500/30 shadow-sm backdrop-blur">
        <span className="font-mono text-[9px] font-bold text-amber-300 tracking-wider">
          HORIZON: DELIVERED
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Main About Section Component (Distinct Dark Obsidian/Indigo)
   ────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Split the paragraph into discrete words for smooth scroll illumination
  const words = useMemo(() => ABOUT_PARAGRAPH.split(" "), []);

  // Track scroll position of the section with requestAnimationFrame for silky-smooth progression
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = textContainerRef.current;
          if (!el) {
            ticking = false;
            return;
          }

          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;

          // Start smooth lighting when text reaches ~85% of viewport
          // Fully illuminate when text reaches ~25% of viewport
          const startTrigger = vh * 0.86;
          const endTrigger = vh * 0.24;

          const rawProgress = (startTrigger - rect.top) / (startTrigger - endTrigger);
          const clamped = Math.min(Math.max(rawProgress, 0), 1);
          setScrollProgress(clamped);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#0a0d1a] via-[#10142b] to-[#080b16] text-white transition-colors py-16 sm:py-24 px-4 sm:px-8 border-t border-indigo-500/20 overflow-hidden"
    >
      {/* ── Background Cosmic Obsidian & Indigo Ambient Glow Orbs ── */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[550px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-purple-600/12 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-blue-700/8 blur-[160px] pointer-events-none" />

      {/* Subtle Micro Geometric Grid Pattern for High-Tech Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto">
        {/* ── Top Eyebrow Pill ── */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/50 shadow-[0_0_20px_rgba(99,102,241,0.18)] backdrop-blur mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <span className="font-mono text-xs font-semibold tracking-widest text-indigo-300 uppercase">
              ABOUT SHANVIA TECH
            </span>
          </div>

          {/* ── Scroll-Driven Headline Text: Illuminated on Dark Obsidian Canvas ── */}
          <div
            ref={textContainerRef}
            className="max-w-5xl mx-auto my-3 text-center"
          >
            <h2 className="font-display text-[clamp(1.28rem,2.8vw,2.35rem)] font-semibold leading-[1.38] sm:leading-[1.45] tracking-[-0.015em]">
              {words.map((word, i) => {
                // Continuous windowed progression per word for an ultra-smooth wave
                const step = 0.88 / words.length;
                const wordStart = i * step;
                const windowSpan = 0.09;
                const factor = Math.min(
                  Math.max((scrollProgress - wordStart) / windowSpan, 0),
                  1
                );
                // Continuous smooth opacity from 0.22 (inactive) to 1.0 (active)
                const opacity = 0.22 + 0.78 * factor;

                return (
                  <span
                    key={i}
                    style={{
                      opacity,
                      transform: `translateY(${(1 - factor) * 2.5}px)`,
                    }}
                    className={`inline-block mr-[0.28em] font-semibold transition-[opacity,transform,color] duration-200 ease-out select-none ${
                      factor > 0.4
                        ? "text-white drop-shadow-[0_2px_14px_rgba(255,255,255,0.22)]"
                        : "text-slate-400"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </h2>

            {/* Scroll Interaction Indicator Pill */}
            <div className="mt-6 flex items-center justify-center gap-2.5 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>
                {scrollProgress >= 0.98
                  ? "Capabilities Illuminated"
                  : "Scroll to Reveal Capabilities"}
              </span>
              <div className="w-16 h-1 rounded-full bg-indigo-950/80 border border-indigo-800/40 overflow-hidden ml-1">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-150 rounded-full"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── 3-Block Grid with Animated Graph Visualizers ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 mt-14 sm:mt-18 items-stretch">
          {/* Card 1: Understand the situation */}
          <div className="group relative flex flex-col rounded-3xl bg-[#11152a]/85 border border-indigo-900/40 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_22px_55px_-10px_rgba(99,102,241,0.25)] hover:border-indigo-400/50 transition-all duration-500 overflow-hidden hover:-translate-y-1.5 backdrop-blur-sm">
            {/* Top Graph Visualizer Chamber */}
            <div className="relative h-[220px] sm:h-[230px] w-full bg-gradient-to-b from-[#090c1a]/95 via-[#0d1024]/90 to-[#0e1229]/80 border-b border-indigo-950/80 flex items-center justify-center overflow-hidden">
              <RadarGraph />
              {/* Subtle Corner Light Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-indigo-500/25 blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
            </div>

            {/* Bottom Content Body */}
            <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between text-left">
              <div>
                <h3 className="font-display text-xl sm:text-[22px] font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 mb-3">
                  Understand the situation
                </h3>
                <p className="text-slate-300/80 text-sm sm:text-[14.5px] leading-relaxed mb-6 font-normal">
                  Planners must examine the planning topic in order to thoroughly
                  comprehend the situation and ascertain what leadership envisions as
                  a good outcome.
                </p>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-400/30 text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-slate-100 bg-indigo-950/40 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:border-transparent hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] focus:outline-none"
                >
                  <span>Case Studies</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Our Training Institution */}
          <div className="group relative flex flex-col rounded-3xl bg-[#11152a]/85 border border-indigo-900/40 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_22px_55px_-10px_rgba(99,102,241,0.25)] hover:border-indigo-400/50 transition-all duration-500 overflow-hidden hover:-translate-y-1.5 backdrop-blur-sm">
            {/* Top Graph Visualizer Chamber */}
            <div className="relative h-[220px] sm:h-[230px] w-full bg-gradient-to-b from-[#090c1a]/95 via-[#0d1024]/90 to-[#0e1229]/80 border-b border-indigo-950/80 flex items-center justify-center overflow-hidden">
              <AcademyGraph />
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-purple-500/25 blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
            </div>

            {/* Bottom Content Body */}
            <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between text-left">
              <div>
                <h3 className="font-display text-xl sm:text-[22px] font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 mb-3">
                  Our Training Institution
                </h3>
                <p className="text-slate-300/80 text-sm sm:text-[14.5px] leading-relaxed mb-6 font-normal">
                  We empower the next generation of professionals by delivering
                  industry-aligned training in modern IT technologies. We transform
                  learners into job-ready experts.
                </p>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href="#academy"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-400/30 text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-slate-100 bg-indigo-950/40 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:border-transparent hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] focus:outline-none"
                >
                  <span>Our Academy</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Strategise chart the course */}
          <div className="group relative flex flex-col rounded-3xl bg-[#11152a]/85 border border-indigo-900/40 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_22px_55px_-10px_rgba(99,102,241,0.25)] hover:border-indigo-400/50 transition-all duration-500 overflow-hidden hover:-translate-y-1.5 backdrop-blur-sm md:col-span-2 lg:col-span-1">
            {/* Top Graph Visualizer Chamber */}
            <div className="relative h-[220px] sm:h-[230px] w-full bg-gradient-to-b from-[#090c1a]/95 via-[#0d1024]/90 to-[#0e1229]/80 border-b border-indigo-950/80 flex items-center justify-center overflow-hidden">
              <StrategyGraph />
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-500/25 blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
            </div>

            {/* Bottom Content Body */}
            <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between text-left">
              <div>
                <h3 className="font-display text-xl sm:text-[22px] font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 mb-3">
                  Strategise chart the course
                </h3>
                <p className="text-slate-300/80 text-sm sm:text-[14.5px] leading-relaxed mb-6 font-normal">
                  We may be tasked with creating methods for data analysis, preparing
                  data for analysis, examining, and visualising data, and using
                  programming languages.
                </p>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-400/30 text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-slate-100 bg-indigo-950/40 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:border-transparent hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] focus:outline-none"
                >
                  <span>Explore Services</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
