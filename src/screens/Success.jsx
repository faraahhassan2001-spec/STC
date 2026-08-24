function SuccessOverlay({ onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="success-overlay">
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
  );
}
