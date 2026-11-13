import { useEffect, useRef, useState, useCallback } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { HERO_SHAPES } from "./HeroCanvas";
import HeroVisualizer from "./HeroVisualizer";
import HeroBackgroundMotion from "./HeroBackgroundMotion";

/* ── Typewriter timing constants ── */
const TYPE_SPEED = 50;             // ms per character (smooth natural typing)
const DELETE_SPEED = 24;           // ms per character for backspacing
const SLOGAN_DISPLAY_TIME = 4200;  // keep heading + slogan visible together
const SLOGAN_FADEOUT_WAIT = 350;   // wait for slogan fade-out CSS transition
const PAUSE_BETWEEN_SLIDES = 400;  // gap before next slide starts typing

/**
 * Imperative typewriter engine — all DOM mutations via refs, zero React
 * re-renders during the animation loop. Timers are properly cleaned up.
 */
function useTypewriter(
  headingRef: React.RefObject<HTMLSpanElement | null>,
  sloganRef: React.RefObject<HTMLParagraphElement | null>,
  sloganWrapRef: React.RefObject<HTMLDivElement | null>,
  onSlideChange?: (idx: number) => void
) {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const slideIdx = useRef(0);
  const stopped = useRef(false);
  const sloganShown = useRef(false);

  const clearTimer = useCallback(() => {
    if (timer.current != null) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  }, []);

  /* ── Slogan helpers ── */
  const showSlogan = useCallback(
    (text: string) => {
      if (sloganShown.current) return;
      sloganShown.current = true;
      const p = sloganRef.current;
      const wrap = sloganWrapRef.current;
      if (!p || !wrap) return;
      p.textContent = text;
      wrap.style.maxHeight = "200px";
      wrap.style.opacity = "1";
      p.classList.remove("slogan-animate");
      void p.offsetWidth;
      p.classList.add("slogan-animate");
    },
    [sloganRef, sloganWrapRef]
  );

  const hideSlogan = useCallback(() => {
    sloganShown.current = false;
    const wrap = sloganWrapRef.current;
    if (!wrap) return;
    wrap.style.opacity = "0";
    wrap.style.maxHeight = "0";
  }, [sloganWrapRef]);

  /* ── Active nav state sync ── */
  const setActiveNav = useCallback(
    (idx: number) => {
      if (onSlideChange) onSlideChange(idx);
    },
    [onSlideChange]
  );

  /* ── Type one character at a time ── */
  const typeText = useCallback(
    (text: string, pos: number, onDone: () => void) => {
      if (stopped.current) return;
      const el = headingRef.current;
      if (!el) return;
      if (pos <= text.length) {
        el.textContent = text.slice(0, pos);
        timer.current = setTimeout(
          () => typeText(text, pos + 1, onDone),
          TYPE_SPEED
        );
      } else {
        onDone();
      }
    },
    [headingRef]
  );

  /* ── Delete one character at a time ── */
  const deleteText = useCallback(
    (onDone: () => void) => {
      if (stopped.current) return;
      const el = headingRef.current;
      if (!el) return;
      const cur = el.textContent || "";
      if (cur.length > 0) {
        el.textContent = cur.slice(0, -1);
        timer.current = setTimeout(() => deleteText(onDone), DELETE_SPEED);
      } else {
        onDone();
      }
    },
    [headingRef]
  );

  /* ── Full slide lifecycle: type heading -> show small slogan -> pause -> remove -> next slide ── */
  const runSlide = useCallback(() => {
    if (stopped.current) return;
    const idx = slideIdx.current;
    const slide = HERO_SHAPES[idx];
    setActiveNav(idx);
    hideSlogan();

    /* Phase 1: type heading with text cursor */
    typeText(slide.headline, 0, () => {
      if (stopped.current) return;

      /* Phase 2: reveal small slogan text */
      showSlogan(slide.slogan);

      /* Phase 3: keep heading + slogan visible together */
      timer.current = setTimeout(() => {
        if (stopped.current) return;

        /* Phase 4: fade slogan out, then delete heading */
        hideSlogan();
        timer.current = setTimeout(() => {
          if (stopped.current) return;
          deleteText(() => {
            if (stopped.current) return;

            /* Phase 5: advance to next slide */
            slideIdx.current = (idx + 1) % HERO_SHAPES.length;
            timer.current = setTimeout(runSlide, PAUSE_BETWEEN_SLIDES);
          });
        }, SLOGAN_FADEOUT_WAIT);
      }, SLOGAN_DISPLAY_TIME);
    });
  }, [typeText, deleteText, showSlogan, hideSlogan, setActiveNav]);

  /* Start engine on mount */
  useEffect(() => {
    stopped.current = false;
    timer.current = setTimeout(runSlide, 500);
    return () => {
      stopped.current = true;
      clearTimer();
    };
  }, [runSlide, clearTimer]);

  /* Public: jump to a specific slide (button or canvas click) */
  const jumpTo = useCallback(
    (idx: number) => {
      clearTimer();
      stopped.current = true;
      if (headingRef.current) headingRef.current.textContent = "";
      hideSlogan();
      slideIdx.current = idx;
      requestAnimationFrame(() => {
        stopped.current = false;
        runSlide();
      });
    },
    [clearTimer, hideSlogan, runSlide, headingRef]
  );

  return { jumpTo };
}

export default function Hero() {
  const [activeCanvasIdx, setActiveCanvasIdx] = useState(0);
  // const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const mouseOffset = { x: 0, y: 0 };

  // DOM Refs for Typewriter
  const headingTextRef = useRef<HTMLSpanElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const sloganWrapRef = useRef<HTMLDivElement>(null);

  // Initialize typewriter engine matching reference project
  const { jumpTo } = useTypewriter(
    headingTextRef,
    sloganRef,
    sloganWrapRef,
    (idx) => setActiveCanvasIdx(idx)
  );

  // Mouse parallax tracking with smooth requestAnimationFrame throttling
  // const mouseRafId = useRef<number | null>(null);
  // const handleMouseMove = useCallback((e: React.MouseEvent) => {
  //   const { clientX, clientY } = e;
  //   if (mouseRafId.current !== null) return;
  //   mouseRafId.current = requestAnimationFrame(() => {
  //     const nx = (clientX / window.innerWidth - 0.5) * 2;
  //     const ny = (clientY / window.innerHeight - 0.5) * 2;
  //     setMouseOffset({ x: nx, y: ny });
  //     mouseRafId.current = null;
  //   });
  // }, []);

  return (
    // <section
    //   id="home"
    //   onMouseMove={handleMouseMove}
    //   className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 pb-16 sm:pb-20"
    // >
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 pb-16 sm:pb-20"
    >
      {/* ── Dynamic Ambient Motion Background Layer ── */}
      <HeroBackgroundMotion
        mouseOffset={mouseOffset}
        activeAccent={
          activeCanvasIdx === 1
            ? "#fbbf24"
            : activeCanvasIdx === 2 || activeCanvasIdx === 4
            ? "#34d399"
            : activeCanvasIdx === 6
            ? "#fbbf24"
            : "#43d9ff"
        }
      />

      {/* Hero Content Wrapper — 1600px Max Container Width */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-8 lg:gap-14 items-center">

          {/* Hero Left Column */}
          <div className="flex flex-col items-start text-left max-w-3xl pointer-events-auto">

            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-nd-ping" />
              <span className="font-mono text-[11px] sm:text-[12px] font-medium tracking-wide text-[var(--color-cyan)] uppercase">
                Enterprise Engineering · Cognitive AI · Cloud Studio
              </span>
            </div>

            {/* ── Typewriter Heading & Slogan Slider ── */}
            <div className="my-2 min-h-[120px] sm:min-h-[145px]">
              <div className="hero-typewriter">
                <h1 className="font-display text-[clamp(1.48rem,3.6vw,3.4rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-[var(--color-foam)] min-h-[1.12em]">
                  <span ref={headingTextRef} />
                  <span
                    className="typewriter-cursor"
                    style={{ height: "0.82em" }}
                    aria-hidden="true"
                  />
                </h1>

                {/* Slogan — small text with smooth fade / slide */}
                <div
                  ref={sloganWrapRef}
                  className="overflow-hidden"
                  style={{
                    maxHeight: 0,
                    opacity: 0,
                    transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
                  }}
                >
                  <p
                    ref={sloganRef}
                    className="mt-3.5 max-w-2xl text-xs sm:text-[13px] md:text-sm font-normal leading-relaxed text-[var(--color-mist)] tracking-normal"
                  />
                </div>
              </div>
            </div>

            {/* ── Designer Architecture Navigation (Left / Right Arrows & Index Tracker) ── */}
            <div className="hero-in mt-5 mb-8 flex items-center gap-3 sm:gap-4 select-none">
              {/* Left Arrow Button */}
              <button
                onClick={() => jumpTo((activeCanvasIdx - 1 + HERO_SHAPES.length) % HERO_SHAPES.length)}
                aria-label="Previous architecture"
                className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/5 hover:bg-cyan/10 hover:border-cyan/60 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(67,217,255,0.35)] cursor-pointer focus:outline-none"
              >
                <svg
                  className="w-4 h-4 text-white/80 group-hover:text-cyan transition-transform duration-300 group-hover:-translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <span className="absolute inset-0 rounded-full border border-cyan/0 group-hover:border-cyan/40 transition-colors duration-300 pointer-events-none" />
              </button>

              {/* Center Architecture Tracker Capsule */}
              <div className="flex items-center gap-3 px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
                {/* Numerals: Active / Total */}
                <div className="flex items-center font-mono text-xs tracking-wider">
                  <span className="font-bold text-cyan">
                    {String(activeCanvasIdx + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-1.5 text-white/20">/</span>
                  <span className="text-[var(--color-mist)]">
                    {String(HERO_SHAPES.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Segmented Interactive Progress Dots/Pills */}
                <div className="flex items-center gap-1.5">
                  {HERO_SHAPES.map((shape, i) => (
                    <button
                      key={shape.id}
                      onClick={() => jumpTo(i)}
                      aria-label={`Jump to architecture ${i + 1}: ${shape.name}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeCanvasIdx
                          ? "w-5 sm:w-6 bg-cyan shadow-[0_0_10px_rgba(67,217,255,0.7)]"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Active Architecture Name */}
                <span className="hidden md:inline font-mono text-[11px] uppercase tracking-wider text-[var(--color-mist)] border-l border-white/10 pl-3 max-w-[160px] truncate">
                  {HERO_SHAPES[activeCanvasIdx].name}
                </span>
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => jumpTo((activeCanvasIdx + 1) % HERO_SHAPES.length)}
                aria-label="Next architecture"
                className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/5 hover:bg-cyan/10 hover:border-cyan/60 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(67,217,255,0.35)] cursor-pointer focus:outline-none"
              >
                <svg
                  className="w-4 h-4 text-white/80 group-hover:text-cyan transition-transform duration-300 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span className="absolute inset-0 rounded-full border border-cyan/0 group-hover:border-cyan/40 transition-colors duration-300 pointer-events-none" />
              </button>
            </div>

            {/* Call To Action Button Row */}
            <div className="flex flex-wrap items-center gap-4 mb-9">
              <MagneticButton
                href="#contact"
                strength={0.3}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-cyan)] hover:brightness-110 shadow-lg shadow-[var(--color-ocean)]/30 transition-all duration-300 text-sm sm:text-base focus:outline-none"
              >
                <span>Let's talk</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </MagneticButton>

              <MagneticButton
                href="#services"
                strength={0.25}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[var(--color-foam)] border border-white/15 hover:border-[var(--color-cyan)]/40 hover:bg-white/5 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base focus:outline-none"
              >
                <span>Explore capabilities</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg className="w-4 h-4 text-[var(--color-mist)] group-hover:text-[var(--color-cyan)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </MagneticButton>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[12px] font-mono text-[var(--color-mist)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                100% custom-engineered architecture
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[12px] font-mono text-[var(--color-mist)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
                Enterprise-grade security & compliance
              </div>
            </div>

          </div>

          {/* Right column: Designer Futuristic Holographic Reactor & Telemetry HUD */}
          <div className="w-full flex items-center justify-center pointer-events-auto">
            <HeroVisualizer
              activeIdx={activeCanvasIdx}
              mouseOffset={mouseOffset}
              onNextShape={() => jumpTo((activeCanvasIdx + 1) % HERO_SHAPES.length)}
              onSelectSlide={(idx) => jumpTo(idx)}
            />
          </div>

        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-10 z-10 hidden sm:flex items-center gap-3 font-mono text-[11px] tracking-widest text-[var(--color-mist)] uppercase pointer-events-none select-none">
        <span className="w-1 h-8 rounded-full bg-white/10 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 rounded-full bg-[var(--color-cyan)] animate-nd-scan" />
        </span>
        <span>Scroll</span>
      </div>
    </section>
  );
}
