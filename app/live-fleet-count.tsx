"use client";

import { useEffect, useRef, useState } from "react";

const START = 118;
const CAP = 148;

export default function LiveFleetCount() {
  const ref = useRef<HTMLElement>(null);
  const valueRef = useRef(START);
  const started = useRef(false);
  const [value, setValue] = useState(START);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let timer = 0;
    const bump = () => {
      timer = window.setTimeout(() => {
        if (valueRef.current >= CAP) return;
        valueRef.current += 1;
        setValue(valueRef.current);
        if (valueRef.current < CAP) bump();
      }, 7000 + Math.random() * 10000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        bump();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <strong ref={ref} className="rolling-number" aria-label={`${value} vehicles managed`}>
      <span aria-hidden="true">{value}</span>
    </strong>
  );
}
