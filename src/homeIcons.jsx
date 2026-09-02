// Simple line-icon set used across the Home screen menu grids.
const ICON_PATHS = {
  prepaid: "M6 3h9l3 3v15H6V3z M9 8h6 M9 12h6 M9 16h4",
  mnp: "M12 3v4 M12 17v4 M5 12H3 M21 12h-2 M6.3 6.3l1.4 1.4 M16.3 16.3l1.4 1.4 M6.3 17.7l1.4-1.4 M16.3 7.7l1.4-1.4 M12 8a4 4 0 100 8 4 4 0 000-8z",
  bundle: "M12 3l7 4-7 4-7-4 7-4z M5 11l7 4 7-4 M5 15l7 4 7-4",
  linevalidity: "M4 12h4l2-7 4 14 2-7h4",
  customerrecharge: "M8 3H5a2 2 0 00-2 2v3 M16 3h3a2 2 0 012 2v3 M8 21H5a2 2 0 01-2-2v-3 M16 21h3a2 2 0 002-2v-3 M12 8v8 M9 11l3-3 3 3",
  ordershistory: "M4 5h16 M4 5v14a1 1 0 001 1h14a1 1 0 001-1V5 M8 9h8 M8 13h8 M8 17h5",
  postpaid: "M4 6h16v12H4V6z M4 10h16 M8 15h4",
  checkavailability: "M11 4a7 7 0 100 14 7 7 0 000-14z M20 20l-4.3-4.3 M9 11l1.5 1.5L15 8",
  idupdate: "M4 5h16v14H4V5z M8 12a2 2 0 100-4 2 2 0 000 4z M6 17c.5-1.8 1.8-3 3.5-3s3 1.2 3.5 3 M15 9h4 M15 13h4",
  updateinfo: "M12 20a8 8 0 100-16 8 8 0 000 16z M12 8v5l3 2",
  pre2post: "M4 8l4-4 4 4 M8 4v12 M20 16l-4 4-4-4 M16 20V8",
  wallettopup: "M3 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z M17 12h-3 M14 10v4 M3 9h18",
  credittransfer: "M4 7h13l-3-3 M20 17H7l3 3 M4 7l3 3 M20 17l-3-3",
  transactionhistory: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 7v5l4 2 M4 3v4h4",
  analytics: "M4 20V10 M10 20V4 M16 20v-7 M22 20H2",
  inventorydashboard: "M4 4h6v6H4V4z M14 4h6v6h-6V4z M4 14h6v6H4v-6z M14 14h6v6h-6v-6z",
  salesorder: "M3 5h4l2 12a2 2 0 002 2h7a2 2 0 002-2l1-8H7 M17 9l3-3 M17 9l3 3",
  purchaseorder: "M3 5h4l2 12a2 2 0 002 2h7a2 2 0 002-2l1-8H7 M20 4l-3 3 M20 4l-3-3",
  stockreturn: "M4 12a8 8 0 1014-5.3 M4 12V6 M4 12H10",
  myhierarchy: "M12 3v5 M12 8L6 13 M12 8l6 5 M6 13v6 M18 13v6 M4 19h4 M16 19h4 M10 3h4v4h-4V3z",
  channelonboarding: "M9 11a3 3 0 100-6 3 3 0 000 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M18 8v6 M15 11h6",
  sendbroadcast: "M3 12l18-8-6 18-3-7-7-3z M15 4L9 13",
  received: "M12 3v13 M7 11l5 5 5-5 M5 20h14",
  sent: "M12 21V8 M17 13l-5-5-5 5 M5 4h14",
  esim: "M7 3h7l4 4v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z M9 12h6 M9 15h4 M9 9h2",
  psim: "M4 6h11v13H4a1 1 0 01-1-1V7a1 1 0 011-1z M9 6V4a1 1 0 011-1h9a1 1 0 011 1v13a1 1 0 01-1 1h-3",
  router: "M4 12h16 M4 12a2 2 0 002 2h12a2 2 0 002-2 M4 12l2-5h12l2 5 M8 17v1 M12 17v1 M16 17v1",
  quickpay: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
};

function HomeIcon(props) {
  const { name, size = 24, ...rest } = props;
  const d = ICON_PATHS[name] || "";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavHomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-7 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function NavAppsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="4" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function NavGearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3v2.2 M12 18.8V21 M4.2 7.5l1.9 1.1 M17.9 15.4l1.9 1.1 M3 12h2.2 M18.8 12H21 M4.2 16.5l1.9-1.1 M17.9 8.6l1.9-1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function NavUserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20c1-3.6 3.8-5.5 7-5.5s6 1.9 7 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 10a6 6 0 1112 0c0 4 1.3 5.5 1.3 5.5H4.7S6 14 6 10z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v6c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 8v5 M12 16h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14 M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BackArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5 M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
