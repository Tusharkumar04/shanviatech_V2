import { useRef } from "react";
import { useScrollTextProgress, getWordRevealStyle } from "@/utils/useScrollTextProgress";

const HEADLINE_WORDS = [
  { text: "We", accent: false },
  { text: "provide", accent: false },
  { text: "high", accent: false },
  { text: "quality", accent: false },
  { text: "and", accent: false },
  { text: "cost", accent: true },
  { text: "effective", accent: true },
  { text: "services.", accent: true },
];

export default function CapabilitiesSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollProgress = useScrollTextProgress(headingRef);

  return (
    <section
      id="technology"
      className="on-light relative w-full bg-gradient-to-b from-[#f7fafc] via-[#ffffff] to-[#eef4f9] text-[#0a1c2c] py-20 sm:py-28 px-4 sm:px-8 border-t border-sky-200/70 overflow-hidden"
    >
      {/* Ambient Oceanic Light Glows */}
      <div className="absolute top-12 left-10 w-[480px] h-[480px] rounded-full bg-sky-200/35 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-8 right-10 w-[520px] h-[520px] rounded-full bg-cyan-200/30 blur-[140px] pointer-events-none" />

      {/* Subtle Oceanic Dot Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(11,108,176,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center">
          {/* ══════════════════════════════════════════════════
              LEFT COLUMN: Showreel Visual Frame
             ══════════════════════════════════════════════════ */}
          <div className="relative">
            <div className="rounded-3xl bg-white/95 border border-sky-200/80 p-2.5 sm:p-3.5 shadow-[0_24px_60px_-14px_rgba(11,108,176,0.16)]">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8f3fc] via-[#f4f9ff] to-[#dfeffc] border border-sky-200/70 flex items-center justify-center">
                <img
                  src="/images/capabilities-showreel.jpg"
                  alt="AI engineer analyzing a luminous oceanic neural wireframe interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              RIGHT COLUMN: Capabilities & Execution Copy
             ══════════════════════════════════════════════════ */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-[#0284c7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-ping" />
              <span>CAPABILITIES &amp; EXECUTION</span>
            </div>

            {/* Scroll-Active Headline */}
            <h2
              ref={headingRef}
              className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-0.02em] mb-6"
            >
              {HEADLINE_WORDS.map((item, i) => {
                const { factor, style } = getWordRevealStyle(
                  scrollProgress,
                  i,
                  HEADLINE_WORDS.length
                );
                return (
                  <span
                    key={i}
                    style={style}
                    className={`inline-block mr-[0.26em] transition-[opacity,transform,color] duration-200 ease-out select-none ${
                      item.accent
                        ? `font-serif italic font-normal tracking-normal ${
                            factor > 0.4
                              ? "text-[#0284c7] drop-shadow-[0_2px_12px_rgba(2,132,199,0.2)]"
                              : "text-slate-400"
                          }`
                        : factor > 0.4
                        ? "text-[#0a1c2c]"
                        : "text-slate-400"
                    }`}
                  >
                    {item.text}
                  </span>
                );
              })}
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-slate-800 mb-4">
              We have two decades of digital solutions experiences for companies from
              all over the world.
            </p>

            {/* Body Copy */}
            <p className="text-sm sm:text-base leading-relaxed text-[#4b6477] mb-8">
              It doesn&apos;t matter if you need a few specialized engineers or a
              large technology partner, we&apos;ll develop the right solutions to meet
              your needs. There is more to a project than just data, tables, and lines
              of code. They are made up of individuals, and the beliefs they hold
              influence how they function. We wish to give that confidence to our
              customers.
            </p>

            {/* CTA Button */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#0969aa] to-[#0284c7] hover:brightness-110 shadow-[0_10px_25px_rgba(2,132,199,0.28)] transition-all duration-300 focus:outline-none"
            >
              <span>EXPLORE TECHNOLOGY</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

