function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function DotsMenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1.8" fill="currentColor" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="12" cy="19" r="1.8" fill="currentColor" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16 M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2 M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6 M14 11v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function CheckboxIcon({ checked }) {
  return checked ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#6c3fa8" />
      <path d="M7 12.5l3 3 7-7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" stroke="#c7c2d6" strokeWidth="1.8" />
    </svg>
  );
}
function ReadCheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function NotifThumb() {
  return (
    <svg className="notif-thumb" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#dfeaf7" />
      <rect x="8" y="20" width="9" height="20" fill="#9db8d6" />
      <rect x="19" y="12" width="10" height="28" fill="#7ea1c9" />
      <rect x="31" y="17" width="9" height="23" fill="#9db8d6" />
      <circle cx="36" cy="10" r="4" fill="#ffd873" />
    </svg>
  );
}

const LOREM_BODY =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.";

const SEED_NOTIFICATIONS = [
  { id: 1, title: "New week at the office - attached schedule", subtitle: "Subtitle here", preview: "Lorem Ipsum is simply dummy text of text the simply dummy text of text Lorem ipsu...", time: "8:52 AM", date: "22, Dec, 2022", category: "payment", unread: true, body: LOREM_BODY },
  { id: 2, title: "New week at the office - attached schedule", subtitle: "Subtitle here", preview: "Lorem Ipsum is simply dummy text of text the simply dummy text of text Lorem ipsu...", time: "8:52 AM", date: "22, Dec, 2022", category: "payment", unread: true, body: LOREM_BODY },
  { id: 3, title: "New week at the office - attached schedule", subtitle: "Subtitle here", preview: "Lorem Ipsum is simply dummy text of text the simply dummy text of text Lorem ipsu...", time: "8:52 AM", date: "22, Dec, 2022", category: "payment", unread: true, body: LOREM_BODY },
  { id: 4, title: "New week at the office - attached schedule", subtitle: "Subtitle here", preview: "Lorem Ipsum is simply dummy text of text the simply dummy text of text Lorem ipsu...", time: "8:52 AM", date: "22, Dec, 2022", category: "general", unread: false, body: LOREM_BODY },
];

const NOTIF_FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "draft", label: "Draft" },
  { key: "payment", label: "Payment" },
];

function NotificationDetailView({ item, onBack, onDelete }) {
  return (
    <div>
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Notification</div>
        <button className="header-icon-btn notif-trash-btn" onClick={onDelete} aria-label="Delete">
          <TrashIcon />
        </button>
      </div>

      <div className="notif-detail-title">{item.title}</div>
      <div className="notif-detail-subtitle">{item.subtitle}</div>

      <div className="notif-detail-box">
        <span className="notif-detail-logo">stc</span>
      </div>

      <div className="notif-detail-date">{item.date}</div>
      <div className="notif-detail-body">{item.body}</div>
    </div>
  );
}

function NotificationListView({ notifications, onOpenItem, onMarkRead, onDeleteMany, onBack }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const paymentCount = notifications.filter((n) => n.category === "payment").length;
  const draftCount = notifications.filter((n) => n.category === "draft").length;

  const filtered = notifications.filter((n) => {
    if (filter === "unread" && !n.unread) return false;
    if (filter === "draft" && n.category !== "draft") return false;
    if (filter === "payment" && n.category !== "payment") return false;
    if (search.trim() && !n.title.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  function toggleSelect(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleItemClick(item) {
    if (selectMode) {
      toggleSelect(item.id);
    } else {
      onOpenItem(item);
    }
  }

  function exitSelectMode() {
    setSelectMode(false);
    setSelectedIds([]);
  }

  return (
    <div className="notif-screen">
      <div className="services-header">
        <button className="header-icon-btn" onClick={onBack} aria-label="Back">
          <BackArrowIcon />
        </button>
        <div className="title">Notification</div>
        <div style={{ position: "relative" }}>
          <button className="header-icon-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="More">
            <DotsMenuIcon />
          </button>
          {menuOpen && (
            <div className="notif-dropdown">
              <button
                type="button"
                onClick={() => {
                  setSelectMode(true);
                  setMenuOpen(false);
                }}
              >
                <CheckboxIcon checked={false} /> Select Inbox
              </button>
              <button
                type="button"
                onClick={() => {
                  onMarkRead(notifications.map((n) => n.id));
                  setMenuOpen(false);
                }}
              >
                <ReadCheckIcon /> Read All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="notif-search-shell">
        <input
          className="notif-search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon />
      </div>

      <div className="notif-filter-row">
        {NOTIF_FILTERS.map((f) => {
          const count = f.key === "unread" ? unreadCount : f.key === "payment" ? paymentCount : f.key === "draft" ? draftCount : null;
          return (
            <button
              key={f.key}
              type="button"
              className={"notif-filter-chip" + (filter === f.key ? " active" : "")}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {count != null && count > 0 && <span className="notif-filter-badge">{count}</span>}
            </button>
          );
        })}
      </div>

      <div className="notif-list">
        {filtered.length === 0 && <div className="notif-empty">No notifications here.</div>}
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            className="notif-item"
            onClick={() => handleItemClick(item)}
          >
            <div className="notif-item-main">
              <div className="notif-item-top">
                {item.unread && <span className="notif-dot" />}
                <span className="notif-item-title">{item.title}</span>
                <span className="notif-item-time">{item.time}</span>
              </div>
              <div className="notif-item-preview">{item.preview}</div>
            </div>
            {selectMode ? (
              <span className="notif-item-checkbox"><CheckboxIcon checked={selectedIds.includes(item.id)} /></span>
            ) : (
              <NotifThumb />
            )}
          </button>
        ))}
      </div>

      {selectMode && (
        <div className="notif-select-bar">
          <button
            type="button"
            className="notif-select-read"
            onClick={() => {
              onMarkRead(selectedIds);
              exitSelectMode();
            }}
          >
            <ReadCheckIcon /> Read
          </button>
          <button
            type="button"
            className="notif-select-delete"
            onClick={() => {
              onDeleteMany(selectedIds);
              exitSelectMode();
            }}
          >
            <TrashIcon /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

function NotificationsScreen({ onBack }) {
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS);
  const [openItemId, setOpenItemId] = useState(null);

  function markRead(ids) {
    setNotifications((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, unread: false } : n)));
  }
  function deleteMany(ids) {
    setNotifications((prev) => prev.filter((n) => !ids.includes(n.id)));
  }

  const openItem = notifications.find((n) => n.id === openItemId) || null;

  if (openItem) {
    return (
      <NotificationDetailView
        item={openItem}
        onBack={() => setOpenItemId(null)}
        onDelete={() => {
          deleteMany([openItem.id]);
          setOpenItemId(null);
        }}
      />
    );
  }

  return (
    <NotificationListView
      notifications={notifications}
      onOpenItem={(item) => {
        markRead([item.id]);
        setOpenItemId(item.id);
      }}
      onMarkRead={markRead}
      onDeleteMany={deleteMany}
      onBack={onBack}
    />
  );
}
