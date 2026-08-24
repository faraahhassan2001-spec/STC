const TEST_ACCOUNTS = [
  { username: "testuser", password: "Test@123" },
  { username: "test", password: "test" },
];
const TEST_OTP = "1234";

function LoginScreen({ onNavigate, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [bioBusy, setBioBusy] = useState(false);

  function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }
    const isValid = TEST_ACCOUNTS.some(
      (acc) => acc.username === username && acc.password === password
    );
    if (!isValid) {
      setError("Invalid username or password.");
      return;
    }
    setError("");
    onLoginSuccess();
  }

  function handleBiometric() {
    if (bioBusy) return;
    setBioBusy(true);
    setTimeout(() => {
      setBioBusy(false);
      onLoginSuccess();
    }, 900);
  }

  return (
    <div className="screen-body">
      <BgDeco />
      <div className="auth-content">
        <div className="logo-wrap">
          <div className="logo-text">stc</div>
          <div className="logo-sub">Hello , Welcome to STC Kuwait</div>
        </div>

        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="input-shell">
            <input
              className="text-input"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="icon-btn-inline"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Toggle password visibility"
            >
              <EyeIcon off={!showPassword} />
            </button>
          </div>
        </div>

        {error && <div className="field-error" style={{ marginBottom: 12, marginTop: -6 }}>{error}</div>}

        <div className="forgot-link-row">
          <button className="forgot-link" onClick={() => onNavigate("forgot")}>
            Forgot Password ?
          </button>
        </div>

        <button className="btn-primary" onClick={handleLogin}>
          Login
        </button>

        <div className="biometric-row">
          <button className={"biometric-btn" + (bioBusy ? " busy" : "")} onClick={handleBiometric} aria-label="Face ID login">
            <FaceIdIcon />
          </button>
          <button className={"biometric-btn" + (bioBusy ? " busy" : "")} onClick={handleBiometric} aria-label="Fingerprint login">
            <FingerprintIcon />
          </button>
        </div>

        <div className="footer-note">
          Powered By <b>Leading</b> <span style={{ opacity: 0.6 }}>⚙</span>
        </div>
      </div>
    </div>
  );
}
