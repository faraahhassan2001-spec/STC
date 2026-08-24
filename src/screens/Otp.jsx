const CORRECT_OTP = TEST_OTP;

function OtpScreen({ onNavigate }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputsRef = React.useRef([]);

  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  function handleChange(index, value) {
    const v = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    setError("");
    if (v && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handleContinue() {
    const code = digits.join("");
    if (code.length < 4) {
      setError("Please enter the 4-digit code.");
      return;
    }
    if (code !== CORRECT_OTP) {
      setError("Incorrect OTP. Please try again.");
      return;
    }
    setError("");
    onNavigate("reset");
  }

  function handleResend() {
    if (resendCooldown > 0) return;
    setDigits(["", "", "", ""]);
    setError("");
    setResendCooldown(30);
    inputsRef.current[0]?.focus();
  }

  return (
    <div className="screen-body">
      <BgDeco />
      <div className="auth-content">
        <ProgressDots step={1} />
        <div className="icon-badge">
          <EnvelopeBadgeIcon />
        </div>
        <div className="heading">Check SMS For OTP</div>
        <div className="subheading">
          To reset your password ,please enter digit pin sent your email.
        </div>

        <div className="otp-row">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              className={"otp-box" + (error ? " error" : "")}
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>

        {error && <div className="otp-error-text">{error}</div>}

        <div className="resend-row">
          Don't receive the OTP ?{" "}
          <button className="resend-link" onClick={handleResend} disabled={resendCooldown > 0}>
            {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend"}
          </button>
        </div>

        <button className="btn-primary" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
