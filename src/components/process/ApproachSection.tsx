// Approach Section Content

// Top paragraph text from the user's reference image
const APPROACH_SUBTITLE =
  "We are committed to customer success from start to finish. Our input helps make their solutions stand out from the crowd.";

// Detailed body paragraph that progressively lights up on scroll
const APPROACH_BODY =
  "We share an intention to stand out in the midst of intense competition. Therefore, we choose to deploy undivided attention to every single detail pertaining to a project. Before we start working on a project, we ensure a crystal-clear understanding of you and your business. Once conversant with your professional goals, we put cutting-edge creative engineering into action to augment your brand and technological capability in the virtual world.";

/* ──────────────────────────────────────────────────────────
   Graph Screen 1: Tablet Burndown & Velocity Radar
   ────────────────────────────────────────────────────────── */
function TabletGraphScreen() {
  return (
    <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#030d1a] to-[#01060d] border border-white/10 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Micro Status Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-ping" />
          <span className="font-mono text-[9px] font-bold text-[var(--color-cyan)] tracking-wider">
            SPRINT 24 // BURNDOWN
          </span>
        </div>
        <span className="font-mono text-[8px] text-white/40">48/50 PTS</span>
      </div>

      {/* Burndown Graph & Velocity Trajectory */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <svg className="w-full h-full max-h-[140px]" viewBox="0 0 160 120" fill="none">
          <defs>
            <linearGradient id="burndownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#43d9ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#43d9ff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="15" y1="20" x2="15" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="15" y1="100" x2="150" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="15" y1="60" x2="150" y2="60" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

          {/* Ideal guideline */}
          <line x1="20" y1="28" x2="145" y2="95" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" strokeWidth="1.2" />

          {/* Shaded Area */}
          <path
            d="M 20 28 L 50 35 L 80 50 L 115 72 L 145 92 L 145 100 L 20 100 Z"
            fill="url(#burndownGrad)"
          />

          {/* Actual Burndown Trajectory */}
          <path
            d="M 20 28 L 50 35 L 80 50 L 115 72 L 145 92"
            stroke="#43d9ff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Sprint Milestone Nodes */}
          <circle cx="20" cy="28" r="3" fill="#ffffff" />
          <circle cx="50" cy="35" r="3" fill="#43d9ff" />
          <circle cx="80" cy="50" r="3" fill="#43d9ff" />
          <circle cx="115" cy="72" r="3" fill="#34d399" />
          <circle cx="145" cy="92" r="4.5" fill="#34d399" className="animate-ping" />
          <circle cx="145" cy="92" r="3" fill="#34d399" />
        </svg>
      </div>

      {/* Bottom KPI Chips */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
        <div className="px-2 py-1 rounded bg-white/[0.03] border border-white/5">
          <span className="block font-mono text-[8px] text-[var(--color-mist)]">VELOCITY</span>
          <span className="font-mono text-[10px] font-bold text-white">98.6%</span>
        </div>
        <div className="px-2 py-1 rounded bg-white/[0.03] border border-white/5">
          <span className="block font-mono text-[8px] text-[var(--color-mist)]">PASS RATE</span>
          <span className="font-mono text-[10px] font-bold text-emerald-400">100%</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Graph Screen 2: Laptop Main CI/CD Pipeline Station
   ────────────────────────────────────────────────────────── */
function LaptopGraphScreen() {
  return (
    <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#041224] to-[#010811] border border-white/12 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between border-b border-white/8 pb-3 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-3 font-mono text-[10px] text-white/50 tracking-wider">
            shanvia // ci-cd-pipeline.live
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30">
          BUILD #410 PASSING
        </span>
      </div>

      {/* Main Git Topology & Real-time Deployment Wave */}
      <div className="relative w-full flex-1 flex flex-col justify-center py-2">
        {/* Animated Git Commit Branch Flow */}
        <svg className="w-full h-full max-h-[170px]" viewBox="0 0 280 130" fill="none">
          <defs>
            <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1b9fe0" />
              <stop offset="50%" stopColor="#43d9ff" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="glowArea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#43d9ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#43d9ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Background horizontal track lines */}
          <line x1="20" y1="35" x2="260" y2="35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="20" y1="75" x2="260" y2="75" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="20" y1="110" x2="260" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* Main Pipeline Branch Flow Curve */}
          <path
            d="M 20 75 L 60 75 C 80 75, 95 35, 115 35 L 170 35 C 190 35, 205 75, 225 75 L 260 75"
            stroke="url(#pipelineGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Shaded Frequency Area Underneath */}
          <path
            d="M 20 75 L 60 75 C 80 75, 95 35, 115 35 L 170 35 C 190 35, 205 75, 225 75 L 260 75 L 260 115 L 20 115 Z"
            fill="url(#glowArea)"
          />

          {/* Secondary Sub-branch Curve */}
          <path
            d="M 60 75 C 80 75, 95 105, 115 105 L 165 105 C 185 105, 205 75, 225 75"
            stroke="#1b9fe0"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />

          {/* Git Commit Nodes */}
          <circle cx="25" cy="75" r="4" fill="#ffffff" />
          <circle cx="60" cy="75" r="4.5" fill="#43d9ff" />

          {/* Staging & Test Nodes */}
          <circle cx="115" cy="35" r="4.5" fill="#43d9ff" />
          <circle cx="140" cy="35" r="4.5" fill="#43d9ff" />
          <circle cx="170" cy="35" r="4.5" fill="#34d399" />

          {/* Production Release Node with Active Ping */}
          <circle cx="225" cy="75" r="7" fill="#34d399" fillOpacity="0.3" className="animate-ping" />
          <circle cx="225" cy="75" r="5" fill="#34d399" />
          <circle cx="225" cy="75" r="2.5" fill="#ffffff" />

          {/* Feature branch nodes */}
          <circle cx="115" cy="105" r="3.5" fill="#1b9fe0" />
          <circle cx="140" cy="105" r="3.5" fill="#1b9fe0" />
          <circle cx="165" cy="105" r="3.5" fill="#1b9fe0" />

          {/* Telemetry Labels */}
          <text x="25" y="62" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">MAIN</text>
          <text x="120" y="24" fill="#43d9ff" fontSize="7" fontFamily="monospace">TEST / QA</text>
          <text x="215" y="62" fill="#34d399" fontSize="7" fontFamily="monospace">PROD // v4.2</text>
        </svg>
      </div>

      {/* Bottom Telemetry Metrics Bar */}
      <div className="flex items-center justify-between pt-2.5 border-t border-white/8 text-[10px] font-mono text-[var(--color-mist)]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Deployment Latency: <strong className="text-white">12ms</strong></span>
        </span>
        <span className="hidden sm:inline">Uptime: <strong className="text-white">99.99%</strong></span>
        <span>Sprint Cycle: <strong className="text-[var(--color-cyan)]">14 Days</strong></span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Main Approach Section Component
   ────────────────────────────────────────────────────────── */
export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative w-full bg-[var(--color-abyss)] text-[var(--color-foam)] py-28 sm:py-36 px-4 sm:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* ── Background Cyber Ambient Glow & Grid ── */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] rounded-full bg-[var(--color-ocean)]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] rounded-full bg-[var(--color-cyan)]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">

          {/* ══════════════════════════════════════════════════
             LEFT COLUMN: Typography & Content
             ══════════════════════════════════════════════════ */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-cyan)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-nd-ping" />
              <span>• OUR APPROACH</span>
            </div>

            {/* Main Headline with Italic Serif Accent */}
            <h2 className="font-display text-[clamp(2.5rem,5.2vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white mb-6">
              Masters of{" "}
              <span className="font-serif italic font-normal text-[var(--color-cyan)] tracking-normal">
                Agile Development.
              </span>
            </h2>

            {/* Sub-headline intro paragraph */}
            <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white/90 mb-5">
              {APPROACH_SUBTITLE}
            </p>

            {/* Detailed Body Paragraph */}
            <p className="text-sm sm:text-base leading-relaxed tracking-normal text-[var(--color-mist)] mb-2">
              {APPROACH_BODY}
            </p>

            {/* CTA Button Row */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {/* Primary Filled Cyan Button */}
              <a
                href="#about"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#020a12] bg-[var(--color-cyan)] hover:brightness-110 shadow-[0_0_25px_rgba(67,217,255,0.35)] transition-all duration-300 focus:outline-none"
              >
                <span>Know About Us</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>

              {/* Secondary Hollow Border Button */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:border-[var(--color-cyan)]/40 backdrop-blur-sm transition-all duration-300 focus:outline-none"
              >
                <span>Start Agile Sprint</span>
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
             RIGHT COLUMN: Motion Ring Animation & Dual Graph Screens
             ══════════════════════════════════════════════════ */}
          <div className="relative w-full flex items-center justify-center pt-8 sm:pt-0">

            {/* ── 1. MOTION RING TYPE ANIMATION (Concentric Gyro Rings) ── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              {/* Outer Dashed Orbit Ring */}
              <div
                className="w-[520px] sm:w-[620px] h-[520px] sm:h-[620px] rounded-full border border-[var(--color-cyan)]/20 animate-[spin_32s_linear_infinite]"
                style={{
                  borderStyle: "dashed",
                  borderDasharray: "12 12",
                  boxShadow: "0 0 50px rgba(67, 217, 255, 0.08)",
                }}
              />

              {/* Intermediate Gyro Ring (Tilted Oval with Counter-Spin) */}
              <div
                className="absolute w-[440px] sm:w-[540px] h-[340px] sm:h-[440px] rounded-full border border-[var(--color-wave)]/25 animate-[spin-rev_24s_linear_infinite]"
                style={{
                  transform: "rotate(-25deg)",
                  boxShadow: "0 0 35px rgba(27, 159, 224, 0.12)",
                }}
              />

              {/* Glowing Inner Radar Pulse Ring */}
              <div className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full border border-[var(--color-cyan)]/30 animate-pulse [animation-duration:4s]" />

              {/* Floating Luminous Orbit Particle Nodes */}
              <div className="absolute w-[520px] sm:w-[620px] h-[520px] sm:h-[620px] animate-[spin_20s_linear_infinite]">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_12px_#43d9ff]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--color-emerald)] shadow-[0_0_10px_#34d399]" />
                <span className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              </div>
            </div>

            {/* ── 2. GLASS SHOWCASE ENCLOSURE ── */}
            <div className="relative z-10 w-full max-w-[590px] rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.06] via-[#020b16]/75 to-[#01050a]/90 backdrop-blur-2xl p-5 sm:p-7 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(67,217,255,0.06)]">

              {/* Device Mockup Canvas: Overlapping Tablet & Laptop Graphs */}
              <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center">

                {/* Left/Back Screen: Vertical Tablet Sprint Burndown (Tilted slightly) */}
                <div className="absolute left-0 sm:left-2 top-4 w-[46%] h-[82%] z-10 transition-transform duration-500 hover:scale-105 hover:z-30">
                  <TabletGraphScreen />
                </div>

                {/* Right/Front Screen: Main Command CI/CD Station (Overlapping) */}
                <div className="absolute right-0 sm:right-2 top-8 w-[68%] h-[84%] z-20 transition-transform duration-500 hover:scale-105 hover:z-30">
                  <LaptopGraphScreen />
                </div>
              </div>

              {/* ── 3. BOTTOM SPRINT ARCHITECTURE TELEMETRY BAR ── */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[10px] font-bold text-[var(--color-cyan)] uppercase tracking-wider mb-0.5">
                    AGILE SPRINT ARCHITECTURE
                  </span>
                  <p className="text-xs sm:text-[13px] font-medium text-white/90">
                    Continuous Integration & 2-Week Deployment Sprints
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-ping" />
                  <span className="font-mono text-[9px] font-bold text-[var(--color-cyan)]">ACTIVE</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

