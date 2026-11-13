import { useRef } from "react";
import { useScrollTextProgress, getWordRevealStyle } from "@/utils/useScrollTextProgress";

const WHY_HEADLINE_WORDS = [
  { text: "We", accent: false },
  { text: "deliver", accent: false },
  { text: "100%", accent: false },
  { text: "and", accent: false },
  { text: "provide", accent: false },
  { text: "instant", accent: true },
  { text: "response.", accent: true },
];

const HYBRID_LAYERS = [
  { num: "01", label: "Products", detail: "Scalable Web, AI & Mobile Builds", status: "ACTIVE" },
  { num: "02", label: "Brands", detail: "Distinctive Identity & Design Systems", status: "SYNCED" },
  { num: "03", label: "Services", detail: "24/7 Cloud Ops & Dedicated Teams", status: "100% SLA" },
] as const;

const EDGE_REGIONS = [
  { region: "US-EAST", ms: "11ms", pct: "92%" },
  { region: "EU-WEST", ms: "13ms", pct: "88%" },
  { region: "AP-SOUTH", ms: "9ms", pct: "96%" },
] as const;

export default function WhyChooseUsSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollProgress = useScrollTextProgress(headingRef);

  return (
    <section
      id="why-choose-us"
      className="relative w-full bg-gradient-to-b from-[#041222] via-[#06182c] to-[#020a12] text-[var(--color-foam)] py-20 sm:py-28 px-4 sm:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Ambient Oceanic Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-[var(--color-ocean)]/18 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] rounded-full bg-[var(--color-cyan)]/10 blur-[140px] pointer-events-none" />

      {/* Ambient Background Motion: Ascending Telemetry Streaks & Sonar Ripples */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Horizontal Soft Scan Sweep */}
        <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyan)]/25 to-transparent a-scan opacity-35" />

        {/* Expanding Sonar Ripples */}
        <div className="hidden sm:block absolute top-28 left-[10%] w-24 h-24 rounded-full border border-cyan-400/20 a-ripple" />
        <div className="hidden sm:block absolute bottom-28 right-[10%] w-28 h-28 rounded-full border border-emerald-400/20 a-ripple [animation-delay:1.8s]" />

        {/* Ascending Data Beams */}
        <span className="absolute bottom-16 left-[12%] w-[2px] h-8 rounded-full bg-gradient-to-t from-transparent via-cyan-400/60 to-transparent a-rise [animation-duration:4.2s]" />
        <span className="absolute bottom-24 left-[28%] w-[2px] h-6 rounded-full bg-gradient-to-t from-transparent via-emerald-400/50 to-transparent a-rise [animation-delay:1.1s] [animation-duration:5s]" />
        <span className="absolute bottom-12 right-[24%] w-[2px] h-9 rounded-full bg-gradient-to-t from-transparent via-cyan-300/55 to-transparent a-rise [animation-delay:0.6s] [animation-duration:4.6s]" />
        <span className="absolute bottom-28 right-[14%] w-[2px] h-7 rounded-full bg-gradient-to-t from-transparent via-sky-400/50 to-transparent a-rise [animation-delay:2.1s] [animation-duration:5.4s]" />

        {/* Floating Geometric Crosshairs */}
        <span className="hidden md:block absolute top-44 right-[14%] font-mono text-xs text-cyan-400/35 a-bob">
          +
        </span>
        <span className="hidden md:block absolute bottom-44 left-[14%] font-mono text-xs text-emerald-400/35 a-bob [animation-delay:1.5s]">
          +
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* ── Top Centered Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-cyan)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-nd-ping" />
            <span>WHY CHOOSE US?</span>
          </div>

          <h2
            ref={headingRef}
            className="font-display text-[clamp(2rem,4.6vw,3.7rem)] font-extrabold leading-[1.08] tracking-[-0.02em] mb-5"
          >
            {WHY_HEADLINE_WORDS.map((item, i) => {
              const { factor, style } = getWordRevealStyle(
                scrollProgress,
                i,
                WHY_HEADLINE_WORDS.length
              );
              return (
                <span
                  key={i}
                  style={style}
                  className={`inline-block mr-[0.25em] transition-[opacity,transform,color] duration-200 ease-out select-none ${
                    item.accent
                      ? `font-serif italic font-normal tracking-normal ${
                          factor > 0.4
                            ? "text-[var(--color-cyan)] drop-shadow-[0_2px_16px_rgba(67,217,255,0.32)]"
                            : "text-slate-400"
                        }`
                      : factor > 0.4
                      ? "text-white drop-shadow-[0_2px_14px_rgba(255,255,255,0.2)]"
                      : "text-slate-400"
                  }`}
                >
                  {item.text}
                </span>
              );
            })}
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--color-mist)] max-w-2xl mx-auto">
            By developing the next generation of products, brands, and services from a
            hybrid perspective, we are continually reinventing the future. Today, the
            inconceivable becomes inescapable.
          </p>
        </div>

        {/* ── Original 3-Panel Hybrid Delivery & Instant Response Console ── */}
        <div className="max-w-[1060px] mx-auto rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-[#041426]/90 via-[#020d1a]/95 to-[#01070f] p-3.5 sm:p-5 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8),0_0_45px_rgba(67,217,255,0.08)] backdrop-blur-xl">
          <div className="relative rounded-2xl border border-white/10 bg-[#020a14]/95 overflow-hidden p-4 sm:p-6">
            {/* Subtle Inner Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(67,217,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(67,217,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Top Telemetry Header */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-ping" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[var(--color-cyan)] tracking-wider">
                  HYBRID DELIVERY MATRIX // LIVE
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-emerald-400 tracking-wider">
                RESPONSE: &lt; 15MS · 100% SLA
              </span>
            </div>

            {/* 3-Column Responsive Visual Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
              {/* Panel 1: 100% Delivery Precision Gauge */}
              <div className="rounded-2xl border border-white/10 bg-[#051324]/85 p-4 sm:p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mist)]">
                    DELIVERY PRECISION
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-400">
                    VERIFIED
                  </span>
                </div>

                <div className="flex items-center justify-center my-2">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                      <circle cx="60" cy="60" r="48" stroke="rgba(67,217,255,0.12)" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke="url(#slaRingGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="301.6"
                        strokeDashoffset="12"
                      />
                      <defs>
                        <linearGradient id="slaRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#43d9ff" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-2xl font-extrabold text-white leading-none">
                        100%
                      </span>
                      <span className="font-mono text-[9px] text-[var(--color-cyan)] mt-1 tracking-wider">
                        ON-TIME SLA
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  {[
                    { name: "Architecture QA", val: "100%" },
                    { name: "Sprint Reliability", val: "99.9%" },
                  ].map((bar) => (
                    <div key={bar.name}>
                      <div className="flex justify-between font-mono text-[9px] text-[var(--color-mist)] mb-1">
                        <span>{bar.name}</span>
                        <span className="text-white">{bar.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-full rounded-full bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-cyan)]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel 2: Instant Response Pulse Oscilloscope */}
              <div className="rounded-2xl border border-cyan-400/25 bg-[#051324]/85 p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_30px_rgba(67,217,255,0.06)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-cyan)]">
                    INSTANT RESPONSE WAVE
                  </span>
                  <span className="font-mono text-[10px] font-bold text-white bg-cyan-500/15 border border-cyan-400/30 px-2 py-0.5 rounded-full">
                    &lt; 15ms
                  </span>
                </div>

                {/* Live Pulse Waveform */}
                <div className="rounded-xl bg-[#020a14] border border-white/5 p-3 my-1">
                  <svg className="w-full h-20" viewBox="0 0 260 80" fill="none" aria-hidden="true">
                    <line x1="0" y1="40" x2="260" y2="40" stroke="rgba(67,217,255,0.12)" strokeDasharray="3 3" />
                    <path
                      d="M0 40 L48 40 L60 22 L72 60 L86 12 L100 66 L112 40 L158 40 L170 26 L180 54 L192 18 L204 58 L214 40 L260 40"
                      stroke="#43d9ff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="1"
                      strokeDasharray="0.35 0.65"
                      className="a-ecg"
                    />
                    <path
                      d="M0 40 L48 40 L60 22 L72 60 L86 12 L100 66 L112 40 L158 40 L170 26 L180 54 L192 18 L204 58 L214 40 L260 40"
                      stroke="rgba(67,217,255,0.22)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Global Edge Latency Bars */}
                <div className="space-y-2 mt-3">
                  {EDGE_REGIONS.map((item) => (
                    <div key={item.region} className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="w-16 text-[var(--color-mist)] shrink-0">{item.region}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#34d399] to-[#43d9ff]"
                          style={{ width: item.pct }}
                        />
                      </div>
                      <span className="w-9 text-right font-bold text-emerald-400">{item.ms}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel 3: Hybrid Perspective Stack (Products · Brands · Services) */}
              <div className="rounded-2xl border border-white/10 bg-[#051324]/85 p-4 sm:p-5 flex flex-col justify-between md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mist)]">
                    HYBRID PERSPECTIVE
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[var(--color-cyan)]">
                    UNIFIED
                  </span>
                </div>

                <div className="space-y-2.5 my-auto">
                  {HYBRID_LAYERS.map((layer) => (
                    <div
                      key={layer.num}
                      className="rounded-xl border border-white/10 bg-[#020b16]/90 px-3.5 py-2.5 flex items-center justify-between gap-3 hover:border-cyan-400/40 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-[var(--color-cyan)]">
                            {layer.num}
                          </span>
                          <span className="font-display text-sm font-bold text-white">
                            {layer.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--color-mist)] truncate mt-0.5">
                          {layer.detail}
                        </p>
                      </div>
                      <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full shrink-0">
                        {layer.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Metrics */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 px-3 pt-4 pb-1 font-mono text-[11px] sm:text-xs">
            <span className="flex items-center gap-2 text-[var(--color-cyan)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
              Hybrid Product, Brand &amp; Service Execution
            </span>
            <span className="flex items-center gap-2 text-[var(--color-mist)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              Instant Response (&lt; 15ms)
            </span>
            <span className="text-[var(--color-cyan)] font-semibold">
              100% SLA Delivery Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

