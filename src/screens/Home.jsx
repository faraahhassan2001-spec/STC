function handleImgFallback(e, fallbackSrc) {
  if (!fallbackSrc || e.target.dataset.fellBack) return;
  e.target.dataset.fellBack = "1";
  e.target.src = fallbackSrc;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src="https://randomuser.me/api/portraits/men/32.jpg"
      alt="Profile photo"
      onError={(e) => handleImgFallback(e, "https://i.pravatar.cc/150?img=12")}
    />
  );
}

const BANNER_PERSON_PHOTO = "./assets/banner-person.jpg?v=2";

const PROMO_SLIDES = [
  {
    key: "potential",
    modifier: "purple",
    heading: "Unlock your Potential",
    body: "Drive Sales, Expand Reach, Achieve Sucess",
    photo: BANNER_PERSON_PHOTO,
  },
  {
    key: "smart-sales",
    modifier: "red",
    heading: "Smart Sales, Made Simple",
    body: "Boost transactions, manage e-vouchers, and grow your revenue effortlessly.",
    photo: BANNER_PERSON_PHOTO,
  },
  {
    key: "empowerment",
    modifier: "teal",
    heading: "Professional Empowerment",
    body: "Stay connected, manage operations, and deliver excellence every day.",
    photo: BANNER_PERSON_PHOTO,
  },
];

const PROMO_AUTOPLAY_MS = 4000;
const PROMO_SWIPE_THRESHOLD = 40;

function PromoCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = React.useRef(null);
  const dragRef = React.useRef(null);

  function restartAutoplay() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % PROMO_SLIDES.length);
    }, PROMO_AUTOPLAY_MS);
  }

  React.useEffect(() => {
    restartAutoplay();
    return () => clearInterval(timerRef.current);
  }, []);

  function goTo(nextIndex) {
    setIndex(((nextIndex % PROMO_SLIDES.length) + PROMO_SLIDES.length) % PROMO_SLIDES.length);
    restartAutoplay();
  }

  function handlePointerDown(e) {
    dragRef.current = { startX: e.clientX, dragging: true };
  }
  function handlePointerUp(e) {
    if (!dragRef.current?.dragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    dragRef.current.dragging = false;
    if (deltaX > PROMO_SWIPE_THRESHOLD) goTo(index - 1);
    else if (deltaX < -PROMO_SWIPE_THRESHOLD) goTo(index + 1);
  }

  return (
    <div>
      <div
        className="promo-carousel"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className="promo-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {PROMO_SLIDES.map((slide) => (
            <div key={slide.key} className={"promo-banner promo-banner--" + slide.modifier}>
              <h3>{slide.heading}</h3>
              <p>{slide.body}</p>
              <img className="promo-photo" src={slide.photo} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="promo-dots">
        {PROMO_SLIDES.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            aria-label={"Go to slide " + (i + 1)}
            className={i === index ? "active" : ""}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

const ORDER_MENU = [
  { key: "prepaid", label: "Prepaid" },
  { key: "mnp", label: "MNP" },
  { key: "bundle", label: "Bundle Activation/Renewal" },
  { key: "linevalidity", label: "Line validity" },
  { key: "customerrecharge", label: "Customer recharge" },
  { key: "ordershistory", label: "Orders history" },
  { key: "postpaid", label: "Postpaid" },
  { key: "checkavailability", label: "Check Availability" },
  { key: "idupdate", label: "ID Update" },
  { key: "updateinfo", label: "Update Info" },
  { key: "pre2post", label: "Pre2Post" },
];

const WALLET_MENU = [
  { key: "wallettopup", label: "Wallet top-up" },
  { key: "credittransfer", label: "Credit transfer" },
  { key: "transactionhistory", label: "Transaction History" },
  { key: "analytics", label: "Analytics" },
];

const STOCK_MENU = [
  { key: "inventorydashboard", label: "Inventory Dashboard" },
  { key: "salesorder", label: "Sales Order" },
  { key: "purchaseorder", label: "Purchase Order" },
  { key: "stockreturn", label: "Stock Return" },
];

const BROADCAST_MENU = [
  { key: "sendbroadcast", label: "Send Broadcast" },
  { key: "received", label: "Received" },
  { key: "sent", label: "Sent", badge: 99 },
];

function MenuItem({ item, colorClass }) {
  return (
    <button className="menu-item" onClick={() => {}}>
      <div className="menu-icon-circle-wrap">
        <div className={"menu-icon-circle " + colorClass}>
          <HomeIcon name={item.key} size={22} />
        </div>
        {item.badge != null && <div className="badge-count">{item.badge}</div>}
      </div>
      <span>{item.label}</span>
    </button>
  );
}

const SERVICES_SECTIONS = [
  {
    title: "Order Menu",
    items: [
      { key: "prepaid", label: "Prepaid" },
      { key: "mnp", label: "MNP" },
      { key: "bundle", label: "Bundle Activation / Renwal" },
      { key: "linevalidity", label: "Line Validity" },
      { key: "quickpay", label: "Quick Pay" },
      { key: "customerrecharge", label: "Customer Recharge" },
      { key: "ordershistory", label: "Orders History" },
      { key: "checkavailability", label: "Check Availability" },
      { key: "idupdate", label: "ID Update" },
      { key: "updateinfo", label: "info Update" },
      { key: "pre2post", label: "Pre2Post" },
    ],
  },
  {
    title: "E-Wallet",
    items: [
      { key: "wallettopup", label: "Wallet Top-up" },
      { key: "credittransfer", label: "Credit Transfer" },
      { key: "transactionhistory", label: "Transaction History" },
      { key: "analytics", label: "Analytics" },
    ],
  },
  {
    title: "Stock Management",
    items: [
      { key: "inventorydashboard", label: "Inventory Dashboard" },
      { key: "salesorder", label: "Sales Order" },
      { key: "purchaseorder", label: "Purchase Orders" },
      { key: "stockreturn", label: "Stock Return" },
      { key: "myhierarchy", label: "My Hierarchy" },
    ],
  },
  {
    title: "Channel Member Onboarding",
    items: [{ key: "channelonboarding", label: "Channel Onboarding" }],
  },
  {
    title: "Brodcast",
    items: [
      { key: "sendbroadcast", label: "Send Broadcast" },
      { key: "received", label: "Received" },
      { key: "sent", label: "Sent" },
    ],
  },
];

function ServiceRow({ item }) {
  return (
    <button type="button" className="service-row" onClick={() => {}}>
      <span className="row-icon"><HomeIcon name={item.key} size={19} /></span>
      <span className="row-label">{item.label}</span>
      <span className="row-chevron"><ChevronRightIcon /></span>
    </button>
  );
}

function ServicesView({ onBack }) {
  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Services</div>
        <button className="header-icon-btn"><NavAppsIcon /></button>
        <button className="header-icon-btn">
          <BellIcon />
          <span className="dot" />
        </button>
      </div>

      {SERVICES_SECTIONS.map((section) => (
        <div className="section-card" key={section.title}>
          <div className="section-head">
            <h4>{section.title}</h4>
          </div>
          <div className="service-list">
            {section.items.map((item) => (
              <ServiceRow key={item.key} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsChevronBtn() {
  return (
    <span className="settings-chevron-btn">
      <ChevronRightIcon />
    </span>
  );
}

function ToggleSwitch({ on, onToggle }) {
  return (
    <button
      type="button"
      className={"toggle-switch" + (on ? " on" : "")}
      onClick={onToggle}
      role="switch"
      aria-checked={on}
    >
      <span className="toggle-thumb" />
    </button>
  );
}

function SettingsView({ onBack, faceIdOn, onToggleFaceId, biometricOn, onToggleBiometric, language, onOpenPinSheet, onOpenLanguageSheet, onOpenWidgetsSheet }) {
  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Setting</div>
        <button className="header-icon-btn">
          <BellIcon />
          <span className="dot" />
        </button>
      </div>

      <button type="button" className="settings-item-card" onClick={onOpenWidgetsSheet}>
        <span className="label">Widgets</span>
        <SettingsChevronBtn />
      </button>

      <button type="button" className="settings-item-card" onClick={onOpenPinSheet}>
        <span className="label">Change PIN code</span>
        <SettingsChevronBtn />
      </button>

      <button type="button" className="settings-item-card" onClick={onOpenLanguageSheet}>
        <span className="label">Language</span>
        <span className="settings-right-group">
          <span className="settings-value">{language}</span>
          <SettingsChevronBtn />
        </span>
      </button>

      <div className="settings-item-card">
        <span className="label">Allow face ID</span>
        <ToggleSwitch on={faceIdOn} onToggle={onToggleFaceId} />
      </div>

      <div className="settings-item-card">
        <span className="label">Biometric</span>
        <ToggleSwitch on={biometricOn} onToggle={onToggleBiometric} />
      </div>

      <div className="settings-info-card">
        <div className="settings-info-row">
          <span className="label">Version number</span>
          <span className="value">4.1.5</span>
        </div>
        <div className="settings-info-row">
          <span className="label">Build number</span>
          <span className="value">20180549_R2.03</span>
        </div>
      </div>

      <div className="footer-note">
        Powered By <b>Leading</b> <span style={{ opacity: 0.6 }}>⚙</span>
      </div>
    </div>
  );
}

function BottomNav({ activeNav, setActiveNav }) {
  return (
    <div className="bottom-nav">
      <button className={"nav-btn" + (activeNav === "home" ? " active" : "")} onClick={() => setActiveNav("home")}>
        <NavHomeIcon />
      </button>
      <button className={"nav-btn" + (activeNav === "apps" ? " active" : "")} onClick={() => setActiveNav("apps")}>
        <NavAppsIcon />
      </button>
      <button className={"nav-btn" + (activeNav === "settings" ? " active" : "")} onClick={() => setActiveNav("settings")}>
        <NavGearIcon />
      </button>
      <button className={"nav-btn" + (activeNav === "profile" ? " active" : "")} onClick={() => setActiveNav("profile")}>
        <NavUserIcon />
      </button>
    </div>
  );
}

function HomeScreen({ kmidVerified, onOpenKmidSheet }) {
  const [activeNav, setActiveNav] = useState("home");
  const [faceIdOn, setFaceIdOn] = useState(true);
  const [biometricOn, setBiometricOn] = useState(true);
  const [language, setLanguage] = useState("EN");
  const [showPinSheet, setShowPinSheet] = useState(false);
  const [showLanguageSheet, setShowLanguageSheet] = useState(false);
  const [showWidgetsSheet, setShowWidgetsSheet] = useState(false);

  if (activeNav === "apps") {
    return (
      <div className="home-root">
        <div className="home-scroll">
          <ServicesView onBack={() => setActiveNav("home")} />
        </div>
        <BottomNav activeNav={activeNav} setActiveNav={setActiveNav} />
      </div>
    );
  }

  if (activeNav === "settings") {
    return (
      <div className="home-root">
        <div className="home-scroll">
          <SettingsView
            onBack={() => setActiveNav("home")}
            faceIdOn={faceIdOn}
            onToggleFaceId={() => setFaceIdOn((v) => !v)}
            biometricOn={biometricOn}
            onToggleBiometric={() => setBiometricOn((v) => !v)}
            language={language}
            onOpenPinSheet={() => setShowPinSheet(true)}
            onOpenLanguageSheet={() => setShowLanguageSheet(true)}
            onOpenWidgetsSheet={() => setShowWidgetsSheet(true)}
          />
        </div>
        <BottomNav activeNav={activeNav} setActiveNav={setActiveNav} />
        {showPinSheet && <ChangePinSheet onClose={() => setShowPinSheet(false)} />}
        {showLanguageSheet && (
          <LanguageSheet
            selected={language}
            onSelect={(code) => {
              setLanguage(code);
              setShowLanguageSheet(false);
            }}
            onClose={() => setShowLanguageSheet(false)}
          />
        )}
        {showWidgetsSheet && <WidgetsSheet onClose={() => setShowWidgetsSheet(false)} />}
      </div>
    );
  }

  return (
    <div className="home-root">
      <div className="home-scroll">
        <div className="home-header">
          <Avatar />
          <div className="greet">
            <div className="hello">Hello , Hamza</div>
            <div className="id">123456789</div>
          </div>
          <button className="header-icon-btn"><NavAppsIcon /></button>
          <button className="header-icon-btn">
            <BellIcon />
            <span className="dot" />
          </button>
        </div>

        {!kmidVerified && (
          <div className="alert-card">
            <div className="alert-top">
              <div className="alert-shield"><ShieldIcon /></div>
              <div className="alert-title">Action Required</div>
              <div className="alert-days">2 days left</div>
            </div>
            <div className="alert-desc">Verify KMID to maintain access.</div>
            <button className="alert-btn" onClick={onOpenKmidSheet}>
              Verify KMID <ArrowRightIcon />
            </button>
          </div>
        )}

        <PromoCarousel />

        <div className="section-card">
          <div className="section-head">
            <h4>Order Menu</h4>
            <span className="more">⋯</span>
          </div>
          <div className="grid-menu">
            {ORDER_MENU.map((item) => (
              <MenuItem key={item.key} item={item} colorClass="purple" />
            ))}
          </div>
        </div>

        <div className="section-card">
          <div className="section-head">
            <h4>E-Wallet</h4>
            <span className="more">⋯</span>
          </div>
          <div className="wallet-bar">
            <span className="label">STC Wallet</span>
            <span className="amount">456.789 <small>KD</small></span>
          </div>
          <div className="grid-menu">
            {WALLET_MENU.map((item) => (
              <MenuItem key={item.key} item={item} colorClass="teal" />
            ))}
          </div>
        </div>

        <div className="section-card">
          <div className="section-head">
            <h4>Stock Management</h4>
            <span className="more">⋯</span>
          </div>
          <div className="grid-menu">
            {STOCK_MENU.map((item) => (
              <MenuItem key={item.key} item={item} colorClass="blue" />
            ))}
            <MenuItem item={{ key: "myhierarchy", label: "My Hierarchy" }} colorClass="blue" />
          </div>
        </div>

        <div className="section-card">
          <div className="section-head">
            <h4>Channel Member Onboarding</h4>
            <span className="more">⋯</span>
          </div>
          <div className="grid-menu">
            <MenuItem item={{ key: "channelonboarding", label: "Channel Onboarding" }} colorClass="orange" />
          </div>
        </div>

        <div className="section-card">
          <div className="section-head">
            <h4>Broadcast</h4>
            <span className="more">⋯</span>
          </div>
          <div className="grid-menu">
            {BROADCAST_MENU.map((item) => (
              <MenuItem key={item.key} item={item} colorClass="orange" />
            ))}
          </div>
        </div>

        <div className="section-card">
          <div className="section-head">
            <h4>Inventory Dashboard</h4>
            <span className="see-all">See All <ArrowRightIcon /></span>
          </div>
          <div className="inv-grid">
            <div className="inv-item">
              <div className="inv-icon" style={{ color: "#2e6be6" }}><HomeIcon name="esim" size={28} /></div>
              <span className="name">E-Sim</span>
              <span className="stock">100 Stocks</span>
            </div>
            <div className="inv-item">
              <div className="inv-icon" style={{ color: "#e0507b" }}><HomeIcon name="psim" size={28} /></div>
              <span className="name">P-Sim</span>
              <span className="stock">100 Stocks</span>
            </div>
            <div className="inv-item">
              <div className="inv-icon" style={{ color: "#2e6be6" }}><HomeIcon name="router" size={28} /></div>
              <span className="name">Router</span>
              <span className="stock">100 Stocks</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeNav={activeNav} setActiveNav={setActiveNav} />
    </div>
  );
}
