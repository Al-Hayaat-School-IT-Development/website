'use client';

import React, { useRef, useEffect } from 'react';

export interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

/** Approximate intersection ratio vs the viewport (for above-the-fold reveal when IO is late). */
function visibleRatioInViewport(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = globalThis.innerHeight || document.documentElement.clientHeight;
  const vw = globalThis.innerWidth || document.documentElement.clientWidth;
  const ih = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
  const iw = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0));
  const intersection = ih * iw;
  const area = Math.max(rect.width * rect.height, 1);
  return intersection / area;
}

export function FadeIn({
  children,
  duration = 600,
  delay = 0,
  once = true,
  className = '',
}: Readonly<FadeInProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const reveal = () => {
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add('opacity-100', 'translate-y-0');
      el.classList.remove('opacity-0', 'translate-y-4');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            if (once) observer.disconnect();
          } else if (!once) {
            el.classList.remove('opacity-100', 'translate-y-0');
            el.classList.add('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: [0, 0.1, 0.25, 0.5, 1] },
    );

    observer.observe(el);

    // Reveal if already on screen after paint (fixes above-the-fold + Strict Mode remount races).
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (visibleRatioInViewport(el) >= 0.1) {
          reveal();
          if (once) observer.disconnect();
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer.disconnect();
    };
  }, [delay, once]);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-4 transition-all ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
