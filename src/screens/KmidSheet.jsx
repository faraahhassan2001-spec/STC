function KmidCloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function KmidCheckIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
      <path d="M9 18.5L15 24.5L27 11.5" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const KMID_SUCCESS_DELAY_MS = 1400;

function KmidSheet({ onClose, onVerified }) {
  const [kmid, setKmid] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  function handleValidate() {
    if (!kmid.trim()) {
      setError("Please enter your Kuwait Mobile ID.");
      return;
    }
    setError("");
    setVerifying(true);
    setTimeout(() => {
      onVerified();
    }, KMID_SUCCESS_DELAY_MS);
  }

  return (
    <div className="kmid-overlay" onClick={verifying ? undefined : onClose}>
      <div className="kmid-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="kmid-handle" />

        {verifying ? (
          <div className="kmid-success">
            <div className="kmid-success-circle">
              <KmidCheckIcon />
            </div>
            <div className="kmid-success-title">KMID Verified</div>
            <div className="kmid-success-text">Your Kuwait Mobile ID has been verified successfully.</div>
          </div>
        ) : (
          <React.Fragment>
            <button type="button" className="kmid-close" onClick={onClose} aria-label="Close">
              <KmidCloseIcon />
            </button>
            <div className="kmid-title">Verify KMID</div>
            <div className="kmid-desc">Enter your Kuwait Mobile ID to complete verification securely.</div>

            <div className="kmid-label">Kuwait Mobile ID ( KMID )</div>
            <div className="field">
              <div className="input-shell">
                <input
                  className="text-input"
                  placeholder="Enter KMID"
                  inputMode="numeric"
                  value={kmid}
                  onChange={(e) => {
                    setKmid(e.target.value);
                    setError("");
                  }}
                />
              </div>
              {error && <div className="field-error">{error}</div>}
            </div>

            <button className="btn-primary" onClick={handleValidate}>
              Validate
            </button>
            <button type="button" className="kmid-cancel" onClick={onClose}>
              Cancel
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
