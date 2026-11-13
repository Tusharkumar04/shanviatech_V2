import { useState, useRef, useEffect } from "react";
import { useScrollTextProgress, getWordRevealStyle } from "@/utils/useScrollTextProgress";

type BlogCategory =
  | "ALL"
  | "ARTIFICIAL INTELLIGENCE"
  | "BLOCKCHAIN & LEDGERS"
  | "WEB ENGINEERING";

interface BlogPost {
  id: string;
  category: Exclude<BlogCategory, "ALL">;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  visualType: "ai-commerce" | "blockchain" | "web-ai";
  highlights: string[];
  takeaways: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "ai-b2b-ecommerce",
    category: "ARTIFICIAL INTELLIGENCE",
    date: "October 2026",
    readTime: "5 min read",
    title: "AI in B2B eCommerce: Smart Features Every Manufacturer and Distributor Needs",
    excerpt:
      "Explore how predictive demand planning, automated tier-pricing microservices, and AI-driven catalogue search reduce procurement cycle times by over 40% across industrial supply chains.",
    author: "By Shanvia Tech Engineering",
    visualType: "ai-commerce",
    highlights: ["-40% Cycle Time", "Predictive SKU Pricing"],
    takeaways: [
      "Semantic SKU search and spec-sheet parsing eliminate manual part-number lookup across complex industrial catalogs.",
      "Automated contract tier-pricing microservices synchronize ERP inventory thresholds with real-time buyer quotes.",
      "Predictive reorder pipelines forecast seasonal distributor restocking before stockouts disrupt fulfillment.",
    ],
  },
  {
    id: "blockchain-development-india",
    category: "BLOCKCHAIN & LEDGERS",
    date: "September 2026",
    readTime: "6 min read",
    title: "Blockchain Development Company in India: How to Choose the Right Partner",
    excerpt:
      "Essential criteria for evaluating decentralized architecture partners: smart contract security auditing, ISO 27001 data compliance, and verifiable enterprise provenance tracking.",
    author: "By Shanvia Tech Engineering",
    visualType: "blockchain",
    highlights: ["ISO 27001", "Audited Contracts"],
    takeaways: [
      "Prioritize teams with formal smart-contract verification, automated fuzz testing, and zero-trust key custody workflows.",
      "Confirm hybrid off-chain indexing and compliance boundaries so sensitive enterprise PII stays outside public ledgers.",
      "Evaluate production SLA observability across validator nodes, gas optimization, and upgradeable proxy governance.",
    ],
  },
  {
    id: "ai-ready-website-development",
    category: "WEB ENGINEERING",
    date: "August 2026",
    readTime: "4 min read",
    title: "AI-Ready Website Development: 7 Essential Features Every Business Needs",
    excerpt:
      "From tokenized RAG search interfaces and accessible micro-frontends to edge serverless caching, understand how modern web platforms are built for the next decade of intelligent automation.",
    author: "By Shanvia Tech Engineering",
    visualType: "web-ai",
    highlights: ["Edge RAG", "Sub-50ms TTFB"],
    takeaways: [
      "Structured schema markup and semantic APIs let AI agents and search copilots index product capabilities accurately.",
      "Streaming RAG assistants embedded at the edge answer technical buyer questions using verified documentation.",
      "Modular micro-frontends with strict Core Web Vitals budgets keep interactive AI workflows responsive on any device.",
    ],
  },
];

const CATEGORIES: BlogCategory[] = [
  "ALL",
  "ARTIFICIAL INTELLIGENCE",
  "BLOCKCHAIN & LEDGERS",
  "WEB ENGINEERING",
];

function ArticleVisual({
  type,
  featured = false,
}: {
  type: BlogPost["visualType"];
  featured?: boolean;
}) {
  if (type === "ai-commerce") {
    return (
      <div
        className={`relative w-full overflow-hidden bg-gradient-to-br from-[#081726] via-[#0c2238] to-[#06101b] ${
          featured ? "h-60 sm:h-72 lg:h-80" : "h-44 sm:h-48"
        }`}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(40,178,245,0.35) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <svg
          viewBox="0 0 480 240"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="aiFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0b6cb0" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#28b2f5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#5cc9ff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M45 170 C120 165, 145 95, 225 100 C305 105, 330 55, 430 62"
            fill="none"
            stroke="url(#aiFlow)"
            strokeWidth="2.5"
          />
          <path
            d="M45 190 C135 188, 175 135, 245 135 C315 135, 355 95, 430 98"
            fill="none"
            stroke="#28b2f5"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          {[
            { x: 90, y: 150, h: 48, label: "Q1" },
            { x: 155, y: 122, h: 76, label: "Q2" },
            { x: 225, y: 100, h: 98, label: "Q3" },
            { x: 295, y: 78, h: 120, label: "Q4" },
            { x: 365, y: 58, h: 140, label: "AI" },
          ].map((bar) => (
            <g key={bar.label}>
              <rect
                x={bar.x - 14}
                y={bar.y}
                width="28"
                height={bar.h}
                rx="6"
                fill="#28b2f5"
                fillOpacity={bar.label === "AI" ? "0.28" : "0.14"}
                stroke="#28b2f5"
                strokeOpacity={bar.label === "AI" ? "0.7" : "0.3"}
              />
              <circle cx={bar.x} cy={bar.y} r="4" fill="#5cc9ff" />
            </g>
          ))}
          <rect
            x="28"
            y="24"
            width="164"
            height="36"
            rx="8"
            fill="#071320"
            fillOpacity="0.88"
            stroke="#28b2f5"
            strokeOpacity="0.35"
          />
          <circle cx="46" cy="42" r="4" fill="#28b2f5" />
          <text
            x="58"
            y="46"
            fill="#e2f4ff"
            fontSize="11"
            fontFamily="monospace"
          >
            DEMAND FORECAST +40%
          </text>
        </svg>
      </div>
    );
  }

  if (type === "blockchain") {
    return (
      <div
        className={`relative w-full overflow-hidden bg-gradient-to-br from-[#071320] via-[#0b1f33] to-[#050d16] ${
          featured ? "h-60 sm:h-72 lg:h-80" : "h-40 sm:h-full sm:min-h-[180px]"
        }`}
      >
        <svg
          viewBox="0 0 360 220"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <g stroke="#28b2f5" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
            <line x1="90" y1="70" x2="180" y2="110" />
            <line x1="180" y1="110" x2="270" y2="70" />
            <line x1="180" y1="110" x2="180" y2="168" />
            <line x1="90" y1="150" x2="180" y2="168" />
            <line x1="270" y1="150" x2="180" y2="168" />
          </g>
          {[
            { cx: 90, cy: 70, label: "NODE 01" },
            { cx: 270, cy: 70, label: "NODE 02" },
            { cx: 180, cy: 110, label: "LEDGER" },
            { cx: 90, cy: 150, label: "AUDIT" },
            { cx: 270, cy: 150, label: "ZK-PROOF" },
            { cx: 180, cy: 168, label: "ISO 27001" },
          ].map((node) => (
            <g key={node.label}>
              <rect
                x={node.cx - 34}
                y={node.cy - 16}
                width="68"
                height="32"
                rx="8"
                fill="#091a2c"
                stroke="#28b2f5"
                strokeOpacity={node.label === "LEDGER" ? "0.85" : "0.4"}
              />
              <text
                x={node.cx}
                y={node.cy + 4}
                textAnchor="middle"
                fill="#bfe8ff"
                fontSize="9"
                fontFamily="monospace"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br from-[#091829] via-[#0d243b] to-[#06111c] ${
        featured ? "h-60 sm:h-72 lg:h-80" : "h-40 sm:h-full sm:min-h-[180px]"
      }`}
    >
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full object-cover"
        aria-hidden="true"
      >
        <circle
          cx="180"
          cy="110"
          r="72"
          fill="none"
          stroke="#28b2f5"
          strokeOpacity="0.2"
          strokeDasharray="4 4"
        />
        <circle
          cx="180"
          cy="110"
          r="46"
          fill="#0b2238"
          fillOpacity="0.7"
          stroke="#28b2f5"
          strokeOpacity="0.55"
        />
        <text
          x="180"
          y="107"
          textAnchor="middle"
          fill="#e2f4ff"
          fontSize="11"
          fontFamily="monospace"
          fontWeight="bold"
        >
          EDGE RAG
        </text>
        <text
          x="180"
          y="123"
          textAnchor="middle"
          fill="#5cc9ff"
          fontSize="9"
          fontFamily="monospace"
        >
          &lt; 50ms TTFB
        </text>
        {[
          { x: 52, y: 54, text: "SCHEMA" },
          { x: 256, y: 54, text: "TOKENS" },
          { x: 52, y: 152, text: "STREAM" },
          { x: 256, y: 152, text: "VITALS" },
        ].map((chip) => (
          <g key={chip.text}>
            <rect
              x={chip.x}
              y={chip.y}
              width="62"
              height="22"
              rx="6"
              fill="#071320"
              stroke="#28b2f5"
              strokeOpacity="0.4"
            />
            <text
              x={chip.x + 31}
              y={chip.y + 14}
              textAnchor="middle"
              fill="#9fd8f8"
              fontSize="8.5"
              fontFamily="monospace"
            >
              {chip.text}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function BlogsSection() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("ALL");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollProgress = useScrollTextProgress(headingRef);

  useEffect(() => {
    if (!activePost) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePost(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePost]);

  const filteredPosts =
    selectedCategory === "ALL"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const featuredPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1);

  return (
    <section
      id="blogs"
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[var(--color-abyss)] text-[var(--color-foam)] border-t border-white/10 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 15%, rgba(11,108,176,0.28), transparent 45%), radial-gradient(circle at 85% 80%, rgba(40,178,245,0.16), transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-cyan)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
              Latest Insights &amp; Articles
            </div>

            <h2
              ref={headingRef}
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] text-[var(--color-foam)]"
            >
              {["Publish", "what", "you", "think,", "don't", "put", "it", "on"].map(
                (word, idx) => (
                  <span
                    key={word}
                    className="inline-block mr-[0.26em] transition-colors duration-300"
                    style={getWordRevealStyle(scrollProgress, idx, 10).style}
                  >
                    {word}
                  </span>
                )
              )}
              {["social", "media."].map((word, idx) => (
                <span
                  key={word}
                  className={`inline-block font-serif italic font-normal text-[var(--color-cyan)] ${
                    idx === 0 ? "mr-[0.22em]" : ""
                  }`}
                  style={getWordRevealStyle(scrollProgress, 8 + idx, 10).style}
                >
                  {word}
                </span>
              ))}
            </h2>

            <p className="text-sm sm:text-base text-[var(--color-mist)] mt-4 max-w-xl leading-relaxed">
              Architectural analyses, deep-dive engineering patterns, and enterprise tech strategy
              published regularly by our senior architects.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter articles by topic"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 rounded-full font-mono text-[10px] tracking-wider uppercase border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[var(--color-cyan)]/15 border-[var(--color-cyan)] text-white shadow-[0_0_20px_rgba(40,178,245,0.2)]"
                      : "bg-white/[0.03] border-white/10 text-[var(--color-mist)] hover:border-white/25 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {selectedCategory === "ALL" && featuredPost ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
            <article
              onClick={() => setActivePost(featuredPost)}
              className="lg:col-span-7 group flex flex-col justify-between rounded-2xl overflow-hidden bg-[#0a1624]/90 border border-white/10 hover:border-[var(--color-cyan)]/50 transition-all duration-300 cursor-pointer shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)]"
            >
              <div className="relative">
                <ArticleVisual type={featuredPost.visualType} featured />
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#06111c]/85 backdrop-blur-md border border-[var(--color-cyan)]/40 font-mono text-[10px] uppercase tracking-wider text-[var(--color-cyan)]">
                    Featured Brief
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#06111c]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] uppercase tracking-wider text-slate-200">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[11px] text-slate-400 mb-3">
                    {featuredPost.date} &bull; {featuredPost.readTime}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors leading-snug mb-3">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sm text-[var(--color-mist)] leading-relaxed mb-5">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 font-mono text-[10px] text-sky-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-slate-400">
                    {featuredPost.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-cyan)] group-hover:translate-x-0.5 transition-transform">
                    Read Article
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>

            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-7">
              {secondaryPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="group flex-1 grid grid-cols-1 sm:grid-cols-12 rounded-2xl overflow-hidden bg-[#0a1624]/90 border border-white/10 hover:border-[var(--color-cyan)]/50 transition-all duration-300 cursor-pointer shadow-[0_18px_45px_-20px_rgba(0,0,0,0.6)]"
                >
                  <div className="sm:col-span-5 relative">
                    <ArticleVisual type={post.visualType} />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#06111c]/85 backdrop-blur-md border border-white/15 font-mono text-[9px] uppercase tracking-wider text-sky-200">
                      {post.category}
                    </span>
                  </div>

                  <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-slate-400 mb-2">
                        {post.date} &bull; {post.readTime}
                      </div>
                      <h3 className="font-display text-base sm:text-[17px] font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors leading-snug mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[var(--color-mist)] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-slate-400 truncate">
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--color-cyan)] shrink-0">
                        Read
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        >
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          featuredPost && (
            <article
              onClick={() => setActivePost(featuredPost)}
              className="group grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden bg-[#0a1624]/90 border border-white/10 hover:border-[var(--color-cyan)]/50 transition-all duration-300 cursor-pointer"
            >
              <div className="lg:col-span-6 relative">
                <ArticleVisual type={featuredPost.visualType} featured />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#06111c]/85 backdrop-blur-md border border-[var(--color-cyan)]/40 font-mono text-[10px] uppercase tracking-wider text-[var(--color-cyan)]">
                  {featuredPost.category}
                </span>
              </div>
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[11px] text-slate-400 mb-3">
                    {featuredPost.date} &bull; {featuredPost.readTime}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors mb-3">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sm text-[var(--color-mist)] leading-relaxed mb-5">
                    {featuredPost.excerpt}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {featuredPost.takeaways.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400">
                    {featuredPost.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-cyan)]">
                    Read Full Brief
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          )
        )}
      </div>

      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
          onClick={() => setActivePost(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#091522] border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/35 font-mono text-[10px] uppercase tracking-wider text-[var(--color-cyan)]">
                  {activePost.category}
                </span>
                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  aria-label="Close article"
                  className="w-8 h-8 rounded-full border border-white/15 text-slate-300 hover:text-white hover:border-white/40 flex items-center justify-center cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="font-mono text-[11px] text-slate-400 mb-2">
                {activePost.date} &bull; {activePost.readTime} &bull; {activePost.author}
              </div>

              <h3
                id="blog-modal-title"
                className="font-display text-xl sm:text-2xl font-bold text-white mb-4"
              >
                {activePost.title}
              </h3>

              <p className="text-sm text-[var(--color-mist)] leading-relaxed mb-6">
                {activePost.excerpt}
              </p>

              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-cyan)] mb-3">
                  Key Engineering Takeaways
                </div>
                <ul className="space-y-3">
                  {activePost.takeaways.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
