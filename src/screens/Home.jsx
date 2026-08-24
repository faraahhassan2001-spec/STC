function Avatar() {
  return (
    <svg className="avatar" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg">
      <rect width="46" height="46" fill="#d7d2e8" />
      <circle cx="23" cy="18" r="8" fill="#b6aed4" />
      <ellipse cx="23" cy="42" rx="15" ry="14" fill="#b6aed4" />
    </svg>
  );
}

function PromoPersonSvg() {
  return (
    <svg className="promo-photo" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="95" cy="150" rx="55" ry="70" fill="rgba(255,255,255,0.08)" />
      <circle cx="100" cy="55" r="26" fill="rgba(255,255,255,0.16)" />
      <rect x="65" y="80" width="70" height="90" rx="30" fill="rgba(255,255,255,0.12)" />
    </svg>
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

function HomeScreen() {
  const [activeNav, setActiveNav] = useState("home");
  const [promoIndex] = useState(0);

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

        <div className="alert-card">
          <div className="alert-top">
            <div className="alert-shield"><ShieldIcon /></div>
            <div className="alert-title">Action Required</div>
            <div className="alert-days">2 days left</div>
          </div>
          <div className="alert-desc">Verify KMID to maintain access.</div>
          <button className="alert-btn">
            Verify KMID <ArrowRightIcon />
          </button>
        </div>

        <div className="promo-banner">
          <h3>Unlock your Potential</h3>
          <p>Drive Sales, Expand Reach, Achieve Sucess</p>
          <PromoPersonSvg />
        </div>
        <div className="promo-dots">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i === promoIndex ? "active" : ""} />
          ))}
        </div>

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
    </div>
  );
}
