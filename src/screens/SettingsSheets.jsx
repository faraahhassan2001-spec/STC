function SheetCloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GripIcon() {
  return (
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
      <circle cx="4" cy="3" r="1.4" fill="currentColor" />
      <circle cx="10" cy="3" r="1.4" fill="currentColor" />
      <circle cx="4" cy="10" r="1.4" fill="currentColor" />
      <circle cx="10" cy="10" r="1.4" fill="currentColor" />
      <circle cx="4" cy="17" r="1.4" fill="currentColor" />
      <circle cx="10" cy="17" r="1.4" fill="currentColor" />
    </svg>
  );
}

const DEFAULT_WIDGETS = [
  { id: "w1", name: "Widget Name", on: true },
  { id: "w2", name: "Widget Name", on: true },
  { id: "w3", name: "Widget Name", on: true },
  { id: "w4", name: "Widget Name", on: true },
  { id: "w5", name: "Widget Name", on: true },
  { id: "w6", name: "Widget Name", on: true },
];

function WidgetsSheet({ onClose }) {
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);

  function toggleWidget(id) {
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, on: !w.on } : w)));
  }

  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
          <SheetCloseIcon />
        </button>
        <div className="kmid-title" style={{ marginBottom: 18 }}>Widgets</div>

        <div className="widget-list">
          {widgets.map((w) => (
            <div className="widget-row" key={w.id}>
              <span className="widget-grip"><GripIcon /></span>
              <span className="widget-name">{w.name}</span>
              <ToggleSwitch on={w.on} onToggle={() => toggleWidget(w.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChangePinSheet({ onClose }) {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  function handleChangePin() {
    if (!currentPin.trim() || !newPin.trim() || !confirmPin.trim()) {
      setError("Please fill in all PIN fields.");
      return;
    }
    if (newPin !== confirmPin) {
      setError("New PIN and Confirm PIN do not match.");
      return;
    }
    setError("");
    onClose();
  }

  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
          <SheetCloseIcon />
        </button>
        <div className="kmid-title">Change PIN Code</div>

        <div className="kmid-label" style={{ marginTop: 6 }}>Current PIN Code</div>
        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="Enter Current PIN"
              type={showCurrent ? "text" : "password"}
              inputMode="numeric"
              value={currentPin}
              onChange={(e) => { setCurrentPin(e.target.value); setError(""); }}
            />
            <button type="button" className="icon-btn-inline" onClick={() => setShowCurrent((v) => !v)}>
              <EyeIcon off={!showCurrent} />
            </button>
          </div>
        </div>

        <div className="kmid-label">New PIN Code</div>
        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="Enter New PIN"
              type={showNew ? "text" : "password"}
              inputMode="numeric"
              value={newPin}
              onChange={(e) => { setNewPin(e.target.value); setError(""); }}
            />
            <button type="button" className="icon-btn-inline" onClick={() => setShowNew((v) => !v)}>
              <EyeIcon off={!showNew} />
            </button>
          </div>
        </div>

        <div className="kmid-label">Confirm PIN Code</div>
        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="Enter New PIN"
              type={showConfirm ? "text" : "password"}
              inputMode="numeric"
              value={confirmPin}
              onChange={(e) => { setConfirmPin(e.target.value); setError(""); }}
            />
            <button type="button" className="icon-btn-inline" onClick={() => setShowConfirm((v) => !v)}>
              <EyeIcon off={!showConfirm} />
            </button>
          </div>
          {error && <div className="field-error">{error}</div>}
        </div>

        <button className="btn-primary" style={{ marginTop: 8 }} onClick={handleChangePin}>
          Change PIN Code
        </button>
      </div>
    </div>
  );
}

const LANGUAGES = [
  { code: "EN", name: "English", sub: "Department" },
  { code: "AR", name: "Arabic", sub: "Department" },
];

function LanguageSheet({ selected, onSelect, onClose }) {
  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
          <SheetCloseIcon />
        </button>
        <div className="kmid-title" style={{ marginBottom: 4 }}>Language</div>

        <div className="service-list" style={{ marginTop: 10 }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className="lang-row"
              onClick={() => onSelect(lang.code)}
            >
              <span className="lang-name">{lang.name}</span>
              <span className="lang-sub">{lang.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
