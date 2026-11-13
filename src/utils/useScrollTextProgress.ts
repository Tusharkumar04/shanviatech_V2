import { useEffect, useState, type RefObject } from "react";

export function useScrollTextProgress(ref: RefObject<HTMLElement | null>): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) {
            ticking = false;
            return;
          }

          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          const startTrigger = vh * 0.86;
          const endTrigger = vh * 0.24;

          const rawProgress = (startTrigger - rect.top) / (startTrigger - endTrigger);
          setScrollProgress(Math.min(Math.max(rawProgress, 0), 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return scrollProgress;
}

export function getWordRevealStyle(
  scrollProgress: number,
  index: number,
  total: number
) {
  const step = 0.75 / Math.max(total, 1);
  const wordStart = index * step;
  const windowSpan = 0.24;
  const factor = Math.min(Math.max((scrollProgress - wordStart) / windowSpan, 0), 1);

  return {
    factor,
    style: {
      opacity: 0.22 + 0.78 * factor,
      transform: `translateY(${(1 - factor) * 2.5}px)`,
    },
  };
}
