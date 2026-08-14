"use client";

import { useEffect, useRef, useState } from "react";

type RollingNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  label: string;
};

function formatValue(value: number, decimals: number) {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString("en-US");
}

export default function RollingNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1700,
  label,
}: RollingNumberProps) {
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(value * eased);
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, value]);

  return (
    <strong ref={ref} className="rolling-number" aria-label={label}>
      <span aria-hidden="true">
        {prefix}
        {formatValue(display, decimals)}
        {suffix}
      </span>
    </strong>
  );
}
