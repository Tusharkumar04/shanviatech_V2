import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import MagneticButton from "@/components/ui/MagneticButton";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: string;
  badge: string;
  icon: (props: { className?: string }) => JSX.Element;
  preview: {
    tag: string;
    description: string;
    highlights: string[];
    type: "erp" | "ai" | "web" | "mobile";
  };
}

const SERVICES: ServiceItem[] = [
  {
    id: "erp",
    title: "Business & ERP Systems",
    subtitle: "Custom enterprise ERP, SCM, inventory & automation",
    href: "#erp",
    category: "01 / 04",
    badge: "Operations",
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="4" rx="1.5" />
        <rect x="14" y="10" width="7" height="11" rx="2" />
        <rect x="3" y="13" width="7" height="8" rx="2" />
      </svg>
    ),
    preview: {
      tag: "ERP · Supply Chain · Workflows",
      description: "Replace messy spreadsheets with real-time synchronized dashboards, inventory tracking and automated invoicing.",
      highlights: ["Multi-warehouse sync", "Automated ledgers", "Role-based security"],
      type: "erp",
    },
  },
  {
    id: "ai",
    title: "Cognitive AI & Agentic Solutions",
    subtitle: "Autonomous agents, neural LLM pipelines & smart RAG",
    href: "#ai",
    category: "02 / 04",
    badge: "Cognitive AI",
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
    preview: {
      tag: "Autonomous Agents · RAG · Intelligence",
      description: "Production LLM agents and predictive models integrated securely into enterprise infrastructure.",
      highlights: ["Deterministic guards", "Private vector RAG", "Real-time reasoning"],
      type: "ai",
    },
  },
  {
    id: "web",
    title: "Online Platforms & Web Applications",
    subtitle: "High-throughput SaaS, custom portals & APIs",
    href: "#web",
    category: "03 / 04",
    badge: "Web & Cloud",
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M13 6.5h.01" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
    preview: {
      tag: "Cloud Architecture · Scalable SaaS",
      description: "Fast, resilient web platforms engineered with modern TypeScript, React, high-concurrency microservices, and micro-animations.",
      highlights: ["Sub-100ms response", "Global CDN edge", "99.99% uptime"],
      type: "web",
    },
  },
  {
    id: "mobile",
    title: "Mobile & Smart Connected IoT",
    subtitle: "Native iOS, Android & real-time telemetry systems",
    href: "#mobile",
    category: "04 / 04",
    badge: "Mobile & IoT",
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M10.5 18h3M11 5h2" />
      </svg>
    ),
    preview: {
      tag: "iOS · Android · Hardware Edge",
      description: "Fluid cross-platform mobile apps coupled with low-latency device telemetry and push alerts.",
      highlights: ["Offline-first data", "Bluetooth / MQTT IoT", "Native 120Hz feel"],
      type: "mobile",
    },
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [activeLink, setActiveLink] = useState("#home");
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownTimeoutRef = useRef<number | null>(null);

  // Scroll listener: hides on scroll down, reveals on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If mobile menu is open, don't hide
      if (mobileMenuOpen) return;

      if (currentScrollY > 160 && currentScrollY > lastScrollY.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Handle dropdown hover delay
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  };

  const activeService = SERVICES[activeServiceIndex];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-3.5 sm:px-6 pt-3.5 sm:pt-4.5 pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav
          aria-label="Main"
          className="pointer-events-auto max-w-[1600px] mx-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[var(--color-navy)]/80 dark:bg-[#041526]/80 light:bg-white/80 backdrop-blur-xl border border-white/10 dark:border-white/12 light:border-black/5 shadow-[0_12px_40px_-10px_rgba(2,10,18,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] light:shadow-[0_10px_35px_-8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] transition-colors duration-300"
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] rounded-full px-2 py-1"
            aria-label="Shanvia Tech Solutions"
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-ocean)] to-[var(--color-cyan)] flex items-center justify-center p-0.5 shadow-md shadow-[var(--color-cyan)]/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[var(--color-abyss)] dark:bg-[#020a12] flex items-center justify-center">
                <span className="font-display font-extrabold text-[15px] bg-gradient-to-r from-[var(--color-wave)] to-[var(--color-cyan)] bg-clip-text text-transparent">
                  S
                </span>
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-nd-ping" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold tracking-tight text-[15px] sm:text-[16px] leading-tight text-[var(--color-foam)]">
                Shanvia<span className="text-[var(--color-cyan)]">Tech</span>
              </span>
              <span className="font-mono text-[9px] tracking-wider text-[var(--color-mist)] uppercase leading-none">
                Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((item) => {
              const isActive = activeLink === item.href;

              if (item.hasDropdown) {
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                        isServicesOpen
                          ? "text-[var(--color-cyan)] bg-white/10 dark:bg-white/10"
                          : "text-[var(--color-mist)] hover:text-[var(--color-foam)] hover:bg-white/5"
                      }`}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isServicesOpen ? "rotate-180 text-[var(--color-cyan)]" : "text-[var(--color-mist)]"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {/* Mega Dropdown Menu */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[780px] pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isServicesOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible translate-y-3 pointer-events-none"
                      }`}
                    >
                      <div className="relative rounded-3xl p-3.5 bg-[var(--color-navy)]/95 dark:bg-[#041526]/95 light:bg-[#f6f8fb]/95 backdrop-blur-2xl border border-white/10 dark:border-white/10 light:border-black/5 shadow-[0_30px_70px_-15px_rgba(2,10,18,0.65),inset_0_1px_0_rgba(255,255,255,0.15)] grid grid-cols-[1.1fr_0.9fr] gap-3 overflow-hidden">
                        
                        {/* Services List (Left Column) */}
                        <div className="flex flex-col gap-1.5 p-1">
                          {SERVICES.map((srv, idx) => {
                            const isCurrent = activeServiceIndex === idx;
                            const IconComponent = srv.icon;

                            return (
                              <a
                                key={srv.id}
                                href={srv.href}
                                onMouseEnter={() => setActiveServiceIndex(idx)}
                                onClick={() => {
                                  setActiveLink(item.href);
                                  setIsServicesOpen(false);
                                }}
                                className={`group/item flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-200 ${
                                  isCurrent
                                    ? "bg-white/10 dark:bg-white/10 shadow-sm"
                                    : "hover:bg-white/5"
                                }`}
                              >
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                                    isCurrent
                                      ? "bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]"
                                      : "bg-white/5 text-[var(--color-mist)] group-hover/item:text-[var(--color-foam)]"
                                  }`}
                                >
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-[14px] font-semibold leading-tight transition-colors duration-200 ${
                                        isCurrent
                                          ? "text-[var(--color-cyan)]"
                                          : "text-[var(--color-foam)] group-hover/item:text-[var(--color-foam)]"
                                      }`}
                                    >
                                      {srv.title}
                                    </span>
                                  </div>
                                  <p className="text-[12px] text-[var(--color-mist)] truncate leading-normal mt-0.5">
                                    {srv.subtitle}
                                  </p>
                                </div>
                                <span
                                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    isCurrent
                                      ? "translate-x-0.5 -translate-y-0.5 text-[var(--color-cyan)]"
                                      : "opacity-40 text-[var(--color-mist)] group-hover/item:opacity-80"
                                  }`}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <path d="M7 17 17 7M8 7h9v9" />
                                  </svg>
                                </span>
                              </a>
                            );
                          })}

                          {/* Mega Dropdown Footer Links */}
                          <div className="mt-2 pt-2.5 border-t border-white/10 flex items-center justify-between px-2 text-[12px]">
                            <a
                              href="#services"
                              className="text-[var(--color-cyan)] hover:underline flex items-center gap-1 font-medium"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              Explore all capabilities
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17 17 7M8 7h9v9" />
                              </svg>
                            </a>
                            <a
                              href="#contact"
                              className="text-[var(--color-mist)] hover:text-[var(--color-foam)] transition-colors"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              Custom project scope?
                            </a>
                          </div>
                        </div>

                        {/* Interactive Preview Card (Right Column) */}
                        <div className="relative rounded-2xl bg-[var(--color-abyss)] dark:bg-[#020a12] border border-white/10 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
                          {/* Ambient radial glow */}
                          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-cyan)]/20 blur-3xl pointer-events-none" />
                          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[var(--color-ocean)]/30 blur-3xl pointer-events-none" />

                          {/* Dynamic Visual Mockup Stage */}
                          <div className="relative z-10 h-36 rounded-xl bg-white/[0.04] border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
                            
                            {/* Mockup 1: ERP Dashboard */}
                            {activeService.preview.type === "erp" && (
                              <div className="w-full h-full flex flex-col justify-between">
                                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-nd-ping" />
                                    <span className="font-mono text-[10px] text-[var(--color-foam)] font-semibold tracking-wide">
                                      ERP · Real-Time SCM
                                    </span>
                                  </div>
                                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]">
                                    Active 99.8%
                                  </span>
                                </div>
                                <div className="grid grid-cols-6 gap-1.5 items-end h-16 pt-2">
                                  {[45, 75, 60, 92, 78, 100].map((height, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                      <div
                                        style={{ height: `${height}%` }}
                                        className="w-full rounded-t-sm bg-gradient-to-t from-[var(--color-ocean)] to-[var(--color-cyan)] animate-nd-rise"
                                      />
                                      <span className="font-mono text-[8px] text-[var(--color-mist)]">
                                        M{i + 1}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Mockup 2: AI Agentic Neural Stream */}
                            {activeService.preview.type === "ai" && (
                              <div className="w-full h-full flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="font-mono text-[10px] text-[var(--color-foam)] font-semibold">
                                      Autonomous AI Agent
                                    </span>
                                  </div>
                                  <span className="font-mono text-[9px] text-emerald-400">
                                    Ready
                                  </span>
                                </div>
                                <div className="space-y-1.5 py-1">
                                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-[var(--color-mist)] flex items-center justify-between">
                                    <span>&gt; Generating synthesis...</span>
                                    <span className="text-[var(--color-cyan)] font-bold">128 tok/s</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                                      <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-cyan)] animate-nd-pulse" />
                                    </div>
                                    <span className="font-mono text-[9px] text-[var(--color-cyan)]">99.4% conf</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Mockup 3: Web Platform Wireframe */}
                            {activeService.preview.type === "web" && (
                              <div className="w-full h-full flex flex-col justify-between">
                                <div className="flex items-center gap-1.5 pb-1 border-b border-white/10">
                                  <div className="flex gap-1">
                                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                  </div>
                                  <div className="flex-1 h-3 rounded-full bg-white/10 mx-2 flex items-center px-2">
                                    <span className="font-mono text-[8px] text-[var(--color-mist)]">
                                      https://platform.shanviatech.com
                                    </span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5 pt-1">
                                  <div className="p-1 rounded bg-white/5 h-12 flex flex-col justify-center items-center">
                                    <span className="font-mono text-[10px] font-bold text-[var(--color-cyan)]">18ms</span>
                                    <span className="font-mono text-[7px] text-[var(--color-mist)]">Latency</span>
                                  </div>
                                  <div className="p-1 rounded bg-white/5 h-12 flex flex-col justify-center items-center">
                                    <span className="font-mono text-[10px] font-bold text-emerald-400">99.99%</span>
                                    <span className="font-mono text-[7px] text-[var(--color-mist)]">Edge SLA</span>
                                  </div>
                                  <div className="p-1 rounded bg-white/5 h-12 flex flex-col justify-center items-center">
                                    <span className="font-mono text-[10px] font-bold text-[var(--color-wave)]">Auto</span>
                                    <span className="font-mono text-[7px] text-[var(--color-mist)]">Scaling</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Mockup 4: Mobile & IoT */}
                            {activeService.preview.type === "mobile" && (
                              <div className="w-full h-full flex items-center justify-between px-2">
                                <div className="w-24 h-full rounded-xl border border-white/20 bg-white/5 p-1.5 flex flex-col justify-between shadow-md">
                                  <div className="w-6 h-1 rounded-full bg-white/30 mx-auto" />
                                  <div className="space-y-1">
                                    <div className="w-full h-2 rounded bg-[var(--color-cyan)]/40" />
                                    <div className="w-3/4 h-1.5 rounded bg-white/20" />
                                  </div>
                                  <div className="w-full h-2 rounded bg-emerald-400/40" />
                                </div>
                                <div className="flex-1 pl-3 space-y-1.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                    <span className="font-mono text-[9px] text-[var(--color-foam)] font-semibold">
                                      IoT Mesh Synced
                                    </span>
                                  </div>
                                  <p className="font-mono text-[8px] text-[var(--color-mist)]">
                                    BLE / MQTT telemetry streaming
                                  </p>
                                </div>
                              </div>
                            )}

                          </div>

                          {/* Preview Details & Caption */}
                          <div className="relative z-10 pt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px] tracking-widest text-[var(--color-cyan)] uppercase font-semibold">
                                {activeService.category}
                              </span>
                              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-[var(--color-foam)]">
                                {activeService.badge}
                              </span>
                            </div>
                            <h4 className="font-display text-[15px] font-bold text-[var(--color-foam)] leading-snug">
                              {activeService.title}
                            </h4>
                            <p className="text-[11px] text-[var(--color-mist)] mt-1 line-clamp-2 leading-relaxed">
                              {activeService.preview.description}
                            </p>

                            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                              <div className="flex items-center gap-1 text-[9px] font-mono text-[var(--color-mist)]">
                                <span>{activeService.preview.highlights[0]}</span>
                              </div>
                              <a
                                href={activeService.href}
                                onClick={() => setIsServicesOpen(false)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-cyan)] hover:underline"
                              >
                                View Specs
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                  <path d="M7 17 17 7M8 7h9v9" />
                                </svg>
                              </a>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setActiveLink(item.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200 block ${
                      isActive
                        ? "text-[var(--color-foam)] font-semibold"
                        : "text-[var(--color-mist)] hover:text-[var(--color-foam)] hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_8px_var(--color-cyan)]" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Controls: Theme Toggle & Magnetic "Let's Talk" CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-mist)] hover:text-[var(--color-cyan)] hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            >
              {theme === "dark" ? (
                /* Sun icon */
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                /* Moon icon */
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            {/* Magnetic "Let's talk" CTA Button */}
            <MagneticButton
              href="#contact"
              strength={0.3}
              className="group relative inline-flex items-center gap-2 pl-4 pr-2.5 py-1.5 sm:pl-4.5 sm:pr-3 sm:py-1.5 rounded-full text-[13px] sm:text-[14px] font-semibold text-white bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-cyan)] hover:brightness-110 shadow-md shadow-[var(--color-ocean)]/30 transition-all duration-300 focus:outline-none"
            >
              <span>Let's talk</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1 text-[var(--color-foam)] hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[var(--color-abyss)]/90 backdrop-blur-2xl"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div className="relative h-full flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto">
          <ul className="space-y-4 list-none p-0 m-0">
            {NAV_LINKS.map((item, idx) => (
              <li key={item.label} className="border-b border-white/10 pb-3">
                <a
                  href={item.href}
                  onClick={() => {
                    setActiveLink(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between text-2xl font-display font-semibold text-[var(--color-foam)] hover:text-[var(--color-cyan)] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[var(--color-mist)]">
                    0{idx + 1}
                  </span>
                </a>

                {/* Mobile Sub-Services */}
                {item.hasDropdown && (
                  <div className="mt-3 pl-3 space-y-2.5 border-l-2 border-[var(--color-cyan)]/30">
                    {SERVICES.map((srv) => (
                      <a
                        key={srv.id}
                        href={srv.href}
                        onClick={() => {
                          setActiveLink(item.href);
                          setMobileMenuOpen(false);
                        }}
                        className="block text-[14px] text-[var(--color-mist)] hover:text-[var(--color-foam)] py-1"
                      >
                        {srv.title}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="pt-6 space-y-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-cyan)] shadow-lg shadow-[var(--color-cyan)]/20"
            >
              <span>Let's talk</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
            <p className="text-center font-mono text-xs text-[var(--color-mist)]">
              Shanvia Tech Solutions Private Limited
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

