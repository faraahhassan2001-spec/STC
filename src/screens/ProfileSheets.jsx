function ProfileSheetClose({ onClose }) {
  return (
    <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function PersonalDetailsSheet({ onClose }) {
  const [email, setEmail] = useState("Email@gmail.com");
  const [civilId, setCivilId] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const canSave = civilId.trim().length > 0;

  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <ProfileSheetClose onClose={onClose} />
        <div className="kmid-title" style={{ marginBottom: 18 }}>Personal Details</div>

        <div className="kmid-label">Mobile Number</div>
        <div className="field">
          <div className="verified-field">
            <span>548796328</span>
            <span className="verified-badge"><VerifiedCheckIcon /> Verified</span>
          </div>
        </div>

        <div className="kmid-label">Email</div>
        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              style={{ paddingRight: 96 }}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailVerified(false); }}
            />
            {!emailVerified && (
              <button type="button" className="verify-email-btn" onClick={() => setEmailVerified(true)}>
                Verify Email
              </button>
            )}
            {emailVerified && (
              <span className="verified-badge" style={{ position: "absolute", right: 14 }}>
                <VerifiedCheckIcon /> Verified
              </span>
            )}
          </div>
        </div>

        <div className="kmid-label">Civil ID</div>
        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="Please enter Civil ID"
              value={civilId}
              onChange={(e) => setCivilId(e.target.value)}
            />
          </div>
        </div>

        <button
          className={"btn-primary" + (canSave ? "" : " btn-primary--disabled")}
          disabled={!canSave}
          onClick={onClose}
        >
          Save
        </button>
      </div>
    </div>
  );
}

const SHOP_ADDRESSES = [
  { key: "shop1", name: "Shop Address (1)" },
  { key: "shop2", name: "Shop Address (2)" },
  { key: "shop3", name: "Shop Address (3)" },
];

function ShopAddressSheet({ onClose }) {
  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <ProfileSheetClose onClose={onClose} />
        <div className="kmid-title" style={{ marginBottom: 8 }}>Shop Address</div>

        <div className="service-list">
          {SHOP_ADDRESSES.map((item) => (
            <div className="pin-row" key={item.key}>
              <span className="pin-row-icon"><LocationPinIcon /></span>
              <span className="pin-row-text">
                <span className="pin-row-name">{item.name}</span>
                <span className="pin-row-sub">Address</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DEVICES_LOGGED = [
  { key: "dev1" },
  { key: "dev2" },
  { key: "dev3" },
];

function DevicesLoggedSheet({ onClose }) {
  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <ProfileSheetClose onClose={onClose} />
        <div className="kmid-title" style={{ marginBottom: 8 }}>Devices Logged</div>

        <div className="service-list">
          {DEVICES_LOGGED.map((item) => (
            <div className="pin-row" key={item.key}>
              <span className="pin-row-icon pin-row-icon--purple"><DeviceTypeIcon /></span>
              <span className="pin-row-text">
                <span className="pin-row-name">Device Type</span>
                <span className="pin-row-sub">Address</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignatureSheet({ onClose }) {
  const canvasRef = React.useRef(null);
  const drawingRef = React.useRef(false);
  const lastPointRef = React.useRef(null);
  const [hasSignature, setHasSignature] = useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
    ctx.strokeStyle = "#221d33";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  function getPoint(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handlePointerDown(e) {
    drawingRef.current = true;
    setHasSignature(true);
    lastPointRef.current = getPoint(e);
  }
  function handlePointerMove(e) {
    if (!drawingRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const point = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  }
  function handlePointerUp() {
    drawingRef.current = false;
  }

  function handleClear() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  }

  return (
    <div className="kmid-overlay" onClick={onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />
        <div className="kmid-title" style={{ marginBottom: 14 }}>Signature</div>

        <div className="signature-pad-wrap">
          <button type="button" className="signature-clear-btn" onClick={handleClear}>Clear</button>
          <canvas
            ref={canvasRef}
            className="signature-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
        </div>

        <button
          className={"btn-primary" + (hasSignature ? "" : " btn-primary--disabled")}
          style={{ marginTop: 16 }}
          disabled={!hasSignature}
          onClick={onClose}
        >
          Save
        </button>
        <button type="button" className="kmid-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
