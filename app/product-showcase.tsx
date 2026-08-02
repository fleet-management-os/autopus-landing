"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

const features = [
  {
    id: "performance",
    number: "01",
    label: "Fleet performance",
    title: "Know what the fleet is earning",
    text: "Revenue, profit, utilization, maintenance, and expenses—connected in one operating view.",
  },
  {
    id: "vehicles",
    number: "02",
    label: "Fleet management",
    title: "Manage every vehicle at scale",
    text: "Keep vehicles, owners, availability, mileage, and service in one operational view.",
  },
  {
    id: "uploads",
    number: "03",
    label: "AI document intake",
    title: "Turn receipts into clean records",
    text: "Upload tolls, tickets, and expenses. Autopus reads the file and prepares the details for review.",
  },
  {
    id: "owners",
    number: "04",
    label: "Owner reporting",
    title: "Keep every owner informed",
    text: "Build monthly statements from the same operational data your team already uses.",
  },
];

const chartSets = {
  profit: [20, 27, 35, 39, 68, 86, 66, 55, 30, 24, 8],
  revenue: [24, 32, 41, 48, 61, 77, 72, 83, 68, 88, 92],
};

type FeatureId = "performance" | "vehicles" | "uploads" | "owners";
type AppView = FeatureId | "vehicles" | "inbox" | "assistant";
type Metric = "profit" | "revenue";
type UploadKind = "toll" | "expense" | "receipt";
type ReportStatus = "all" | "ready";

function PerformancePanel({ metric, setMetric }: { metric: Metric; setMetric: (metric: Metric) => void }) {
  const values = chartSets[metric];

  return (
    <div className="app-screen performance-screen">
      <div className="app-toolbar">
        <div>
          <span className="app-overline">FLEET OVERVIEW</span>
          <h3>Northstar Mobility</h3>
        </div>
        <span className="month-chip">August 2026⌄</span>
      </div>
      <div className="app-metrics">
        <article><span>Total revenue</span><strong>$1,040.39</strong><small>↗ 48.0%</small></article>
        <article><span>Net profit</span><strong>$73.39</strong><small className="negative">↘ 86.8%</small></article>
        <article><span>Active vehicles</span><strong>48</strong><small>All connected</small></article>
      </div>
      <div className="app-chart-card">
        <div className="chart-toolbar">
          <strong>Monthly {metric === "profit" ? "net profit" : "revenue"}</strong>
          <div role="group" aria-label="Chart metric">
            <button className={metric === "profit" ? "active" : ""} onClick={() => setMetric("profit")}>Net profit</button>
            <button className={metric === "revenue" ? "active" : ""} onClick={() => setMetric("revenue")}>Revenue</button>
          </div>
        </div>
        <div className="interactive-chart" aria-label={`${metric} chart preview`}>
          {values.map((height, index) => (
            <i key={`${metric}-${index}`} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="chart-months"><span>Feb</span><span>Apr</span><span>Jun</span><span>Aug</span><span>Oct</span><span>Dec</span></div>
      </div>
      <p className="demo-hint">Try it · switch between Net profit and Revenue</p>
    </div>
  );
}

type PhotoProps = {
  photoSrc: string | null;
  photoName: string;
  onPhotoChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function UploadPanel({ kind, setKind, photoSrc, photoName, onPhotoChange }: { kind: UploadKind; setKind: (kind: UploadKind) => void } & PhotoProps) {
  return (
    <div className="app-screen uploads-screen">
      <div className="app-toolbar">
        <div><span className="app-overline">DOCUMENT INTAKE</span><h3>Uploads</h3><p className="app-subtitle">Toll & ticket documents, vehicle expenses and filed receipts</p></div>
      </div>
      <div className="segmented upload-type-tabs" role="group" aria-label="Upload type">
        <button className={kind === "toll" ? "active" : ""} onClick={() => setKind("toll")}>Toll / ticket</button>
        <button className={kind === "expense" ? "active" : ""} onClick={() => setKind("expense")}>Expense</button>
        <button className={kind === "receipt" ? "active" : ""} onClick={() => setKind("receipt")}>Receipt</button>
      </div>
      <div className="upload-layout">
        <div className="upload-card">
          <strong>Upload a {kind === "toll" ? "toll / ticket" : kind}</strong>
          <label className={`drop-zone ${photoSrc ? "has-photo" : ""}`}>
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onPhotoChange} />
            {photoSrc ? <img src={photoSrc} alt="Uploaded preview" /> : <span>＋</span>}
            <strong>{photoSrc ? photoName : "Drop a file or click to upload"}</strong>
            <small>{photoSrc ? "Photo added · click to replace" : "PNG or JPEG · up to 5 MB"}</small>
          </label>
          <div className="ai-row"><span>✦ Autopus AI will extract the details</span><b>Qwen 3.6⌄</b></div>
        </div>
        <div className="upload-guidelines">
          <strong>Upload guidelines</strong>
          <span>✓ Select the owner before uploading</span>
          <span>✓ Add amount and notes when available</span>
          <span>✓ Review extracted values before confirming</span>
          <span>✓ PNG and JPEG supported for AI extraction</span>
        </div>
      </div>
      <div className="recent-upload-table">
        <div><strong>Recent uploads</strong><span>1 upload</span></div>
        <article><span>Jul 26, 2026</span><b>Northstar Mobility</b><span>{kind === "toll" ? "Toll" : kind === "expense" ? "Expense" : "Receipt"}</span><span>Subaru Forester · 123ABC</span><strong>{kind === "toll" ? "$48.00" : "$147.00"}</strong><i>Reviewed</i></article>
      </div>
      <p className="demo-hint">Try it · switch the document type</p>
    </div>
  );
}

const initialVehicles = [
  { id: 1, name: "2026 Tesla Cybertruck", make: "tesla", owner: "Northstar Mobility", plate: "7G2C236", miles: "12,480", trips: 18, status: "Active", service: "Sep 18", image: "/autopus/cybertruck.png" },
  { id: 2, name: "2023 Subaru Forester", make: "subaru", owner: "North Coast Mobility", plate: "123ABC", miles: "77,927", trips: 42, status: "Active", service: "Aug 28", image: "https://images.unsplash.com/photo-1687048985980-bcf332f600c1?auto=format&fit=crop&w=560&q=82" },
  { id: 3, name: "2024 Tesla Model Y", make: "tesla", owner: "Kelly Fleet LLC", plate: "8EVX204", miles: "31,204", trips: 36, status: "Active", service: "Oct 04", image: "https://images.unsplash.com/photo-1765891628062-5f5a850ff953?auto=format&fit=crop&w=560&q=82" },
  { id: 4, name: "2022 Tesla Model S", make: "tesla", owner: "Sunset Auto Group", plate: "9TES821", miles: "54,110", trips: 29, status: "Maintenance", service: "In service", image: "https://images.unsplash.com/photo-1541447270888-83e8494f9c06?auto=format&fit=crop&w=560&q=82" },
  { id: 5, name: "2021 Subaru Forester", make: "subaru", owner: "Northstar Mobility", plate: "6SBR420", miles: "68,840", trips: 51, status: "Active", service: "Sep 02", image: "https://images.unsplash.com/photo-1552009385-fc97b944d70c?auto=format&fit=crop&w=560&q=82" },
  { id: 6, name: "2024 BMW X5", make: "bmw", owner: "North Coast Mobility", plate: "4BMW925", miles: "22,905", trips: 21, status: "Inactive", service: "Oct 21", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=560&q=82" },
];

function VehiclesPanel({ photoSrc, photoName, onPhotoChange }: PhotoProps) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [makeFilter, setMakeFilter] = useState("all");
  const [layout, setLayout] = useState<"grid" | "list">("list");
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("2025 Tesla Model 3");
  const [newPlate, setNewPlate] = useState("NEW001");
  const [newOwner, setNewOwner] = useState("Northstar Mobility");

  const filteredVehicles = vehicles.filter((vehicle) =>
    (statusFilter === "all" || vehicle.status.toLowerCase() === statusFilter) &&
    (makeFilter === "all" || vehicle.make === makeFilter) &&
    `${vehicle.name} ${vehicle.owner} ${vehicle.plate}`.toLowerCase().includes(query.toLowerCase()),
  );

  const addVehicle = () => {
    setVehicles((current) => [...current, { id: Date.now(), name: newName || "New fleet vehicle", make: newName.toLowerCase().includes("subaru") ? "subaru" : newName.toLowerCase().includes("bmw") ? "bmw" : "tesla", owner: newOwner || "Northstar Mobility", plate: newPlate || "NEW001", miles: "0", trips: 0, status: "Active", service: "Not scheduled", image: photoSrc || "/autopus/cybertruck.png" }]);
    setAdding(false);
  };

  return (
    <div className="app-screen vehicles-screen">
      <div className="app-toolbar">
        <div><span className="app-overline">YOUR FLEET</span><h3>Vehicles <small className="vehicle-count">{vehicles.length}</small></h3><p className="app-subtitle">Manage vehicles, owners, availability, mileage, and service</p></div>
        <button className="generate-button new-vehicle-control" onClick={() => setAdding((value) => !value)}>＋ New vehicle</button>
      </div>
      {adding && <div className="new-vehicle-form"><input value={newName} onChange={(event) => setNewName(event.target.value)} aria-label="Vehicle name" /><input value={newOwner} onChange={(event) => setNewOwner(event.target.value)} aria-label="Vehicle owner" /><input value={newPlate} onChange={(event) => setNewPlate(event.target.value)} aria-label="Vehicle plate" /><label><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onPhotoChange} /><span>{photoSrc ? photoName : "Add photo"}</span></label><button onClick={addVehicle}>Add vehicle</button></div>}
      <div className="vehicle-tools">
        <label className="vehicle-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search vehicles, owners, or plates…" /></label>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Vehicle status"><option value="all">All statuses</option><option value="active">Active</option><option value="maintenance">Maintenance</option><option value="inactive">Inactive</option></select>
        <select value={makeFilter} onChange={(event) => setMakeFilter(event.target.value)} aria-label="Vehicle make"><option value="all">All makes</option><option value="tesla">Tesla</option><option value="subaru">Subaru</option><option value="bmw">BMW</option></select>
        <div className="vehicle-layout-toggle" role="group" aria-label="Vehicle layout"><button className={layout === "grid" ? "active" : ""} onClick={() => setLayout("grid")}>▦</button><button className={layout === "list" ? "active" : ""} onClick={() => setLayout("list")}>☷</button></div>
      </div>
      <div className="vehicle-summary">
        <article><span>Total</span><strong>{vehicles.length}</strong></article><article><span>Active</span><strong>{vehicles.filter((vehicle) => vehicle.status === "Active").length}</strong></article><article><span>Maintenance</span><strong>{vehicles.filter((vehicle) => vehicle.status === "Maintenance").length}</strong></article><article><span>Inactive</span><strong>{vehicles.filter((vehicle) => vehicle.status === "Inactive").length}</strong></article>
      </div>
      <div className={`fleet-list ${layout}`}>
        {filteredVehicles.map((vehicle) => <article className="fleet-row" key={vehicle.id}><img src={vehicle.image} alt={vehicle.name} /><div className="fleet-identity"><strong>{vehicle.name}</strong><span>{vehicle.owner} · {vehicle.plate}</span></div><div><small>Mileage</small><b>{vehicle.miles} mi</b></div><div><small>Trips</small><b>{vehicle.trips}</b></div><div><small>Next service</small><b>{vehicle.service}</b></div><span className={`fleet-status ${vehicle.status.toLowerCase()}`}>{vehicle.status}</span><button aria-label={`Open ${vehicle.name}`}>•••</button></article>)}
        {!filteredVehicles.length && <div className="vehicle-empty"><strong>No matching vehicles</strong><span>Try another search or filter.</span></div>}
      </div>
      <p className="demo-hint">Try it · search, filter, change the layout, or add a complete vehicle record</p>
    </div>
  );
}

function InboxPanel() {
  return <div className="app-screen simple-app-screen"><div className="app-toolbar"><div><span className="app-overline">GUEST MESSAGES</span><h3>Inbox</h3></div><span className="month-chip">Sync now</span></div><div className="message-card"><span className="owner-avatar">JM</span><div><strong>Jordan Miles</strong><p>Can I pick up the vehicle thirty minutes earlier?</p></div><button>Draft reply</button></div><div className="message-card"><span className="owner-avatar">AS</span><div><strong>Alex Smith</strong><p>Thanks — I have uploaded the return photos.</p></div><button>View thread</button></div></div>;
}

function AssistantPanel() {
  return <div className="app-screen simple-app-screen"><div className="app-toolbar"><div><span className="app-overline">AUTOPUS AI</span><h3>Assistant</h3></div><span className="status-chip">Online</span></div><div className="assistant-prompt"><span>✦</span><div><strong>What needs attention today?</strong><p>2 vehicles need inspection, 1 receipt is ready for review, and 3 owner statements can be finalized.</p></div></div><div className="assistant-actions"><button>Review inspections</button><button>Open receipt</button><button>Finalize statements</button></div></div>;
}

function OwnersPanel({ status, setStatus }: { status: ReportStatus; setStatus: (status: ReportStatus) => void }) {
  const rows = [
    ["North Coast Mobility", "$4,280.16", "Ready"],
    ["Kelly Fleet LLC", "$3,842.90", "Ready"],
    ["Sunset Auto Group", "$2,190.44", "Review"],
  ];
  const visibleRows = status === "ready" ? rows.filter((row) => row[2] === "Ready") : rows;

  return (
    <div className="app-screen owners-screen">
      <div className="app-toolbar">
        <div><span className="app-overline">AUGUST 2026 · MASTER SUMMARY</span><h3>Reports</h3></div>
        <div className="report-actions"><button>Export .xlsx</button><button>Calculate</button><button className="generate-button">Finalize month</button></div>
      </div>
      <div className="report-master-table">
        <div><span>Vehicle</span><span>Owner</span><span>Revenue</span><span>Expenses</span><span>Mgmt fee</span><span>Owner payout</span></div>
        <article><strong>2023 Subaru Forester</strong><span>Northstar Mobility</span><span>$4,280.16</span><span>$147.00</span><span>$642.02</span><strong>$3,491.14</strong></article>
      </div>
      <div className="payout-heading"><div><span className="app-overline">PAYOUTS</span><strong>$10,313.50 outstanding</strong></div><div className="table-controls" role="group" aria-label="Statement status"><button className={status === "all" ? "active" : ""} onClick={() => setStatus("all")}>All</button><button className={status === "ready" ? "active" : ""} onClick={() => setStatus("ready")}>Ready</button></div></div>
      <div className="owner-table">
        {visibleRows.map(([owner, amount, rowStatus]) => (
          <article key={owner}><span className="owner-avatar">{owner[0]}</span><strong>{owner}</strong><span>{amount}</span><b className={rowStatus.toLowerCase()}>{rowStatus}</b></article>
        ))}
      </div>
      <p className="demo-hint">Try it · filter statements by status</p>
    </div>
  );
}

function PhonePreview({
  active,
  setActive,
  metric,
  setMetric,
  kind,
  setKind,
  status,
  setStatus,
  photoSrc,
  photoName,
  onPhotoChange,
}: {
  active: AppView;
  setActive: (feature: AppView) => void;
  metric: Metric;
  setMetric: (metric: Metric) => void;
  kind: UploadKind;
  setKind: (kind: UploadKind) => void;
  status: ReportStatus;
  setStatus: (status: ReportStatus) => void;
} & PhotoProps) {
  const [mobileVehicles, setMobileVehicles] = useState(initialVehicles.slice(0, 4));

  const addMobileVehicle = () => {
    const next = initialVehicles[mobileVehicles.length];
    if (next) setMobileVehicles((current) => [...current, next]);
  };

  return (
    <div className="phone-device">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-header"><strong>{active === "performance" ? "Northstar" : active === "uploads" ? "Uploads" : active === "owners" ? "Reports" : active === "vehicles" ? "Vehicles" : active === "inbox" ? "Inbox" : "Assistant"}</strong><img src="/autopus/autopus-symbol.png" alt="" /></div>

        {active === "performance" && (
          <div className="phone-view">
            <span className="phone-overline">FLEET OVERVIEW</span>
            <h4>Northstar Mobility</h4>
            <div className="phone-month">‹ <b>August 2026</b> ›</div>
            <div className="phone-segmented" role="group" aria-label="Mobile fleet overview metric">
              <button className={metric === "revenue" ? "active" : ""} onClick={() => setMetric("revenue")}>Revenue</button>
              <button className={metric === "profit" ? "active" : ""} onClick={() => setMetric("profit")}>Net</button>
            </div>
            <strong className="phone-total">{metric === "revenue" ? "$1,040" : "$73"}</strong>
            <div className="phone-chart">
              {chartSets[metric].slice(0, 8).map((height, index) => <i key={index} style={{ height: `${Math.max(height, 14)}%` }} />)}
            </div>
            <div className="phone-stat-grid"><article><span>Revenue</span><b>$1,040</b></article><article><span>Net profit</span><b>$73</b></article><article><span>Vehicles</span><b>48</b></article><article><span>Expenses</span><b>$147</b></article></div>
          </div>
        )}

        {active === "uploads" && (
          <div className="phone-view">
            <span className="phone-overline">AI DOCUMENT INTAKE</span>
            <h4>New upload</h4>
            <div className="phone-segmented" role="group" aria-label="Mobile upload type">
              <button className={kind === "toll" ? "active" : ""} onClick={() => setKind("toll")}>Toll</button>
              <button className={kind === "expense" ? "active" : ""} onClick={() => setKind("expense")}>Expense</button>
              <button className={kind === "receipt" ? "active" : ""} onClick={() => setKind("receipt")}>Receipt</button>
            </div>
            <label className={`phone-drop ${photoSrc ? "has-photo" : ""}`}>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onPhotoChange} />
              {photoSrc ? <img src={photoSrc} alt="Uploaded document preview" /> : <span>＋</span>}
              <strong>{photoSrc ? photoName : "Add a photo"}</strong><small>{photoSrc ? "Added · tap to replace" : "Autopus AI fills the details"}</small>
            </label>
            <div className="phone-upload-result"><i>✓</i><div><strong>{kind === "toll" ? "FasTrak toll" : kind === "expense" ? "Auto repair" : "Filed receipt"}</strong><small>Matched to vehicle 123ABC</small></div><b>Ready</b></div>
          </div>
        )}

        {active === "owners" && (
          <div className="phone-view">
            <span className="phone-overline">OWNER REPORTING</span>
            <h4>August statements</h4>
            <div className="phone-segmented" role="group" aria-label="Mobile report status">
              <button className={status === "all" ? "active" : ""} onClick={() => setStatus("all")}>All</button>
              <button className={status === "ready" ? "active" : ""} onClick={() => setStatus("ready")}>Ready</button>
            </div>
            <div className="phone-payout"><span>Payout due</span><strong>$10,313.50</strong><small>2 statements ready to send</small></div>
            <div className="phone-owner-row"><i>K</i><div><strong>Kelly Fleet LLC</strong><small>$3,842.90</small></div><b>Ready</b></div>
            {status === "all" && <div className="phone-owner-row"><i>S</i><div><strong>Sunset Auto Group</strong><small>$2,190.44</small></div><b className="review">Review</b></div>}
          </div>
        )}

        {active === "vehicles" && (
          <div className="phone-view phone-vehicles-view">
            <span className="phone-overline">YOUR FLEET</span>
            <div className="phone-fleet-heading"><h4>{mobileVehicles.length} vehicles</h4><button onClick={addMobileVehicle} disabled={mobileVehicles.length >= initialVehicles.length}>＋ New</button></div>
            <div className="phone-fleet-list">
              {mobileVehicles.map((vehicle) => <article key={vehicle.id}><img src={vehicle.image} alt={vehicle.name} /><div><b>{vehicle.name.replace(/^\d{4} /, "")}</b><small>{vehicle.owner}</small><span>{vehicle.plate} · {vehicle.trips} trips</span></div><i className={vehicle.status.toLowerCase()}>{vehicle.status}</i></article>)}
            </div>
          </div>
        )}

        {active === "inbox" && <div className="phone-view"><span className="phone-overline">GUEST MESSAGES</span><h4>Inbox</h4><div className="phone-owner-row"><i>JM</i><div><strong>Jordan Miles</strong><small>Can I pick up earlier?</small></div><b>Reply</b></div><div className="phone-owner-row"><i>AS</i><div><strong>Alex Smith</strong><small>Return photos uploaded</small></div><b>Open</b></div></div>}

        {active === "assistant" && <div className="phone-view"><span className="phone-overline">AUTOPUS AI</span><h4>Today</h4><div className="phone-payout"><span>Needs attention</span><strong>3 tasks</strong><small>Inspections, receipt, statements</small></div></div>}

        <nav className="phone-nav" aria-label="Mobile product preview">
          <button className={active === "performance" ? "active" : ""} onClick={() => setActive("performance")}><span>▦</span>Overview</button>
          <button className={active === "vehicles" ? "active" : ""} onClick={() => setActive("vehicles")}><span>▱</span>Vehicles</button>
          <button className={active === "uploads" ? "active" : ""} onClick={() => setActive("uploads")}><span>▤</span>Uploads</button>
          <button className={active === "owners" ? "active" : ""} onClick={() => setActive("owners")}><span>◎</span>Reports</button>
        </nav>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const scrollyRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const scrollRangeRef = useRef<{ start: number; end: number } | null>(null);
  const [active, setActive] = useState<FeatureId>("performance");
  const [appView, setAppView] = useState<AppView>("performance");
  const [metric, setMetric] = useState<Metric>("revenue");
  const [kind, setKind] = useState<UploadKind>("toll");
  const [status, setStatus] = useState<ReportStatus>("all");
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("vehicle-photo.jpg");

  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = scrollyRef.current;
          const product = productRef.current;
          if (!section || !product) return;

          const trigger = ScrollTrigger.create({
            id: "autopus-product-story",
            trigger: section,
            pin: product,
            pinSpacing: true,
            start: "top 84px",
            end: () => `+=${Math.max(window.innerHeight * (features.length - 1), 2250)}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (features.length - 1),
              duration: { min: 0.22, max: 0.5 },
              delay: 0.08,
              ease: "power2.inOut",
            },
            onRefresh: (self) => {
              scrollRangeRef.current = { start: self.start, end: self.end };
            },
            onUpdate: (self) => {
              const index = Math.min(
                features.length - 1,
                Math.round(self.progress * (features.length - 1)),
              );
              const nextFeature = features[index].id as FeatureId;
              section.style.setProperty("--showcase-progress", String(self.progress));
              section.dataset.step = String(index + 1);
              setActive((current) => (current === nextFeature ? current : nextFeature));
              setAppView((current) => (current === nextFeature ? current : nextFeature));
            },
          });

          scrollRangeRef.current = { start: trigger.start, end: trigger.end };
          return () => {
            scrollRangeRef.current = null;
            trigger.kill();
          };
        },
      );

      ScrollTrigger.refresh();
      teardown = () => media.revert();
    };

    setup();
    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  const selectFeature = (feature: FeatureId) => {
    setActive(feature);
    setAppView(feature);
    const index = features.findIndex((item) => item.id === feature);
    const range = scrollRangeRef.current;
    if (!range) return;
    window.scrollTo({
      top: range.start + ((range.end - range.start) * index) / (features.length - 1),
      behavior: "smooth",
    });
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPhotoSrc(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <section className="showcase-scroll-space" ref={scrollyRef} aria-label="Autopus product walkthrough">
    <div className="product-showcase" data-active={active} data-view={appView} ref={productRef}>
      <div className="feature-selector" role="tablist" aria-label="Autopus product features">
        {features.map((feature) => (
          <button
            key={feature.id}
            className={active === feature.id ? "active" : ""}
            onClick={() => selectFeature(feature.id as FeatureId)}
            role="tab"
            aria-selected={active === feature.id}
            aria-controls={`panel-${feature.id}`}
          >
            <span>{feature.number}</span>
            <div><small>{feature.label}</small><strong>{feature.title}</strong></div>
          </button>
        ))}
      </div>
      <div className="showcase-step-progress" aria-hidden="true"><i /><span>Scroll to explore · <b>{features.findIndex((item) => item.id === active) + 1}</b> / {features.length}</span></div>
      <div className="product-stage" id={`panel-${active}`} role="tabpanel">
        <div className="stage-glow" />
        <p className="device-instruction"><span>Interactive preview</span> Use either screen. Every navigation item and upload control works.</p>
        <div className="device-composition">
          <div className="app-shell desktop-device">
            <aside aria-label="Desktop product preview navigation">
              <div className="mini-brand"><img src="/autopus/autopus-symbol.png" alt="" /><b>Autopus</b></div>
              <span className="mini-label">WORKSPACE</span>
              <button className={appView === "performance" ? "active" : ""} onClick={() => setAppView("performance")}>Fleet overview</button>
              <button className={appView === "inbox" ? "active" : ""} onClick={() => setAppView("inbox")}>Inbox</button>
              <button className={appView === "vehicles" ? "active" : ""} onClick={() => setAppView("vehicles")}>Vehicles</button>
              <button className={appView === "uploads" ? "active" : ""} onClick={() => setAppView("uploads")}>Uploads</button>
              <button className={appView === "owners" ? "active" : ""} onClick={() => setAppView("owners")}>Reports</button>
              <button className={appView === "assistant" ? "active" : ""} onClick={() => setAppView("assistant")}>AI assistant</button>
            </aside>
            <div className="app-content">
              {appView === "performance" && <PerformancePanel metric={metric} setMetric={setMetric} />}
              {appView === "uploads" && <UploadPanel kind={kind} setKind={setKind} photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} />}
              {appView === "owners" && <OwnersPanel status={status} setStatus={setStatus} />}
              {appView === "vehicles" && <VehiclesPanel photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} />}
              {appView === "inbox" && <InboxPanel />}
              {appView === "assistant" && <AssistantPanel />}
            </div>
          </div>
          <PhonePreview active={appView} setActive={setAppView} metric={metric} setMetric={setMetric} kind={kind} setKind={setKind} status={status} setStatus={setStatus} photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} />
        </div>
      </div>
    </div>
    </section>
  );
}
