function App() {
  const [screen, setScreen] = useState("login");
  const [mobileId, setMobileId] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

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
      {screen === "home" && <HomeScreen onNavigate={setScreen} />}

      {showSuccessOverlay && <SuccessOverlay onDone={resetFlow} />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
