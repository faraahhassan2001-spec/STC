// Shared icon components (inline SVG, no external deps)
const { useState } = React;

function SignalBars() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
      <rect x="0" y="7" width="3" height="5" rx="0.8" fill="currentColor" />
      <rect x="4.5" y="5" width="3" height="7" rx="0.8" fill="currentColor" />
      <rect x="9" y="3" width="3" height="9" rx="0.8" fill="currentColor" />
      <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
      <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" />
      <rect x="2" y="2" width="17" height="8" rx="1.3" fill="currentColor" />
      <rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

function StatusBar({ dark }) {
  return (
    <div className={"status-bar" + (dark ? " on-dark" : "")}>
      <span>19:02</span>
      <div className="status-icons">
        <SignalBars />
        <span style={{ fontSize: 13, fontWeight: 600 }}>LTE</span>
        <BatteryIcon />
      </div>
    </div>
  );
}

function BgDeco() {
  return (
    <svg className="bg-deco" viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 120 L140 60 L220 130" stroke="#ded6ea" strokeWidth="1" />
      <path d="M260 40 L340 90 L300 160" stroke="#ded6ea" strokeWidth="1" />
      <circle cx="40" cy="480" r="2" fill="#c9bcdd" />
      <path d="M30 700 L110 640 L60 760" stroke="#ded6ea" strokeWidth="1" />
      <path d="M250 620 L330 700 L300 780" stroke="#ded6ea" strokeWidth="1" />
      <circle cx="330" cy="520" r="2" fill="#c9bcdd" />
    </svg>
  );
}

function EyeIcon({ off }) {
  return off ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.6 5.2C11 5.1 11.5 5 12 5C17 5 20.5 9.5 21.5 12C21.2 12.7 20.6 13.8 19.7 14.9M6.7 6.7C4.6 8.1 3 10.4 2.5 12C3.5 14.5 7 19 12 19C13.4 19 14.7 18.6 15.8 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.9 10C9.3 10.6 9 11.3 9 12C9 13.7 10.3 15 12 15C12.7 15 13.4 14.7 14 14.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M2.5 12C3.5 9.5 7 5 12 5C17 5 20.5 9.5 21.5 12C20.5 14.5 17 19 12 19C7 19 3.5 14.5 2.5 12Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function FaceIdIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 4.5C6 4.5 4.5 6 4.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 4.5C18 4.5 19.5 6 19.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 19.5C6 19.5 4.5 18 4.5 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 19.5C18 19.5 19.5 18 19.5 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 15C9.7 15.7 10.7 16.2 12 16.2C13.3 16.2 14.3 15.7 15 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="11" r="0.9" fill="currentColor" />
      <circle cx="15" cy="11" r="0.9" fill="currentColor" />
    </svg>
  );
}

function FingerprintIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3C7 3 4 6.5 4 10.5C4 12 4 13 3.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 10.5C20 6.5 17 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 21C8 19 8.3 17.5 8.3 15.5C8.3 12.8 9.8 10.8 12 10.8C14.2 10.8 15.7 12.8 15.7 15.5C15.7 16.5 15.7 17 15.6 17.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 21C12.6 19.3 12.9 18 12.9 16.2C12.9 15 12.5 14 11.9 14C11.3 14 11 15 11 15.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.5 10.5C4.5 5.8 7.9 2 12 2C16.1 2 19.5 5.8 19.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function LockBadgeIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <path d="M14 20V15C14 10.6 17.4 7 22 7C26.6 7 30 10.6 30 15" stroke="#3f6fd8" strokeWidth="3.2" strokeLinecap="round" />
      <rect x="9" y="19" width="26" height="20" rx="4" fill="#f5b93e" />
      <rect x="9" y="19" width="26" height="20" rx="4" fill="url(#lockgrad)" />
      <defs>
        <linearGradient id="lockgrad" x1="9" y1="19" x2="35" y2="39" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffd25c" />
          <stop offset="1" stopColor="#f2a72b" />
        </linearGradient>
      </defs>
      <circle cx="22" cy="27" r="3" fill="#c97c11" />
      <rect x="20.6" y="28.5" width="2.8" height="5" rx="1.2" fill="#c97c11" />
    </svg>
  );
}

function EnvelopeBadgeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="12" width="36" height="26" rx="4" fill="url(#envgrad)" />
      <path d="M6 14L24 28L42 14" stroke="#e9edfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <defs>
        <linearGradient id="envgrad" x1="6" y1="12" x2="42" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6fa3ff" />
          <stop offset="1" stopColor="#3f6fd8" />
        </linearGradient>
      </defs>
      <circle cx="38" cy="12" r="6" fill="#ef4a4a" />
      <path d="M35.5 12L37.3 13.8L40.5 10.2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CheckmarkIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M9 18.5L15 24.5L27 11.5" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
