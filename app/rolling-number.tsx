"use client";

import { useEffect, useRef, useState } from "react";

type Intensity = "enter" | "bump";

type SlotNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

type RollingNumberProps = SlotNumberProps & {
  duration?: number;
};

const STRIP_REPEATS = 24;

function formatValue(value: number, decimals: number) {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString("en-US");
}

function easeOutCubic(u: number) {
  return 1 - (1 - u) ** 3;
}

function easeOutBack(u: number) {
  const c1 = 1.62;
  const c3 = c1 + 1;
  return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2;
}

function DigitReel({
  digit,
  spinKey,
  index,
  intensity,
}: {
  digit: number;
  spinKey: number;
  index: number;
  intensity: Intensity;
}) {
  const reelRef = useRef<HTMLSpanElement>(null);
  const stripRef = useRef<HTMLSpanElement>(null);
  const offsetRef = useRef(0);
  const shownRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const reel = reelRef.current;
    const el = stripRef.current;
    if (!reel || !el) return;

    const finish = (value: number) => {
      offsetRef.current = value;
      shownRef.current = value;
      el.style.filter = "none";
      el.style.transform = `translate3d(0, ${-value}em, 0)`;
      reel.classList.remove("is-spinning");
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || spinKey === 0) {
      finish(digit);
      return;
    }

    const from = shownRef.current;
    const step = (digit - from + 10) % 10;
    const isBump = intensity === "bump";

    if (isBump && step === 0) {
      finish(digit);
      return;
    }

    reel.classList.add("is-spinning");

    let raf = 0;
    let start: number | null = null;
    let prev: number | null = null;
    let offset = from;
    let phase: "spin" | "slow" | "tick" = isBump ? "tick" : "spin";
    let slowT0 = 0;
    let slowFrom = 0;
    let slowTo = 0;
    const spinMs = 920 + index * 320;
    const slowMs = 640;
    const speed = 58;
    const tickMs = 1100;

    const frame = (now: number) => {
      if (start == null) start = now;
      if (prev == null) prev = now;
      const dt = Math.min(0.04, (now - prev) / 1000);
      prev = now;
      const t = now - start;

      if (phase === "tick") {
        const u = Math.min(1, t / tickMs);
        offset = from + step * easeOutCubic(u);
        el.style.filter = "none";
        el.style.transform = `translate3d(0, ${-offset}em, 0)`;
        if (u >= 1) {
          finish(digit);
          return;
        }
      } else if (phase === "spin") {
        offset += speed * dt;
        el.style.filter = "blur(1.6px)";
        if (t >= spinMs) {
          phase = "slow";
          slowT0 = t;
          slowFrom = offset;
          const current = ((offset % 10) + 10) % 10;
          let dist = (digit - current + 10) % 10;
          dist += 10;
          if (dist < 12) dist += 10;
          slowTo = offset + dist;
        }
        el.style.transform = `translate3d(0, ${-offset}em, 0)`;
      } else {
        const u = Math.min(1, (t - slowT0) / slowMs);
        offset = slowFrom + (slowTo - slowFrom) * easeOutBack(u);
        el.style.filter = u > 0.82 ? "none" : `blur(${1.6 * (1 - u)}px)`;
        el.style.transform = `translate3d(0, ${-offset}em, 0)`;
        if (u >= 1) {
          finish(digit);
          return;
        }
      }

      raf = requestAnimationFrame(frame);
      rafRef.current = raf;
    };

    raf = requestAnimationFrame(frame);
    rafRef.current = raf;

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [digit, spinKey, index, intensity]);

  const cells = Array.from({ length: STRIP_REPEATS * 10 }, (_, i) => i % 10);

  return (
    <span className="slot-reel" ref={reelRef}>
      <span className="slot-strip" ref={stripRef}>
        {cells.map((n, i) => (
          <i key={i}>{n}</i>
        ))}
      </span>
    </span>
  );
}

export function SlotNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
}: SlotNumberProps) {
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);
  const [armed, setArmed] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [intensity, setIntensity] = useState<Intensity>("enter");
  const prevValue = useRef(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setArmed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        setIntensity("enter");
        setArmed(true);
        setSpinKey(1);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!armed || spinKey === 0) return;
    if (prevValue.current === value) return;
    prevValue.current = value;
    setIntensity("bump");
    setSpinKey((key) => key + 1);
  }, [armed, value, spinKey]);

  const tokens = [...formatValue(value, decimals)];
  let digitIndex = 0;

  return (
    <strong ref={ref} className="rolling-number" aria-label={label}>
      <span className="slot-number" aria-hidden="true">
        {prefix}
        {tokens.map((char, i) => {
          if (!/\d/.test(char)) {
            return (
              <span className="slot-sep" key={`sep-${i}`}>
                {char}
              </span>
            );
          }

          const index = digitIndex;
          digitIndex += 1;
          const shown = armed ? Number(char) : 0;

          return (
            <DigitReel
              key={`d-${i}`}
              digit={shown}
              spinKey={spinKey}
              index={index}
              intensity={intensity}
            />
          );
        })}
        {suffix}
      </span>
    </strong>
  );
}

export default function RollingNumber({
  duration: _duration,
  ...props
}: RollingNumberProps) {
  return <SlotNumber {...props} />;
}
