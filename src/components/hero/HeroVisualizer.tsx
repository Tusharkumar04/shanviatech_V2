import { useState, useEffect, useMemo } from "react";

interface HeroVisualizerProps {
  activeIdx: number;
  mouseOffset: { x: number; y: number };
  onNextShape: () => void;
  onSelectSlide: (idx: number) => void;
}

// 7 Topics metadata
const TOPIC_CONFIG = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    badge: "NEURAL CORE · ACTIVE",
    tagline: "Cognitive Inference & Deep Learning",
    accent: "#43d9ff",
    code: "AI-LLM // v4.2",
    metric1: { label: "Model Accuracy", value: "99.8%", sub: "Validation" },
    metric2: { label: "Inference Latency", value: "12ms", sub: "Cluster avg" },
    metric3: { label: "Neural Params", value: "175B", sub: "Transformer" },
  },
  {
    id: "bitcoin",
    name: "BITCOIN",
    badge: "BLOCKCHAIN · VERIFIED",
    tagline: "Decentralized Ledger & Cryptography",
    accent: "#fbbf24",
    code: "BTC-CORE // SHA-256",
    metric1: { label: "Current Block", value: "#884,210", sub: "Mainnet" },
    metric2: { label: "Ledger Drift", value: "0.00ms", sub: "Zero-Trust" },
    metric3: { label: "Hash Protocol", value: "PoW", sub: "256-bit" },
  },
  {
    id: "sensor",
    name: "Sensor Technology",
    badge: "QUANTUM SENSOR · ARMED",
    tagline: "Nano-Telemetry & Multi-Spectrum",
    accent: "#34d399",
    code: "SENS-Q // TELEMETRY",
    metric1: { label: "Atomic Precision", value: "0.01nm", sub: "Quantum" },
    metric2: { label: "Sampling Rate", value: "50kHz", sub: "Acoustic" },
    metric3: { label: "Energy Harvest", value: "100%", sub: "Self-powered" },
  },
  {
    id: "iot",
    name: "Internet of Things",
    badge: "SMART MESH · CONNECTED",
    tagline: "Hardware Edge & Wireless Telemetry",
    accent: "#43d9ff",
    code: "IOT-ESP // MQTT 5.4",
    metric1: { label: "Active Nodes", value: "2,450+", sub: "Mesh linked" },
    metric2: { label: "Edge Latency", value: "< 8ms", sub: "Sub-10ms" },
    metric3: { label: "Uptime SLA", value: "99.99%", sub: "Telemetry" },
  },
  {
    id: "ecommerce",
    name: "E-Commerce Development",
    badge: "STOREFRONT ENGINE · READY",
    tagline: "High-Throughput Digital Commerce",
    accent: "#34d399",
    code: "COMMERCE // HIGH-SCALE",
    metric1: { label: "Throughput", value: "14.8k/s", sub: "Req / second" },
    metric2: { label: "Cart Finality", value: "280ms", sub: "Sub-second" },
    metric3: { label: "Conversion Delta", value: "+38.4%", sub: "YoY Surge" },
  },
  {
    id: "mobile",
    name: "Mobile App Development",
    badge: "NATIVE RUNTIME · FLUID",
    tagline: "120Hz Native iOS, Android & Flutter",
    accent: "#43d9ff",
    code: "APP-ARCH // DUAL-CORE",
    metric1: { label: "Display Rate", value: "120 FPS", sub: "ProMotion" },
    metric2: { label: "Clean Bundle", value: "8.4MB", sub: "Optimized" },
    metric3: { label: "Cross-Platform", value: "Native", sub: "Swift/Kotlin" },
  },
  {
    id: "datascience",
    name: "Data Science",
    badge: "PREDICTIVE ML · STREAMING",
    tagline: "Statistical RAG & Vector Clustering",
    accent: "#fbbf24",
    code: "DATA-CORE // VECTOR RAG",
    metric1: { label: "Vector Search", value: "100M+", sub: "Indexed" },
    metric2: { label: "Row Ingestion", value: "4.8M/s", sub: "Throughput" },
    metric3: { label: "Confidence", value: "99.4%", sub: "Regression" },
  },
];

/* ──────────────────────────────────────────────────────────
   1. AI APPARATUS: Glowing Cognitive Nucleus & Synaptic Axons
   ────────────────────────────────────────────────────────── */
function AIApparatus() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Core Aura */}
      <div className="absolute w-36 h-36 rounded-full bg-cyan-500/20 blur-2xl animate-pulse" />
      <div className="absolute w-24 h-24 rounded-full bg-blue-500/30 blur-xl animate-pulse [animation-delay:400ms]" />

      <svg className="w-72 h-72 sm:w-80 sm:h-80" viewBox="0 0 320 320" fill="none">
        <defs>
          <radialGradient id="aiCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eaf3f7" stopOpacity="1" />
            <stop offset="35%" stopColor="#43d9ff" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#1b9fe0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#081d32" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbiting Hexagonal Synapse Rings */}
        <polygon
          points="160,50 255,105 255,215 160,270 65,215 65,105"
          stroke="#43d9ff"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          strokeOpacity="0.4"
          className="animate-[spin_60s_linear_infinite] origin-center"
        />
        <polygon
          points="160,80 230,120 230,200 160,240 90,200 90,120"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          className="animate-[spin-rev_35s_linear_infinite] origin-center"
        />

        {/* Synaptic Axons (Lines Connecting Core to Vertices) */}
        <line x1="160" y1="160" x2="160" y2="50" stroke="#43d9ff" strokeWidth="1.8" strokeOpacity="0.6" />
        <line x1="160" y1="160" x2="255" y2="105" stroke="#34d399" strokeWidth="1.8" strokeOpacity="0.6" />
        <line x1="160" y1="160" x2="255" y2="215" stroke="#1b9fe0" strokeWidth="1.8" strokeOpacity="0.6" />
        <line x1="160" y1="160" x2="160" y2="270" stroke="#43d9ff" strokeWidth="1.8" strokeOpacity="0.6" />
        <line x1="160" y1="160" x2="65" y2="215" stroke="#34d399" strokeWidth="1.8" strokeOpacity="0.6" />
        <line x1="160" y1="160" x2="65" y2="105" stroke="#1b9fe0" strokeWidth="1.8" strokeOpacity="0.6" />

        {/* Outer Synaptic Nodes */}
        <circle cx="160" cy="50" r="7" fill="#43d9ff" className="animate-pulse" />
        <circle cx="255" cy="105" r="7" fill="#34d399" className="animate-pulse [animation-delay:200ms]" />
        <circle cx="255" cy="215" r="7" fill="#1b9fe0" className="animate-pulse [animation-delay:400ms]" />
        <circle cx="160" cy="270" r="7" fill="#43d9ff" className="animate-pulse [animation-delay:600ms]" />
        <circle cx="65" cy="215" r="7" fill="#34d399" className="animate-pulse [animation-delay:800ms]" />
        <circle cx="65" cy="105" r="7" fill="#1b9fe0" className="animate-pulse [animation-delay:1000ms]" />

        {/* Central Glowing Cognitive Nucleus */}
        <circle cx="160" cy="160" r="34" fill="url(#aiCore)" />
        <circle cx="160" cy="160" r="14" fill="#ffffff" className="animate-ping opacity-75" />
        <circle cx="160" cy="160" r="12" fill="#eaf3f7" />
      </svg>

      {/* Floating Prompt Chip (Top) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-400/30 backdrop-blur-md shadow-lg shadow-cyan-500/10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-mono text-[10px] text-cyan-300 font-medium">Deep Neural Weights Loaded</span>
      </div>

      {/* Equalizer Frequency Bars (Bottom) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-6 px-4 py-1 rounded-full bg-slate-950/60 border border-white/10 backdrop-blur-md">
        {[8, 18, 12, 22, 16, 24, 10, 14].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}px` }}
            className="w-1 bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-full animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   2. BITCOIN APPARATUS: 3D Isometric Blockchain & Genesis Cube
   ────────────────────────────────────────────────────────── */
function BitcoinApparatus() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Gold Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />

      <svg className="w-72 h-72 sm:w-80 sm:h-80" viewBox="0 0 320 320" fill="none">
        {/* Outer Isometric Cube Wireframe */}
        <polygon
          points="160,40 260,95 260,205 160,260 60,205 60,95"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeOpacity="0.8"
        />

        {/* Cube Facets */}
        {/* Top Face */}
        <polygon points="160,40 260,95 160,150 60,95" fill="rgba(251, 191, 36, 0.08)" stroke="#fbbf24" strokeWidth="1.2" />
        {/* Left Face */}
        <polygon points="60,95 160,150 160,260 60,205" fill="rgba(67, 217, 255, 0.06)" stroke="#43d9ff" strokeWidth="1.2" />
        {/* Right Face */}
        <polygon points="260,95 160,150 160,260 260,205" fill="rgba(11, 108, 176, 0.15)" stroke="#1b9fe0" strokeWidth="1.2" />

        {/* Floating Bitcoin ₿ Monogram */}
        <g className="animate-bounce" style={{ animationDuration: "3s" }}>
          <circle cx="160" cy="148" r="28" fill="#fbbf24" fillOpacity="0.18" stroke="#fbbf24" strokeWidth="2.5" />
          {/* Bitcoin 'B' Path */}
          <path
            d="M 152 130 L 164 130 C 169 130 172 133 172 137 C 172 140 169 143 164 144 C 170 145 174 148 174 153 C 174 158 170 162 163 162 L 152 162 Z M 156 135 L 156 143 L 163 143 C 166 143 168 141 168 139 C 168 137 166 135 163 135 Z M 156 148 L 156 157 L 163 157 C 167 157 169 155 169 152.5 C 169 150 167 148 163 148 Z"
            fill="#fbbf24"
          />
          <line x1="157" y1="124" x2="157" y2="130" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="165" y1="124" x2="165" y2="130" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="157" y1="162" x2="157" y2="168" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="165" y1="162" x2="165" y2="168" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Blockchain Node Struts */}
        <circle cx="160" cy="40" r="5" fill="#43d9ff" />
        <circle cx="260" cy="95" r="5" fill="#fbbf24" />
        <circle cx="260" cy="205" r="5" fill="#43d9ff" />
        <circle cx="160" cy="260" r="5" fill="#fbbf24" />
        <circle cx="60" cy="205" r="5" fill="#43d9ff" />
        <circle cx="60" cy="95" r="5" fill="#fbbf24" />
      </svg>

      {/* Live Hash Stream Ticket (Bottom) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 font-mono text-[9px] text-amber-300 flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>HASH: 000000000019d6689c08...4e2b</span>
      </div>

      {/* Security Shield Badge (Top) */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 font-mono text-[10px] text-foam flex items-center gap-2">
        <span className="text-amber-400 font-bold">PoW Consensus</span>
        <span className="text-mist">· 256-Bit Cryptography</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. SENSOR APPARATUS: Quantum Sonar, LiDAR & Pulse Waves
   ────────────────────────────────────────────────────────── */
function SensorApparatus() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Emerald Aura */}
      <div className="absolute w-44 h-44 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />

      <svg className="w-72 h-72 sm:w-80 sm:h-80" viewBox="0 0 320 320" fill="none">
        {/* Concentric Telemetry Sonar Rings */}
        <circle cx="160" cy="160" r="130" stroke="#34d399" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 6" />
        <circle cx="160" cy="160" r="100" stroke="#43d9ff" strokeWidth="1.2" strokeOpacity="0.4" />
        <circle cx="160" cy="160" r="70" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 8" />
        <circle cx="160" cy="160" r="40" stroke="#43d9ff" strokeWidth="1.8" strokeOpacity="0.7" />

        {/* 360° Rotating Radar Sweep */}
        <g className="animate-[spin_7s_linear_infinite] origin-[160px_160px]">
          <path
            d="M 160 160 L 160 30 A 130 130 0 0 1 252 68 Z"
            fill="url(#radarGradient)"
            opacity="0.35"
          />
          <line x1="160" y1="160" x2="252" y2="68" stroke="#34d399" strokeWidth="2" strokeOpacity="0.9" />
        </g>

        {/* Linear Gradient for Sweep */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#081d32" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Crosshair Target Axes */}
        <line x1="160" y1="20" x2="160" y2="300" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 6" />
        <line x1="20" y1="160" x2="300" y2="160" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 6" />

        {/* Detected Sensor Target Blips */}
        <g>
          <circle cx="215" cy="105" r="5" fill="#fbbf24" className="animate-ping" />
          <circle cx="215" cy="105" r="4" fill="#fbbf24" />
          <text x="224" y="108" fill="#fbbf24" fontSize="8" fontFamily="monospace">OBJ_A: 0.01nm</text>
        </g>
        <g>
          <circle cx="110" cy="225" r="4" fill="#34d399" />
          <text x="75" y="238" fill="#34d399" fontSize="8" fontFamily="monospace">OBJ_B: 50kHz</text>
        </g>

        {/* Central Core Sensor Emitter */}
        <circle cx="160" cy="160" r="16" fill="#34d399" fillOpacity="0.3" />
        <circle cx="160" cy="160" r="8" fill="#34d399" />
        <circle cx="160" cy="160" r="3" fill="#ffffff" />
      </svg>

      {/* Telemetry Indicator (Bottom) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 font-mono text-[9px] text-emerald-300 flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>MULTI-SPECTRUM SAMPLING LIVE</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   4. IOT APPARATUS: Smart Microcontroller PCB & Satellite Mesh
   ────────────────────────────────────────────────────────── */
function IoTApparatus() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Blue Cyan Aura */}
      <div className="absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

      <svg className="w-72 h-72 sm:w-80 sm:h-80" viewBox="0 0 320 320" fill="none">
        {/* PCB Board Outline */}
        <rect x="70" y="70" width="180" height="180" rx="16" fill="rgba(8, 29, 50, 0.75)" stroke="#43d9ff" strokeWidth="1.8" />

        {/* Gold Corner Mounting Holes */}
        <circle cx="85" cy="85" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="235" cy="85" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="85" cy="235" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="235" cy="235" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />

        {/* Central ESP32 / Microcontroller Chip */}
        <rect x="115" y="115" width="90" height="90" rx="8" fill="#041526" stroke="#34d399" strokeWidth="2" />
        <text x="160" y="152" fill="#43d9ff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          ESP32-S3
        </text>
        <text x="160" y="168" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">
          240MHz · BLE 5
        </text>

        {/* Chip Pins */}
        {[125, 140, 155, 170, 185].map((x) => (
          <g key={x}>
            <line x1={x} y1="102" x2={x} y2="115" stroke="#fbbf24" strokeWidth="2" />
            <line x1={x} y1="205" x2={x} y2="218" stroke="#fbbf24" strokeWidth="2" />
          </g>
        ))}
        {[125, 140, 155, 170, 185].map((y) => (
          <g key={y}>
            <line x1="102" y1={y} x2="115" y2={y} stroke="#fbbf24" strokeWidth="2" />
            <line x1="205" y1={y} x2="218" y2={y} stroke="#fbbf24" strokeWidth="2" />
          </g>
        ))}

        {/* Radiating RF Waves from Antenna */}
        <path d="M 160 50 A 20 20 0 0 1 180 70" stroke="#43d9ff" strokeWidth="1.8" strokeLinecap="round" className="animate-pulse" />
        <path d="M 160 40 A 30 30 0 0 1 190 70" stroke="#43d9ff" strokeWidth="1.8" strokeLinecap="round" className="animate-pulse [animation-delay:200ms]" />
        <path d="M 160 30 A 40 40 0 0 1 200 70" stroke="#43d9ff" strokeWidth="1.8" strokeLinecap="round" className="animate-pulse [animation-delay:400ms]" />

        {/* Satellite Smart Node 1 (Top-Left) */}
        <circle cx="45" cy="45" r="14" fill="rgba(8, 29, 50, 0.9)" stroke="#34d399" strokeWidth="1.5" />
        <circle cx="45" cy="45" r="4" fill="#34d399" className="animate-ping" />
        <line x1="55" y1="55" x2="70" y2="70" stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Satellite Smart Node 2 (Bottom-Right) */}
        <circle cx="275" cy="275" r="14" fill="rgba(8, 29, 50, 0.9)" stroke="#43d9ff" strokeWidth="1.5" />
        <circle cx="275" cy="275" r="4" fill="#43d9ff" className="animate-ping [animation-delay:300ms]" />
        <line x1="250" y1="250" x2="265" y2="265" stroke="#43d9ff" strokeWidth="1.2" strokeDasharray="3 3" />
      </svg>

      {/* Live Status Pill */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-400/30 font-mono text-[9px] text-cyan-300 flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>MQTT PROTOCOL · 2,450 NODES ONLINE</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   5. E-COMMERCE APPARATUS: High-Speed Checkout Terminal & Cart
   ────────────────────────────────────────────────────────── */
function ECommerceApparatus() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Emerald Aura */}
      <div className="absolute w-44 h-44 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />

      <div className="relative w-64 sm:w-72 p-5 rounded-2xl bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-2xl space-y-3">
        {/* Holographic Credit / Payment Chip Header */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-900/60 via-slate-900/90 to-emerald-950/60 border border-cyan-400/30 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-cyan-400/10 blur-xl" />
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-cyan-300 font-semibold tracking-wider uppercase">
              Shanvia Pay Gateway
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
              Sub-350ms
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-5 rounded bg-amber-400/80 flex items-center justify-center">
              <span className="w-4 h-3 rounded-sm border border-amber-800/40" />
            </div>
            <span className="font-mono text-xs text-foam tracking-widest">•••• 9842</span>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-mist">
            <span>HIGH-VOLUME CHECKOUT</span>
            <span className="text-emerald-400 font-bold">VERIFIED</span>
          </div>
        </div>

        {/* Live Transaction Velocity Sparkline */}
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-mist">Throughput Velocity</span>
            <span className="text-emerald-400 font-bold">+38.4% Surge</span>
          </div>
          <svg className="w-full h-8" viewBox="0 0 200 32" fill="none">
            <path
              d="M 0 28 Q 40 26 70 18 T 130 14 T 170 6 L 200 2"
              stroke="#34d399"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-[9px] font-mono text-mist">Req / Sec</div>
            <div className="text-sm font-display font-bold text-cyan-300">14,800</div>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-[9px] font-mono text-mist">Checkout Speed</div>
            <div className="text-sm font-display font-bold text-emerald-400">280 ms</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   6. MOBILE APPARATUS: 120Hz Native Smartphone Device Mockup
   ────────────────────────────────────────────────────────── */
function MobileApparatus() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Glow */}
      <div className="absolute w-40 h-56 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

      {/* Floating 3D Smartphone Chassis */}
      <div className="relative w-56 sm:w-64 h-[380px] sm:h-[410px] rounded-[36px] bg-slate-950 p-2.5 border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/20 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Island Pill (Top) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-slate-900 border border-white/10 flex items-center justify-between px-2.5 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        {/* Mobile App Screen Content */}
        <div className="w-full h-full rounded-[28px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-3 pt-8 flex flex-col justify-between overflow-hidden">
          {/* Header Card */}
          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center font-bold text-[10px] text-cyan-300">
                ST
              </div>
              <div>
                <div className="text-[11px] font-bold text-foam">Native Core</div>
                <div className="text-[9px] font-mono text-mist">120Hz ProMotion</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[9px]">
              Active
            </span>
          </div>

          {/* Interactive Metric Chart Widget */}
          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-400/20 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-mist">Frame Rate Stability</span>
              <span className="text-cyan-400 font-bold">120 FPS</span>
            </div>
            <div className="flex items-end gap-1.5 h-12">
              {[35, 45, 60, 50, 75, 90, 80, 100].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Action CTA Pill */}
          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20">
            <span>Deploy Architecture</span>
            <span>→</span>
          </button>

          {/* Bottom App Navigation Dock */}
          <div className="flex items-center justify-around py-1.5 border-t border-white/10 text-mist">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   7. DATA SCIENCE APPARATUS: Multi-Dimensional Analytics Matrix
   ────────────────────────────────────────────────────────── */
function DataScienceApparatus() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Amber Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />

      <svg className="w-72 h-72 sm:w-80 sm:h-80" viewBox="0 0 320 320" fill="none">
        {/* Coordinate Grid Guides */}
        <line x1="50" y1="40" x2="50" y2="260" stroke="#8fa9ba" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="50" y1="260" x2="280" y2="260" stroke="#8fa9ba" strokeWidth="1.5" strokeOpacity="0.4" />

        <line x1="50" y1="100" x2="280" y2="100" stroke="#8fa9ba" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 4" />
        <line x1="50" y1="160" x2="280" y2="160" stroke="#8fa9ba" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 4" />
        <line x1="50" y1="210" x2="280" y2="210" stroke="#8fa9ba" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 4" />

        {/* Statistical Distribution Bars */}
        <rect x="70" y="200" width="18" height="60" rx="3" fill="#0b6cb0" fillOpacity="0.6" />
        <rect x="100" y="150" width="18" height="110" rx="3" fill="#1b9fe0" fillOpacity="0.7" />
        <rect x="130" y="90" width="18" height="170" rx="3" fill="#43d9ff" fillOpacity="0.85" />
        <rect x="160" y="120" width="18" height="140" rx="3" fill="#34d399" fillOpacity="0.8" />
        <rect x="190" y="170" width="18" height="90" rx="3" fill="#fbbf24" fillOpacity="0.7" />
        <rect x="220" y="220" width="18" height="40" rx="3" fill="#f87171" fillOpacity="0.6" />

        {/* Predictive Regression Trendline (Surging Curve) */}
        <path
          d="M 60 230 Q 110 180 150 110 T 260 50"
          stroke="#fbbf24"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Scatter Data Clusters */}
        <circle cx="85" cy="180" r="4" fill="#43d9ff" className="animate-pulse" />
        <circle cx="120" cy="130" r="4.5" fill="#34d399" className="animate-pulse [animation-delay:200ms]" />
        <circle cx="150" cy="110" r="5" fill="#ffffff" />
        <circle cx="190" cy="85" r="4.5" fill="#fbbf24" className="animate-pulse [animation-delay:400ms]" />
        <circle cx="230" cy="65" r="4" fill="#43d9ff" className="animate-pulse [animation-delay:600ms]" />
        <circle cx="260" cy="50" r="6" fill="#fbbf24" className="animate-ping" />
      </svg>

      {/* Prediction Confidence Badge (Top) */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 font-mono text-[9px] text-amber-300 flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>RAG INFERENCE CONFIDENCE: 99.4%</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN EXPORT: Designer Kinetic Holographic Studio Visualizer
   ────────────────────────────────────────────────────────── */
export default function HeroVisualizer({
  activeIdx,
  mouseOffset,
  onNextShape,
  onSelectSlide,
}: HeroVisualizerProps) {
  const current = useMemo(
    () => TOPIC_CONFIG[activeIdx] || TOPIC_CONFIG[0],
    [activeIdx]
  );

  // 3D perspective mouse tilt
  const tiltX = -mouseOffset.y * 7;
  const tiltY = mouseOffset.x * 7;

  return (
    <div
      className="relative w-full h-[490px] sm:h-[550px] lg:h-[590px] max-w-[620px] mx-auto flex items-center justify-center select-none"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Kinetic Perspective Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Layer 0: Radial Ambient Lighting Bloom */}
        <div
          className="absolute inset-4 rounded-full pointer-events-none opacity-60 blur-3xl transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${current.accent}33 0%, rgba(27, 159, 224, 0.12) 40%, transparent 70%)`,
          }}
        />

        {/* Layer 1: Holographic Gyroscope & Cybernetic Orbital Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full max-w-[530px] max-h-[530px]" viewBox="0 0 540 540" fill="none">
            {/* Outer Compass Azimuth Ring */}
            <circle cx="270" cy="270" r="230" stroke="rgba(67, 217, 255, 0.16)" strokeWidth="1" />
            <g className="animate-[spin_80s_linear_infinite] origin-[270px_270px]">
              <circle cx="270" cy="270" r="215" stroke="rgba(67, 217, 255, 0.25)" strokeWidth="1.2" strokeDasharray="14 10 4 10" />
              <circle cx="270" cy="55" r="4" fill="#43d9ff" />
              <circle cx="485" cy="270" r="4" fill="#34d399" />
              <circle cx="270" cy="485" r="4" fill="#43d9ff" />
              <circle cx="55" cy="270" r="4" fill="#34d399" />
            </g>

            {/* Inner Counter-Rotating Telemetry Dashed Ring */}
            <g className="animate-[spin-rev_50s_linear_infinite] origin-[270px_270px]">
              <circle cx="270" cy="270" r="175" stroke="rgba(52, 211, 153, 0.22)" strokeWidth="1.5" strokeDasharray="8 14" />
              <circle cx="395" cy="145" r="5" fill="#43d9ff" />
              <circle cx="145" cy="395" r="4" fill="#fbbf24" />
            </g>
          </svg>
        </div>

        {/* Layer 2: Cybernetic Viewport Corner Brackets */}
        <div className="absolute top-3 left-3 font-mono text-[9px] text-[var(--color-cyan)]/40 pointer-events-none flex items-center gap-1">
          <span className="text-[var(--color-cyan)]">+</span>
          <span>LAT 42.10° N</span>
        </div>
        <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--color-cyan)]/40 pointer-events-none flex items-center gap-1">
          <span>SYS.07</span>
          <span className="text-[var(--color-cyan)]">+</span>
        </div>
        <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[var(--color-mist)]/40 pointer-events-none">
          + MATRIX_SYNC
        </div>
        <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[var(--color-mist)]/40 pointer-events-none">
          + HIGH_THROUGHPUT
        </div>

        {/* Layer 3: Central Morphing Digital Apparatus (The 7 Bespoke Visuals) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 transition-all duration-500">
          {activeIdx === 0 && <AIApparatus />}
          {activeIdx === 1 && <BitcoinApparatus />}
          {activeIdx === 2 && <SensorApparatus />}
          {activeIdx === 3 && <IoTApparatus />}
          {activeIdx === 4 && <ECommerceApparatus />}
          {activeIdx === 5 && <MobileApparatus />}
          {activeIdx === 6 && <DataScienceApparatus />}
        </div>

        {/* Layer 4: Top Floating Diagnostic Pill */}
        <div
          className="absolute top-4 right-4 z-20 pointer-events-auto"
          style={{ transform: "translateZ(35px)" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-400/30 shadow-lg shadow-cyan-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="font-mono text-[10px] font-semibold text-foam uppercase tracking-wider">
              {current.badge}
            </span>
          </div>
        </div>

        {/* Layer 5: Top-Left Build Tag */}
        <div
          className="absolute top-4 left-4 z-20 pointer-events-auto hidden sm:block"
          style={{ transform: "translateZ(25px)" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-mist font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{current.code}</span>
          </div>
        </div>

        {/* Layer 6: Bottom-Left Holographic Telemetry HUD Card */}
        <div
          className="absolute bottom-4 left-4 z-20 pointer-events-auto max-w-[280px] sm:max-w-[310px] w-full"
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="relative rounded-2xl p-3.5 sm:p-4 bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-2xl overflow-hidden">
            {/* Top Accent Line */}
            <div
              className="absolute top-0 inset-x-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${current.accent}, transparent)`,
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-md">
                  {String(activeIdx + 1).padStart(2, "0")} / 07
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-mist truncate">
                  {current.name}
                </span>
              </div>
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[3px] h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span className="w-[3px] h-3 bg-cyan-400 rounded-full animate-pulse [animation-delay:150ms]" />
                <span className="w-[3px] h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:300ms]" />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 my-2">
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-[9px] font-mono text-mist truncate">{current.metric1.label}</div>
                <div className="text-base font-display font-extrabold text-foam mt-0.5" style={{ color: current.accent }}>
                  {current.metric1.value}
                </div>
                <div className="text-[8px] font-mono text-mist/80">{current.metric1.sub}</div>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-[9px] font-mono text-mist truncate">{current.metric2.label}</div>
                <div className="text-base font-display font-extrabold text-foam mt-0.5">
                  {current.metric2.value}
                </div>
                <div className="text-[8px] font-mono text-mist/80">{current.metric2.sub}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 7: Interactive Morph Trigger (Bottom-Right) */}
        <div
          className="absolute bottom-4 right-4 z-20 pointer-events-auto"
          style={{ transform: "translateZ(35px)" }}
        >
          <button
            onClick={onNextShape}
            title="Click to advance to next topic apparatus"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 hover:border-cyan-400/50 text-foam hover:text-cyan-300 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <span className="text-[10px] font-mono tracking-wider uppercase hidden sm:inline">
              Next Visual
            </span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180 text-cyan-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
