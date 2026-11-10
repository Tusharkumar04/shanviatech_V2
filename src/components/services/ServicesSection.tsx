import { useState, useEffect, useRef } from "react";

interface ServiceItem {
  id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "branding",
    num: "01",
    category: "BRANDING AND IDENTITY",
    title: "BRAND IDENTITY PLAYS A SIGNIFICANT ROLE",
    description:
      "We craft distinctive, memorable corporate brand identities, design systems, and digital design languages that build immediate market authority.",
    tags: ["BRAND STRATEGY", "VISUAL IDENTITY", "DESIGN SYSTEMS"],
  },
  {
    id: "design-tech",
    num: "02",
    category: "WE CREATE DESIGNS AND TECHNOLOGY",
    title: "BRAND IDENTITY PLAYS A SIGNIFICANT ROLE",
    description:
      "Where artistic creativity meets engineering excellence. We design high-fidelity interactive prototypes and digital experiences that captivate users.",
    tags: ["UI/UX DESIGN", "WIREFRAMING", "CREATIVE TECH"],
  },
  {
    id: "web-apps",
    num: "03",
    category: "WEB APPS DEVELOPMENT",
    title: "INTUITIVE SOLUTIONS DELIVER DIGITAL SUCCESS",
    description:
      "Scalable, lightning-fast cloud web applications and SaaS platforms engineered for speed, fault tolerance, and fluid user interaction.",
    tags: ["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS"],
  },
  {
    id: "mobile-apps",
    num: "04",
    category: "MOBILE APPS DEVELOPMENT",
    title: "INTUITIVE SOLUTIONS DELIVER DIGITAL SUCCESS",
    description:
      "Native and cross-platform iOS and Android applications delivering fluid 120 FPS performance, biometric security, and offline synchronization.",
    tags: ["IOS", "ANDROID", "REACT NATIVE", "FLUTTER"],
  },
  {
    id: "software-dev",
    num: "05",
    category: "SOFTWARE DEVELOPMENT",
    title: "EXPERT SOFTWARE DEVELOPERS",
    description:
      "Enterprise-grade backend architectures, resilient microservices, and high-concurrency database pipelines built for global reliability.",
    tags: ["MICROSERVICES", "ERP ARCHITECTURE", "POSTGRESQL", "CLOUD"],
  },
  {
    id: "ai",
    num: "06",
    category: "ARTIFICIAL INTELLIGENCE",
    title: "AI ALLOWS MACHINES TO MODEL",
    description:
      "Autonomous agentic systems, vector embedding search, and fine-tuned transformer models that automate mission-critical operations.",
    tags: ["LLMS", "COGNITIVE AGENTS", "NEURAL NETWORKS", "PYTHON"],
  },
];

/* ──────────────────────────────────────────────────────────
   Graph 01: Geometric Diamond Radar & Brand Identity Nexus
   ────────────────────────────────────────────────────────── */
function BrandingGraph({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <svg className="w-full h-full max-w-[210px] max-h-[140px]" viewBox="0 0 200 130" fill="none">
        <defs>
          <radialGradient id="diamondGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#43d9ff" stopOpacity={isActive ? 0.35 : 0.15} />
            <stop offset="100%" stopColor="#0b6cb0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Circular Reference Orbit */}
        <circle
          cx="100"
          cy="65"
          r="48"
          stroke="rgba(67, 217, 255, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Rotating Outer Gyro Square */}
        <g className={`origin-[100px_65px] ${isActive ? "animate-[spin_24s_linear_infinite]" : ""}`}>
          <rect
            x="64"
            y="29"
            width="72"
            height="72"
            stroke="rgba(67, 217, 255, 0.28)"
            strokeWidth="1.2"
            fill="none"
            transform="rotate(45 100 65)"
          />
        </g>

        {/* Connecting Alignment Lines */}
        <line x1="100" y1="20" x2="100" y2="110" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
        <line x1="55" y1="65" x2="145" y2="65" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />

        {/* Diagonal Cross Struts */}
        <line x1="68" y1="33" x2="132" y2="97" stroke="rgba(67, 217, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="68" y1="97" x2="132" y2="33" stroke="rgba(67, 217, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Central Luminous Diamond Aura */}
        <polygon
          points="100,42 123,65 100,88 77,65"
          fill="url(#diamondGlow)"
          stroke="#43d9ff"
          strokeWidth={isActive ? "2" : "1.4"}
          className="transition-all duration-500"
        />

        {/* Central Nucleus Node */}
        <circle cx="100" cy="65" r="4.5" fill="#43d9ff" className={isActive ? "animate-ping [animation-duration:3s]" : ""} />
        <circle cx="100" cy="65" r="3.5" fill="#ffffff" />

        {/* 4 Satellite Diamond Vertices */}
        <circle cx="100" cy="22" r="3" fill="#43d9ff" />
        <circle cx="145" cy="65" r="3" fill="#34d399" />
        <circle cx="100" cy="108" r="3" fill="#43d9ff" />
        <circle cx="55" cy="65" r="3" fill="#34d399" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Graph 02: Creative Wireframe & Bézier Flow Graph
   ────────────────────────────────────────────────────────── */
function DesignTechGraph({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <svg className="w-full h-full max-w-[210px] max-h-[140px]" viewBox="0 0 200 130" fill="none">
        <defs>
          <linearGradient id="bezierGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1b9fe0" />
            <stop offset="50%" stopColor="#43d9ff" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* UI Wireframe Bounding Frames */}
        <rect
          x="30"
          y="72"
          width="16"
          height="16"
          rx="2"
          stroke="rgba(67, 217, 255, 0.4)"
          strokeWidth="1.2"
          fill="rgba(67, 217, 255, 0.05)"
        />
        <rect
          x="152"
          y="42"
          width="16"
          height="16"
          rx="2"
          stroke="rgba(52, 211, 153, 0.4)"
          strokeWidth="1.2"
          fill="rgba(52, 211, 153, 0.05)"
        />

        {/* Reference Dashed Axis Lines */}
        <line x1="38" y1="80" x2="80" y2="40" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="120" y1="90" x2="160" y2="50" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Control Handle Tangent Bars */}
        <circle cx="80" cy="40" r="2.5" fill="#43d9ff" />
        <circle cx="120" cy="90" r="2.5" fill="#34d399" />

        {/* Primary Animated S-Curve Bézier Line */}
        <path
          d="M 38 80 C 80 40, 120 90, 160 50"
          stroke="url(#bezierGrad)"
          strokeWidth={isActive ? "2.6" : "2"}
          strokeLinecap="round"
          className="transition-all duration-500"
        />

        {/* Flowing Dotted Particle Stream along the curve */}
        <path
          d="M 38 80 C 80 40, 120 90, 160 50"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="4 16"
          strokeDashoffset={isActive ? "-24" : "0"}
          className={`transition-all duration-700 ${isActive ? "animate-[dash-flow_2s_linear_infinite]" : ""}`}
        />

        {/* Anchor Nodes */}
        <circle cx="38" cy="80" r="3.5" fill="#43d9ff" />
        <circle cx="100" cy="65" r="4" fill="#ffffff" className={isActive ? "animate-ping [animation-duration:3s]" : ""} />
        <circle cx="100" cy="65" r="3" fill="#43d9ff" />
        <circle cx="160" cy="50" r="3.5" fill="#34d399" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Graph 03: Web Application Architecture Window & Code Flow
   ────────────────────────────────────────────────────────── */
function WebAppsGraph({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <svg className="w-full h-full max-w-[210px] max-h-[140px]" viewBox="0 0 200 130" fill="none">
        {/* Main Browser Window Chassis */}
        <rect
          x="32"
          y="22"
          width="136"
          height="86"
          rx="7"
          stroke={isActive ? "rgba(67, 217, 255, 0.6)" : "rgba(255, 255, 255, 0.18)"}
          strokeWidth="1.4"
          fill="rgba(3, 14, 28, 0.7)"
          className="transition-colors duration-500"
        />

        {/* Window Titlebar Header Line */}
        <line x1="32" y1="40" x2="168" y2="40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />

        {/* Window Controls (Traffic Lights) */}
        <circle cx="44" cy="31" r="2.2" fill="#f87171" />
        <circle cx="51" cy="31" r="2.2" fill="#fbbf24" />
        <circle cx="58" cy="31" r="2.2" fill="#34d399" />

        {/* Search URL Pill Bar */}
        <rect x="70" y="27" width="56" height="8" rx="4" fill="rgba(255, 255, 255, 0.08)" />

        {/* Application UI Layout Blocks */}
        {/* Left Sidebar block */}
        <rect
          x="42"
          y="48"
          width="32"
          height="22"
          rx="3"
          stroke="rgba(67, 217, 255, 0.3)"
          strokeWidth="1"
          fill="rgba(67, 217, 255, 0.08)"
        />
        <rect
          x="42"
          y="76"
          width="32"
          height="22"
          rx="3"
          stroke="rgba(67, 217, 255, 0.3)"
          strokeWidth="1"
          fill="rgba(67, 217, 255, 0.08)"
        />

        {/* Main Center Content Block */}
        <rect
          x="80"
          y="48"
          width="78"
          height="50"
          rx="4"
          stroke={isActive ? "#43d9ff" : "rgba(255, 255, 255, 0.2)"}
          strokeWidth="1.2"
          fill={isActive ? "rgba(67, 217, 255, 0.12)" : "rgba(255, 255, 255, 0.03)"}
          className="transition-colors duration-500"
        />

        {/* Content Wireframe Text Lines inside block */}
        <line x1="88" y1="58" x2="136" y2="58" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="88" y1="66" x2="148" y2="66" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="88" y1="74" x2="124" y2="74" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1.4" strokeLinecap="round" />

        {/* Interactive Pointer Cursor Arrow */}
        <path
          d="M 128 72 L 136 86 L 132 87 L 130 92 L 126 91 L 128 86 L 124 85 Z"
          fill="#43d9ff"
          stroke="#ffffff"
          strokeWidth="0.8"
          className={isActive ? "animate-pulse" : ""}
        />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Graph 04: Mobile Framework & Touch Telemetry Radar
   ────────────────────────────────────────────────────────── */
function MobileAppsGraph({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <svg className="w-full h-full max-w-[210px] max-h-[140px]" viewBox="0 0 200 130" fill="none">
        {/* Phone Chassis Silhouette */}
        <rect
          x="75"
          y="18"
          width="50"
          height="94"
          rx="10"
          stroke={isActive ? "#43d9ff" : "rgba(255, 255, 255, 0.22)"}
          strokeWidth="1.6"
          fill="rgba(3, 14, 28, 0.75)"
          className="transition-colors duration-500"
        />

        {/* Top Dynamic Island Sensor Pill */}
        <rect x="92" y="24" width="16" height="3" rx="1.5" fill="#ffffff" fillOpacity="0.7" />

        {/* Screen Wireframe Card 1 */}
        <rect x="82" y="34" width="36" height="24" rx="3" fill="rgba(67, 217, 255, 0.1)" stroke="rgba(67, 217, 255, 0.3)" strokeWidth="1" />
        <line x1="87" y1="42" x2="108" y2="42" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="87" y1="48" x2="102" y2="48" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Screen Wireframe Card 2 */}
        <rect x="82" y="62" width="36" height="18" rx="3" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

        {/* Touch Telemetry Pulse Ripple Wave */}
        <circle cx="100" cy="71" r="9" stroke="#43d9ff" strokeWidth="1" fill="none" className={isActive ? "animate-ping [animation-duration:2.5s]" : "opacity-0"} />
        <circle cx="100" cy="71" r="4.5" fill="#43d9ff" />

        {/* Bottom Home Indicator Bar */}
        <rect x="90" y="104" width="20" height="2" rx="1" fill="#ffffff" fillOpacity="0.4" />

        {/* Radiating Wireless Frequency Waves */}
        <path d="M 64 52 A 20 20 0 0 0 64 78" stroke="rgba(67, 217, 255, 0.25)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 58 46 A 28 28 0 0 0 58 84" stroke="rgba(67, 217, 255, 0.15)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />

        <path d="M 136 52 A 20 20 0 0 1 136 78" stroke="rgba(67, 217, 255, 0.25)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 142 46 A 28 28 0 0 1 142 84" stroke="rgba(67, 217, 255, 0.15)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Graph 05: Microservices Distributed Lattice & Cluster Network
   ────────────────────────────────────────────────────────── */
function SoftwareDevGraph({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <svg className="w-full h-full max-w-[210px] max-h-[140px]" viewBox="0 0 200 130" fill="none">
        <defs>
          <linearGradient id="clusterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43d9ff" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Microservice Gateway Conduit Lines */}
        <line x1="100" y1="28" x2="65" y2="65" stroke="rgba(67, 217, 255, 0.3)" strokeWidth="1.4" />
        <line x1="100" y1="28" x2="135" y2="65" stroke="rgba(67, 217, 255, 0.3)" strokeWidth="1.4" />
        <line x1="100" y1="28" x2="100" y2="65" stroke="rgba(67, 217, 255, 0.2)" strokeWidth="1.2" strokeDasharray="3 3" />

        <line x1="65" y1="65" x2="100" y2="65" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
        <line x1="100" y1="65" x2="135" y2="65" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />

        {/* Downstream Database Conduits */}
        <line x1="65" y1="65" x2="80" y2="102" stroke="rgba(52, 211, 153, 0.35)" strokeWidth="1.4" />
        <line x1="100" y1="65" x2="100" y2="102" stroke="rgba(52, 211, 153, 0.35)" strokeWidth="1.4" />
        <line x1="135" y1="65" x2="120" y2="102" stroke="rgba(52, 211, 153, 0.35)" strokeWidth="1.4" />
        <line x1="80" y1="102" x2="120" y2="102" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Top API Gateway Node */}
        <circle cx="100" cy="28" r="7" fill="rgba(67, 217, 255, 0.15)" stroke="#43d9ff" strokeWidth="1.5" />
        <circle cx="100" cy="28" r="4" fill="#ffffff" />

        {/* Mid-tier Microservice Service Nodes */}
        <circle cx="65" cy="65" r="5.5" fill="rgba(67, 217, 255, 0.2)" stroke="#43d9ff" strokeWidth="1.4" />
        <circle cx="65" cy="65" r="3" fill="#43d9ff" />

        <circle cx="100" cy="65" r="7.5" fill="rgba(67, 217, 255, 0.25)" stroke="#43d9ff" strokeWidth="1.6" className={isActive ? "animate-pulse" : ""} />
        <circle cx="100" cy="65" r="4" fill="#34d399" />

        <circle cx="135" cy="65" r="5.5" fill="rgba(67, 217, 255, 0.2)" stroke="#43d9ff" strokeWidth="1.4" />
        <circle cx="135" cy="65" r="3" fill="#43d9ff" />

        {/* Bottom Persistence Database Nodes */}
        <circle cx="80" cy="102" r="5" fill="rgba(52, 211, 153, 0.2)" stroke="#34d399" strokeWidth="1.4" />
        <circle cx="80" cy="102" r="2.5" fill="#34d399" />

        <circle cx="120" cy="102" r="5" fill="rgba(52, 211, 153, 0.2)" stroke="#34d399" strokeWidth="1.4" />
        <circle cx="120" cy="102" r="2.5" fill="#34d399" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Graph 06: Deep Neural Network Synaptic Synapses
   ────────────────────────────────────────────────────────── */
function AIGraph({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <svg className="w-full h-full max-w-[210px] max-h-[140px]" viewBox="0 0 200 130" fill="none">
        {/* Layer 1 Input Nodes: x = 50, y = 35, 65, 95 */}
        {/* Layer 2 Hidden Nodes: x = 100, y = 25, 52, 78, 105 */}
        {/* Layer 3 Output Nodes: x = 150, y = 35, 65, 95 */}

        {/* Synaptic Links between Layer 1 & Layer 2 */}
        {[35, 65, 95].map((y1) =>
          [25, 52, 78, 105].map((y2, idx) => (
            <line
              key={`l1-${y1}-${y2}`}
              x1="50"
              y1={y1}
              x2="100"
              y2={y2}
              stroke={isActive && (y1 === 65 || y2 === 52) ? "rgba(67, 217, 255, 0.45)" : "rgba(255, 255, 255, 0.08)"}
              strokeWidth={isActive && (y1 === 65 || y2 === 52) ? "1.4" : "0.8"}
            />
          ))
        )}

        {/* Synaptic Links between Layer 2 & Layer 3 */}
        {[25, 52, 78, 105].map((y2) =>
          [35, 65, 95].map((y3, idx) => (
            <line
              key={`l2-${y2}-${y3}`}
              x1="100"
              y1={y2}
              x2="150"
              y2={y3}
              stroke={isActive && (y2 === 52 || y3 === 65) ? "rgba(52, 211, 153, 0.45)" : "rgba(255, 255, 255, 0.08)"}
              strokeWidth={isActive && (y2 === 52 || y3 === 65) ? "1.4" : "0.8"}
            />
          ))
        )}

        {/* Layer 1 Input Nodes */}
        {[35, 65, 95].map((y, i) => (
          <circle key={`n1-${i}`} cx="50" cy={y} r="3.5" fill="#43d9ff" />
        ))}

        {/* Layer 2 Hidden Transformer Nodes */}
        {[25, 52, 78, 105].map((y, i) => (
          <g key={`n2-${i}`}>
            {isActive && (i === 1 || i === 2) && (
              <circle cx="100" cy={y} r="6" fill="#43d9ff" fillOpacity="0.3" className="animate-ping" />
            )}
            <circle cx="100" cy={y} r="4.5" fill="#ffffff" />
            <circle cx="100" cy={y} r="2.5" fill="#43d9ff" />
          </g>
        ))}

        {/* Layer 3 Output Inference Nodes */}
        {[35, 65, 95].map((y, i) => (
          <circle key={`n3-${i}`} cx="150" cy={y} r="3.5" fill="#34d399" />
        ))}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Main ServicesSection Component (Zero Top Text, Scroll Activated)
   ────────────────────────────────────────────────────────── */
export default function ServicesSection() {
  const [activeCardId, setActiveCardId] = useState<string>("branding");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll observer to activate cards automatically as user scrolls down the page
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const centerY = vh * 0.5;

      let closestId = "branding";
      let closestDist = Infinity;

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenterY = rect.top + rect.height * 0.5;
        const dist = Math.abs(cardCenterY - centerY);

        if (dist < closestDist) {
          closestDist = dist;
          closestId = SERVICES_DATA[index].id;
        }
      });

      setActiveCardId(closestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="services"
      className="relative w-full bg-[var(--color-abyss)] text-[var(--color-foam)] py-20 sm:py-28 px-4 sm:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Background Soft Oceanic Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-ocean)]/12 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-[var(--color-cyan)]/10 blur-[140px] pointer-events-none" />

      {/* ── Direct 6-Card Grid (No Top Text - Starts Directly With Visual Content) ── */}
      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {SERVICES_DATA.map((item, index) => {
            const isCurrentlyActive =
              hoveredCardId !== null
                ? hoveredCardId === item.id
                : activeCardId === item.id;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden ${
                  isCurrentlyActive
                    ? "border-[var(--color-cyan)]/70 bg-gradient-to-b from-white/[0.07] via-[#020e1c]/90 to-[#01060e] shadow-[0_20px_50px_-10px_rgba(67,217,255,0.22)] -translate-y-1.5 opacity-100"
                    : "border-white/10 bg-gradient-to-b from-white/[0.03] via-[#020914]/70 to-[#01050a] shadow-[0_10px_30px_rgba(0,0,0,0.5)] opacity-75 hover:opacity-100 hover:border-white/20"
                }`}
              >
                {/* ── Top Bar: Number Tag & Jump Arrow ── */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-white/70">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        isCurrentlyActive
                          ? "bg-[var(--color-cyan)] shadow-[0_0_8px_#43d9ff]"
                          : "bg-white/30"
                      }`}
                    />
                    <span>• {item.num}</span>
                  </div>

                  {/* Top-Right Arrow Circle */}
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isCurrentlyActive
                        ? "border-[var(--color-cyan)] bg-[var(--color-cyan)]/20 text-[var(--color-cyan)] shadow-[0_0_15px_rgba(67,217,255,0.35)]"
                        : "border-white/15 bg-white/5 text-white/60 group-hover:border-white/30 group-hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-mono transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </div>
                </div>

                {/* ── Graph-Type Visual Imagery ── */}
                <div className="relative h-[155px] sm:h-[165px] w-full my-2 flex items-center justify-center rounded-2xl bg-black/35 border border-white/5 overflow-hidden">
                  {item.id === "branding" && <BrandingGraph isActive={isCurrentlyActive} />}
                  {item.id === "design-tech" && <DesignTechGraph isActive={isCurrentlyActive} />}
                  {item.id === "web-apps" && <WebAppsGraph isActive={isCurrentlyActive} />}
                  {item.id === "mobile-apps" && <MobileAppsGraph isActive={isCurrentlyActive} />}
                  {item.id === "software-dev" && <SoftwareDevGraph isActive={isCurrentlyActive} />}
                  {item.id === "ai" && <AIGraph isActive={isCurrentlyActive} />}

                  {/* Corner Accent Glow */}
                  <div
                    className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${
                      isCurrentlyActive
                        ? "bg-[var(--color-cyan)]/20 opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </div>

                {/* ── Content Body: Category, Title, Description ── */}
                <div className="mt-5 flex flex-col flex-1 justify-between text-left">
                  <div>
                    {/* Category Tag */}
                    <span
                      className={`block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${
                        isCurrentlyActive
                          ? "text-[var(--color-cyan)]"
                          : "text-white/45 group-hover:text-white/70"
                      }`}
                    >
                      {item.category}
                    </span>

                    {/* Headline */}
                    <h3
                      className={`font-display text-lg sm:text-[19px] font-bold uppercase leading-snug mb-3 tracking-wide transition-colors duration-300 ${
                        isCurrentlyActive
                          ? "text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                          : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description - Smoothly revealed with high contrast when active */}
                    <p
                      className={`text-xs sm:text-[13px] leading-relaxed transition-all duration-400 mb-5 ${
                        isCurrentlyActive
                          ? "text-[var(--color-foam)] opacity-100"
                          : "text-[var(--color-mist)] opacity-70 group-hover:opacity-90"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Tech Tags Pill Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-0.5 rounded-md font-mono text-[9px] uppercase tracking-wider border transition-all duration-300 ${
                          isCurrentlyActive
                            ? "border-[var(--color-cyan)]/40 bg-[var(--color-cyan)]/10 text-[var(--color-cyan)]"
                            : "border-white/8 bg-white/[0.03] text-white/50"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

