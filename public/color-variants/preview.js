const palette = document.documentElement.dataset.palette;
const colors = JSON.parse(document.documentElement.dataset.colors || "[]");

document.body.innerHTML = `
  <div class="palette-badge">PALETTE ${palette}</div>
  <header class="nav">
    <a class="brand" href="#">
      <img src="../autopus/autopus-symbol.png" alt="">
      <span>Autopus</span>
    </a>
    <nav class="nav-links">
      <a href="#platform">Platform</a>
      <a href="#journey">How it works</a>
      <a href="#performance">Performance</a>
      <a href="#contact">Resources</a>
    </nav>
    <div class="nav-actions">
      <a href="#">Log in</a>
      <a class="button" href="#contact">Book a demo <span>↗</span></a>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="tags">
        <span>Fleet operations</span>
        <span>Real-time insights</span>
        <span>Revenue performance</span>
      </div>
      <h1>The operating system for <em>modern fleets</em></h1>
      <p class="hero-copy">Automate operations, maximize utilization, and unlock real performance insights—so your rental business can scale with confidence.</p>
      <a class="button" href="#contact">Book a demo <span>→</span></a>

      <div class="stage">
        <div class="dashboard">
          <div class="dash-top">
            <a class="brand" href="#">
              <img src="../autopus/autopus-symbol.png" alt="">
              <span>Autopus</span>
            </a>
            <div class="dash-nav"><b>Overview</b><span>Fleet</span><span>Operations</span><span>Reports</span></div>
            <span class="live">● Live</span>
          </div>
          <div class="dash-body">
            <div class="dash-title"><div><small>FLEET PERFORMANCE</small><strong>Good morning, Kelly</strong></div></div>
            <div class="metrics">
              <article class="metric"><img src="../autopus/occupancy-rate.svg" alt=""><span>Occupancy rate</span><strong>76%</strong><small>↗ 8.4%</small></article>
              <article class="metric"><img src="../autopus/monthly-revenue.svg" alt=""><span>Monthly revenue</span><strong>$128,540</strong><small>↗ 12.6%</small></article>
              <article class="metric"><img src="../autopus/active-vehicles.svg" alt=""><span>Active vehicles</span><strong>48</strong><small>↗ 6</small></article>
            </div>
            <div class="chart-card">
              <div class="chart-copy"><small>MONTHLY REVENUE</small><strong>$128.5k</strong><small>Last 30 days</small></div>
              <div class="bars">${[28,36,32,48,44,62,57,71,68,82,78,94].map(h => `<i style="height:${h}%"></i>`).join("")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="platform">
      <div class="section-head">
        <p class="kicker">Why Autopus</p>
        <h2>Less operational noise.<br><em>More forward motion.</em></h2>
        <p>Built for operators who need every vehicle, task, and performance signal to move together.</p>
      </div>
      <div class="value-grid">
        <article class="value-card"><img src="../autopus/automate-operations.svg" alt=""><h3>Automate the busywork</h3><p>Standardize recurring tasks, vehicle handoffs, and owner updates without adding more admin.</p></article>
        <article class="value-card"><img src="../autopus/real-time-insights.svg" alt=""><h3>See the whole fleet</h3><p>One real-time operating view replaces scattered spreadsheets, messages, and status checks.</p></article>
        <article class="value-card"><img src="../autopus/monthly-revenue.svg" alt=""><h3>Turn data into action</h3><p>Connect occupancy and revenue trends to the next decision your team needs to make.</p></article>
      </div>
    </section>

    <section class="section journey" id="journey">
      <div class="section-head">
        <p class="kicker">One connected system</p>
        <h2>From first vehicle<br>to <em>full fleet.</em></h2>
        <p>A clear operating rhythm for every stage of growth.</p>
      </div>
      <div class="journey-track">
        ${[
          ["01","Connect","Bring every vehicle into one operating view.","48","active vehicles"],
          ["02","Operate","Make repeatable work happen automatically.","24/7","live visibility"],
          ["03","Optimize","Know where fleet performance is moving.","76%","occupancy rate"],
          ["04","Scale","Grow without multiplying operational chaos.","+12.6%","monthly revenue"]
        ].map(([n,phase,title,value,label]) => `
          <article class="journey-card">
            <div><span class="num">${n} · ${phase}</span><h3>${title}</h3><p>Autopus keeps vehicle status, team actions, and performance signals in the same connected workflow.</p></div>
            <div class="signal"><small>LIVE SIGNAL</small><strong>${value}</strong><small>${label}</small></div>
          </article>`).join("")}
      </div>
    </section>

    <section class="dark-band" id="performance">
      <div class="dark-copy">
        <p class="kicker">Made for modern operators</p>
        <h2>Run more.<br>View more.<br>Earn more.</h2>
        <p>Autopus turns operational noise into a connected, measurable system your team can use every day.</p>
      </div>
      <div class="dark-visual">
        <div class="vehicle-status"><span>VEHICLE 024 · CYBERTRUCK</span><strong>Ready for next booking</strong><small>Guest handoff ready · Open in Autopus ↗</small></div>
      </div>
    </section>

    <section class="cta" id="contact">
      <p class="kicker">Ready when you are</p>
      <h2>Build a fleet that can <em>scale with confidence.</em></h2>
      <a class="button" href="#">Book a demo <span>→</span></a>
    </section>

    <div class="swatches">
      ${colors.map(color => `<span class="swatch"><i style="--color:${color}"></i>${color}</span>`).join("")}
    </div>
  </main>
`;
