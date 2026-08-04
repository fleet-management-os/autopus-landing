import MotionController from "./motion-controller";
import ProductShowcase from "./product-showcase";

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
      <MotionController />
      <header className="site-header">
        <Logo />
        <nav aria-label="Primary navigation">
          <a href="#platform">Platform</a>
          <a href="#platform">How it works</a>
          <a href="#results">Results</a>
          <a href="#faq">Resources</a>
        </nav>
        <div className="header-actions">
          <a className="pill pill-soft" href="https://www.autopus.app/login">
            Open Autopus <span>↗</span>
          </a>
        </div>
      </header>

      <section className="hero hero-video" aria-label="Autopus fleet operations">
        <video
          className="hero-video-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/autopus/hero-fleet-poster.jpg"
          aria-hidden="true"
        >
          <source src="/autopus/hero-fleet.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-shade" aria-hidden="true" />
        <div className="hero-video-content">
          <div className="hero-heading-block">
            <p className="hero-kicker">Autopus / Fleet operations</p>
            <h1 aria-label="The operating system for modern fleets">
              <span className="hero-title-line"><span>The operating system</span></span>
              <span className="hero-title-line"><span>for <em>modern fleets</em></span></span>
            </h1>
          </div>
          <div className="hero-side-copy">
            <p>
              Automate operations, maximize utilization, and turn every fleet
              signal into confident growth.
            </p>
            <a className="hero-video-link" href="https://www.autopus.app/login">
              Open Autopus <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <div className="signal-rail" aria-hidden="true">
        <div className="signal-track">
          <span>Automate operations</span><i>✦</i>
          <span>See every signal</span><i>✦</i>
          <span>Optimize utilization</span><i>✦</i>
          <span>Scale with control</span><i>✦</i>
          <span>Automate operations</span><i>✦</i>
          <span>See every signal</span><i>✦</i>
          <span>Optimize utilization</span><i>✦</i>
          <span>Scale with control</span><i>✦</i>
        </div>
      </div>

      <section className="value-section" id="platform">
        <div className="section-heading" data-reveal>
          <p className="kicker">One connected fleet</p>
          <h2>
            Smarter workflows,
            <br />
            stronger <em>performance</em>
          </h2>
        </div>
        <ProductShowcase />
      </section>

      <section className="journey-section" id="journey" hidden>
        <div className="section-heading split" data-reveal>
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
              data-reveal
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
        <div className="section-heading" data-reveal>
          <h2>
            The <em>power</em> of a connected fleet
          </h2>
        </div>
        <div className="results-grid" data-reveal>
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

      <section className="story-section" data-reveal>
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
        <div className="section-heading split" data-reveal>
          <h2>
            Everything you need
            <br />
            to know <em>before you start</em>
          </h2>
          <p>Clear answers for rental operators evaluating a better way to run.</p>
        </div>
        <div className="faq-list" data-reveal>
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

      <section className="cta-section" id="contact" data-reveal>
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
