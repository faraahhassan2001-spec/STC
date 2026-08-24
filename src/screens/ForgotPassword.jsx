function ProgressDots({ step }) {
  return (
    <div className="progress-row">
      {[0, 1, 2].map((i) => (
        <div key={i} className={"progress-dash" + (i <= step ? " active" : "")} />
      ))}
    </div>
  );
}

function ForgotPasswordScreen({ onNavigate, onSubmitMobileId }) {
  const [mobileId, setMobileId] = useState("");
  const [error, setError] = useState("");

  function handleContinue() {
    if (!mobileId.trim()) {
      setError("Please enter your Mobile ID.");
      return;
    }
    setError("");
    onSubmitMobileId(mobileId);
    onNavigate("otp");
  }

  return (
    <div className="screen-body">
      <BgDeco />
      <div className="auth-content">
        <ProgressDots step={0} />
        <div className="icon-badge">
          <LockBadgeIcon />
        </div>
        <div className="heading">Forgot Password</div>
        <div className="subheading">Enter your mobile ID blow to reset password.</div>

        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="Mobile ID"
              value={mobileId}
              onChange={(e) => setMobileId(e.target.value)}
            />
          </div>
          {error && <div className="field-error">{error}</div>}
        </div>

        <button className="btn-primary" style={{ marginTop: 8 }} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
