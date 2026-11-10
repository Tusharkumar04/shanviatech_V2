import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TRAIL_CONFIG = [
  { size: 7, color: "#43d9ff", duration: 0.22 }, // Cyan
  { size: 6, color: "#34d399", duration: 0.32 }, // Emerald
  { size: 5, color: "#1b9fe0", duration: 0.42 }, // Wave Blue
  { size: 4, color: "#eaf3f7", duration: 0.52 }, // Foam White
];

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const span = spanRef.current;
    if (!ring || !dot || !span) return;

    let isLive = false;

    // Setup GSAP quickTo interpolators
    const ringX = gsap.quickTo(ring, "x", { duration: 0.48, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.48, ease: "power3.out" });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08 });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08 });

    // Trail quickTo interpolators
    const trailInterpolators = trailsRef.current.map((trailEl, idx) => ({
      el: trailEl,
      x: gsap.quickTo(trailEl, "x", { duration: TRAIL_CONFIG[idx].duration, ease: "power3.out" }),
      y: gsap.quickTo(trailEl, "y", { duration: TRAIL_CONFIG[idx].duration, ease: "power3.out" }),
    }));

    const onPointerMove = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!isLive) {
        isLive = true;
        gsap.set([ring, dot, ...trailsRef.current], { x, y });
        ring.classList.add("is-live");
        dot.classList.add("is-live");
        trailsRef.current.forEach((t) => t.classList.add("is-live"));
      }

      // Update positions
      ringX(x);
      ringY(y);
      dotX(x);
      dotY(y);

      trailInterpolators.forEach((t) => {
        t.x(x);
        t.y(y);
      });
    };

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "[data-cursor], a, button, label, input[type=range], summary, [role='button'], canvas"
      ) as HTMLElement | null;

      if (!interactive) {
        ring.classList.remove("is-hover", "has-label");
        return;
      }

      const label = interactive.getAttribute("data-cursor");
      if (label) {
        span.textContent = label;
        ring.classList.add("has-label");
        ring.classList.remove("is-hover");
      } else {
        ring.classList.add("is-hover");
        ring.classList.remove("has-label");
      }
    };

    const onPointerDown = () => {
      ring.classList.add("is-down");
    };

    const onPointerUp = () => {
      ring.classList.remove("is-down");
    };

    const onPointerLeaveDoc = () => {
      isLive = false;
      ring.classList.remove("is-live", "is-hover", "has-label", "is-down");
      dot.classList.remove("is-live");
      trailsRef.current.forEach((t) => t.classList.remove("is-live"));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveDoc);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerLeaveDoc);
    };
  }, []);

  return (
    <>
      {/* 4 Multi-colored Trail Dots */}
      {TRAIL_CONFIG.map((conf, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) trailsRef.current[idx] = el;
          }}
          className="cursor-trail"
          style={{
            width: `${conf.size}px`,
            height: `${conf.size}px`,
            margin: `${-conf.size / 2}px 0 0 ${-conf.size / 2}px`,
            backgroundColor: conf.color,
            boxShadow: `0 0 10px ${conf.color}80`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Outer Floating Ring with Label Span */}
      <div ref={ringRef} className="cursor" aria-hidden="true">
        <span ref={spanRef}></span>
      </div>

      {/* Fast Central Dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

