import { useEffect, useRef } from "react";

interface HeroBackgroundMotionProps {
  mouseOffset: { x: number; y: number };
  activeAccent?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  phase: number;
  color: string;
}

interface DataStreamer {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  color: string;
  angle: number;
}

export default function HeroBackgroundMotion({
  mouseOffset,
  activeAccent = "#43d9ff",
}: HeroBackgroundMotionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep mouseOffset in a stable ref so the animation loop never restarts on mousemove
  const mouseRef = useRef(mouseOffset);
  mouseRef.current = mouseOffset;

  const accentRef = useRef(activeAccent);
  accentRef.current = activeAccent;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Particle pool
    const particles: Particle[] = [];
    const streamers: DataStreamer[] = [];
    const colors = ["#43d9ff", "#38bdf8", "#34d399", "#818cf8", "#eaf3f7"];

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize particles on major resize
      if (particles.length === 0) {
        const count = width > 768 ? 48 : 25;
        for (let i = 0; i < count; i++) {
          const baseAlpha = 0.12 + Math.random() * 0.38;
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.12,
            // Slow motion gentle upward ascent
            vy: -(0.06 + Math.random() * 0.14),
            size: 0.9 + Math.random() * 1.8,
            alpha: baseAlpha,
            baseAlpha,
            pulseSpeed: 0.0008 + Math.random() * 0.0016,
            phase: Math.random() * Math.PI * 2,
            color: colors[i % colors.length],
          });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Spawn high-speed optical data streamer pulses in slow motion
    let lastStreamerSpawn = 0;
    const maybeSpawnStreamer = (time: number) => {
      if (time - lastStreamerSpawn > 3200 + Math.random() * 2400) {
        lastStreamerSpawn = time;
        if (streamers.length < 4) {
          const isDiagonal = Math.random() > 0.6;
          streamers.push({
            x: -140,
            y: Math.random() * height * 0.85,
            length: 70 + Math.random() * 110,
            // Slow, fluid glide speed (reduced from 5.5 - 10.5)
            speed: 2.4 + Math.random() * 2.0,
            alpha: 0.2 + Math.random() * 0.35,
            color: Math.random() > 0.4 ? "#43d9ff" : accentRef.current,
            angle: isDiagonal ? 0.12 : 0,
          });
        }
      }
    };

    // Ultra-smooth slow motion parallax damping
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    // Render loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Slow-motion parallax easing (reduced from 0.05 to 0.016 with smaller target range)
      const targetParallaxX = mouseRef.current.x * 12;
      const targetParallaxY = mouseRef.current.y * 8;
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.016;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.016;

      // 1. Render Optical Data Streamer Pulses (Slow Glide)
      maybeSpawnStreamer(time);
      for (let i = streamers.length - 1; i >= 0; i--) {
        const st = streamers[i];
        st.x += st.speed;
        st.y += Math.sin(st.angle) * st.speed;

        if (st.x - st.length > width) {
          streamers.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(
          st.x - st.length,
          st.y - Math.sin(st.angle) * st.length,
          st.x,
          st.y
        );
        grad.addColorStop(0, "rgba(67, 217, 255, 0)");
        grad.addColorStop(0.7, st.color);
        grad.addColorStop(1, "#ffffff");

        ctx.save();
        ctx.globalAlpha = st.alpha;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(st.x - st.length, st.y - Math.sin(st.angle) * st.length);
        ctx.lineTo(st.x, st.y);
        ctx.stroke();

        // Glowing head photon
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(st.x, st.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Render Floating Ambient Ascending Photons (Slow Motion Drift)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion physics with slow harmonic wave
        p.y += p.vy;
        p.x += p.vx + Math.sin(time * 0.0005 + p.phase) * 0.12;

        // Wrap around boundaries
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Dynamic twinkle breathing (slow)
        const pulse = Math.sin(time * p.pulseSpeed + p.phase);
        const curAlpha = Math.max(0.05, p.baseAlpha + pulse * 0.2);

        // Apply slow parallax offset
        const drawX = p.x + currentParallaxX * (p.size / 2);
        const drawY = p.y + currentParallaxY * (p.size / 2);

        ctx.save();
        ctx.globalAlpha = curAlpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle micro halo on larger motes
        if (p.size > 1.6) {
          ctx.globalAlpha = curAlpha * 0.25;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 3. Subtle Constellation Connections between nearby motes
      ctx.save();
      ctx.lineWidth = 0.5;
      const maxConnectDist = 60;
      for (let i = 0; i < particles.length; i += 2) {
        const p1 = particles[i];
        for (let j = i + 1; j < Math.min(particles.length, i + 5); j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.14;
            ctx.globalAlpha = lineAlpha;
            ctx.strokeStyle = "#43d9ff";
            ctx.beginPath();
            ctx.moveTo(p1.x + currentParallaxX * (p1.size / 2), p1.y + currentParallaxY * (p1.size / 2));
            ctx.lineTo(p2.x + currentParallaxX * (p2.size / 2), p2.y + currentParallaxY * (p2.size / 2));
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Run once on mount; reads mouseRef.current and accentRef.current continuously

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      {/* ── Layer 1: Ambient Aurora Motion Plasma Spheres (Slow-Motion Easing) ── */}
      {/* Top-Left Cyan Plasma Orb */}
      <div
        className="absolute -top-32 -left-32 w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full blur-[110px] sm:blur-[140px] opacity-30 dark:opacity-25 a-blob pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(67,217,255,0.4) 0%, rgba(11,108,176,0.25) 50%, transparent 70%)",
          transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 9}px, 0)`,
          transition: "transform 2.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Top-Right Deep Oceanic Indigo Orb (Behind Right-Side Visualizer) */}
      <div
        className="absolute top-10 -right-24 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full blur-[120px] sm:blur-[150px] opacity-25 dark:opacity-20 a-blob [animation-delay:-12s] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(27,159,224,0.35) 0%, rgba(30,27,75,0.3) 55%, transparent 70%)",
          transform: `translate3d(${mouseOffset.x * -10}px, ${mouseOffset.y * -8}px, 0)`,
          transition: "transform 2.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Bottom Center Dynamic Accent Aura Orb (Synchronized with Active Architecture) */}
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[520px] sm:w-[780px] h-[340px] sm:h-[460px] rounded-full blur-[100px] sm:blur-[130px] opacity-22 dark:opacity-18 a-blob [animation-delay:-18s] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${activeAccent}38 0%, rgba(8,47,82,0.25) 50%, transparent 70%)`,
          transform: `translate3d(calc(-50% + ${mouseOffset.x * 8}px), ${mouseOffset.y * 6}px, 0)`,
          transition: "transform 2.6s cubic-bezier(0.16, 1, 0.3, 1), background 1.2s ease",
        }}
      />

      {/* ── Layer 2: Cybernetic Perspective Grid with Scanning Laser Beam ── */}
      <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05] bg-[linear-gradient(to_right,rgba(67,217,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(67,217,255,0.35)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,black_40%,transparent_85%)]" />

      {/* Animated Horizontal Laser Scan Beam (Slow Sweep) */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-cyan)]/25 to-transparent a-scan shadow-[0_0_15px_rgba(67,217,255,0.35)] pointer-events-none opacity-50" />

      {/* ── Layer 3: Interactive 2D Motion Canvas (Ascending Photons & Data Pulses) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Layer 4: Vignette Depth Mask (Flawless Contrast & Edge Melt) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 45%, transparent 40%, var(--color-abyss) 96%)",
        }}
      />
    </div>
  );
}
