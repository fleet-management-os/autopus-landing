const valueCards = [
  {
    icon: "/autopus/automate-operations.svg",
    kicker: "Less admin",
    title: "Automate daily operations",
    text: "Turn repeatable fleet work into reliable workflows—from guest handoffs and vehicle readiness to team follow-ups.",
    tone: "blue",
  },
  {
    icon: "/autopus/monthly-revenue.svg",
    kicker: "More yield",
    title: "Grow revenue intelligently",
    text: "See what every vehicle is earning, spot underperformers early, and make faster pricing and utilization decisions.",
    tone: "green",
  },
  {
    icon: "/autopus/real-time-insights.svg",
    kicker: "One clear view",
    title: "Know what is happening now",
    text: "Live performance signals replace scattered spreadsheets, so owners and operators can act with confidence.",
    tone: "photo",
  },
];

const journey = [
  {
    number: "01",
    title: "Plan",
    subtitle: "Set the fleet up to win",
    heading: "Turn every vehicle into a clear operating plan",
    text: "Bring vehicles, targets, schedules, and owner priorities into one place. Autopus gives your team the same source of truth before the day begins.",
    metric: "48",
    metricLabel: "active vehicles",
    accent: "mint",
  },
  {
    number: "02",
    title: "Operate",
    subtitle: "Keep work moving",
    heading: "Automate the work that slows operators down",
    text: "Standardize recurring tasks and handoffs so your team spends less time chasing status and more time keeping vehicles rentable.",
    metric: "24/7",
    metricLabel: "operational visibility",
    accent: "blue",
  },
  {
    number: "03",
    title: "Optimize",
    subtitle: "Improve utilization",
    heading: "See the signal behind every performance change",
    text: "Monitor occupancy, revenue, and fleet activity in real time. Find the gaps, understand the trend, and know what to do next.",
    metric: "76%",
    metricLabel: "occupancy preview",
    accent: "violet",
  },
  {
    number: "04",
    title: "Scale",
    subtitle: "Grow with control",
    heading: "Add vehicles without adding operational chaos",
    text: "Consistent workflows and shared performance data help your business grow while maintaining quality, accountability, and margin.",
    metric: "12.6%",
    metricLabel: "monthly revenue growth",
    accent: "coral",
  },
];

const faqs = [
  {
    q: "What is Autopus?",
    a: "Autopus is an operating system for modern rental fleets. It helps operators automate repeatable work, monitor fleet performance, and make data-informed decisions from one connected workspace.",
  },
  {
    q: "Which metrics can my team track?",
    a: "The product experience highlights occupancy rate, monthly revenue, and active vehicle count, with trend context that helps teams understand what changed and where to focus.",
  },
  {
    q: "How does Autopus help a fleet scale?",
    a: "Autopus creates repeatable operating workflows and a shared real-time view of the business. That reduces manual coordination as the fleet, team, and owner portfolio grow.",
  },
  {
    q: "Can I see the product before signing up?",
    a: "Yes. Book a demo to walk through the platform and discuss the workflows and performance signals that matter most for your fleet.",
  },
];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Autopus home">
      <img src="/autopus/autopus-symbol.png" alt="" />
      <span>Autopus</span>
    </a>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <Logo />
        <nav aria-label="Primary navigation">
          <a href="#platform">Platform</a>
          <a href="#journey">How it works</a>
          <a href="#results">Results</a>
          <a href="#faq">Resources</a>
        </nav>
        <div className="header-actions">
          <a className="login-link" href="https://www.autopus.app/login">
            Log in
          </a>
          <a className="pill pill-soft" href="#contact">
            Book a demo <span>↗</span>
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow-row" aria-label="Product capabilities">
          <span>Fleet operations</span>
          <span>Real-time insights</span>
          <span>Revenue performance</span>
        </div>
        <h1>
          The operating system for <em>modern fleets</em>
        </h1>
        <p className="hero-copy">
          Automate operations, maximize utilization, and unlock real performance
          insights—so your rental business can scale with confidence.
        </p>
        <a className="pill pill-primary" href="#contact">
          Book a demo <span>→</span>
        </a>

        <div className="hero-visual" aria-label="Autopus fleet performance preview">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="dashboard-window">
            <div className="window-bar">
              <Logo />
              <div className="window-nav">
                <span className="active">Overview</span>
                <span>Fleet</span>
                <span>Operations</span>
                <span>Reports</span>
              </div>
              <span className="avatar">KP</span>
            </div>
            <div className="dashboard-body">
              <div className="dash-heading">
                <div>
                  <span className="micro">FLEET PERFORMANCE</span>
                  <h2>Good morning, Kelly</h2>
                </div>
                <span className="live-dot">Live</span>
              </div>
              <div className="metric-grid">
                <article>
                  <img src="/autopus/occupancy-rate.svg" alt="" />
                  <span>Occupancy rate</span>
                  <strong>76%</strong>
                  <small className="up">↗ 8.4% vs last month</small>
                </article>
                <article>
                  <img src="/autopus/monthly-revenue.svg" alt="" />
                  <span>Monthly revenue</span>
                  <strong>$128,540</strong>
                  <small className="up">↗ 12.6% vs last month</small>
                </article>
                <article>
                  <img src="/autopus/active-vehicles.svg" alt="" />
                  <span>Active vehicles</span>
                  <strong>48</strong>
                  <small className="up">↗ 6 vs last month</small>
                </article>
              </div>
              <div className="chart-card">
                <div className="chart-copy">
                  <span className="micro">REVENUE TREND</span>
                  <strong>$128.5k</strong>
                  <small>Last 30 days</small>
                </div>
                <div className="chart" aria-hidden="true">
                  <i style={{ height: "34%" }} />
                  <i style={{ height: "48%" }} />
                  <i style={{ height: "42%" }} />
                  <i style={{ height: "61%" }} />
                  <i style={{ height: "57%" }} />
                  <i style={{ height: "76%" }} />
                  <i style={{ height: "70%" }} />
                  <i style={{ height: "88%" }} />
                  <i style={{ height: "82%" }} />
                  <i style={{ height: "96%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="value-section" id="platform">
        <div className="section-heading">
          <p className="kicker">One connected fleet</p>
          <h2>
            Smarter workflows,
            <br />
            stronger <em>performance</em>
          </h2>
        </div>
        <div className="value-grid">
          {valueCards.map((card) => (
            <article className={`value-card ${card.tone}`} key={card.title}>
              <div className="card-art">
                <img src={card.icon} alt="" />
                {card.tone === "blue" && (
                  <div className="task-stack">
                    <span>Vehicle inspection</span>
                    <span>Guest handoff</span>
                    <span>Owner update</span>
                  </div>
                )}
                {card.tone === "green" && (
                  <div className="revenue-ring">
                    <strong>+12.6%</strong>
                    <span>month over month</span>
                  </div>
                )}
                {card.tone === "photo" && (
                  <div className="signal-panel">
                    <span>Live fleet signal</span>
                    <strong>42 / 48</strong>
                    <small>vehicles currently utilized</small>
                  </div>
                )}
              </div>
              <p className="kicker">{card.kicker}</p>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="section-heading split">
          <h2>
            From first vehicle to full fleet,
            <br />
            <em>one system that works</em>
          </h2>
          <p>
            Move faster, see clearly, and grow the business without adding
            operational overhead.
          </p>
        </div>
        <div className="journey-tabs">
          {journey.map((item) => (
            <a href={`#step-${item.number}`} key={item.number}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </a>
          ))}
        </div>
        <div className="journey-cards">
          {journey.map((item) => (
            <article
              className={`journey-card ${item.accent}`}
              id={`step-${item.number}`}
              key={item.number}
            >
              <div>
                <span className="number">{item.number}</span>
                <h3>{item.heading}</h3>
                <p>{item.text}</p>
              </div>
              <div className="journey-metric">
                <span>Autopus signal</span>
                <strong>{item.metric}</strong>
                <small>{item.metricLabel}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="results-section" id="results">
        <div className="section-heading">
          <h2>
            The <em>power</em> of a connected fleet
          </h2>
        </div>
        <div className="results-grid">
          <article className="result-feature">
            <div>
              <span className="kicker">Fleet visibility</span>
              <strong>76%</strong>
              <p>Occupancy rate, visible at a glance and paired with trend context.</p>
            </div>
            <div className="result-quote">
              “One real-time view gives every operator the context to make the
              next decision with confidence.”
            </div>
          </article>
          <article>
            <span className="kicker">Monthly revenue</span>
            <strong>$128.5k</strong>
            <p>Performance signals in one clear view</p>
          </article>
          <article>
            <span className="kicker">Active fleet</span>
            <strong>48</strong>
            <p>Vehicles managed from the same operating system</p>
          </article>
          <article>
            <span className="kicker">Revenue movement</span>
            <strong>+12.6%</strong>
            <p>Month-over-month growth in the product preview</p>
          </article>
        </div>
      </section>

      <section className="story-section">
        <div className="story-card">
          <span className="kicker">Made for modern operators</span>
          <h2>Run more. View more. Earn more.</h2>
          <p>
            Autopus turns operational noise into a connected, measurable system
            your team can use every day.
          </p>
          <a className="text-link" href="#contact">
            See Autopus in action <span>↗</span>
          </a>
        </div>
        <div className="story-visual">
          <img
            className="cybertruck-image"
            src="/autopus/cybertruck.png"
            alt="Tesla Cybertruck parked on a rocky landscape"
          />
          <a
            className="car-card"
            href="https://www.autopus.app/login"
            target="_blank"
            rel="noreferrer"
            aria-label="Open example Tesla Cybertruck in Autopus"
          >
            <span>Vehicle 024 · Tesla Cybertruck</span>
            <strong>Ready for next booking</strong>
            <small>
              Guest handoff ready <b>Open in Autopus ↗</b>
            </small>
          </a>
          <div className="vehicle-tag">Example fleet vehicle</div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading split">
          <h2>
            Everything you need
            <br />
            to know <em>before you start</em>
          </h2>
          <p>Clear answers for rental operators evaluating a better way to run.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.q} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.q}
                <i>+</i>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div>
          <span className="kicker">Ready to take control?</span>
          <h2>
            Build a fleet that can <em>scale with confidence</em>
          </h2>
        </div>
        <div className="cta-actions">
          <a className="pill pill-dark" href="mailto:hello@autopus.app">
            Book a demo <span>→</span>
          </a>
          <a className="text-link" href="https://www.autopus.app/login">
            Already a customer? Log in
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <Logo />
          <p>The operating system for modern fleets.</p>
          <div className="footer-links">
            <a href="#platform">Platform</a>
            <a href="#journey">How it works</a>
            <a href="#results">Results</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Autopus. All rights reserved.</span>
          <div>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
