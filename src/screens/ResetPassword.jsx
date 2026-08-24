function ResetPasswordScreen({ onShowSuccess }) {
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [error, setError] = useState("");

  function handleChange() {
    if (!pw || !confirmPw) {
      setError("Please fill in both password fields.");
      return;
    }
    if (pw.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (pw !== confirmPw) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    onShowSuccess();
  }

  return (
    <div className="screen-body">
      <BgDeco />
      <div className="auth-content">
        <ProgressDots step={2} />
        <div className="icon-badge">
          <LockBadgeIcon />
        </div>
        <div className="heading">Reset Password</div>
        <div className="subheading">Create a strong password that has at least 8 characters long.</div>

        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="Enter New Password"
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <button type="button" className="icon-btn-inline" onClick={() => setShowPw((v) => !v)}>
              <EyeIcon off={!showPw} />
            </button>
          </div>
        </div>

        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="Confirm New Password"
              type={showConfirmPw ? "text" : "password"}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            <button type="button" className="icon-btn-inline" onClick={() => setShowConfirmPw((v) => !v)}>
              <EyeIcon off={!showConfirmPw} />
            </button>
          </div>
          {error && <div className="field-error">{error}</div>}
        </div>

        <button className="btn-primary" style={{ marginTop: 8 }} onClick={handleChange}>
          Change Password
        </button>
      </div>
    </div>
  );
}
