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
type AppView = FeatureId;
type Metric = "profit" | "revenue";
type UploadKind = "expense" | "ticket" | "toll";
type ScanStage = "idle" | "scanning" | "done";
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
            <article className="dispatch-card">
              <div className="dispatch-card-head">
                <div>
                  <span className="task-chip">{mode === "checkin" ? "CHECK-IN" : "CHECK-OUT"}</span>
                  <span className="trip-id">#59513123</span>
                </div>
                <div className="trip-time">
                  <small>{mode === "checkin" ? "Trip start" : "Returned"}</small>
                  <b>{mode === "checkin" ? "Wed, Aug 5 · 10:00 AM" : "Thu, Aug 6 · 11:00 AM"}</b>
                </div>
              </div>
              <div className="dispatch-card-vehicle">
                <img src={tripVehicleImage} alt="Vehicle assigned to trip" />
                <div>
                  <strong>2022 Toyota Sienna</strong>
                  <small>Assigned to tester1</small>
                </div>
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
          {taskComplete && (
            <article className="dispatch-complete-card">
              <img src={tripVehicleImage} alt="Completed vehicle" />
              <div>
                <p><span className="task-chip neutral">{mode === "checkin" ? "CHECK-IN" : "CHECK-OUT"}</span></p>
                <strong>2022 Toyota Sienna</strong>
                <small>#59513123 · tester1</small>
              </div>
              <div className="complete-side">
                <span className="complete-chip">Prep complete</span>
                <button type="button" onClick={() => mode === "checkin" ? setPrepComplete(false) : setCheckoutComplete(false)} aria-label="Undo completion">↶</button>
              </div>
              {mode === "checkout" && (reports.refuel || checkoutNote) && (
                <div className="checkout-summary">
                  <small>Reported at check-out</small>
                  {reports.refuel && <b>Needs refuel</b>}
                  {photoSrc && <span>Photo 1</span>}
                  {checkoutNote && <p>{checkoutNote}</p>}
                </div>
              )}
            </article>
          )}
          <article className="dispatch-complete-card">
            <img src={tripVehicleImage} alt="Completed vehicle" />
            <div>
              <p><span className="task-chip neutral">CHECK-IN</span></p>
              <strong>2022 Toyota Sienna</strong>
              <small>#59123814 · tester1 · Tue, Aug 4</small>
            </div>
            <span className="complete-chip">Prep complete</span>
          </article>
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

const uploadKinds: { id: UploadKind; label: string; short: string }[] = [
  { id: "expense", label: "Expense", short: "Expense" },
  { id: "ticket", label: "Tickets", short: "Ticket" },
  { id: "toll", label: "Tolls", short: "Toll" },
];

const scanDocument = {
  file: "valvoline-invoice-85632.jpg",
  image: "/autopus/scan-sample-invoice.jpg?v=3",
  vendor: "Valvoline Instant Oil Change",
  location: "Burien, WA",
  reference: "Invoice 85632",
  date: "Jul 14, 2026",
  vehicle: "2022 BMW X3 · 9BMW821",
  owner: "Sofia Alvarez",
  odometer: "97,771 mi",
  service: "European full synthetic oil change",
  subtotal: "$112.63",
  tax: "$11.71",
  total: "$124.34",
};

type ScanProps = { scanStage: ScanStage; startScan: () => void };

function UploadPanel({ kind, setKind, scanStage, startScan }: { kind: UploadKind; setKind: (kind: UploadKind) => void } & ScanProps) {
  const kindLabel = uploadKinds.find((item) => item.id === kind)?.short ?? "Expense";
  const scanned = scanStage === "done";

  return (
    <div className="app-screen uploads-screen">
      <div className="app-toolbar">
        <div><span className="app-overline">DOCUMENT INTAKE</span><h3>Uploads</h3><p className="app-subtitle">Vehicle expenses, parking tickets and toll documents</p></div>
      </div>
      <div className="segmented upload-type-tabs" role="group" aria-label="Upload type">
        {uploadKinds.map((item) => (
          <button key={item.id} className={kind === item.id ? "active" : ""} onClick={() => setKind(item.id)}>{item.label}</button>
        ))}
      </div>
      <div className="upload-layout">
        <div className="upload-card">
          <strong>Scan a document</strong>
          <div className={`scan-frame stage-${scanStage}`}>
            <img src={scanDocument.image} alt="Oil change invoice ready to scan" />
            {scanStage === "scanning" && <span className="scan-beam" aria-hidden="true" />}
            {scanned && <span className="scan-badge">✓ Scanned</span>}
          </div>
          <div className="scan-file"><b>{scanDocument.file}</b><small>JPEG · 812 KB</small></div>
          <button className="scan-action" onClick={startScan} disabled={scanStage === "scanning"}>
            {scanStage === "idle" ? "✦ Scan with Autopus AI" : scanStage === "scanning" ? "Reading document…" : "↻ Scan again"}
          </button>
          <div className="ai-row"><span>✦ Autopus AI reads the document for you</span><b>Qwen 3.6⌄</b></div>
        </div>
        <div className={`scan-result stage-${scanStage}`}>
          {scanStage === "idle" && (
            <div className="upload-guidelines">
              <strong>What Autopus pulls out</strong>
              <span>✓ Vendor, date and reference number</span>
              <span>✓ Matching vehicle and owner</span>
              <span>✓ Line items, tax and total</span>
              <span>✓ Review the values, then confirm</span>
            </div>
          )}
          {scanStage === "scanning" && (
            <div className="scan-progress">
              <strong>Reading document…</strong>
              <i /><i /><i /><i /><i />
              <small>Matching the invoice to a vehicle in your fleet</small>
            </div>
          )}
          {scanned && (
            <div className="scan-fields">
              <div className="scan-fields-head"><strong>Extracted details</strong><b>Filed as {kindLabel}</b></div>
              <dl>
                <div><dt>Vendor</dt><dd>{scanDocument.vendor}<small>{scanDocument.location}</small></dd></div>
                <div><dt>Document</dt><dd>{scanDocument.reference}<small>{scanDocument.date}</small></dd></div>
                <div><dt>Vehicle</dt><dd>{scanDocument.vehicle}<small>{scanDocument.owner} · {scanDocument.odometer}</small></dd></div>
                <div><dt>Service</dt><dd>{scanDocument.service}</dd></div>
                <div><dt>Subtotal</dt><dd>{scanDocument.subtotal}<small>Tax {scanDocument.tax}</small></dd></div>
                <div className="scan-total"><dt>Total</dt><dd>{scanDocument.total}</dd></div>
              </dl>
              <button className="generate-button">Confirm and file</button>
            </div>
          )}
        </div>
      </div>
      <div className="recent-upload-table">
        <div><strong>Recent uploads</strong><span>{scanned ? "2 uploads" : "1 upload"}</span></div>
        {scanned && <article className="fresh-upload"><span>{scanDocument.date}</span><b>{scanDocument.owner}</b><span>{kindLabel}</span><span>BMW X3 · 9BMW821</span><strong>{scanDocument.total}</strong><i className="pending">Needs review</i></article>}
        <article><span>Jul 26, 2026</span><b>Daniel Reyes</b><span>Expense</span><span>Subaru Forester · 123ABC</span><strong>$147.00</strong><i>Reviewed</i></article>
      </div>
      <p className="demo-hint">Try it · scan the document, then switch how it is filed</p>
    </div>
  );
}

const initialVehicles = [
  { id: 1, name: "2022 Toyota Sienna", make: "toyota", owner: "Marcus Hale", plate: "7G2C236", miles: "12,480", trips: 18, status: "Active", service: "Sep 18", image: tripVehicleImage },
  { id: 2, name: "2023 Subaru Forester", make: "subaru", owner: "Daniel Reyes", plate: "123ABC", miles: "77,927", trips: 42, status: "Active", service: "Aug 28", image: "https://images.unsplash.com/photo-1687048985980-bcf332f600c1?auto=format&fit=crop&w=560&q=82" },
  { id: 3, name: "2024 Toyota RAV4", make: "toyota", owner: "Kelly Nguyen", plate: "8EVX204", miles: "31,204", trips: 36, status: "Active", service: "Oct 04", image: "https://images.unsplash.com/photo-1687048985980-bcf332f600c1?auto=format&fit=crop&w=560&q=82" },
  { id: 4, name: "2022 BMW X3", make: "bmw", owner: "Sofia Alvarez", plate: "9BMW821", miles: "97,771", trips: 29, status: "Maintenance", service: "In service", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=560&q=82" },
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

const ownerReports = {
  "Daniel Reyes": {
    status: "Ready",
    paid: true,
    paidDate: "8/10/2026",
    trips: 8,
    revenue: "$5,120.40",
    expenses: "$198.00",
    fee: "$642.24",
    ownerRevenue: "$4,478.16",
    payout: "$4,280.16",
    tripsDetail: [
      { date: "8/3/2026", vehicle: "2023 Subaru Forester", guest: "Maya K.", revenue: "$720.40", ownerRevenue: "$630.35" },
      { date: "8/7/2026", vehicle: "2024 BMW X5", guest: "Noah T.", revenue: "$812.30", ownerRevenue: "$710.76" },
      { date: "8/9/2026", vehicle: "2023 Subaru Forester", guest: "Sofia R.", revenue: "$458.20", ownerRevenue: "$400.93" },
      { date: "8/12/2026", vehicle: "2024 BMW X5", guest: "Liam P.", revenue: "$512.70", ownerRevenue: "$448.61" },
      { date: "8/16/2026", vehicle: "2023 Subaru Forester", guest: "Emma C.", revenue: "$576.50", ownerRevenue: "$504.44" },
      { date: "8/20/2026", vehicle: "2023 Subaru Forester", guest: "Mason D.", revenue: "$639.80", ownerRevenue: "$559.83" },
      { date: "8/24/2026", vehicle: "2024 BMW X5", guest: "Mia K.", revenue: "$587.80", ownerRevenue: "$514.33" },
      { date: "8/29/2026", vehicle: "2023 Subaru Forester", guest: "Ethan S.", revenue: "$812.70", ownerRevenue: "$708.91" },
    ],
    vehicles: [
      { name: "2023 Subaru Forester", trips: 5, revenue: "$3,207.60", expenses: "$147.00", fee: "$402.24", payout: "$2,658.36" },
      { name: "2024 BMW X5", trips: 3, revenue: "$1,912.80", expenses: "$51.00", fee: "$240.00", payout: "$1,621.80" },
    ],
  },
  "Kelly Nguyen": {
    status: "Ready",
    paid: true,
    paidDate: "8/10/2026",
    trips: 6,
    revenue: "$4,610.00",
    expenses: "$186.10",
    fee: "$581.00",
    ownerRevenue: "$4,029.00",
    payout: "$3,842.90",
    tripsDetail: [
      { date: "8/4/2026", vehicle: "2024 Toyota RAV4", guest: "Ava M.", revenue: "$812.00", ownerRevenue: "$709.70" },
      { date: "8/8/2026", vehicle: "2024 Toyota RAV4", guest: "Noah T.", revenue: "$764.50", ownerRevenue: "$668.14" },
      { date: "8/14/2026", vehicle: "2024 Toyota RAV4", guest: "Liam P.", revenue: "$690.20", ownerRevenue: "$603.24" },
      { date: "8/19/2026", vehicle: "2024 Toyota RAV4", guest: "Emma C.", revenue: "$742.80", ownerRevenue: "$649.20" },
      { date: "8/23/2026", vehicle: "2024 Toyota RAV4", guest: "Mason D.", revenue: "$810.40", ownerRevenue: "$708.30" },
      { date: "8/28/2026", vehicle: "2024 Toyota RAV4", guest: "Mia K.", revenue: "$790.10", ownerRevenue: "$690.42" },
    ],
    vehicles: [
      { name: "2024 Toyota RAV4", trips: 6, revenue: "$4,610.00", expenses: "$186.10", fee: "$581.00", payout: "$3,842.90" },
    ],
  },
  "Sofia Alvarez": {
    status: "Review",
    paid: false,
    paidDate: null,
    trips: 5,
    revenue: "$2,760.00",
    expenses: "$214.56",
    fee: "$355.00",
    ownerRevenue: "$2,405.00",
    payout: "$2,190.44",
    tripsDetail: [
      { date: "8/5/2026", vehicle: "2022 BMW X3", guest: "Sophia R.", revenue: "$512.40", ownerRevenue: "$446.50" },
      { date: "8/11/2026", vehicle: "2022 BMW X3", guest: "Liam P.", revenue: "$498.20", ownerRevenue: "$434.12" },
      { date: "8/17/2026", vehicle: "2022 BMW X3", guest: "Emma C.", revenue: "$560.80", ownerRevenue: "$488.70" },
      { date: "8/22/2026", vehicle: "2022 BMW X3", guest: "Mason D.", revenue: "$604.10", ownerRevenue: "$526.40" },
      { date: "8/27/2026", vehicle: "2022 BMW X3", guest: "Ethan S.", revenue: "$584.50", ownerRevenue: "$509.28" },
    ],
    vehicles: [
      { name: "2022 BMW X3", trips: 5, revenue: "$2,760.00", expenses: "$214.56", fee: "$355.00", payout: "$2,190.44" },
    ],
  },
} as const;

type OwnerName = keyof typeof ownerReports;

function OwnerReportModal({ owner, onClose }: { owner: OwnerName; onClose: () => void }) {
  const report = ownerReports[owner];

  return (
    <div className="owner-report-layer" onClick={onClose} role="presentation">
      <article className="owner-report" onClick={(event) => event.stopPropagation()} role="dialog" aria-label={`${owner} August statement`}>
        <header className="statement-hero">
          <div className="statement-brand">
            <img src="/autopus/autopus-symbol-road.png" alt="" />
            <strong>Autopus</strong>
          </div>
          <p>Statement period: August 2026</p>
          <div className="statement-prepared">
            <span>Prepared for</span>
            <b>{owner}</b>
            <small>Northstar Mobility</small>
          </div>
          <button type="button" onClick={onClose} aria-label="Close statement">✕</button>
        </header>

        <div className="statement-kpis">
          <div className="statement-payout">
            <span>Owner payout</span>
            <b>{report.payout}</b>
            <i className={report.paid ? "paid" : "due"}>{report.paid ? "Paid" : "Review"}</i>
          </div>
          <div><b>{report.trips}</b><span>Trips</span></div>
          <div><b>{report.revenue}</b><span>Revenue</span></div>
          <div><b>{report.fee}</b><span>Mgmt fee</span></div>
        </div>

        <div className="statement-split">
          <section>
            <h4>Prepared for</h4>
            <strong>{owner}</strong>
            <small>August owner statement</small>
          </section>
          <section>
            <h4>Breakdown</h4>
            <ul>
              <li><span>Revenue</span><b>{report.revenue}</b></li>
              <li><span>Expenses</span><b>{report.expenses}</b></li>
              <li><span>Mgmt fee</span><b>{report.fee}</b></li>
              <li><span>Owner payout</span><b>{report.payout}</b></li>
            </ul>
          </section>
        </div>

        <section className="statement-block">
          <h4>Trip detail</h4>
          <div className="statement-table trip-table">
            <div><span>End date</span><span>Vehicle</span><span>Guest</span><span>Revenue</span><span>Owner revenue</span></div>
            {report.tripsDetail.map((trip) => (
              <div key={`${trip.date}-${trip.guest}`}>
                <span>{trip.date}</span>
                <span>{trip.vehicle}</span>
                <span>{trip.guest}</span>
                <span>{trip.revenue}</span>
                <b>{trip.ownerRevenue}</b>
              </div>
            ))}
            <div className="statement-total">
              <span>Total</span>
              <span />
              <span />
              <span>{report.revenue}</span>
              <b>{report.ownerRevenue}</b>
            </div>
          </div>
          <p className="statement-note">Owner revenue = Revenue − Mgmt fee. Owner payout = Owner revenue − Expenses.</p>
        </section>

        <section className="statement-block">
          <h4>Vehicles</h4>
          <div className="statement-table vehicle-table">
            <div><span>Vehicle</span><span>Trips</span><span>Revenue</span><span>Expenses</span><span>Mgmt fee</span><span>Owner payout</span></div>
            {report.vehicles.map((vehicle) => (
              <div key={vehicle.name}>
                <span>{vehicle.name}</span>
                <span>{vehicle.trips}</span>
                <span>{vehicle.revenue}</span>
                <span>{vehicle.expenses}</span>
                <span>{vehicle.fee}</span>
                <b>{vehicle.payout}</b>
              </div>
            ))}
          </div>
        </section>

        <footer>
          <small>{report.paidDate ? `Paid ${report.paidDate}.` : "Pending review before payout."}</small>
          <button type="button" className="generate-button">{report.paid ? "Resend statement" : "Send statement"}</button>
        </footer>
      </article>
    </div>
  );
}
function OwnersPanel({ status, setStatus, onOpen }: { status: ReportStatus; setStatus: (status: ReportStatus) => void; onOpen: (owner: OwnerName) => void }) {
  const rows: [OwnerName, string, string][] = [
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
          <article key={owner}>
            <span className="owner-avatar">{ownerInitials(owner)}</span>
            <button type="button" className="owner-name" onClick={() => onOpen(owner)}>{owner}</button>
            <span>{amount}</span>
            <button type="button" className={rowStatus.toLowerCase()} onClick={() => onOpen(owner)}>{rowStatus}</button>
          </article>
        ))}
      </div>
      <p className="demo-hint">Try it · open a name or Ready to preview the owner statement</p>
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
  scanStage,
  startScan,
  photoSrc,
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
  onOpenStatement,
}: {
  active: AppView;
  setActive: (feature: AppView) => void;
  metric: Metric;
  setMetric: (metric: Metric) => void;
  kind: UploadKind;
  setKind: (kind: UploadKind) => void;
  status: ReportStatus;
  setStatus: (status: ReportStatus) => void;
  onOpenStatement: (owner: OwnerName) => void;
} & ScanProps & PhotoProps & Omit<DispatchProps, "photoSrc" | "photoName" | "onPhotoChange" | "setPickupLocation">) {
  const [mobileVehicles, setMobileVehicles] = useState(initialVehicles.slice(0, 4));

  const addMobileVehicle = () => {
    const next = initialVehicles[mobileVehicles.length];
    if (next) setMobileVehicles((current) => [...current, next]);
  };

  return (
    <div className="phone-device">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className={`phone-header ${active === "dispatch" ? "dispatch-phone-header" : ""}`}><strong>{active === "dispatch" ? "My Trips" : active === "performance" ? "Northstar" : active === "uploads" ? "Uploads" : active === "owners" ? "Reports" : "Vehicles"}</strong>{active !== "dispatch" && <img src="/autopus/autopus-symbol-road.png" alt="" />}</div>

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
              {uploadKinds.map((item) => (
                <button key={item.id} className={kind === item.id ? "active" : ""} onClick={() => setKind(item.id)}>{item.short}</button>
              ))}
            </div>
            <button className={`phone-scan stage-${scanStage}`} onClick={startScan} disabled={scanStage === "scanning"}>
              <img src={scanDocument.image} alt="Oil change invoice ready to scan" />
              {scanStage === "scanning" && <i className="phone-scan-beam" aria-hidden="true" />}
              <span>{scanStage === "idle" ? "✦ Scan document" : scanStage === "scanning" ? "Reading…" : "✓ Scanned · tap to redo"}</span>
            </button>
            {scanStage === "done" ? (
              <div className="phone-scan-fields">
                <div><span>Vendor</span><b>Valvoline · Burien</b></div>
                <div><span>Vehicle</span><b>BMW X3 · 9BMW821</b></div>
                <div><span>Total</span><b>{scanDocument.total}</b></div>
              </div>
            ) : (
              <div className="phone-upload-result"><i>✦</i><div><strong>Autopus AI fills the details</strong><small>Vendor, vehicle, tax and total</small></div><b>{scanStage === "scanning" ? "Reading" : "Ready"}</b></div>
            )}
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
            <button type="button" className="phone-owner-row" onClick={() => onOpenStatement("Daniel Reyes")}><i>DR</i><div><strong>Daniel Reyes</strong><small>$4,280.16</small></div><b>Ready</b></button>
            <button type="button" className="phone-owner-row" onClick={() => onOpenStatement("Kelly Nguyen")}><i>KN</i><div><strong>Kelly Nguyen</strong><small>$3,842.90</small></div><b>Ready</b></button>
            {status === "all" && <button type="button" className="phone-owner-row" onClick={() => onOpenStatement("Sofia Alvarez")}><i>SA</i><div><strong>Sofia Alvarez</strong><small>$2,190.44</small></div><b className="review">Review</b></button>}
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
  const clickNavRef = useRef(false);
  const scrollToY = useRef<(y: number) => void>((y) => {
    window.scrollTo({ top: y });
    clickNavRef.current = false;
  });
  const [active, setActive] = useState<FeatureId>("dispatch");
  const [appView, setAppView] = useState<AppView>("dispatch");
  const [metric, setMetric] = useState<Metric>("revenue");
  const [kind, setKind] = useState<UploadKind>("expense");
  const [scanStage, setScanStage] = useState<ScanStage>("idle");
  const [status, setStatus] = useState<ReportStatus>("all");
  const [statementOwner, setStatementOwner] = useState<OwnerName | null>(null);
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

  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startScan = () => {
    if (scanTimer.current) clearTimeout(scanTimer.current);
    setScanStage("scanning");
    scanTimer.current = setTimeout(() => setScanStage("done"), 2200);
  };

  useEffect(() => () => {
    if (scanTimer.current) clearTimeout(scanTimer.current);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollToPlugin"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
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
              duration: { min: 0.18, max: 0.32 },
              delay: 0.04,
              ease: "power2.out",
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
              if (clickNavRef.current) return;
              setActive((current) => (current === nextFeature ? current : nextFeature));
              setAppView((current) => (current === nextFeature ? current : nextFeature));
            },
          });

          scrollRangeRef.current = { start: trigger.start, end: trigger.end };
          scrollToY.current = (y) => {
            gsap.to(window, {
              scrollTo: { y, autoKill: false },
              duration: 0.34,
              ease: "power2.out",
              overwrite: true,
              onComplete: () => {
                clickNavRef.current = false;
              },
            });
          };
          return () => {
            scrollRangeRef.current = null;
            scrollToY.current = () => {};
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
    if (feature === active) return;
    clickNavRef.current = true;
    setActive(feature);
    setAppView(feature);
    const index = features.findIndex((item) => item.id === feature);
    const range = scrollRangeRef.current;
    if (!range) {
      clickNavRef.current = false;
      return;
    }
    const top = range.start + ((range.end - range.start) * index) / (features.length - 1);
    scrollToY.current(top);
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
        <p className="device-instruction"><span>Interactive preview</span> Use either screen. Every navigation item and the document scan work.</p>
        <div className="device-composition">
          <div className="app-shell desktop-device">
            <aside aria-label="Desktop product preview navigation">
              <div className="mini-brand"><img src="/autopus/autopus-symbol-road.png" alt="" /><b>Autopus</b></div>
              <span className="mini-label">WORKSPACE</span>
              <button className={appView === "dispatch" ? "active" : ""} onClick={() => setAppView("dispatch")}>Dispatch</button>
              <button className={appView === "performance" ? "active" : ""} onClick={() => setAppView("performance")}>Fleet overview</button>
              <button className={appView === "vehicles" ? "active" : ""} onClick={() => setAppView("vehicles")}>Vehicles</button>
              <button className={appView === "uploads" ? "active" : ""} onClick={() => setAppView("uploads")}>Uploads</button>
              <button className={appView === "owners" ? "active" : ""} onClick={() => setAppView("owners")}>Reports</button>
            </aside>
            <div className="app-content">
              {appView === "dispatch" && <DispatchPanel mode={tripMode} setMode={setTripMode} prepComplete={prepComplete} setPrepComplete={setPrepComplete} checkoutComplete={checkoutComplete} setCheckoutComplete={setCheckoutComplete} pickupLocation={pickupLocation} setPickupLocation={setPickupLocation} reports={tripReports} setReports={setTripReports} checkoutNote={checkoutNote} setCheckoutNote={setCheckoutNote} dateIndex={dateIndex} shiftDate={shiftDate} photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} />}
              {appView === "performance" && <PerformancePanel metric={metric} setMetric={setMetric} />}
              {appView === "uploads" && <UploadPanel kind={kind} setKind={setKind} scanStage={scanStage} startScan={startScan} />}
              {appView === "owners" && <OwnersPanel status={status} setStatus={setStatus} onOpen={setStatementOwner} />}
              {appView === "vehicles" && <VehiclesPanel photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} />}
            </div>
          </div>
          <PhonePreview active={appView} setActive={setAppView} metric={metric} setMetric={setMetric} kind={kind} setKind={setKind} status={status} setStatus={setStatus} scanStage={scanStage} startScan={startScan} photoSrc={photoSrc} photoName={photoName} onPhotoChange={handlePhotoChange} mode={tripMode} setMode={setTripMode} prepComplete={prepComplete} setPrepComplete={setPrepComplete} checkoutComplete={checkoutComplete} setCheckoutComplete={setCheckoutComplete} pickupLocation={pickupLocation} reports={tripReports} setReports={setTripReports} checkoutNote={checkoutNote} setCheckoutNote={setCheckoutNote} dateIndex={dateIndex} shiftDate={shiftDate} onOpenStatement={setStatementOwner} />
        </div>
        {statementOwner && <OwnerReportModal owner={statementOwner} onClose={() => setStatementOwner(null)} />}
      </div>
    </div>
    </section>
  );
}
