"use client";

import RollingNumber from "./rolling-number";

export default function LiveFleetCount() {
  return <RollingNumber value={168} label="168 vehicles managed" />;
}
