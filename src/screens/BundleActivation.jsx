const BUNDLE_SUB_CATEGORIES = ["Prepaid", "Postpaid"];

const BUNDLE_PLANS = [
  {
    id: 1,
    title: "Plan Title",
    tag: "Existing Plan",
    features: ["60 GB", "100 Min", "500 SMS", "Unlimited"],
    price: "30",
    earn: "2",
  },
  {
    id: 2,
    title: "Plan Title",
    features: ["80 GB", "150 Min", "700 SMS", "Unlimited"],
    price: "35",
    earn: "3",
  },
];

function BundleNumberEntryView({ onBack, mobileNumber, onMobileNumberChange, onContinue }) {
  const canContinue = mobileNumber.trim().length > 0;

  return (
    <div className="bundle-number-page">
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Bundle Activation/Renewal</div>
      </div>

      <EditableField
        label="Mobile Number"
        placeholder="Enter the mobile number"
        value={mobileNumber}
        onChange={onMobileNumberChange}
      />

      <button
        className={"btn-primary bundle-number-continue" + (canContinue ? "" : " btn-primary--disabled")}
        disabled={!canContinue}
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
}

function BundleActivationView({ onBack, mobileNumber }) {
  const [planTab, setPlanTab] = useState("Featured");
  const [subCategory, setSubCategory] = useState("Prepaid");
  const [selectedPlanId, setSelectedPlanId] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("paylink");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visiblePlans = BUNDLE_PLANS.filter(
    (p) => !q || (p.title + " " + p.features.join(" ")).toLowerCase().includes(q)
  );

  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Bundle Activation/Renewal</div>
      </div>

      <div className="verified-field" style={{ marginBottom: 16 }}>
        <span className="bundle-number-icon-label"><DeviceTypeIcon /> {mobileNumber || "578632498"}</span>
        <span className="verified-badge">Mobile ID <VerifiedCheckIcon /></span>
      </div>

      <div className="checkout-plain-title">Select Base Plan</div>
      <div className="saleskpi-tabs white-plan-tabs">
        {PLAN_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={"saleskpi-tab" + (planTab === tab ? " active" : "")}
            onClick={() => setPlanTab(tab)}
          >
            {tab}
            {tab === "Visits" && <span className="plan-tab-badge">15% OFF</span>}
          </button>
        ))}
      </div>

      <div className="checkout-plain-title">Select sub category</div>
      <div className="saleskpi-tabs" style={{ marginBottom: 14 }}>
        {BUNDLE_SUB_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={"saleskpi-tab" + (subCategory === cat ? " active" : "")}
            style={{ flex: "none", padding: "8px 18px" }}
            onClick={() => setSubCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="notif-search-shell" style={{ marginBottom: 14 }}>
        <input
          className="notif-search-input"
          placeholder="Search by plan name or value or validity etc.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon />
      </div>

      <div className="checkout-plans-scroll">
        <div className="checkout-plans-row">
          {visiblePlans.map((plan) => (
            <div key={plan.id} className="checkout-plan-card">
              <div className="starter-plan-head">
                <span className="checkout-plan-title" style={{ margin: 0 }}>{plan.title}</span>
                {plan.tag && <span className="bundle-plan-tag">{plan.tag}</span>}
              </div>
              <div className="checkout-plan-features-label">Included Features</div>
              <div className="checkout-plan-features">
                {plan.features.map((f) => <div key={f} className="checkout-plan-feature-box">{f}</div>)}
              </div>
              <div className="checkout-plan-price">{plan.price}/mo <small>KD</small></div>
              <div className="checkout-plan-vat">
                +15% Vat Included <button type="button">More Details <EyeIcon /></button>
              </div>
              <div className="checkout-plan-earn">💰 Earn {plan.earn} KD</div>
              <button
                type="button"
                className={"checkout-plan-select" + (selectedPlanId === plan.id ? " selected" : "")}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {selectedPlanId === plan.id ? "Selected" : "Select"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card" style={{ marginTop: 16 }}>
        <div className="section-head"><h4>Select Payment Method</h4></div>
        <div className="kmid-label">Digital Wallets</div>

        <div
          role="button"
          tabIndex={0}
          className={"method-row" + (paymentMethod === "stcwallet" ? " method-row--selected" : "")}
          onClick={() => setPaymentMethod("stcwallet")}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setPaymentMethod("stcwallet")}
        >
          <span className="method-row-icon"><HomeIcon name="wallettopup" size={18} /></span>
          <span className="method-row-text">
            <span className="method-row-title">STC Wallet</span>
            <span className="method-row-desc">Pay from your Wallet (3 KD)</span>
            <span className="bundle-wallet-warning">
              Wallet balance is not enough
              <button type="button" className="bundle-topup-link" onClick={(e) => e.stopPropagation()}>Top up now</button>
            </span>
          </span>
          <RadioIcon selected={paymentMethod === "stcwallet"} />
        </div>

        <button
          type="button"
          className={"method-row" + (paymentMethod === "paylink" ? " method-row--selected" : "")}
          onClick={() => setPaymentMethod("paylink")}
        >
          <span className="method-row-icon"><HomeIcon name="credittransfer" size={18} /></span>
          <span className="method-row-text">
            <span className="method-row-title">Pay Through Link</span>
            <span className="method-row-desc">Share via SMS or WhatsApp</span>
          </span>
          <RadioIcon selected={paymentMethod === "paylink"} />
        </button>
      </div>

      <button className="btn-primary checkout-pay-btn" style={{ marginTop: 14, marginBottom: 20 }} onClick={() => {}}>
        <span>Pay</span>
        <span>{BUNDLE_PLANS.find((p) => p.id === selectedPlanId)?.price}.0 KD</span>
      </button>
    </div>
  );
}

function BundleActivationScreen({ onBack }) {
  const [step, setStep] = useState("number");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showConnecting, setShowConnecting] = useState(false);

  return (
    <div>
      {step === "number" && (
        <BundleNumberEntryView
          onBack={onBack}
          mobileNumber={mobileNumber}
          onMobileNumberChange={setMobileNumber}
          onContinue={() => setShowConnecting(true)}
        />
      )}
      {step === "activate" && (
        <BundleActivationView onBack={onBack} mobileNumber={mobileNumber} />
      )}

      {showConnecting && (
        <ConnectingKmidModal
          onCancel={() => setShowConnecting(false)}
          onDone={() => {
            setShowConnecting(false);
            setStep("activate");
          }}
        />
      )}
    </div>
  );
}
