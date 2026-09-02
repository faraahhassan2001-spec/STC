function App() {
  const [screen, setScreen] = useState("login");
  const [mobileId, setMobileId] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [showKmidSheet, setShowKmidSheet] = useState(false);
  const [kmidVerified, setKmidVerified] = useState(false);

  function resetFlow() {
    setMobileId("");
    setShowSuccessOverlay(false);
    setScreen("login");
  }

  let deviceClass = "device";
  if (screen === "home") {
    deviceClass += " home-bg";
  }

  return (
    <div className={deviceClass}>
      <StatusBar dark={false} />
      {screen === "login" && (
        <LoginScreen onNavigate={setScreen} onLoginSuccess={() => setScreen("home")} />
      )}
      {screen === "forgot" && (
        <ForgotPasswordScreen onNavigate={setScreen} onSubmitMobileId={setMobileId} />
      )}
      {screen === "otp" && <OtpScreen onNavigate={setScreen} />}
      {screen === "reset" && (
        <ResetPasswordScreen onShowSuccess={() => setShowSuccessOverlay(true)} />
      )}
      {screen === "home" && (
        <HomeScreen
          kmidVerified={kmidVerified}
          onOpenKmidSheet={() => setShowKmidSheet(true)}
        />
      )}

      {showSuccessOverlay && <SuccessOverlay onDone={resetFlow} />}
      {showKmidSheet && (
        <KmidSheet
          onClose={() => setShowKmidSheet(false)}
          onVerified={() => {
            setKmidVerified(true);
            setShowKmidSheet(false);
          }}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
