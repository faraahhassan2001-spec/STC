function SalesSheetCloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function buildCalendarCells(month, year) {
  const numDays = new Date(year, month + 1, 0).getDate();
  const startWeekday = new Date(year, month, 1).getDay();
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();

  const cells = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, muted: true });
  }
  for (let d = 1; d <= numDays; d++) {
    cells.push({ day: d, muted: false });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay, muted: true });
    nextDay += 1;
  }
  return cells;
}

function DatePickerSheet({ onClose, onApply }) {
  const [viewMonth, setViewMonth] = useState(7);
  const [viewYear, setViewYear] = useState(2024);
  const [selectedDay, setSelectedDay] = useState(20);

  const cells = buildCalendarCells(viewMonth, viewYear);

  function handleApply() {
    if (selectedDay == null) {
      onClose();
      return;
    }
    onApply({
      label: selectedDay + " , " + MONTH_NAMES_SHORT[viewMonth] + ", " + viewYear,
    });
  }

  function goPrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }
  function goNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <button type="button" className="datepick-back-btn" onClick={onClose} aria-label="Back">
          <ChevronLeftIcon />
        </button>
        <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
          <SalesSheetCloseIcon />
        </button>

        <div className="kmid-title" style={{ marginBottom: 2 }}>Pick a date</div>
        <div className="prepaid-subtitle" style={{ textAlign: "center", marginBottom: 18 }}>
          Please choose the date
        </div>

        <div className="datepick-month-row">
          <button type="button" onClick={goPrevMonth} aria-label="Previous month">
            <ChevronLeftIcon />
          </button>
          <span>{MONTH_NAMES[viewMonth]} {viewYear}</span>
          <button type="button" onClick={goNextMonth} aria-label="Next month">
            <ChevronRightIcon />
          </button>
        </div>

        <div className="datepick-weekdays">
          {WEEKDAY_LABELS.map((d, i) => <span key={i}>{d}</span>)}
        </div>
        <div className="datepick-grid">
          {cells.map((c, i) => (
            <button
              key={i}
              type="button"
              className={"datepick-cell" + (c.muted ? " muted" : "") + (!c.muted && c.day === selectedDay ? " selected" : "")}
              onClick={() => !c.muted && setSelectedDay(c.day)}
            >
              {c.day}
            </button>
          ))}
        </div>

        <button className="btn-primary" style={{ marginTop: 20 }} onClick={handleApply}>
          Apply
        </button>
        <button type="button" className="kmid-cancel" onClick={() => setSelectedDay(null)}>
          Clear
        </button>
      </div>
    </div>
  );
}

const FILTER_FIELDS = [
  { key: "accountManager", label: "Account manager", placeholder: "Select account manager" },
  { key: "dsm", label: "DSM", placeholder: "Select DSM" },
  { key: "dealer", label: "Dealer", placeholder: "Select the dealer" },
  { key: "area", label: "Area", placeholder: "Select the area" },
  { key: "region", label: "Region", placeholder: "Select region" },
  { key: "willaya", label: "Willaya", placeholder: "Select willaya" },
  { key: "location", label: "Location", placeholder: "Select location" },
];

function FilterSheet({ onClose }) {
  const [values, setValues] = useState({});

  function updateField(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet kmid-sheet--scrollable" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
          <SalesSheetCloseIcon />
        </button>

        <div className="kmid-title" style={{ marginBottom: 2 }}>Filter</div>
        <div className="prepaid-subtitle" style={{ textAlign: "center", marginBottom: 4 }}>
          Please choose your filter options
        </div>

        <div className="kmid-sheet-body">
          {FILTER_FIELDS.map((f) => (
            <div className="field" key={f.key}>
              <div className="kmid-label">{f.label}</div>
              <div className="input-shell">
                <select
                  className="text-input prepaid-select"
                  value={values[f.key] || ""}
                  onChange={(e) => updateField(f.key, e.target.value)}
                >
                  <option value="" disabled>{f.placeholder}</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="kmid-sheet-footer">
          <button className="btn-primary" onClick={onClose}>
            Submit
          </button>
          <button type="button" className="kmid-cancel" onClick={() => setValues({})}>
            Clear filter
          </button>
        </div>
      </div>
    </div>
  );
}
