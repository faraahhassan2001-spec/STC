function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 8a2 2 0 012-2h1.5l1-1.6A1.5 1.5 0 019.8 3.6h4.4a1.5 1.5 0 011.3.8L16.5 6H18a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
function DocEditIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12h6 M9 16h4 M9 8h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function ExpandIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M9 4H4v5 M15 4h5v5 M4 15v5h5 M20 15v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function UploadPlusIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8 M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function ScanFrameIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2v3 M12 19v3 M2 12h3 M19 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function VerifiedSealIcon() {
  const points = 12;
  const cx = 50, cy = 50, rOuter = 46, rScallop = 6;
  const scallops = Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2;
    return { x: cx + rOuter * Math.cos(angle), y: cy + rOuter * Math.sin(angle) };
  });
  return (
    <svg width="88" height="88" viewBox="0 0 100 100">
      {scallops.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={rScallop} fill="#22a559" />
      ))}
      <circle cx={cx} cy={cy} r="38" fill="#22a559" />
      <path d="M32 51l12 12 24-26" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function StepCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Stepper({ step }) {
  const steps = [
    { key: "identity", label: "Identity", icon: <ScanFrameIcon /> },
    { key: "details", label: "Details", icon: <DocEditIcon /> },
    { key: "checkout", label: "Checkout", icon: <HomeIcon name="wallettopup" size={18} /> },
  ];
  const order = ["identity", "details", "checkout"];
  const currentIndex = order.indexOf(step);
  return (
    <div className="prepaid-stepper">
      {steps.map((s, i) => {
        const isDone = i < currentIndex;
        return (
          <React.Fragment key={s.key}>
            {i > 0 && <span className="prepaid-stepper-arrow">→</span>}
            <div className={"prepaid-step" + (i === currentIndex ? " active" : isDone ? " done" : "")}>
              <div className="prepaid-step-circle">{isDone ? <StepCheckIcon /> : s.icon}</div>
              <span>{s.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function ConnectingKmidModal({ onCancel, onDone }) {
  const [seconds, setSeconds] = useState(60);

  React.useEffect(() => {
    const tick = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    const done = setTimeout(onDone, 2800);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [onDone]);

  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="kmid-overlay" style={{ alignItems: "center" }} onClick={onCancel}>
      <div className="prepaid-modal" onClick={(e) => e.stopPropagation()}>
        <div className="prepaid-connecting-ring">
          <DeviceTypeIcon />
        </div>
        <div className="prepaid-modal-title">Connecting To KMID</div>
        <div className="prepaid-modal-text">Please wait while we connect to the Kuwait Mobile ID authenticator…</div>
        <div className="prepaid-modal-timer">Time remaining: <b>{mm}:{ss}</b></div>
        <button type="button" className="prepaid-cancel-outline" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function VerifiedSuccessModal({ onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="kmid-overlay" style={{ alignItems: "center" }}>
      <div className="prepaid-modal">
        <VerifiedSealIcon />
        <div className="prepaid-modal-title" style={{ marginTop: 14 }}>Verified Successfully !</div>
        <div className="prepaid-modal-text">You identity hac been verified successfully via KMID .</div>
      </div>
    </div>
  );
}

function CaptureMethodSheet({ onClose, onScan, onManual }) {
  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="kmid-title" style={{ marginBottom: 16 }}>Choose Capture Method</div>

        <button type="button" className="capture-option" onClick={onScan}>
          <span className="capture-option-icon"><CameraIcon /></span>
          <span className="capture-option-text">
            <span className="capture-option-title">Scan</span>
            <span className="capture-option-desc">Use camera to scan your document</span>
          </span>
        </button>
        <button type="button" className="capture-option" onClick={onManual}>
          <span className="capture-option-icon"><DocEditIcon /></span>
          <span className="capture-option-text">
            <span className="capture-option-title">Enter Details Manually</span>
            <span className="capture-option-desc">Enter your document details manually</span>
          </span>
        </button>
      </div>
    </div>
  );
}

const OTHER_METHODS = [
  { key: "gccid", title: "Gcc ID", icon: <HomeIcon name="postpaid" size={20} /> },
  { key: "passport", title: "Passport", icon: <HomeIcon name="ordershistory" size={20} /> },
  { key: "amniyaid", title: "Amniya ID", icon: <DeviceTypeIcon /> },
];

function IdentityVerificationView({ onBack, kmidNumber, onKmidNumberChange, onVerifyKmid, onOpenCapture }) {
  const [kmidError, setKmidError] = useState("");

  function handleVerifyClick() {
    if (!kmidNumber.trim()) {
      setKmidError("Please enter your KMID number.");
      return;
    }
    setKmidError("");
    onVerifyKmid();
  }

  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Prepaid Activation</div>
      </div>

      <Stepper step="identity" />

      <div className="section-card">
        <div className="section-head" style={{ marginBottom: 4 }}>
          <h4>Identity Verification</h4>
        </div>
        <div className="prepaid-subtitle">Choose your preferred verification method</div>

        <button type="button" className="method-row method-row--selected" onClick={onOpenCapture}>
          <span className="method-row-icon"><HomeIcon name="idupdate" size={20} /></span>
          <span className="method-row-text">
            <span className="method-row-title">Kuwait Civil ID</span>
            <span className="method-row-desc">Verify using Civil ID</span>
          </span>
          <span className="row-chevron"><ChevronRightIcon /></span>
        </button>

        <div className="method-card">
          <div className="method-row-header">
            <span className="method-row-icon"><DeviceTypeIcon /></span>
            <span className="method-row-text">
              <span className="method-row-title">Kuwait Mobile ID</span>
              <span className="method-row-desc">Verify your identity via the Kuwait Mobile ID app</span>
            </span>
          </div>
          <div className="field" style={{ marginTop: 14, marginBottom: 14 }}>
            <input
              className="text-input"
              placeholder="Enter the KMID number"
              value={kmidNumber}
              onChange={(e) => {
                onKmidNumberChange(e.target.value);
                setKmidError("");
              }}
              inputMode="numeric"
            />
            {kmidError && <div className="field-error">{kmidError}</div>}
          </div>
          <button type="button" className="btn-prepaid-verify" onClick={handleVerifyClick}>
            Verify
          </button>
        </div>

        <div className="or-divider">Or</div>

        {OTHER_METHODS.map((method) => (
          <button key={method.key} type="button" className="method-row" onClick={onOpenCapture}>
            <span className="method-row-icon">{method.icon}</span>
            <span className="method-row-text">
              <span className="method-row-title">{method.title}</span>
            </span>
            <span className="row-chevron"><ChevronRightIcon /></span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PrefilledField({ label, value }) {
  return (
    <div className="field">
      <div className="kmid-label">{label}</div>
      <div className="input-shell">
        <input className="text-input" value={value} readOnly />
        <span className="icon-btn-inline field-check-icon"><VerifiedCheckIcon /></span>
      </div>
    </div>
  );
}
function EditableField({ label, placeholder, value, onChange }) {
  return (
    <div className="field">
      <div className="kmid-label">{label}</div>
      <div className="input-shell">
        <input className="text-input" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}
function DropdownField({ label, placeholder, value, onChange, options }) {
  return (
    <div className="field">
      <div className="kmid-label">{label}</div>
      <div className="input-shell">
        <select className="text-input prepaid-select" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
function UploadBox({ label }) {
  return (
    <div className="field">
      <div className="kmid-label">{label}</div>
      <div className="upload-box">
        <UploadPlusIcon />
        <span>Upload your files here</span>
      </div>
    </div>
  );
}

function PrepaidDetailsView({ onBack, capturedPhoto, onContinue }) {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [building, setBuilding] = useState("");
  const [block, setBlock] = useState("");
  const [street, setStreet] = useState("");

  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Prepaid Activation</div>
      </div>

      <Stepper step="details" />

      {capturedPhoto && (
        <button type="button" className="profile-photo-row">
          <span className="profile-photo-row-icon"><ProfilePersonIcon /></span>
          <span className="profile-photo-row-text">Click to expand and view full file</span>
          <span className="row-chevron"><ExpandIcon /></span>
        </button>
      )}

      <div className="section-card">
        <div className="section-head"><h4>ID Information</h4></div>
        <PrefilledField label="ID Type" value="ID" />
        <PrefilledField label="ID Number" value="1154784" />
        <PrefilledField label="ID Expiry Date" value="12, Dec, 2025" />
      </div>

      <div className="section-card">
        <div className="section-head"><h4>Personal Details</h4></div>
        <EditableField label="Full Name" placeholder="Enter the full name" value={fullName} onChange={setFullName} />
        <DropdownField label="Title" placeholder="Select the title" value={title} onChange={setTitle} options={["Mr", "Mrs", "Ms"]} />
        <DropdownField label="Gender" placeholder="Select the gender" value={gender} onChange={setGender} options={["Male", "Female"]} />
        <EditableField label="Nationality" placeholder="Enter the nationality" value={nationality} onChange={setNationality} />
        <EditableField label="Birth date" placeholder="Enter your birthday" value={birthDate} onChange={setBirthDate} />
        <PrefilledField label="Passport Number" value="255697521549" />
        <PrefilledField label="Profession" value="Dealer" />
        <PrefilledField label="Article" value="18" />
        <PrefilledField label="Sponsor Name" value="STC Kuwait" />
      </div>

      <div className="section-card">
        <div className="section-head"><h4>PACI Contact Information</h4></div>
        <EditableField label="Number" placeholder="Enter your number" value={number} onChange={setNumber} />
        <EditableField label="Email" placeholder="Enter your email" value={email} onChange={setEmail} />
      </div>

      <div className="section-card">
        <div className="section-head"><h4>Address Information</h4></div>
        <EditableField label="Address" placeholder="Enter  the Address" value={address} onChange={setAddress} />
        <DropdownField label="Building Type" placeholder="Select the type" value={buildingType} onChange={setBuildingType} options={["House", "Apartment", "Office"]} />
        <EditableField label="Building" placeholder="Enter the building" value={building} onChange={setBuilding} />
        <EditableField label="Block" placeholder="Enter the block" value={block} onChange={setBlock} />
        <EditableField label="Street" placeholder="Enter the street" value={street} onChange={setStreet} />
      </div>

      <UploadBox label="Passport" />
      <UploadBox label="Visa" />

      <button className="btn-primary" style={{ marginTop: 4, marginBottom: 20 }} onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}

function RadioIcon({ selected }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={selected ? "#6c3fa8" : "#c7c2d6"} strokeWidth="1.8" />
      {selected && <circle cx="12" cy="12" r="5" fill="#6c3fa8" />}
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 3v4h-4 M6 21v-4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SignatureSquiggle() {
  return (
    <svg viewBox="0 0 220 60" width="100%" height="56">
      <path
        d="M10 42 C 24 12, 34 52, 48 26 S 68 6, 84 36 S 108 10, 124 32 T 164 22 T 208 34"
        stroke="#221d33"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SIM_TYPES = [
  { key: "psim", label: "P-SIM", icon: "psim" },
  { key: "esim", label: "E-SIM", icon: "esim" },
];

const PLAN_TABS = ["Featured", "Visits", "1 Month", "2 Month", "3 Month"];

const PLAN_CARD_GAP = 12;

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SimRadio({ selected }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#4b0f8c" strokeWidth="2" />
      {selected && <circle cx="12" cy="12" r="5" fill="#4b0f8c" />}
    </svg>
  );
}
function PSimIcon() {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
      <path d="M4 6a3 3 0 013-3h15l10 10v27a3 3 0 01-3 3H7a3 3 0 01-3-3V6z" fill="#e4e4ea" stroke="#5c5a66" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="10" y="22" width="16" height="14" rx="2.5" fill="#fff" stroke="#5c5a66" strokeWidth="2" />
      <path d="M10 29h16M18 22v14" stroke="#5c5a66" strokeWidth="1.6" />
    </svg>
  );
}
function ESimIcon() {
  return (
    <svg width="40" height="44" viewBox="0 0 40 44" fill="none">
      <path d="M4 6a3 3 0 013-3h15l10 10v27a3 3 0 01-3 3H7a3 3 0 01-3-3V6z" fill="#e4e4ea" stroke="#5c5a66" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="10" y="20" width="14" height="14" rx="2.5" fill="#fff" stroke="#5c5a66" strokeWidth="2" />
      <path d="M10 27h14M17 20v14" stroke="#5c5a66" strokeWidth="1.6" />
      <rect x="25" y="28" width="12" height="12" rx="2" fill="#fff" stroke="#5c5a66" strokeWidth="1.8" />
      <path d="M28 32h6M28 35h6M28 38h4" stroke="#5c5a66" strokeWidth="1.2" />
    </svg>
  );
}

function BarcodeScanIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 8V5a2 2 0 012-2h3M16 3h3a2 2 0 012 2v3M21 16v3a2 2 0 01-2 2h-3M8 21H5a2 2 0 01-2-2v-3" stroke="#4b0f8c" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 8v8M11 8v8M14 8v8M17 8v8" stroke="#4b0f8c" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function InfoDotIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const TERMS_ITEMS = [
  ["1. Service Agreement", "By activating this prepaid service, you agree to be bound by the terms set forth by the provider."],
  ["2. Identification", "Valid government-issued identification is required for activation in compliance with local regulations."],
  ["3. Usage & Fair Policy", "Unlimited social media usage is subject to fair usage policies. Excessive usage affecting network quality for others may result in speed throttling."],
  ["4. Plan Validity", "The plan is valid for 30 days from the date of activation. Unused benefits do not roll over unless specified."],
  ["5. Payments & Refunds", "All payments are final. Refunds are only processed in cases of technical error where service could not be provisioned."],
  ["6. Privacy Policy", "Your personal data is collected solely for the purpose of service provision and legal compliance."],
  ["7. Termination", "The provider reserves the right to terminate service for violation of these terms or illegal usage."],
  ["8. Liability", "The provider is not liable for indirect or consequential damages arising from service interruptions."],
];

function TermsSheet({ onAccept, onReject }) {
  return (
    <div className="kmid-overlay" onClick={onReject}>
      <div className="kmid-sheet terms-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <button type="button" className="kmid-close" onClick={onReject} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="kmid-title" style={{ marginBottom: 16 }}>Teams And Condition</div>
        <div className="terms-sheet-body">
          {TERMS_ITEMS.map(([h, t]) => (
            <div key={h} className="terms-item">
              <div className="terms-item-title">{h}</div>
              <div className="terms-item-text">{t}</div>
            </div>
          ))}
        </div>
        <button type="button" className="btn-primary" style={{ marginTop: 14 }} onClick={onAccept}>Accept</button>
        <button type="button" className="kmid-cancel" onClick={onReject}>Reject</button>
      </div>
    </div>
  );
}

function ArrowCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12h8M13 8.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QrCodeGraphic() {
  const n = 25;
  const cells = [];
  const inFinder = (x, y) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y)) continue;
      if (((x * 7 + y * 13 + x * y * 5) % 11) < 5) cells.push(<rect key={x + "-" + y} x={x} y={y} width="1" height="1" />);
    }
  }
  const finder = (ox, oy) => (
    <g key={ox + "," + oy}>
      <rect x={ox} y={oy} width="7" height="7" />
      <rect x={ox + 1} y={oy + 1} width="5" height="5" fill="#fff" />
      <rect x={ox + 2} y={oy + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg width="96" height="96" viewBox={"0 0 " + n + " " + n} fill="#1e2233" shapeRendering="crispEdges">
      {cells}
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </svg>
  );
}

function DotsSpinner() {
  return (
    <div className="pay-dots-spinner">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ transform: "rotate(" + i * 60 + "deg) translateY(-24px)", animationDelay: (i * 0.15) + "s" }} />
      ))}
    </div>
  );
}

function PaymentWaitingModal({ onCancel }) {
  return (
    <div className="kmid-overlay" style={{ alignItems: "center" }}>
      <div className="prepaid-modal" onClick={(e) => e.stopPropagation()}>
        <DotsSpinner />
        <div className="prepaid-modal-title">Waiting for confirmation</div>
        <div className="prepaid-modal-text">Please wait while we confirm your payment.</div>
        <button type="button" className="prepaid-cancel-outline" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

const SUCCESS_ROWS = [
  ["Selected Plan", "Starter Pack - P-SIM"],
  ["Order ID", "PI434235423"],
  ["Mobile Number", "965 22289013"],
  ["Verification Method", "Kuwait Mobile ID"],
  ["Contact Phone", "965 22289088"],
  ["Email", "Hamzatarakhan2000@gmail.com"],
];

function PaymentSuccessSheet({ onDone, esim, planLabel }) {
  const [email, setEmail] = useState("Value");

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: "Prepaid activation", text: "Order ID PI434235423" }).catch(() => {});
    }
  }

  return (
    <div className="kmid-overlay">
      <div className="kmid-sheet pay-success-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <div className="kmid-title" style={{ marginBottom: 16 }}>Success</div>
        {esim ? (
          <div className="pay-qr"><QrCodeGraphic /></div>
        ) : (
          <div className="pay-success-badge">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <div className="pay-success-text">Your Prepaid White SIM activation request has been submitted successfully</div>

        <div className="pay-success-table">
          <div className="pay-success-row">
            <span>Status</span>
            <span className="pay-status-pill">Pending</span>
          </div>
          {SUCCESS_ROWS.map(([k, v]) => [k, k === "Selected Plan" ? planLabel : v]).map(([k, v]) => (
            <div key={k} className="pay-success-row">
              <span>{k}</span>
              <b>{v}</b>
            </div>
          ))}
        </div>

        {!esim && (
          <>
        <div className="kmid-label">Email</div>
        <div className="field">
          <div className="input-shell">
            <input className="text-input" style={{ paddingRight: 44, fontWeight: 700 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <span style={{ position: "absolute", right: 14, display: "flex" }}><VerifiedCheckIcon /></span>
          </div>
        </div>

        <button type="button" className="btn-primary pay-share-btn" onClick={handleShare}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8.3 10.8l7.4-3.6M8.3 13.2l7.4 3.6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Share
        </button>
        <button type="button" className="kmid-cancel" onClick={onDone}>Done</button>
          </>
        )}
        {esim && <button type="button" className="btn-primary" onClick={onDone}>Done</button>}
      </div>
    </div>
  );
}

const WHITE_PLANS = [
  { id: 1, discount: "50%", feats: [["Internet", "60 GB"], ["Local Mins", "100"], ["SMS", "500"], ["Social Media", "Unlimited"]], price: "30", earn: "2" },
  { id: 2, discount: "20%", feats: [["Internet", "80 GB"], ["Local Mins", "150"], ["SMS", "700"], ["Social Media", "Unlimited"]], price: "35", earn: "3" },
  { id: 3, discount: "10%", feats: [["Internet", "100 GB"], ["Local Mins", "200"], ["SMS", "900"], ["Social Media", "Unlimited"]], price: "40", earn: "4" },
];

const NUMBER_TABS = ["Purple", "Gold", "Super Gold"];
const NUMBER_TIER_INFO = {
  Purple: { price: "0", plan: "2KD / Plan Price" },
  Gold: { price: "10", plan: "3KD / Plan Price" },
  "Super Gold": { price: "25", plan: "5KD / Plan Price" },
};
const NUMBER_LIST = {
  Purple: ["547896324", "547896325", "547896330", "547896341", "547896352", "547896367"],
  Gold: ["551122334", "551122335", "551122346", "551122357", "551122368"],
  "Super Gold": ["599999001", "599999002", "599999003", "599999004"],
};

function NumberPickerSheet({ current, onSelect, onClose }) {
  const [tab, setTab] = useState("Purple");
  const [query, setQuery] = useState("");
  const info = NUMBER_TIER_INFO[tab];
  const q = query.trim().toLowerCase();
  const rows = NUMBER_LIST[tab].filter((n) => !q || n.includes(q) || "plan name".includes(q));

  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet terms-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="kmid-title" style={{ marginBottom: 16 }}>Choose a Different Number</div>

        <div className="notif-search-shell" style={{ marginBottom: 12 }}>
          <input className="notif-search-input" placeholder="Search for number or plan name" value={query} onChange={(e) => setQuery(e.target.value)} />
          <SearchIcon />
        </div>

        <div className="num-tabs">
          {NUMBER_TABS.map((t) => (
            <button key={t} type="button" className={"num-tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        <div className="terms-sheet-body num-list">
          {rows.length === 0 && <div className="num-empty">No numbers found</div>}
          {rows.map((n) => (
            <button key={n} type="button" className={"num-row" + (n === current ? " selected" : "")} onClick={() => onSelect(n)}>
              <span className="num-row-top">
                <b>{n}</b>
                <span className="num-row-price"><em>{info.price}</em> KD</span>
              </span>
              <span className="num-row-bottom">
                <span>Plan name</span>
                <span className="num-plan-pill">{info.plan}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrepaidCheckoutView({ onBack, onDone }) {
  const [packTab, setPackTab] = useState("Starter Pack");
  const [simType, setSimType] = useState("psim");
  const [whatsappNumber, setWhatsappNumber] = useState("12345678909877");
  const [email, setEmail] = useState("Email@gmail.com");
  const [simCode, setSimCode] = useState("");
  const [simTouched, setSimTouched] = useState(false);
  const [starterDealerSigned, setStarterDealerSigned] = useState(false);
  const [starterCustomerSigned, setStarterCustomerSigned] = useState(false);
  const [starterTerms, setStarterTerms] = useState(false);
  const [starterSheet, setStarterSheet] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const [payStage, setPayStage] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState("578963247");
  const [showNumberPicker, setShowNumberPicker] = useState(false);

  React.useEffect(() => {
    if (payStage !== "waiting") return undefined;
    const t = setTimeout(() => setPayStage("success"), 4000);
    return () => clearTimeout(t);
  }, [payStage]);

  const isEsim = simType === "esim";
  const whiteP = packTab === "White SIM";
  const [whitePlanId, setWhitePlanId] = useState(null);
  const [whitePay, setWhitePay] = useState(null);
  const [whiteTab, setWhiteTab] = useState("Featured");
  const [whiteDot, setWhiteDot] = useState(0);
  const [whiteQuery, setWhiteQuery] = useState("");
  const wq = whiteQuery.trim().toLowerCase();
  const visibleWhitePlans = WHITE_PLANS.filter((w) => !wq || ("plan title " + w.price + " " + w.discount + " " + w.feats.map((f) => f.join(" ")).join(" ")).toLowerCase().includes(wq));

  function selectPack(t) {
    setPackTab(t);
    setSimCode(t === "White SIM" ? "12345678909877" : "");
    setSimTouched(false);
  }

  function handleWhiteScroll(e) {
    const el = e.currentTarget;
    const card = el.querySelector(".white-plan-card");
    if (!card) return;
    const index = Math.round(el.scrollLeft / (card.offsetWidth + PLAN_CARD_GAP));
    setWhiteDot(Math.min(WHITE_PLANS.length - 1, Math.max(0, index)));
  }
  const simValid = isEsim || /^(\d{8}|\d{14,19})$/.test(simCode.trim());
  const shownSimCode = simCode.trim() || "12345678909877";
  const starterReady = simValid && starterTerms && (!whiteP || (whitePlanId !== null && whitePay !== null));
  const whitePrice = (WHITE_PLANS.find((w) => w.id === whitePlanId) || {}).price;

  const contractCard = (
    <div className="section-card">
      <div className="starter-number-head">
        <span className="starter-number-icon"><HomeIcon name="idupdate" size={18} /></span>
        <h4>Contract Information</h4>
      </div>
      <EditableField label="WhatsApp Number" placeholder="Enter your number" value={whatsappNumber} onChange={setWhatsappNumber} />
      <EditableField label="Email" placeholder="Enter your email" value={email} onChange={setEmail} />
    </div>
  );

  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Prepaid Activation</div>
      </div>

      <Stepper step="checkout" />

      <div className="checkout-pack-tabs">
        {["Starter Pack", "White SIM"].map((t) => (
          <button
            key={t}
            type="button"
            className={"checkout-pack-tab" + (packTab === t ? " active" : "")}
            onClick={() => selectPack(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="checkout-plain-title">SIM Type</div>
      <div className="checkout-sim-row">
        {SIM_TYPES.map((s) => (
          <button
            key={s.key}
            type="button"
            className={"checkout-sim-card" + (simType === s.key ? " active" : "")}
            onClick={() => setSimType(s.key)}
          >
            <span className="checkout-sim-radio"><SimRadio selected={simType === s.key} /></span>
            {s.key === "psim" ? <PSimIcon /> : <ESimIcon />}
            <span className="checkout-sim-label">{s.label}</span>
          </button>
        ))}
      </div>

      <>
          {!isEsim && (
          <>
          <div className="checkout-plain-title">SIM Code</div>
          <div className="checkout-simcode-field">
            <input
              value={simCode}
              inputMode="numeric"
              placeholder="Enter MSISDN or SIM code"
              onChange={(e) => setSimCode(e.target.value)}
              onBlur={() => setSimTouched(true)}
            />
            <button type="button" aria-label="Scan SIM code" onClick={() => { setSimCode("12345678909877"); setSimTouched(true); }}>
              <BarcodeScanIcon />
            </button>
          </div>
          {simTouched && simCode.trim() && !simValid && (
            <div className="field-error" style={{ marginTop: -6, marginBottom: 12 }}>Please enter a valid MSISDN or SIM code</div>
          )}
          </>
          )}

          {simValid && (
            <>
              <div className="section-card">
                <div className="starter-number-head">
                  <span className="starter-number-icon"><DeviceTypeIcon /></span>
                  <h4>Selected Number</h4>
                </div>
                <div className="starter-number-box">{selectedNumber}</div>
                <div className="starter-number-note">Your SIM code is: <b>{isEsim ? shownSimCode : simCode.trim()}</b> .</div>
                {(isEsim || whiteP) && (
                  <button type="button" className="checkout-pick-number-btn starter-pick-btn" onClick={() => setShowNumberPicker(true)}>
                    Pick a Different Number <ArrowCircleIcon />
                  </button>
                )}
              </div>

              {whiteP ? (
                <>
                  <div className="checkout-plain-title">Select Base Plan</div>
                  <div className="saleskpi-tabs white-plan-tabs">
                    {PLAN_TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={"saleskpi-tab" + (whiteTab === tab ? " active" : "")}
                        onClick={() => setWhiteTab(tab)}
                      >
                        {tab}
                        {tab === "Visits" && <span className="plan-tab-badge">15% OFF</span>}
                      </button>
                    ))}
                  </div>
                  {isEsim && (
                    <div className="notif-search-shell" style={{ marginBottom: 14 }}>
                      <input
                        className="notif-search-input"
                        placeholder="Search by plan name or value or validity etc.."
                        value={whiteQuery}
                        onChange={(e) => setWhiteQuery(e.target.value)}
                      />
                      <SearchIcon />
                    </div>
                  )}
                  <div className="checkout-plans-scroll" onScroll={handleWhiteScroll}>
                    <div className="checkout-plans-row">
                      {visibleWhitePlans.map((w) => (
                        <div key={w.id} className="white-plan-card">
                          <div className="starter-plan-head">
                            <span className="checkout-plan-title" style={{ margin: 0 }}>Plan Title</span>
                            <span className="starter-plan-discount">Discount {w.discount}</span>
                          </div>
                          <div className="starter-plan-grid">
                            {w.feats.map(([k, v]) => (
                              <div key={k} className="starter-plan-feature"><span>{k}</span><b>{v}</b></div>
                            ))}
                          </div>
                          <div className="checkout-plan-price">{w.price}/mo <small>KD</small></div>
                          <div className="checkout-plan-vat">
                            +15% Vat included <button type="button">More Details <EyeIcon /></button>
                          </div>
                          <div className="checkout-plan-earn">💰 Earn {w.earn} KD</div>
                          <button
                            type="button"
                            className={"checkout-plan-select" + (whitePlanId === w.id ? " selected" : "")}
                            onClick={() => setWhitePlanId(w.id)}
                          >
                            {whitePlanId === w.id ? "Selected" : "Select"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="kpi-page-dots" style={{ marginBottom: 14 }}>
                    {WHITE_PLANS.map((w, i) => (
                      <span key={w.id} className={"kpi-page-dot" + (whiteDot === i ? " active" : "")} />
                    ))}
                  </div>

                  {isEsim && contractCard}

                  <div className="section-card">
                    <div className="starter-number-head">
                      <span className="starter-number-icon"><HomeIcon name="wallettopup" size={18} /></span>
                      <h4>Select Payment Method</h4>
                    </div>
                    <div className="kmid-label">Digital Wallets</div>
                    <button
                      type="button"
                      className={"method-row" + (whitePay === "stcwallet" ? " method-row--selected" : "")}
                      onClick={() => setWhitePay("stcwallet")}
                    >
                      <span className="method-row-icon"><HomeIcon name="wallettopup" size={18} /></span>
                      <span className="method-row-text">
                        <span className="method-row-title">STC Wallet</span>
                        <span className="method-row-desc">Pay from your Wallet (200 KD)</span>
                      </span>
                      <RadioIcon selected={whitePay === "stcwallet"} />
                    </button>
                  </div>
                </>
              ) : (
                <>
              <div className="checkout-plain-title">Base Plan</div>
              <div className="starter-plan-card">
                <div className="starter-plan-head">
                  <span className="checkout-plan-title" style={{ margin: 0 }}>Plan Title</span>
                  <span className="starter-plan-discount">Discount 50%</span>
                </div>
                <div className="starter-plan-grid">
                  {[["Internet", "60 GB"], ["Local Mins", "100"], ["SMS", "500"], ["Social Media", "Unlimited"]].map(([k, v]) => (
                    <div key={k} className="starter-plan-feature">
                      <span>{k}</span>
                      <b>{v}</b>
                    </div>
                  ))}
                </div>
                <div className="checkout-plan-price">30/mo <small>KD</small></div>
                <div className="checkout-plan-vat">
                  +15% Vat included <button type="button">More Details <EyeIcon /></button>
                </div>
                <div className="checkout-plan-earn" style={{ marginBottom: 0 }}>💰 Earn 2 KD</div>
              </div>

                </>
              )}

              {isEsim && !whiteP && contractCard}

              <div className="starter-sig-head">
                <div className="checkout-plain-title" style={{ margin: 0 }}>Dealer Signature</div>
                <button type="button" className="starter-change-link" onClick={() => setStarterSheet("dealer")}>
                  <RefreshIcon /> Change
                </button>
              </div>
              <button type="button" className="starter-sig-box" onClick={() => setStarterSheet("dealer")}>
                {starterDealerSigned && <SignatureSquiggle />}
              </button>
              <div className="perf-info"><InfoDotIcon /><span>Please add your signature in the box below .</span></div>

              <div className="starter-sig-head">
                <div className="checkout-plain-title" style={{ margin: 0 }}>{whiteP ? "Dealer Signature" : "Customer Signature"}</div>
                <button type="button" className="starter-change-link" onClick={() => setStarterSheet("customer")}>
                  <RefreshIcon /> Change
                </button>
              </div>
              <button type="button" className="starter-sig-box" onClick={() => setStarterSheet("customer")}>
                {starterCustomerSigned && <SignatureSquiggle />}
              </button>
              <div className="perf-info"><InfoDotIcon /><span>Please add your signature in the box below .</span></div>

              <button type="button" className="starter-terms" onClick={() => (starterTerms ? setStarterTerms(false) : setShowTerms(true))}>
                <CheckboxIcon checked={starterTerms} />
                {whiteP && isEsim ? <span><b>Terms and Conditions</b></span> : <span>By proceeding, you agree to stc <u>Terms and Conditions.</u></span>}
              </button>
            </>
          )}

          <button
            type="button"
            className={"starter-pay-bar" + (starterReady ? " ready" : "")}
            disabled={!starterReady}
            onClick={() => setPayStage("waiting")}
          >
            <span>Pay</span>
            <span>{starterReady ? (whiteP ? whitePrice + ".0" : "30.0") : "00.0"} KD</span>
          </button>

          {payStage === "waiting" && <PaymentWaitingModal onCancel={() => setPayStage(null)} />}
          {payStage === "success" && <PaymentSuccessSheet esim={isEsim} planLabel={(packTab === "Starter Pack" ? "Starter Pack" : "White SIM") + " - " + (isEsim ? "E-SIM" : "P-SIM")} onDone={onDone} />}

          {showTerms && (
            <TermsSheet
              onAccept={() => { setStarterTerms(true); setShowTerms(false); }}
              onReject={() => { setStarterTerms(false); setShowTerms(false); }}
            />
          )}

          {starterSheet === "dealer" && (
            <SignatureSheet onClose={() => setStarterSheet(null)} onSave={() => setStarterDealerSigned(true)} />
          )}
          {starterSheet === "customer" && (
            <SignatureSheet onClose={() => setStarterSheet(null)} onSave={() => setStarterCustomerSigned(true)} />
          )}
      </>

      {showNumberPicker && (
        <NumberPickerSheet
          current={selectedNumber}
          onClose={() => setShowNumberPicker(false)}
          onSelect={(n) => { setSelectedNumber(n); setShowNumberPicker(false); }}
        />
      )}

    </div>
  );
}

function PrepaidActivationScreen({ onBack }) {
  const [step, setStep] = useState("identity");
  const [kmidNumber, setKmidNumber] = useState("");
  const [showConnecting, setShowConnecting] = useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const [showCaptureSheet, setShowCaptureSheet] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const fileInputRef = React.useRef(null);

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCapturedPhoto(URL.createObjectURL(file));
    }
    setShowCaptureSheet(false);
    setStep("details");
    e.target.value = "";
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {step === "identity" && (
        <IdentityVerificationView
          onBack={onBack}
          kmidNumber={kmidNumber}
          onKmidNumberChange={setKmidNumber}
          onVerifyKmid={() => setShowConnecting(true)}
          onOpenCapture={() => setShowCaptureSheet(true)}
        />
      )}
      {step === "details" && (
        <PrepaidDetailsView
          onBack={() => setStep("identity")}
          capturedPhoto={capturedPhoto}
          onContinue={() => setStep("checkout")}
        />
      )}
      {step === "checkout" && <PrepaidCheckoutView onBack={() => setStep("details")} onDone={onBack} />}

      {showConnecting && (
        <ConnectingKmidModal
          onCancel={() => setShowConnecting(false)}
          onDone={() => {
            setShowConnecting(false);
            setShowVerified(true);
          }}
        />
      )}
      {showVerified && (
        <VerifiedSuccessModal
          onDone={() => {
            setShowVerified(false);
            setStep("details");
          }}
        />
      )}
      {showCaptureSheet && (
        <CaptureMethodSheet
          onClose={() => setShowCaptureSheet(false)}
          onScan={() => fileInputRef.current && fileInputRef.current.click()}
          onManual={() => {
            setShowCaptureSheet(false);
            setStep("details");
          }}
        />
      )}
    </div>
  );
}
