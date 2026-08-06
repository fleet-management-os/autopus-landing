"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

const features = [
  {
    id: "dispatch",
    number: "01",
    label: "Trip dispatch",
    title: "Prepare every trip, end to end",
    text: "Coordinate check-in, check-out, vehicle prep, and return issues from one shared workflow.",
  },
  {
    id: "performance",
    number: "02",
    label: "Fleet performance",
    title: "Know what the fleet is earning",
    text: "Revenue, profit, utilization, maintenance, and expenses—connected in one operating view.",
  },
  {
    id: "vehicles",
    number: "03",
    label: "Fleet management",
    title: "Manage every vehicle at scale",
    text: "Keep vehicles, owners, availability, mileage, and service in one operational view.",
  },
  {
    id: "uploads",
    number: "04",
    label: "AI document intake",
    title: "Turn receipts into clean records",
    text: "Upload tolls, tickets, and expenses. Autopus reads the file and prepares the details for review.",
  },
  {
    id: "owners",
    number: "05",
    label: "Owner reporting",
    title: "Keep every owner informed",
    text: "Build monthly statements from the same operational data your team already uses.",
  },
];

const chartSets = {
  profit: [20, 27, 35, 39, 68, 86, 66, 55, 30, 24, 8],
  revenue: [24, 32, 41, 48, 61, 77, 72, 83, 68, 88, 92],
};

type FeatureId = "dispatch" | "performance" | "vehicles" | "uploads" | "owners";
type AppView = FeatureId | "vehicles" | "inbox" | "assistant";
type Metric = "profit" | "revenue";
type UploadKind = "toll" | "expense" | "receipt";
type ReportStatus = "all" | "ready";
type TripMode = "checkin" | "checkout";
type TripReports = { refuel: boolean; miles: boolean; damage: boolean };

type DispatchProps = {
  mode: TripMode;
  setMode: (mode: TripMode) => void;
  prepComplete: boolean;
  setPrepComplete: (complete: boolean) => void;
  checkoutComplete: boolean;
  setCheckoutComplete: (complete: boolean) => void;
  pickupLocation: string;
  setPickupLocation: (location: string) => void;
  reports: TripReports;
  setReports: (reports: TripReports) => void;
  checkoutNote: string;
  setCheckoutNote: (note: string) => void;
  dateIndex: number;
  shiftDate: (direction: number) => void;
} & PhotoProps;

const tripDates = ["Tue, Aug 4", "Wed, Aug 5", "Thu, Aug 6"];
const tripVehicleImage = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=720&q=86";

function DispatchPanel({ mode, setMode, prepComplete, setPrepComplete, checkoutComplete, setCheckoutComplete, pickupLocation, setPickupLocation, reports, setReports, checkoutNote, setCheckoutNote, dateIndex, shiftDate, photoSrc, photoName, onPhotoChange }: DispatchProps) {
  const taskComplete = mode === "checkin" ? prepComplete : checkoutComplete;
  const finishTask = () => mode === "checkin" ? setPrepComplete(true) : setCheckoutComplete(true);

  return (
    <div className="app-screen dispatch-screen">
      <div className="dispatch-toolbar">
        <div><span className="app-overline">TRIP OPERATIONS</span><h3>Dispatch</h3><p>Cars going out in the next 24 hours, and cars just back</p></div>
        <div className="dispatch-mode-tabs" role="group" aria-label="Dispatch task type">
          <button className={mode === "checkin" ? "active" : ""} onClick={() => setMode("checkin")}>Check-in</button>
          <button className={mode === "checkout" ? "active" : ""} onClick={() => setMode("checkout")}>Check-out</button>
        </div>
        <div className="dispatch-date"><button onClick={() => shiftDate(-1)} aria-label="Previous day">‹</button><span><small>DISPATCH DAY</small><b>{tripDates[dateIndex]}, 2026</b></span><button onClick={() => shiftDate(1)} aria-label="Next day">›</button></div>
      </div>
      <div className="dispatch-columns">
        <section className="dispatch-column attention">
          <header><div><strong>Needs attention</strong><b>{taskComplete ? 0 : 1}</b></div><span>Prep outstanding in the next / last 24 hours</span></header>
          {!taskComplete ? (
            <article className="dispatch-card live-card">
              <div className="dispatch-card-top">
                <img src={tripVehicleImage} alt="Vehicle assigned to trip" />
                <div><p><span className="task-chip">{mode === "checkin" ? "CHECK-IN" : "CHECK-OUT"}</span> <b>Trip ID: 59513123</b></p><strong>2022 Toyota Sienna</strong><small>VIN: 5TABCDE5NS012345</small></div>
                <div className="trip-time"><small>{mode === "checkin" ? "TRIP START" : "RETURNED"}</small><b>{mode === "checkin" ? "Wed, Aug 5, 10:00 AM" : "Thu, Aug 6, 11:00 AM"}</b></div>
              </div>
              <div className="dispatch-controls">
                <label><span>Drop-off</span><select value={pickupLocation} onChange={(event) => setPickupLocation(event.target.value)}><option>— location not set —</option><option>Parking garage</option><option>Parking lot</option><option>Curbside</option></select></label>
                <label><span>Assigned to</span><select defaultValue="tester1"><option>tester1</option><option>Kelly</option><option>Unassigned</option></select></label>
              </div>
              {mode === "checkout" && <div className="dispatch-reporting">
                <strong>Anything to report?</strong>
                <div className="dispatch-checks">
                  <label><input type="checkbox" checked={reports.refuel} onChange={(event) => setReports({ ...reports, refuel: event.target.checked })} />Need refuel</label>
                  <label><input type="checkbox" checked={reports.miles} onChange={(event) => setReports({ ...reports, miles: event.target.checked })} />Extra miles</label>
                  <label><input type="checkbox" checked={reports.damage} onChange={(event) => setReports({ ...reports, damage: event.target.checked })} />Car damaged?</label>
                </div>
                {reports.refuel && <label className="dispatch-photo"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onPhotoChange} />{photoSrc ? <img src={photoSrc} alt="Checkout evidence" /> : <span>＋ Add photo</span>}<small>{photoSrc ? photoName : "Up to 5 photos"}</small></label>}
                <input className="dispatch-note" value={checkoutNote} onChange={(event) => setCheckoutNote(event.target.value)} placeholder="Add a check-out note" aria-label="Check-out note" />
              </div>}
              <div className="trip-progress"><i /><i /><i className={mode === "checkout" ? "complete" : ""} /><span>{mode === "checkin" ? "Vehicle ready for pickup" : "Return inspection"}</span></div>
              <button className="dispatch-finish" onClick={finishTask}>{mode === "checkin" ? "Finish trip prep" : "Finished check-out"}</button>
            </article>
          ) : <div className="dispatch-empty"><span>✓</span><strong>Everything is ready</strong><small>No outstanding {mode === "checkin" ? "check-in" : "check-out"} tasks.</small></div>}
        </section>
        <section className="dispatch-column completed">
          <header><div><strong>Completed today</strong><b>{taskComplete ? 2 : 1}</b></div><span>Prep finished within the same 24-hour windows</span></header>
          {taskComplete && <article className="dispatch-complete-card"><img src={tripVehicleImage} alt="Completed vehicle" /><div><p><span className="task-chip neutral">{mode === "checkin" ? "CHECK-IN" : "CHECK-OUT"}</span> <b>Trip ID: 59513123</b></p><strong>2022 Toyota Sienna</strong><small>VIN: 5TABCDE5NS012345</small></div><span className="complete-chip">✓ PREP COMPLETE</span>{mode === "checkout" && (reports.refuel || checkoutNote) && <div className="checkout-summary"><small>REPORTED AT CHECK-OUT</small>{reports.refuel && <b>⛽ NEEDS REFUEL</b>}{photoSrc && <span>Photo 1</span>}{checkoutNote && <p>{checkoutNote}</p>}</div>}<button onClick={() => mode === "checkin" ? setPrepComplete(false) : setCheckoutComplete(false)}>↶</button></article>}
          <article className="dispatch-complete-card"><img src={tripVehicleImage} alt="Completed vehicle" /><div><p><span className="task-chip neutral">CHECK-IN</span> <b>Trip ID: 59123814</b></p><strong>2022 Toyota Sienna</strong><small>tester1 · Tue, Aug 4, 1:58 PM</small></div><span className="complete-chip">✓ PREP COMPLETE</span></article>
        </section>
      </div>
      <p className="demo-hint">Try it · switch task type, assign a location, report an issue, or complete the trip</p>
    </div>
  );
}

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
        <article><span>Jul 26, 2026</span><b>Daniel Reyes</b><span>{kind === "toll" ? "Toll" : kind === "expense" ? "Expense" : "Receipt"}</span><span>Subaru Forester · 123ABC</span><strong>{kind === "toll" ? "$48.00" : "$147.00"}</strong><i>Reviewed</i></article>
      </div>
      <p className="demo-hint">Try it · switch the document type</p>
    </div>
  );
}

const initialVehicles = [
  { id: 1, name: "2022 Toyota Sienna", make: "toyota", owner: "Marcus Hale", plate: "7G2C236", miles: "12,480", trips: 18, status: "Active", service: "Sep 18", image: tripVehicleImage },
  { id: 2, name: "2023 Subaru Forester", make: "subaru", owner: "Daniel Reyes", plate: "123ABC", miles: "77,927", trips: 42, status: "Active", service: "Aug 28", image: "https://images.unsplash.com/photo-1687048985980-bcf332f600c1?auto=format&fit=crop&w=560&q=82" },
  { id: 3, name: "2024 Toyota RAV4", make: "toyota", owner: "Kelly Nguyen", plate: "8EVX204", miles: "31,204", trips: 36, status: "Active", service: "Oct 04", image: "https://images.unsplash.com/photo-1687048985980-bcf332f600c1?auto=format&fit=crop&w=560&q=82" },
  { id: 4, name: "2022 BMW X3", make: "bmw", owner: "Sofia Alvarez", plate: "9BMW821", miles: "54,110", trips: 29, status: "Maintenance", service: "In service", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=560&q=82" },
  { id: 5, name: "2021 Subaru Forester", make: "subaru", owner: "Marcus Hale", plate: "6SBR420", miles: "68,840", trips: 51, status: "Active", service: "Sep 02", image: "https://images.unsplash.com/photo-1552009385-fc97b944d70c?auto=format&fit=crop&w=560&q=82" },
  { id: 6, name: "2024 BMW X5", make: "bmw", owner: "Daniel Reyes", plate: "4BMW925", miles: "22,905", trips: 21, status: "Inactive", service: "Oct 21", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=560&q=82" },
];

const ownerInitials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

function VehiclesPanel({ photoSrc, photoName, onPhotoChange }: PhotoProps) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [makeFilter, setMakeFilter] = useState("all");
  const [layout, setLayout] = useState<"grid" | "list">("list");
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("2025 Toyota Sienna");
  const [newPlate, setNewPlate] = useState("NEW001");
  const [newOwner, setNewOwner] = useState("Marcus Hale");

  const filteredVehicles = vehicles.filter((vehicle) =>
    (statusFilter === "all" || vehicle.status.toLowerCase() === statusFilter) &&
    (makeFilter === "all" || vehicle.make === makeFilter) &&
    `${vehicle.name} ${vehicle.owner} ${vehicle.plate}`.toLowerCase().includes(query.toLowerCase()),
  );

  const addVehicle = () => {
    setVehicles((current) => [...current, { id: Date.now(), name: newName || "New fleet vehicle", make: newName.toLowerCase().includes("subaru") ? "subaru" : newName.toLowerCase().includes("bmw") ? "bmw" : "toyota", owner: newOwner || "Marcus Hale", plate: newPlate || "NEW001", miles: "0", trips: 0, status: "Active", service: "Not scheduled", image: photoSrc || tripVehicleImage }]);
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
        <select value={makeFilter} onChange={(event) => setMakeFilter(event.target.value)} aria-label="Vehicle make"><option value="all">All makes</option><option value="toyota">Toyota</option><option value="subaru">Subaru</option><option value="bmw">BMW</option></select>
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
    ["Daniel Reyes", "$4,280.16", "Ready"],
    ["Kelly Nguyen", "$3,842.90", "Ready"],
    ["Sofia Alvarez", "$2,190.44", "Review"],
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
        <article><strong>2023 Subaru Forester</strong><span>Daniel Reyes</span><span>$4,280.16</span><span>$147.00</span><span>$642.02</span><strong>$3,491.14</strong></article>
      </div>
      <div className="payout-heading"><div><span className="app-overline">PAYOUTS</span><strong>$10,313.50 outstanding</strong></div><div className="table-controls" role="group" aria-label="Statement status"><button className={status === "all" ? "active" : ""} onClick={() => setStatus("all")}>All</button><button className={status === "ready" ? "active" : ""} onClick={() => setStatus("ready")}>Ready</button></div></div>
      <div className="owner-table">
        {visibleRows.map(([owner, amount, rowStatus]) => (
          <article key={owner}><span className="owner-avatar">{ownerInitials(owner)}</span><strong>{owner}</strong><span>{amount}</span><b className={rowStatus.toLowerCase()}>{rowStatus}</b></article>
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
  mode,
  setMode,
  prepComplete,
  setPrepComplete,
  checkoutComplete,
  setCheckoutComplete,
  pickupLocation,
  reports,
  setReports,
  checkoutNote,
  setCheckoutNote,
  dateIndex,
  shiftDate,
}: {
  active: AppView;
  setActive: (feature: AppView) => void;
  metric: Metric;
  setMetric: (metric: Metric) => void;
  kind: UploadKind;
  setKind: (kind: UploadKind) => void;
  status: ReportStatus;
  setStatus: (status: ReportStatus) => void;
} & PhotoProps & Omit<DispatchProps, "photoSrc" | "photoName" | "onPhotoChange" | "setPickupLocation">) {
  const [mobileVehicles, setMobileVehicles] = useState(initialVehicles.slice(0, 4));

  const addMobileVehicle = () => {
    const next = initialVehicles[mobileVehicles.length];
    if (next) setMobileVehicles((current) => [...current, next]);
  };

  return (
    <div className="phone-device">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className={`phone-header ${active === "dispatch" ? "dispatch-phone-header" : ""}`}><strong>{active === "dispatch" ? "My Trips" : active === "performance" ? "Northstar" : active === "uploads" ? "Uploads" : active === "owners" ? "Reports" : active === "vehicles" ? "Vehicles" : active === "inbox" ? "Inbox" : "Assistant"}</strong>{active !== "dispatch" && <img src="/autopus/autopus-symbol.png" alt="" />}</div>

        {active === "dispatch" && (
          <div className="phone-view phone-dispatch-view">
            <div className="phone-trip-date"><button onClick={() => shiftDate(-1)} aria-label="Previous day">‹</button><b>{tripDates[dateIndex]}</b><button onClick={() => shiftDate(1)} aria-label="Next day">›</button></div>
            <div className="phone-trip-tabs" role="group" aria-label="Trip task type">
              <button className={mode === "checkin" ? "active" : ""} onClick={() => setMode("checkin")}>Check-in (1)</button>
              <button className={mode === "checkout" ? "active" : ""} onClick={() => setMode("checkout")}>Check-out (1)</button>
            </div>
            <p className="phone-trip-intro">{mode === "checkin" ? "Get the car ready before pickup." : "Check the car after it comes back."}</p>
            <article className="phone-trip-card">
              <div className="phone-trip-vehicle"><img src={tripVehicleImage} alt="Vehicle assigned to trip" /><div><span>{mode === "checkin" ? "CHECK-IN" : "CHECK-OUT"}</span><strong>2022 Toyota Sienna</strong><small>VIN: 5TABCDE5NS012345</small><small>Trip id: 59513123</small></div></div>
              <div className="phone-trip-due"><span>Due<br />Drop-off</span><b>{mode === "checkin" ? "Wed 10:00 AM" : "Thu 11:00 AM"}<br />{pickupLocation}</b></div>
              {mode === "checkout" && !checkoutComplete && <div className="phone-checkout-form">
                <p>Check the car over, then mark it done.</p><strong>ANYTHING TO REPORT?</strong>
                <label className={reports.refuel ? "selected" : ""}><input type="checkbox" checked={reports.refuel} onChange={(event) => setReports({ ...reports, refuel: event.target.checked })} /><span>◉</span><b>Need refuel</b></label>
                {reports.refuel && <div className="phone-photo-area"><small>You can upload up to 5 photos.</small>{photoSrc && <img src={photoSrc} alt="Checkout evidence" />}<label><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onPhotoChange} />▣ {photoSrc ? "Replace photo" : "Take / choose photo"}</label></div>}
                <label><input type="checkbox" checked={reports.miles} onChange={(event) => setReports({ ...reports, miles: event.target.checked })} /><span>◌</span><b>Extra miles</b></label>
                <label><input type="checkbox" checked={reports.damage} onChange={(event) => setReports({ ...reports, damage: event.target.checked })} /><span>△</span><b>Car damaged?</b></label>
                <span className="phone-note-label">Note</span><textarea value={checkoutNote} onChange={(event) => setCheckoutNote(event.target.value)} placeholder="Add a note" />
              </div>}
              {!((mode === "checkin" && prepComplete) || (mode === "checkout" && checkoutComplete)) && <button className="phone-trip-finish" onClick={() => mode === "checkin" ? setPrepComplete(true) : setCheckoutComplete(true)}>{mode === "checkin" ? "Finish trip prep" : "✓ Finished check-out"}</button>}
              {((mode === "checkin" && prepComplete) || (mode === "checkout" && checkoutComplete)) && <span className="phone-complete-state">✓ Prep Complete</span>}
            </article>
            <span className="phone-done-label">DONE (1)</span>
            <article className="phone-done-card"><img src={tripVehicleImage} alt="Completed trip vehicle" /><div><span>CHECK-IN</span><strong>2022 Toyota Sienna</strong><small>Trip id: 59123814</small><b>Prep Complete</b></div></article>
          </div>
        )}

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
            <div className="phone-owner-row"><i>KN</i><div><strong>Kelly Nguyen</strong><small>$3,842.90</small></div><b>Ready</b></div>
            {status === "all" && <div className="phone-owner-row"><i>SA</i><div><strong>Sofia Alvarez</strong><small>$2,190.44</small></div><b className="review">Review</b></div>}
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
          {active === "dispatch" ? <><button className="active" onClick={() => setActive("dispatch")}><span>▣</span>My Trips</button><button><span>⚙</span>Settings</button></> : <>
          <button className={active === "performance" ? "active" : ""} onClick={() => setActive("performance")}><span>▦</span>Overview</button>
          <button className={active === "vehicles" ? "active" : ""} onClick={() => setActive("vehicles")}><span>▱</span>Vehicles</button>
          <button className={active === "uploads" ? "active" : ""} onClick={() => setActive("uploads")}><span>▤</span>Uploads</button>
          <button className={active === "owners" ? "active" : ""} onClick={() => setActive("owners")}><span>◎</span>Reports</button>
          </>}
        </nav>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const scrollyRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const scrollRangeRef = useRef<{ start: number; end: number } | null>(null);
  const [active, setActive] = useState<FeatureId>("dispatch");
  const [appView, setAppView] = useState<AppView>("dispatch");
  const [metric, setMetric] = useState<Metric>("revenue");
  const [kind, setKind] = useState<UploadKind>("toll");
  const [status, setStatus] = useState<ReportStatus>("all");
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("vehicle-photo.jpg");
  const [tripMode, setTripMode] = useState<TripMode>("checkin");
  const [prepComplete, setPrepComplete] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("Curbside");
  const [tripReports, setTripReports] = useState<TripReports>({ refuel: true, miles: false, damage: false });
  const [checkoutNote, setCheckoutNote] = useState("1/3 fuel tank");
  const [dateIndex, setDateIndex] = useState(1);

  const shiftDate = (direction: number) => setDateIndex((current) => Math.min(tripDates.length - 1, Math.max(0, current + direction)));

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
              <button className={appView === "dispatch" ? "active" : ""} onClick={() => setAppView("dispatch")}>Dispatch</button>
              <button className={appView === "performance" ? "active" : ""} onClick={() => setAppView("performance")}>Fleet overview</button>
              <button className={appView === "inbox" ? "active" : ""} onClick={() => setAppView("inbox")}>Inbox</button>
              <button className={appView === "vehicles" ? "active" : ""} onClick={() => setAppView("vehicles")}>Vehicles</button>
              <button className={appView === "uploads" ? "active" : ""} onClick={() => setAppView("uploads")}>Uploads</button>
              <button className={appView === "owners" ? "active" : ""} onClick={() => setAppView("owners")}>Reports</button>
              <button className={appView === "assistant" ? "active" : ""} onClick={() => setAppView("assistant")}>AI assistant</button>
            </aside>
            <div className="app-content">
              {appView === "dispatch" && <DispatchPanel mode={tripMode} setMode={setTripMode} prepComplete={prepComplete} setPrepComplete={setPrepComplete} checkoutComplete={checkoutComplete} setCheckoutComplete={setCheckoutComplete} pickupLocation={pickupLocation} setPickupLocation={setPickupLocation} reports={tripReports} setReports={setTripReports} checkoutNote={checkoutNote} setCheckoutNote={setCheckoutNote} dateIndex={dateIndex} shiftDate={shiftDate} photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} />}
              {appView === "performance" && <PerformancePanel metric={metric} setMetric={setMetric} />}
              {appView === "uploads" && <UploadPanel kind={kind} setKind={setKind} photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} />}
              {appView === "owners" && <OwnersPanel status={status} setStatus={setStatus} />}
              {appView === "vehicles" && <VehiclesPanel photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} />}
              {appView === "inbox" && <InboxPanel />}
              {appView === "assistant" && <AssistantPanel />}
            </div>
          </div>
          <PhonePreview active={appView} setActive={setAppView} metric={metric} setMetric={setMetric} kind={kind} setKind={setKind} status={status} setStatus={setStatus} photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} mode={tripMode} setMode={setTripMode} prepComplete={prepComplete} setPrepComplete={setPrepComplete} checkoutComplete={checkoutComplete} setCheckoutComplete={setCheckoutComplete} pickupLocation={pickupLocation} reports={tripReports} setReports={setTripReports} checkoutNote={checkoutNote} setCheckoutNote={setCheckoutNote} dateIndex={dateIndex} shiftDate={shiftDate} />
        </div>
      </div>
    </div>
    </section>
  );
}
