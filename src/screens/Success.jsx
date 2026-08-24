function SuccessScreen({ onNavigate }) {
  React.useEffect(() => {
    const t = setTimeout(() => onNavigate("login"), 2500);
    return () => clearTimeout(t);
  }, [onNavigate]);

  return (
    <div className="screen-body">
      <div className="success-wrap">
        <div className="success-card">
          <div className="success-title">Success</div>
          <div className="success-circle-outer">
            <div className="success-circle-inner">
              <CheckmarkIcon />
            </div>
          </div>
          <div className="success-text">Your password has been reset successfully.</div>
        </div>
      </div>
    </div>
  );
}
