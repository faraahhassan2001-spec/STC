function SalesKpiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3v9h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PerformanceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 17l5-6 4 3 7-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function MoreDotsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="1.8" fill="currentColor" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="19" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3v4 M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="14.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

function ProgressRing({ percent }) {
  const size = 88;
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  return (
    <svg width={size} height={size} viewBox={"0 0 " + size + " " + size}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e7e2ee" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#1fb8c4"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={"rotate(-90 " + size / 2 + " " + size / 2 + ")"}
      />
    </svg>
  );
}

const SALES_KPI_TABS = ["Revenue", "Acquisition", "Geography", "Distribution"];

const SALES_KPI_CARDS = [
  { id: 1, name: "KPI Name", date: "2/6/2024", badge: "Degrowth -10", percent: 90, target: "300", achievement: "298.326", lm: "132.56", mtd: "25.13", lmtd: "213.21" },
  { id: 2, name: "KPI Name", date: "2/6/2024", badge: "Degrowth -10", percent: 90, target: "300", achievement: "298.326", lm: "132.56", mtd: "25.13", lmtd: "213.21" },
  { id: 3, name: "KPI Name", date: "2/6/2024", badge: "Degrowth -10", percent: 90, target: "300", achievement: "298.326", lm: "132.56", mtd: "25.13", lmtd: "213.21" },
  { id: 4, name: "KPI Name", date: "2/6/2024", badge: "Degrowth -10", percent: 90, target: "300", achievement: "298.326", lm: "132.56", mtd: "25.13", lmtd: "213.21" },
];

function SalesKpiCard({ card, dateApplied }) {
  return (
    <div className="saleskpi-card">
      <div className="saleskpi-card-head">
        <div>
          <div className="name">{card.name}</div>
          <div className="date">{dateApplied ? "Selected Date" : "Update on"} : {card.date}</div>
        </div>
        <span className="saleskpi-badge">{card.badge}</span>
      </div>
      <div className="saleskpi-body">
        <div className="saleskpi-ring-wrap">
          <ProgressRing percent={card.percent} />
          <span className="saleskpi-ring-pct">{card.percent}%</span>
          <span className="saleskpi-ring-caption">Achievement / Target</span>
        </div>
        <div className="saleskpi-stats-right">
          <div className="saleskpi-stat-box">
            <div className="label">Target</div>
            <div className="value">{card.target}</div>
          </div>
          <div className="saleskpi-stat-box">
            <div className="label">Achievement</div>
            <div className="value">{card.achievement}</div>
          </div>
        </div>
      </div>
      <div className="saleskpi-chips-row">
        <div className="saleskpi-chip saleskpi-chip--lm">
          <div className="label">LM</div>
          <div className="value">{card.lm}</div>
        </div>
        <div className="saleskpi-chip saleskpi-chip--mtd">
          <div className="label">MTD</div>
          <div className="value">{card.mtd}</div>
        </div>
        <div className="saleskpi-chip saleskpi-chip--lmtd">
          <div className="label">LMTD</div>
          <div className="value">{card.lmtd}</div>
        </div>
      </div>
    </div>
  );
}

function SalesKpisScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState("Revenue");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appliedDate, setAppliedDate] = useState(null);

  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Sales KPIs</div>
      </div>

      <div className="saleskpi-tabs">
        {SALES_KPI_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={"saleskpi-tab" + (activeTab === tab ? " active" : "")}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="saleskpi-period-btn"
        aria-label="Select date range"
        onClick={() => setShowDatePicker(true)}
      >
        <CalendarIcon />
        <span>{appliedDate ? appliedDate.label : "Select date"}</span>
      </button>

      {appliedDate && (
        <div className="saleskpi-date-chip">
          <span>{appliedDate.label}</span>
          <button type="button" onClick={() => setAppliedDate(null)} aria-label="Remove date filter">
            <SalesSheetCloseIcon />
          </button>
        </div>
      )}

      {SALES_KPI_CARDS.map((card) => (
        <SalesKpiCard key={card.id} card={card} dateApplied={!!appliedDate} />
      ))}

      {showDatePicker && (
        <DatePickerSheet
          onClose={() => setShowDatePicker(false)}
          onApply={(date) => {
            setAppliedDate(date);
            setShowDatePicker(false);
          }}
        />
      )}
    </div>
  );
}

const KPI_TABS = ["Acquisition", "Revenue", "Distributions"];

const KPI_CHART_DATA = {
  Acquisition: { title: "Gross Adds (000)", mtdPct: 42, lmtdPct: 94 },
  Revenue: { title: "Revenue (000)", mtdPct: 65, lmtdPct: 88 },
  Distributions: { title: "Distributions (000)", mtdPct: 30, lmtdPct: 58 },
};

const KPI_GRID_LABELS = ["500", "150", "100", "50", "10"];

const KPI_ROWS = [
  { key: "saleskpis", label: "Sales KPIs", icon: <SalesKpiIcon /> },
  { key: "comparisonkpis", label: "KPI's Comparison", icon: <HomeIcon name="analytics" size={18} /> },
  { key: "performance", label: "performance at glance", icon: <PerformanceIcon /> },
];

function KpisWidget({ onOpenSalesKpis, onOpenComparisonKpis, onOpenPerformance }) {
  const [activeTab, setActiveTab] = useState("Acquisition");
  const data = KPI_CHART_DATA[activeTab];

  return (
    <div className="section-card">
      <div className="section-head">
        <h4>KPIs</h4>
        <span className="more kpi-more"><MoreDotsIcon /></span>
      </div>

      <div className="kpi-tabs">
        {KPI_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={"kpi-tab" + (activeTab === tab ? " active" : "")}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="kpi-chart-card">
        <div className="kpi-chart-header">{data.title}</div>
        <div className="kpi-plot">
          {KPI_GRID_LABELS.map((label, i) => (
            <div key={label} className="kpi-gridrow" style={{ top: (i / (KPI_GRID_LABELS.length - 1)) * 100 + "%" }}>
              <span className="kpi-gridlabel">{label}</span>
              <span className="kpi-gridline" />
            </div>
          ))}
          <div className="kpi-bars">
            <div className="kpi-bar kpi-bar--mtd" style={{ height: data.mtdPct + "%" }} />
            <div className="kpi-bar kpi-bar--lmtd" style={{ height: data.lmtdPct + "%" }} />
          </div>
        </div>
        <div className="kpi-legend">
          <span><span className="kpi-dot kpi-dot--mtd" /> MTD</span>
          <span><span className="kpi-dot kpi-dot--lmtd" /> LMTD</span>
        </div>
      </div>

      <div className="kpi-page-dots">
        {KPI_TABS.map((tab) => (
          <span key={tab} className={"kpi-page-dot" + (activeTab === tab ? " active" : "")} />
        ))}
      </div>

      <div className="kpi-list-label">Sales KPIs</div>
      {KPI_ROWS.map((row) => {
        let onClick = () => {};
        if (row.key === "saleskpis") onClick = onOpenSalesKpis;
        if (row.key === "comparisonkpis") onClick = onOpenComparisonKpis;
        if (row.key === "performance") onClick = onOpenPerformance;
        return (
          <button key={row.key} type="button" className="kpi-row" onClick={onClick}>
            <span className="kpi-row-icon">{row.icon}</span>
            <span className="kpi-row-title">{row.label}</span>
            <span className="row-chevron"><ChevronRightIcon /></span>
          </button>
        );
      })}
    </div>
  );
}

const COMPARISON_OPTIONS = [
  { key: "lymtd", label: "LY MTD" },
  { key: "lmtdmtd", label: "LMTD / MTD" },
];

const LY_LEGEND = [
  { label: "Dec-23", colorKey: "gray" },
  { label: "Dec-24 Starter/Prepaid", colorKey: "purple" },
  { label: "Dec-24 White SIM", colorKey: "teal" },
  { label: "Dec-24 MNP Postpaid", colorKey: "orange" },
];

const LY_COMPARISON_GROUPS = [
  { key: "prepaidstarter", label: "Prepaid Starter", prev: 85, curr: 105, growth: 23.5, colorKey: "purple" },
  { key: "prepaidwhitesim", label: "Prepaid White SIM", prev: 50, curr: 60, growth: 20.0, colorKey: "teal" },
  { key: "mnppostpaid", label: "MNP Postpaid", prev: 25, curr: 30, growth: 20.0, colorKey: "orange" },
  { key: "mnpprepaid", label: "MNP Prepaid", prev: 15, curr: 18, growth: 20.0, colorKey: "purple" },
  { key: "quickpay", label: "Quick Pay", prev: 6400, curr: 7450, growth: 16.4, colorKey: "purple" },
  { key: "bundle", label: "Bundle", prev: 4800, curr: 5590, growth: 16.5, colorKey: "purple" },
];

const MTD_LMTD_LEGEND = [
  { label: "Nov-24", colorKey: "gray" },
  { label: "Dec-24 Starter/Prepaid", colorKey: "purple" },
  { label: "Dec-24 White SIM", colorKey: "teal" },
  { label: "Dec-24 MNP Postpaid", colorKey: "orange" },
];

const MTD_LMTD_GROUPS = [
  { key: "prepaidstarter", label: "Prepaid Starter", prev: 95, curr: 105, growth: 10.5, colorKey: "purple" },
  { key: "prepaidwhitesim", label: "Prepaid White SIM", prev: 55, curr: 60, growth: 9.1, colorKey: "teal" },
  { key: "mnppostpaid", label: "MNP Postpaid", prev: 28, curr: 30, growth: 7.1, colorKey: "orange" },
  { key: "mnpprepaid", label: "MNP Prepaid", prev: 17, curr: 18, growth: 5.9, colorKey: "purple" },
  { key: "quickpay", label: "Quick Pay", prev: 6800, curr: 7450, growth: 9.6, colorKey: "purple" },
  { key: "postpaid", label: "Postpaid", prev: 2330, curr: 2280, growth: -2.1, colorKey: "purple" },
];

function GroupedComparisonLegend({ legend }) {
  return (
    <div className="ly-legend">
      {legend.map((item) => (
        <span key={item.label} className="ly-legend-item">
          <span className={"ly-dot ly-dot--" + item.colorKey} />{item.label}
        </span>
      ))}
    </div>
  );
}

function GroupedComparisonChart({ title, subtitle, legend, groups, legendPosition }) {
  return (
    <div>
      <div className="ly-chart-title">{title}</div>
      <div className="ly-chart-subtitle">{subtitle}</div>

      {legendPosition === "top" && <GroupedComparisonLegend legend={legend} />}

      <div className="ly-groups-scroll">
        <div className="ly-groups-row">
          {groups.map((g) => {
            const max = Math.max(g.prev, g.curr);
            const prevPct = (g.prev / max) * 100;
            const currPct = (g.curr / max) * 100;
            const isDown = g.growth < 0;
            return (
              <div key={g.key} className="ly-group">
                <div className={"ly-growth-pill" + (isDown ? " ly-growth-pill--down" : "")}>
                  {isDown ? "▼" : "▲"}{Math.abs(g.growth)}%
                </div>
                <div className="ly-bars-pair">
                  <div className="ly-bar-col">
                    <span className="ly-bar-value">{g.prev}</span>
                    <div className="ly-bar ly-bar--gray" style={{ height: prevPct + "%" }} />
                  </div>
                  <div className="ly-bar-col">
                    <span className="ly-bar-value">{g.curr}</span>
                    <div className={"ly-bar ly-bar--" + g.colorKey} style={{ height: currPct + "%" }} />
                  </div>
                </div>
                <div className="ly-group-label">{g.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {legendPosition === "bottom" && <GroupedComparisonLegend legend={legend} />}
    </div>
  );
}

function LyComparisonChart() {
  return (
    <GroupedComparisonChart
      title="Last Year MTD Comparison"
      subtitle="Dec-24 vs Dec-23 · Prepaid & MNP split"
      legend={LY_LEGEND}
      groups={LY_COMPARISON_GROUPS}
      legendPosition="bottom"
    />
  );
}

function LmtdMtdComparisonChart() {
  return (
    <GroupedComparisonChart
      title="MTD vs LMTD Comparison"
      subtitle="Dec-24 vs Nov-24 · Prepaid & MNP split"
      legend={MTD_LMTD_LEGEND}
      groups={MTD_LMTD_GROUPS}
      legendPosition="bottom"
    />
  );
}

function ComparisonEmptyState({ noData }) {
  return (
    <div className="comparison-empty">
      <div className="comparison-empty-icon"><HomeIcon name="analytics" size={26} /></div>
      <div className="comparison-empty-title">
        {noData ? "No Comparison Data" : "Select a Comparison Type"}
      </div>
      <div className="comparison-empty-desc">
        {noData
          ? "No KPI comparison data is available for the selected period."
          : "Choose LY MTD or LMTD / MTD to view the KPI comparison."}
      </div>
    </div>
  );
}

function ComparisonKpisScreen({ onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">KPI's Comparison</div>
      </div>

      <div className="section-card">
        <div className="section-head" style={{ marginBottom: 4 }}>
          <h4>KPI Comparison</h4>
        </div>
        <div className="prepaid-subtitle">Select a comparison type to view KPI performance</div>

        <div className="kpi-tabs">
          {COMPARISON_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={"kpi-tab" + (selected === opt.key ? " active" : "")}
              onClick={() => setSelected(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="kpi-chart-card">
          {!selected && <ComparisonEmptyState noData={false} />}
          {selected === "lymtd" && <LyComparisonChart />}
          {selected === "lmtdmtd" && <LmtdMtdComparisonChart />}
        </div>
      </div>
    </div>
  );
}

const PERF_OPTIONS = [
  { key: "both", label: "MNP, Gross Adds", charts: ["MNP", "Gross Adds"] },
  { key: "mnp", label: "MNP", charts: ["MNP"] },
  { key: "gross", label: "Gross Adds", charts: ["Gross Adds"] },
];

const PERF_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const PERF_TICKS = [400, 300, 200, 100, 0];
const PERF_POINTS = [[0, 180], [1, 400], [2, 180], [3, 85], [4, 85], [4.6, 5], [5.6, 230], [6, 340]];

function perfPath() {
  const W = 300, H = 130, X0 = 28, top = 18;
  const px = (x) => X0 + (x / 6) * (W - X0 - 6);
  const py = (y) => top + (1 - y / 400) * (H - top - 4);
  const pts = PERF_POINTS.map(([x, y]) => [px(x), py(y)]);
  let d = "M" + pts[0][0] + "," + pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += " C" + c1 + " " + c2 + " " + p2;
  }
  return { line: d, area: d + " L" + pts[pts.length - 1][0] + "," + (H - 4) + " L" + pts[0][0] + "," + (H - 4) + " Z", peak: pts[1], px, py, W, H };
}

function PerformanceChartCard({ title, uid }) {
  const { line, area, peak, px, py, W, H } = perfPath();
  return (
    <div className="perf-chart-card">
      <div className="perf-chart-title">{title}</div>
      <svg viewBox={"0 0 " + W + " " + (H + 22)} width="100%">
        <defs>
          <linearGradient id={"perfFill" + uid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1fb37a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1fb37a" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        {PERF_TICKS.map((t) => (
          <g key={t}>
            <text x="20" y={py(t) + 3} fontSize="8" fill="#8a8798" textAnchor="end">{t}</text>
          </g>
        ))}
        <path d={area} fill={"url(#perfFill" + uid + ")"} />
        <path d={line} fill="none" stroke="#1fb37a" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx={peak[0]} cy={peak[1] - 8} r="2.6" fill="#1fb37a" />
        {PERF_MONTHS.map((m, i) => (
          <text key={m} x={px(i)} y={H + 14} fontSize="8" fill="#6b6779" textAnchor="middle">{m}</text>
        ))}
      </svg>
    </div>
  );
}

function PerformanceGlanceScreen({ onBack }) {
  const [selectedKey, setSelectedKey] = useState("both");
  const [open, setOpen] = useState(false);
  const option = PERF_OPTIONS.find((o) => o.key === selectedKey);

  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Performance At Glance</div>
      </div>

      <div className="kmid-label">Performance At Glace</div>
      <div className="perf-select-wrap">
        <button type="button" className="perf-select" onClick={() => setOpen((v) => !v)}>
          <span>{option.label}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: open ? "rotate(180deg)" : "none" }}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div className="perf-select-menu">
            {PERF_OPTIONS.map((o) => (
              <button
                key={o.key}
                type="button"
                className={"perf-select-item" + (o.key === selectedKey ? " active" : "")}
                onClick={() => { setSelectedKey(o.key); setOpen(false); }}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="perf-info">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Displays data from the last days only .</span>
      </div>

      {option.charts.map((c, i) => (
        <PerformanceChartCard key={selectedKey + c} title={c} uid={selectedKey + i} />
      ))}
    </div>
  );
}
