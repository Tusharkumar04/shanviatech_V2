import { useState, useRef, useEffect, useCallback } from "react";
import { useScrollTextProgress, getWordRevealStyle } from "@/utils/useScrollTextProgress";

interface TestimonialItem {
  id: string;
  initial: string;
  name: string;
  location: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "adams",
    initial: "A",
    name: "ADAMS ADONIS",
    location: "MARYLAND, USA",
    quote:
      "My company has been a customer of Shanvia Tech for over 15 years. Services include web applications, software, and mobile development. Trustworthy, honest, dependable, and consistent. We will continue to leverage their experiences for all of our technology needs.",
  },
  {
    id: "biju",
    initial: "B",
    name: "BIJU DANIEL",
    location: "SHARJAH, UNITED ARAB EMIRATES",
    quote:
      "I recently had the pleasure of working with Shanvia Tech Solutions to develop my company's website, and I cannot express how impressed I am with their service. From the very start, Mr. Avinash and the team demonstrated an exceptional level of dedication, professionalism, and efficiency. Despite the tight timeline, they managed to complete the entire project within just a few days, delivering a high-quality website that perfectly captured our brand's essence. If you're looking for a fast, reliable, and high-quality solution, they are an excellent choice for top-notch web and mobile apps development services.",
  },
  {
    id: "gareth",
    initial: "G",
    name: "GARETH DAVID THOMAS",
    location: "GLASGOW, UNITED KINGDOM",
    quote:
      "It had been a great experience working with them. They are professionals and know pretty well what they are doing. They realize the value of time and hard work for providing the best output.",
  },
  {
    id: "george",
    initial: "G",
    name: "GEORGE MTHEMBO MASHATA",
    location: "JOHANNESBURG, SOUTH AFRICA",
    quote:
      "I was very happy to have worked with Shanvia Tech Solutions. They are very professional, strive to satisfy their clients, and you will never regret working with them.",
  },
];

const HEADLINE_WORDS = [
  { text: "We", accent: false },
  { text: "have", accent: false },
  { text: "received", accent: false },
  { text: "tons", accent: false },
  { text: "of", accent: false },
  { text: "awesome", accent: true },
  { text: "testimonials", accent: true },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [trackOffset, setTrackOffset] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollProgress = useScrollTextProgress(headingRef);

  const total = TESTIMONIALS.length;
  const slides = [
    { item: TESTIMONIALS[total - 1], realIndex: total - 1, slideKey: "clone-start" },
    ...TESTIMONIALS.map((item, idx) => ({
      item,
      realIndex: idx,
      slideKey: `main-${item.id}`,
    })),
    { item: TESTIMONIALS[0], realIndex: 0, slideKey: "clone-end" },
  ];

  const updateTrackOffset = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const activeCard = cardRefs.current[activeIndex + 1];
    if (!viewport || !track || !activeCard) return;

    const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const width = window.innerWidth;
    const targetOffset =
      width >= 768 && width < 1024
        ? activeCard.offsetLeft
        : activeCard.offsetLeft - (viewport.clientWidth - activeCard.offsetWidth) / 2;

    setTrackOffset(Math.min(maxOffset, Math.max(0, targetOffset)));
  }, [activeIndex]);

  useEffect(() => {
    updateTrackOffset();
    window.addEventListener("resize", updateTrackOffset);
    return () => window.removeEventListener("resize", updateTrackOffset);
  }, [updateTrackOffset]);

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);

  return (
    <section
      id="testimonials"
      className="on-light relative w-full bg-gradient-to-b from-[#f3f8fc] via-[#f8fbff] to-[#eef5fb] text-[#0a1c2c] py-20 sm:py-28 px-4 sm:px-8 border-t border-sky-200/70 overflow-hidden"
    >
      {/* Subtle Oceanic Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,108,176,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,108,176,0.035)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

      {/* Top-Right Orbital Telemetry Rings */}
      <div className="hidden md:flex absolute -top-12 right-12 w-72 h-72 items-center justify-center pointer-events-none opacity-65" aria-hidden="true">
        <div className="w-64 h-64 rounded-full border border-dashed border-sky-300/60 animate-[spin_50s_linear_infinite] relative">
          <span className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-[#0969aa]" />
          <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-[#0284c7]" />
        </div>
        <div className="absolute w-44 h-44 rounded-full border border-sky-300/50" />
        <div className="absolute w-28 h-28 rounded-full border border-dashed border-sky-300/60" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* ── Top Centered Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0284c7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-ping" />
            <span>WHAT PEOPLE SAY</span>
          </div>

          <h2
            ref={headingRef}
            className="font-display text-[clamp(2rem,4.2vw,3.3rem)] font-extrabold leading-[1.1] tracking-[-0.02em]"
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
                  className={`inline-block mr-[0.25em] transition-[opacity,transform,color] duration-200 ease-out select-none ${
                    item.accent
                      ? `font-serif italic font-normal tracking-normal ${
                          factor > 0.4
                            ? "text-[#0284c7] drop-shadow-[0_2px_12px_rgba(2,132,199,0.18)]"
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
        </div>

        {/* ── 3-Card Responsive Testimonials Carousel ── */}
        <div ref={viewportRef} className="overflow-hidden py-8 -my-8 max-w-6xl mx-auto">
          <div
            ref={trackRef}
            className="flex gap-6 items-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{ transform: `translate3d(${-trackOffset}px, 0, 0)` }}
          >
            {slides.map(({ item, realIndex, slideKey }, trackIdx) => {
              const isCenter = trackIdx === activeIndex + 1;

              return (
                <article
                  key={slideKey}
                  ref={(el) => {
                    cardRefs.current[trackIdx] = el;
                  }}
                  onClick={() => setActiveIndex(realIndex)}
                  className={`w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 flex flex-col justify-between text-center rounded-2xl bg-white border transition-all duration-500 cursor-pointer p-7 sm:p-8 ${
                    isCenter
                      ? "border-sky-200 shadow-[0_24px_60px_-14px_rgba(11,108,176,0.16)] lg:py-10 scale-100 opacity-100"
                      : "border-sky-100 shadow-[0_12px_32px_-12px_rgba(11,108,176,0.08)] opacity-85 hover:opacity-100 hover:border-sky-200 lg:scale-[0.97]"
                  }`}
                >
                  <div>
                    {/* Monogram Avatar */}
                    <div className="relative w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-b from-sky-50 to-white border border-sky-200 flex items-center justify-center shadow-sm">
                      <span className="font-display text-base font-bold text-[#0969aa]">
                        {item.initial}
                      </span>
                      <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>

                    {/* 5-Star Rating */}
                    <div className="flex items-center justify-center gap-1 mb-5 text-amber-400" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <svg key={starIdx} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xs sm:text-[13.5px] leading-relaxed text-slate-600 mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Footer */}
                  <div className="pt-5 border-t border-slate-100">
                    <div className="font-display text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0a1c2c]">
                      {item.name}
                    </div>
                    <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#0284c7] mt-1">
                      {item.location}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Carousel Controls ── */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full bg-white border border-sky-200 text-slate-600 hover:border-[#0284c7] hover:text-[#0284c7] shadow-sm flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View testimonial from ${item.name}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-6 bg-[#0284c7]"
                      : "w-1.5 bg-slate-300 hover:bg-sky-300"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full bg-white border border-sky-200 text-slate-600 hover:border-[#0284c7] hover:text-[#0284c7] shadow-sm flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

