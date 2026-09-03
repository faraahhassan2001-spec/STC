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
      {steps.map((s, i) => (
        <React.Fragment key={s.key}>
          {i > 0 && <span className="prepaid-stepper-arrow">→</span>}
          <div className={"prepaid-step" + (i === currentIndex ? " active" : i < currentIndex ? " done" : "")}>
            <div className="prepaid-step-circle">{s.icon}</div>
            <span>{s.label}</span>
          </div>
        </React.Fragment>
      ))}
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

function PrepaidDetailsView({ onBack, capturedPhoto }) {
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

      <button className="btn-primary" style={{ marginTop: 4, marginBottom: 20 }} onClick={() => {}}>
        Continue
      </button>
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
      {step === "details" && <PrepaidDetailsView onBack={() => setStep("identity")} capturedPhoto={capturedPhoto} />}

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
