import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  tz: number;
  c: string;
  a: number;
  ta: number;
  r: number;
  delay: number;
  md: number;
  fx: number;
  fy: number;
  fz: number;
  fc: string;
  fa: number;
  nx: number;
  ny: number;
  nz: number;
  nc: string;
  na: number;
}

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
  a: number;
}

export interface ShapeDefinition {
  id: string;
  name: string;
  tagline: string;
  shortLabel: string;
  headline: string;
  slogan: string;
  fn: (x: number, y: number) => string | null;
}

// Brand color palette
const C_CYAN = "#43d9ff";
const C_WAVE = "#1b9fe0";
const C_DEEP = "#0b6cb0";
const C_EMERALD = "#34d399";
const C_GOLD = "#fbbf24";
const C_RED = "#f87171";
const C_FOAM = "#eaf3f7";
const C_MIST = "#8fa9ba";

// Math utilities
function dist(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function inBox(x: number, y: number, x1: number, y1: number, x2: number, y2: number, r = 0) {
  if (x < x1 || x > x2 || y < y1 || y > y2) return false;
  if (r <= 0) return true;
  const cx = Math.max(x1 + r, Math.min(x, x2 - r));
  const cy = Math.max(y1 + r, Math.min(y, y2 - r));
  return dist(x, y, cx, cy) <= r || (x >= x1 + r && x <= x2 - r) || (y >= y1 + r && y <= y2 - r);
}

function inLine(x: number, y: number, x1: number, y1: number, x2: number, y2: number, thick: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return dist(x, y, x1, y1) <= thick;
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / lenSq));
  return dist(x, y, x1 + dx * t, y1 + dy * t) <= thick;
}

// 7 Procedural Tech Shapes (Normalized 0..260 grid)
export const HERO_SHAPES: ShapeDefinition[] = [
  // 1. ARTIFICIAL INTELLIGENCE: Neural Network & Cognitive Polyhedron Core
  {
    id: "ai",
    name: "Artificial Intelligence",
    tagline: "Neural Architectures & Cognitive Models",
    shortLabel: "01",
    headline: "Artificial Intelligence",
    slogan:
      "AI development involves designing and deploying intelligent systems using machine learning (ML), deep learning, and natural language processing (NLP) techniques.",
    fn: (x, y) => {
      const cx = 130;
      const cy = 130;
      const d = dist(x, y, cx, cy);

      // Central glowing core nucleus
      if (d <= 14) return C_FOAM;
      if (d <= 24 && d >= 18) return C_CYAN;

      // Inner polygon ring (Hexagon vertices)
      const innerNodes = [
        { x: 130, y: 78, c: C_CYAN },
        { x: 179, y: 96, c: C_EMERALD },
        { x: 179, y: 164, c: C_WAVE },
        { x: 130, y: 182, c: C_CYAN },
        { x: 81, y: 164, c: C_EMERALD },
        { x: 81, y: 96, c: C_WAVE },
      ];

      // Outer polygon ring (Expanded wireframe nodes)
      const outerNodes = [
        { x: 130, y: 38, c: C_CYAN },
        { x: 217, y: 78, c: C_EMERALD },
        { x: 217, y: 182, c: C_WAVE },
        { x: 130, y: 222, c: C_CYAN },
        { x: 43, y: 182, c: C_EMERALD },
        { x: 43, y: 78, c: C_WAVE },
      ];

      for (const n of innerNodes) {
        if (dist(x, y, n.x, n.y) <= 7.5) return n.c;
        if (inLine(x, y, cx, cy, n.x, n.y, 2.2)) return C_DEEP;
      }
      for (const n of outerNodes) {
        if (dist(x, y, n.x, n.y) <= 7.5) return n.c;
      }

      for (let i = 0; i < innerNodes.length; i++) {
        const next = innerNodes[(i + 1) % innerNodes.length];
        if (inLine(x, y, innerNodes[i].x, innerNodes[i].y, next.x, next.y, 2)) return C_WAVE;
        if (inLine(x, y, innerNodes[i].x, innerNodes[i].y, outerNodes[i].x, outerNodes[i].y, 2)) {
          return C_CYAN;
        }
      }

      for (let i = 0; i < outerNodes.length; i++) {
        const next = outerNodes[(i + 1) % outerNodes.length];
        if (inLine(x, y, outerNodes[i].x, outerNodes[i].y, next.x, next.y, 2.2)) return C_EMERALD;
      }

      if (inLine(x, y, innerNodes[0].x, innerNodes[0].y, innerNodes[2].x, innerNodes[2].y, 1.6)) return C_DEEP;
      if (inLine(x, y, innerNodes[2].x, innerNodes[2].y, innerNodes[4].x, innerNodes[4].y, 1.6)) return C_DEEP;
      if (inLine(x, y, innerNodes[4].x, innerNodes[4].y, innerNodes[0].x, innerNodes[0].y, 1.6)) return C_DEEP;

      return null;
    },
  },

  // 2. BITCOIN: Decentralized Blockchain Cube & ₿ Monogram
  {
    id: "bitcoin",
    name: "BITCOIN",
    tagline: "Blockchain & Decentralized Ledger",
    shortLabel: "02",
    headline: "BITCOIN",
    slogan:
      "Bitcoin development involves building applications and systems using the Bitcoin blockchain, focusing on secure peer-to-peer transactions and decentralized ledger technology.",
    fn: (x, y) => {
      // Outer 3D Isometric Blockchain Cube
      const hexPoints = [
        { x: 130, y: 35 },
        { x: 215, y: 82 },
        { x: 215, y: 178 },
        { x: 130, y: 225 },
        { x: 45, y: 178 },
        { x: 45, y: 82 },
      ];

      for (let i = 0; i < 6; i++) {
        const p1 = hexPoints[i];
        const p2 = hexPoints[(i + 1) % 6];
        if (inLine(x, y, p1.x, p1.y, p2.x, p2.y, 2.5)) return C_GOLD;
        if (dist(x, y, p1.x, p1.y) <= 6) return C_CYAN;
      }

      // Internal isometric cube struts
      if (inLine(x, y, 130, 130, 130, 35, 2)) return C_WAVE;
      if (inLine(x, y, 130, 130, 215, 178, 2)) return C_WAVE;
      if (inLine(x, y, 130, 130, 45, 178, 2)) return C_WAVE;

      // Central Bitcoin 'B' monogram
      // Vertical spine
      if (inBox(x, y, 106, 82, 118, 178, 2)) return C_GOLD;
      // Top & Bottom vertical serif pins
      if (inBox(x, y, 122, 70, 128, 82, 1)) return C_CYAN;
      if (inBox(x, y, 138, 70, 144, 82, 1)) return C_CYAN;
      if (inBox(x, y, 122, 178, 128, 190, 1)) return C_CYAN;
      if (inBox(x, y, 138, 178, 144, 190, 1)) return C_CYAN;

      // Top loop
      if (inBox(x, y, 116, 84, 154, 126, 8) && !inBox(x, y, 124, 94, 144, 116, 4)) return C_EMERALD;
      // Bottom loop
      if (inBox(x, y, 116, 126, 158, 174, 9) && !inBox(x, y, 124, 136, 146, 164, 4)) return C_EMERALD;
      // Center cross divider
      if (inLine(x, y, 114, 126, 148, 126, 2.5)) return C_FOAM;

      return null;
    },
  },

  // 3. SENSOR TECHNOLOGY: Quantum Sensor, Sonar Waves & Radar Crosshairs
  {
    id: "sensor",
    name: "Sensor Technology",
    tagline: "Quantum, AI & Energy-Harvesting",
    shortLabel: "03",
    headline: "Sensor Technology",
    slogan:
      "Sensor technology development is focused on making sensors smaller, more robust, and intelligent. Recent advancements include AI-powered, quantum, flexible, and energy-harvesting sensors.",
    fn: (x, y) => {
      const cx = 130;
      const cy = 130;
      const d = dist(x, y, cx, cy);

      // Central intelligent sensor chip / micro-core
      if (d <= 14) return C_FOAM;
      if (d <= 22 && d >= 16) return C_CYAN;

      // Concentric circular telemetry / pulse radar rings
      if (d >= 38 && d <= 42) return C_EMERALD;
      if (d >= 64 && d <= 68) return C_CYAN;
      if (d >= 90 && d <= 94) return C_WAVE;
      if (d >= 114 && d <= 118) return C_DEEP;

      // Radar crosshairs
      if (inLine(x, y, 130, 20, 130, 240, 1.8) && (d < 30 || d > 48)) return C_DEEP;
      if (inLine(x, y, 20, 130, 240, 130, 1.8) && (d < 30 || d > 48)) return C_DEEP;

      // Detected signal blips / quantum telemetry pulses
      if (dist(x, y, 178, 92) <= 6) return C_GOLD;
      if (dist(x, y, 82, 178) <= 5.5) return C_EMERALD;
      if (dist(x, y, 196, 164) <= 5) return C_CYAN;
      if (dist(x, y, 76, 76) <= 4.5) return C_FOAM;

      return null;
    },
  },

  // 4. INTERNET OF THINGS: Microcontroller MCU & Satellite Smart Nodes
  {
    id: "iot",
    name: "Internet of Things",
    tagline: "Smart Devices & ESP32 / Arduino",
    shortLabel: "04",
    headline: "Internet of Things",
    slogan:
      "IoT development involves designing and integrating smart devices with sensors, microcontrollers like ESP32, Arduino, or Raspberry Pi, and communication modules",
    fn: (x, y) => {
      // Central MCU Microcontroller Board
      if (inBox(x, y, 85, 85, 175, 175, 8)) {
        if (!inBox(x, y, 95, 95, 165, 165, 4)) return C_CYAN;
        // Central silicon processor die
        if (inBox(x, y, 110, 110, 150, 150, 3)) return C_EMERALD;
        if (inLine(x, y, 118, 126, 142, 126, 2)) return C_FOAM;
        if (inLine(x, y, 118, 134, 136, 134, 2)) return C_FOAM;
        return C_DEEP;
      }

      // External GPIO pin headers
      if (y >= 68 && y <= 85 && (x === 100 || x === 112 || x === 124 || x === 136 || x === 148 || x === 160)) return C_GOLD;
      if (y >= 175 && y <= 192 && (x === 100 || x === 112 || x === 124 || x === 136 || x === 148 || x === 160)) return C_GOLD;
      if (x >= 68 && x <= 85 && (y === 100 || y === 112 || y === 124 || y === 136 || y === 148 || y === 160)) return C_GOLD;
      if (x >= 175 && x <= 192 && (y === 100 || y === 112 || y === 124 || y === 136 || y === 148 || y === 160)) return C_GOLD;

      // Satellite edge device nodes connected wirelessly
      const nodes = [
        { x: 42, y: 42, c: C_EMERALD },
        { x: 218, y: 42, c: C_CYAN },
        { x: 42, y: 218, c: C_WAVE },
        { x: 218, y: 218, c: C_GOLD },
      ];
      for (const n of nodes) {
        if (dist(x, y, n.x, n.y) <= 8) return n.c;
        if (inLine(x, y, n.x, n.y, 130, 130, 1.8)) return C_DEEP;
      }

      return null;
    },
  },

  // 5. E-COMMERCE DEVELOPMENT: Digital Storefront & Shopping Cart
  {
    id: "ecommerce",
    name: "E-Commerce Development",
    tagline: "Digital Storefronts & Secure Payments",
    shortLabel: "05",
    headline: "E-Commerce Development",
    slogan:
      "E-Commerce development involves designing and deploying digital storefronts, secure payment gateways, inventory management, and seamless shopping experiences.",
    fn: (x, y) => {
      // Handle
      if (inLine(x, y, 42, 65, 78, 88, 3)) return C_CYAN;
      // Cart basket outline
      if (inLine(x, y, 78, 88, 202, 88, 3)) return C_CYAN;
      if (inLine(x, y, 202, 88, 178, 172, 3)) return C_CYAN;
      if (inLine(x, y, 178, 172, 86, 172, 3)) return C_CYAN;
      if (inLine(x, y, 86, 172, 78, 88, 3)) return C_CYAN;

      // Internal wireframe grid
      if (inLine(x, y, 82, 116, 194, 116, 1.8)) return C_WAVE;
      if (inLine(x, y, 84, 144, 184, 144, 1.8)) return C_WAVE;
      if (inLine(x, y, 118, 88, 112, 172, 1.8)) return C_WAVE;
      if (inLine(x, y, 156, 88, 150, 172, 1.8)) return C_WAVE;

      // Glowing package / digital item inside cart
      if (inBox(x, y, 108, 48, 162, 88, 4)) return C_GOLD;
      if (inLine(x, y, 135, 48, 135, 88, 2)) return C_FOAM;

      // Wheels
      if (dist(x, y, 104, 198) <= 12) return dist(x, y, 104, 198) <= 4 ? C_FOAM : C_EMERALD;
      if (dist(x, y, 168, 198) <= 12) return dist(x, y, 168, 198) <= 4 ? C_FOAM : C_EMERALD;
      if (inLine(x, y, 96, 172, 104, 192, 2.5)) return C_DEEP;
      if (inLine(x, y, 172, 172, 168, 192, 2.5)) return C_DEEP;

      return null;
    },
  },

  // 6. MOBILE APP DEVELOPMENT: Smartphone Chassis with Native UI Widgets
  {
    id: "mobile",
    name: "Mobile App Development",
    tagline: "iOS, Android & Flutter",
    shortLabel: "06",
    headline: "Mobile App Development",
    slogan:
      "The process of creating applications for smartphones and tablets using native platforms (iOS/Android) or cross-platform frameworks (Flutter, React Native).",
    fn: (x, y) => {
      // Outer phone chassis with rounded corners
      if (inBox(x, y, 76, 22, 184, 238, 22) && !inBox(x, y, 84, 34, 176, 226, 14)) {
        return C_CYAN;
      }

      // Top dynamic island pill / sensor
      if (inBox(x, y, 114, 42, 146, 50, 4)) return C_FOAM;

      // Bottom home indicator bar
      if (inBox(x, y, 112, 218, 148, 222, 2)) return C_MIST;

      // App UI Card 1: Top user banner with avatar dot
      if (inBox(x, y, 92, 58, 168, 92, 6)) {
        if (dist(x, y, 106, 75) <= 7) return C_EMERALD;
        if (inLine(x, y, 120, 70, 158, 70, 2)) return C_FOAM;
        if (inLine(x, y, 120, 80, 148, 80, 2)) return C_MIST;
        return C_WAVE;
      }

      // App UI Card 2: Metrics / Performance widget
      if (inBox(x, y, 92, 100, 168, 148, 6)) {
        if (inBox(x, y, 102, 128, 110, 142, 2)) return C_DEEP;
        if (inBox(x, y, 116, 120, 124, 142, 2)) return C_WAVE;
        if (inBox(x, y, 130, 114, 138, 142, 2)) return C_CYAN;
        if (inBox(x, y, 144, 108, 152, 142, 2)) return C_EMERALD;
        if (inLine(x, y, 100, 108, 140, 108, 1.8)) return C_FOAM;
        return C_DEEP;
      }

      // App UI Card 3: Action Button
      if (inBox(x, y, 92, 156, 168, 176, 6)) return C_EMERALD;

      // Bottom dock icons
      if (dist(x, y, 102, 196) <= 4.5) return C_CYAN;
      if (dist(x, y, 120, 196) <= 4.5) return C_WAVE;
      if (dist(x, y, 140, 196) <= 4.5) return C_EMERALD;
      if (dist(x, y, 158, 196) <= 4.5) return C_FOAM;

      // Radiating wireless waves on both sides
      const dL = dist(x, y, 76, 130);
      const dR = dist(x, y, 184, 130);
      if (dL >= 26 && dL <= 30 && x < 76 && Math.abs(y - 130) < 45) return C_CYAN;
      if (dL >= 44 && dL <= 48 && x < 76 && Math.abs(y - 130) < 65) return C_WAVE;
      if (dR >= 26 && dR <= 30 && x > 184 && Math.abs(y - 130) < 45) return C_CYAN;
      if (dR >= 44 && dR <= 48 && x > 184 && Math.abs(y - 130) < 65) return C_WAVE;

      return null;
    },
  },

  // 7. DATA SCIENCE: Coordinate Axes, Regression Trend Curve & Clustered Scatter Matrix
  {
    id: "datascience",
    name: "Data Science",
    tagline: "Statistical Analysis & ML Insights",
    shortLabel: "07",
    headline: "Data Science",
    slogan:
      "Data Science development focuses on extracting actionable insights from large datasets using statistical analysis, machine learning, and data visualization techniques.",
    fn: (x, y) => {
      // Coordinate graph axes
      if (inLine(x, y, 42, 28, 42, 220, 2.5)) return C_FOAM;
      if (inLine(x, y, 42, 220, 238, 220, 2.5)) return C_FOAM;

      // Grid guide lines
      if (inLine(x, y, 42, 75, 238, 75, 1)) return C_DEEP;
      if (inLine(x, y, 42, 125, 238, 125, 1)) return C_DEEP;
      if (inLine(x, y, 42, 175, 238, 175, 1)) return C_DEEP;

      // Statistical distribution bars
      if (inBox(x, y, 56, 170, 76, 218, 2)) return C_DEEP;
      if (inBox(x, y, 86, 135, 106, 218, 2)) return C_WAVE;
      if (inBox(x, y, 116, 90, 136, 218, 2)) return C_CYAN;
      if (inBox(x, y, 146, 110, 166, 218, 2)) return C_EMERALD;
      if (inBox(x, y, 176, 150, 196, 218, 2)) return C_WAVE;
      if (inBox(x, y, 206, 185, 226, 218, 2)) return C_DEEP;

      // Upward predictive regression curve
      if (inLine(x, y, 50, 195, 85, 160, 2.4)) return C_GOLD;
      if (inLine(x, y, 85, 160, 125, 115, 2.4)) return C_GOLD;
      if (inLine(x, y, 125, 115, 170, 75, 2.4)) return C_GOLD;
      if (inLine(x, y, 170, 75, 225, 42, 2.4)) return C_GOLD;

      // Scatter matrix clusters
      if (dist(x, y, 70, 152) <= 3.5) return C_CYAN;
      if (dist(x, y, 105, 96) <= 4) return C_EMERALD;
      if (dist(x, y, 140, 62) <= 4) return C_FOAM;
      if (dist(x, y, 180, 52) <= 3.5) return C_GOLD;
      if (dist(x, y, 220, 38) <= 4.5) return C_CYAN;

      return null;
    },
  },
];

interface HeroCanvasProps {
  activeIdx: number;
  onCanvasClick?: (nextIdx: number) => void;
  isContained?: boolean;
}

export default function HeroCanvas({ activeIdx, onCanvasClick, isContained = false }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCanvasClickRef = useRef(onCanvasClick);
  onCanvasClickRef.current = onCanvasClick;

  const stateRef = useRef({
    activeIdx: 0,
    nextIdx: 0,
    morphStartTime: 0,
    isMorphing: false,
    particles: [] as Point[],
    floatingParticles: [] as FloatingParticle[],
    precomputedShapes: [] as Array<Array<{ x: number; y: number; c: string }>>,
    width: 0,
    height: 0,
    dpr: 1,
    cx: 0,
    cy: 0,
    size: 400,
    mouse: { x: -9999, y: -9999, nx: 0, ny: 0 },
    rotation: { yaw: 0, pitch: 0 },
    animId: 0,
  });

  // Morph trigger function — ONLY morphs canvas particles, does NOT call parent!
  const triggerShapeMorph = (targetIdx: number) => {
    const s = stateRef.current;
    if (s.isMorphing || targetIdx === s.activeIdx) return;
    s.nextIdx = (targetIdx + HERO_SHAPES.length) % HERO_SHAPES.length;
    s.isMorphing = true;
    s.morphStartTime = performance.now();

    const targetCoords = s.precomputedShapes[s.nextIdx];
    if (!targetCoords) return;

    // Assign targets and start Hermite wave morph
    s.particles.forEach((p, i) => {
      const target = targetCoords[i] || targetCoords[i % targetCoords.length];
      p.fx = p.tx;
      p.fy = p.ty;
      p.fz = p.tz || 0;
      p.fc = p.c;
      p.fa = p.ta;

      p.nx = target.x;
      p.ny = target.y;
      p.nc = target.c;
      p.na = target ? 1 : 0;

      const dFromCenter = Math.sqrt((target.x - s.cx) ** 2 + (target.y - s.cy) ** 2) / (s.size * 0.5);
      p.nz = Math.max(0, 1 - dFromCenter ** 2) * s.size * 0.28 + (Math.random() - 0.5) * s.size * 0.05;

      // Staggered wave delay based on horizontal X coordinate
      p.md = Math.max(0, Math.min(1, (p.fx - s.cx) / s.size + 0.5)) * 0.52 + Math.random() * 0.06;
    });

    // Conclude morph transition
    window.setTimeout(() => {
      s.activeIdx = s.nextIdx;
      s.isMorphing = false;
      s.particles.forEach((p, i) => {
        const target = targetCoords[i] || targetCoords[i % targetCoords.length];
        p.tx = target.x;
        p.ty = target.y;
        p.c = target.c;
        p.ta = 1;
      });
    }, 1100);
  };

  // Synchronize when parent prop activeIdx changes
  useEffect(() => {
    if (activeIdx !== stateRef.current.activeIdx) {
      triggerShapeMorph(activeIdx);
    }
  }, [activeIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      s.width = rect.width;
      s.height = rect.height;
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = s.width * s.dpr;
      canvas.height = s.height * s.dpr;
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);

      const isDesktop = s.width > 960;
      if (isContained) {
        s.size = Math.min(s.width * 0.85, s.height * 0.85, 480);
        s.cx = s.width * 0.5;
        s.cy = s.height * 0.5;
      } else {
        s.size = isDesktop ? Math.min(s.height * 0.78, s.width * 0.44, 600) : Math.min(s.width * 0.82, 380);
        const containerWidth = Math.min(s.width, 1600);
        const containerLeft = (s.width - containerWidth) / 2;
        s.cx = isDesktop ? containerLeft + containerWidth * 0.75 : s.width * 0.5;
        s.cy = isDesktop ? s.height * 0.5 : s.height * 0.6;
      }

      // MICRO-BUBBLES / SMALL PARTICLES RESOLUTION:
      // Finer step size (3.8px) yields high density and small elegant dots
      const scale = s.size / 260;
      const step = isDesktop ? Math.max(3.8, s.size / 70) : Math.max(3.2, s.size / 56);

      s.precomputedShapes = HERO_SHAPES.map((shape) => {
        const pts: Array<{ x: number; y: number; c: string }> = [];
        let rowIdx = 0;
        for (let y = 14; y < 248; y += step * 0.866, rowIdx++) {
          const xOffset = rowIdx % 2 ? step / 2 : 0;
          for (let x = 18 + xOffset; x < 248; x += step) {
            const color = shape.fn(x, y);
            if (color) {
              pts.push({
                x: s.cx + (x - 130) * scale,
                y: s.cy + (y - 130) * scale,
                c: color,
              });
            }
          }
        }
        return pts;
      });

      // Initialize particles
      const maxPts = Math.max(...s.precomputedShapes.map((arr) => arr.length));
      if (s.particles.length === 0) {
        const initial = s.precomputedShapes[0];
        s.particles = [];
        for (let i = 0; i < maxPts; i++) {
          const p = initial[i] || initial[i % initial.length];
          const angle = Math.random() * Math.PI * 2;
          const distOffset = 180 + Math.random() * 320;
          s.particles.push({
            x: p.x + Math.cos(angle) * distOffset,
            y: p.y + Math.sin(angle) * distOffset,
            vx: 0,
            vy: 0,
            tx: p.x,
            ty: p.y,
            tz: 0,
            c: p.c,
            a: 0,
            ta: 1,
            // SMALL BUBBLE RADIUS: 0.95px to 1.45px
            r: Math.max(0.95, (step * scale) * 0.22),
            delay: Math.random() * 0.5,
            md: 0,
            fx: p.x,
            fy: p.y,
            fz: 0,
            fc: p.c,
            fa: 1,
            nx: p.x,
            ny: p.y,
            nz: 0,
            nc: p.c,
            na: 1,
          });
        }
      } else {
        const currentTargets = s.precomputedShapes[s.activeIdx];
        s.particles.forEach((p, i) => {
          const target = currentTargets[i] || currentTargets[i % currentTargets.length];
          p.tx = target.x;
          p.ty = target.y;
          p.c = target.c;
          p.r = Math.max(0.95, (step * scale) * 0.22);
        });
      }

      // Background ambient star particles
      if (s.floatingParticles.length === 0) {
        s.floatingParticles = [];
        const count = isDesktop ? 45 : 22;
        const colors = [C_CYAN, C_WAVE, C_EMERALD, C_FOAM];
        for (let i = 0; i < count; i++) {
          s.floatingParticles.push({
            x: Math.random() * s.width,
            y: Math.random() * s.height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: 0.8 + Math.random() * 2,
            c: colors[i % colors.length],
            a: 0.15 + Math.random() * 0.35,
          });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      s.mouse.x = x;
      s.mouse.y = y;
      s.mouse.nx = (x / s.width - 0.5) * 2;
      s.mouse.ny = (y / s.height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      s.mouse.x = -9999;
      s.mouse.y = -9999;
      s.mouse.nx = 0;
      s.mouse.ny = 0;
    };

    const handleClick = () => {
      triggerShapeMorph(s.activeIdx + 1);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    // Main 60fps render loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, s.width, s.height);

      // Render floating ambient particles
      for (const fp of s.floatingParticles) {
        fp.x += fp.vx;
        fp.y += fp.vy;
        if (fp.x < 0) fp.x = s.width;
        if (fp.x > s.width) fp.x = 0;
        if (fp.y < 0) fp.y = s.height;
        if (fp.y > s.height) fp.y = 0;

        ctx.globalAlpha = fp.a;
        ctx.fillStyle = fp.c;
        ctx.beginPath();
        ctx.arc(fp.x, fp.y, fp.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Smooth 3D mouse yaw and pitch
      const targetYaw = s.mouse.nx * 0.36 + Math.sin(time * 0.0006) * 0.1;
      const targetPitch = -s.mouse.ny * 0.26 + Math.cos(time * 0.0005) * 0.05;
      s.rotation.yaw += (targetYaw - s.rotation.yaw) * 0.06;
      s.rotation.pitch += (targetPitch - s.rotation.pitch) * 0.06;

      const cosY = Math.cos(s.rotation.yaw);
      const sinY = Math.sin(s.rotation.yaw);
      const cosP = Math.cos(s.rotation.pitch);
      const sinP = Math.sin(s.rotation.pitch);
      const fov = s.size * 2.6;

      const morphElapsed = (time - s.morphStartTime) / 1000;
      const morphDuration = 0.55;

      // Render main particle grid
      for (let i = 0; i < s.particles.length; i++) {
        const p = s.particles[i];

        p.a += (p.ta - p.a) * 0.08;

        let curX = p.tx;
        let curY = p.ty;
        let curZ = p.tz || 0;
        let curColor = p.c;

        // Wave morph interpolation
        if (s.isMorphing) {
          const progress = (morphElapsed - p.md) / morphDuration;
          if (progress >= 1) {
            curX = p.nx;
            curY = p.ny;
            curZ = p.nz;
            curColor = p.nc;
          } else if (progress > 0) {
            const ease = progress * progress * (3 - 2 * progress);
            const waveArc = Math.sin(progress * Math.PI);
            const dx = p.nx - p.fx;
            const dy = p.ny - p.fy;

            curX = p.fx + dx * ease - dy * 0.22 * waveArc;
            curY = p.fy + dy * ease + dx * 0.22 * waveArc;
            curZ = p.fz + (p.nz - p.fz) * ease + s.size * 0.26 * waveArc;
            curColor = progress < 0.5 ? p.fc : p.nc;
          } else {
            curX = p.fx;
            curY = p.fy;
            curZ = p.fz;
            curColor = p.fc;
          }
        }

        // Apply 3D perspective rotation
        const relX = curX - s.cx;
        const relY = curY - s.cy;
        const relZ = curZ;

        const xRot = relX * cosY + relZ * sinY;
        const zRot1 = -relX * sinY + relZ * cosY;
        const yRot = relY * cosP - zRot1 * sinP;
        const zRot2 = relY * sinP + zRot1 * cosP;

        const perspective = fov / (fov - zRot2);
        const projectedX = s.cx + xRot * perspective;
        const projectedY = s.cy + yRot * perspective;

        // Proximity mouse push
        const distToMouse = dist(p.x, p.y, s.mouse.x, s.mouse.y);
        if (distToMouse < 80) {
          const repelForce = (1 - distToMouse / 80) * 12;
          const angle = Math.atan2(p.y - s.mouse.y, p.x - s.mouse.x);
          p.vx += Math.cos(angle) * repelForce;
          p.vy += Math.sin(angle) * repelForce;
        }

        // Spring kinematics
        p.vx += (projectedX - p.x) * 0.08;
        p.vy += (projectedY - p.y) * 0.08;
        p.vx *= 0.72;
        p.vy *= 0.72;
        p.x += p.vx;
        p.y += p.vy;

        // Small, refined bubble rendering
        const dotRadius = Math.max(0.75, p.r * perspective);
        ctx.globalAlpha = Math.max(0.12, Math.min(1, p.a * (perspective * 0.88)));
        ctx.fillStyle = curColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      s.animId = requestAnimationFrame(render);
    };

    s.animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(s.animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Interactive 3D Micro-Bubble Canvas */}
      <canvas
        ref={canvasRef}
        data-cursor="Click"
        className="w-full h-full pointer-events-auto cursor-pointer"
        aria-label="Interactive 3D particle matrix. Click to morph between Skeleton, Mobile, Monitor, and Server."
      />
    </div>
  );
}
