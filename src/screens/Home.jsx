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

function QrFinderPattern({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="18" height="18" fill="#221d33" />
      <rect x="3" y="3" width="12" height="12" fill="#fff" />
      <rect x="6" y="6" width="6" height="6" fill="#221d33" />
    </g>
  );
}

const QR_NOISE_MODULES = [
  22, 0, 26, 0, 30, 0, 38, 0, 46, 0, 50, 0, 58, 0, 66, 0, 74, 0,
  0, 22, 0, 30, 0, 38, 0, 50, 0, 58, 0, 66, 0, 74, 0, 78,
  22, 22, 26, 22, 34, 22, 42, 26, 50, 22, 58, 26, 66, 22,
  22, 30, 30, 34, 38, 30, 46, 34, 54, 30, 62, 34, 70, 30,
  22, 42, 26, 46, 34, 42, 42, 46, 50, 42, 58, 46, 66, 42, 74, 46,
  22, 58, 30, 62, 38, 58, 46, 62, 54, 58, 62, 62, 70, 58,
  22, 66, 26, 70, 34, 66, 42, 70, 50, 66, 58, 70, 66, 66, 74, 70,
  0, 46, 0, 54, 0, 62, 0, 70, 6, 50, 10, 62,
  46, 0, 54, 0, 62, 0, 70, 0, 50, 6, 62, 10,
  78, 22, 78, 30, 78, 42, 78, 50, 78, 58, 78, 66, 70, 78, 62, 78, 50, 78, 38, 78,
];

function QrCodeDecor() {
  const modules = [];
  for (let i = 0; i < QR_NOISE_MODULES.length; i += 2) {
    modules.push([QR_NOISE_MODULES[i], QR_NOISE_MODULES[i + 1]]);
  }
  return (
    <svg viewBox="0 0 96 96" className="qr-code-svg">
      <rect width="96" height="96" fill="#fff" />
      {modules.map(([mx, my], i) => (
        <rect key={i} x={mx} y={my} width="4" height="4" fill="#221d33" />
      ))}
      <QrFinderPattern x={0} y={0} />
      <QrFinderPattern x={78} y={0} />
      <QrFinderPattern x={0} y={78} />
      <circle cx="48" cy="48" r="15" fill="#fff" />
      <text x="48" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fontStyle="italic" fill="#4b2680">stc</text>
    </svg>
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

function MenuItem({ item, colorClass, onClick }) {
  return (
    <button className="menu-item" onClick={onClick || (() => {})}>
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

const PROFILE_MENU = [
  { key: "personal", label: "Personal Details" },
  { key: "shopaddress", label: "Shop Address" },
  { key: "devices", label: "Devices Logged" },
  { key: "signature", label: "Signature" },
];

function ProfileView({ onBack, onOpenSheet }) {
  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Profile</div>
        <button className="header-icon-btn profile-logout-btn" aria-label="Log out">
          <LogoutIcon />
        </button>
        <button className="header-icon-btn">
          <BellIcon />
          <span className="dot" />
        </button>
      </div>

      <div className="profile-id-card">
        <div className="profile-id-top">
          <div className="profile-id-avatar"><ProfilePersonIcon /></div>
          <div className="profile-id-logo">stc</div>
        </div>
        <div className="profile-id-name">Employee name</div>
        <div className="profile-id-role">Job title - Department</div>
      </div>

      {PROFILE_MENU.map((item) => (
        <button
          key={item.key}
          type="button"
          className="settings-item-card"
          onClick={() => onOpenSheet(item.key)}
        >
          <span className="label">{item.label}</span>
          <SettingsChevronBtn />
        </button>
      ))}

      <div className="qr-card">
        <div className="qr-title">Scan QR Code</div>
        <div className="qr-subtitle">Place QR code inside the frame to scan</div>
        <div className="qr-frame">
          <span className="qr-corner qr-corner-tl" />
          <span className="qr-corner qr-corner-tr" />
          <span className="qr-corner qr-corner-bl" />
          <span className="qr-corner qr-corner-br" />
          <QrCodeDecor />
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
  const [activeProfileSheet, setActiveProfileSheet] = useState(null);

  if (activeNav === "prepaid") {
    return (
      <div className="home-root">
        <div className="home-scroll">
          <PrepaidActivationScreen onBack={() => setActiveNav("home")} />
        </div>
      </div>
    );
  }

  if (activeNav === "notifications") {
    return (
      <div className="home-root">
        <div className="home-scroll">
          <NotificationsScreen onBack={() => setActiveNav("home")} />
        </div>
      </div>
    );
  }

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

  if (activeNav === "profile") {
    return (
      <div className="home-root">
        <div className="home-scroll">
          <ProfileView onBack={() => setActiveNav("home")} onOpenSheet={setActiveProfileSheet} />
        </div>
        <BottomNav activeNav={activeNav} setActiveNav={setActiveNav} />
        {activeProfileSheet === "personal" && (
          <PersonalDetailsSheet onClose={() => setActiveProfileSheet(null)} />
        )}
        {activeProfileSheet === "shopaddress" && (
          <ShopAddressSheet onClose={() => setActiveProfileSheet(null)} />
        )}
        {activeProfileSheet === "devices" && (
          <DevicesLoggedSheet onClose={() => setActiveProfileSheet(null)} />
        )}
        {activeProfileSheet === "signature" && (
          <SignatureSheet onClose={() => setActiveProfileSheet(null)} />
        )}
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
          <button className="header-icon-btn" onClick={() => setActiveNav("notifications")}>
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
              <MenuItem
                key={item.key}
                item={item}
                colorClass="purple"
                onClick={item.key === "prepaid" ? () => setActiveNav("prepaid") : undefined}
              />
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
