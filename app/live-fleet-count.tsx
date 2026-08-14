"use client";

import { useEffect, useRef, useState } from "react";
import { SlotNumber } from "./rolling-number";

const START = 118;
const CAP = 148;

export default function LiveFleetCount() {
  const ref = useRef<HTMLDivElement>(null);
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
      }, 8000 + Math.random() * 9000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        bump();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref}>
      <SlotNumber value={value} label={`${value} vehicles managed`} />
    </div>
  );
}
