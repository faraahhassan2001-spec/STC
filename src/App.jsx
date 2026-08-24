function App() {
  const [screen, setScreen] = useState("login");
  const [mobileId, setMobileId] = useState("");

  function resetFlow() {
    setMobileId("");
    setScreen("login");
  }

  let deviceClass = "device";
  let statusDark = false;
  if (screen === "success") {
    deviceClass += " dark-bg";
    statusDark = true;
  } else if (screen === "home") {
    deviceClass += " home-bg";
  }

  return (
    <div className={deviceClass}>
      <StatusBar dark={statusDark} />
      {screen === "login" && (
        <LoginScreen onNavigate={setScreen} onLoginSuccess={() => setScreen("home")} />
      )}
      {screen === "forgot" && (
        <ForgotPasswordScreen onNavigate={setScreen} onSubmitMobileId={setMobileId} />
      )}
      {screen === "otp" && <OtpScreen onNavigate={setScreen} />}
      {screen === "reset" && <ResetPasswordScreen onNavigate={setScreen} />}
      {screen === "success" && <SuccessScreen onNavigate={resetFlow} />}
      {screen === "home" && <HomeScreen onNavigate={setScreen} />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
