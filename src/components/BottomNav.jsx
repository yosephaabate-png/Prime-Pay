import Icon from './Icon.jsx'

export default function BottomNav({ screen, onNavigate, C, accent, showAmharic }) {
  const items = [
    { id: "home", icon: "home", label: "Home", am: "መነሻ" },
    { id: "invest", icon: "trending_up", label: "Invest", am: "ኢንቨስት" },
    { id: "send", icon: "send", label: "Send", am: "ላክ" },
    { id: "portfolio", icon: "portfolio", label: "Portfolio", am: "ፖርትፎሊዮ" },
    { id: "profile", icon: "user", label: "Profile", am: "መገለጫ" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: C.navBg, borderTop: `1px solid ${C.cardBorderStrong}`, display: "flex", padding: "10px 8px 24px", zIndex: 50 }}>
      {items.map(item => {
        const active = screen === item.id;
        return (
          <button key={item.id} onClick={() => onNavigate(item.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: "6px 0", position: "relative" }}>
            <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", width: active ? 24 : 0, height: 2, background: accent, transition: "width .2s" }} />
            <Icon name={item.icon} size={20} color={active ? C.text : C.textMuted} strokeWidth={active ? 1.8 : 1.4} />
            <span style={{ fontSize: 10, color: active ? C.text : C.textMuted, fontWeight: active ? 600 : 400, letterSpacing: 0.3 }}>
              {showAmharic ? item.am : item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
