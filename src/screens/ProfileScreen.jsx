import Icon from '../components/Icon.jsx'
import { initials } from '../format.js'

export default function ProfileScreen({ C, accent, showAmharic, onNavigate, user }) {
  const menuItems = [
    { icon: "shield", label: "Security & KYC", am: "ደህንነት", badge: "Verified ✓", badgeColor: C.green },
    { icon: "bell", label: "Notifications", am: "ማሳወቂያዎች", action: "notifications" },
    { icon: "lock", label: "Change PIN", am: "ፒን ቀይር" },
    { icon: "help", label: "Help & Support", am: "እርዳታ" },
    { icon: "settings", label: "Settings", am: "ቅንብሮች", action: "settings" },
    { icon: "logout", label: "Sign Out", am: "ውጣ", danger: true, action: "onboard" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 24px 80px", overflowY: "auto" }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 24 }}>Profile</div>
      {/* Avatar card */}
      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: "20px", display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: `${accent}22`, border: `2px solid ${accent}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: accent }}>{initials(user.name)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{user.name}</div>
          <div style={{ fontSize: 13, color: C.textMuted }}>+251 {user.phone}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <div style={{ background: `${C.green}22`, borderRadius: 6, padding: "3px 8px", fontSize: 11, color: C.green, fontWeight: 600 }}>KYC Verified</div>
            <div style={{ background: `${accent}18`, borderRadius: 6, padding: "3px 8px", fontSize: 11, color: accent, fontWeight: 600 }}>Telebirr Linked</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {menuItems.map(item => (
          <button key={item.label} onClick={() => item.action && onNavigate(item.action)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 14px", background: "none", border: "none", cursor: item.action ? "pointer" : "default", borderRadius: 14, textAlign: "left" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: item.danger ? `${C.red}18` : C.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={item.icon} size={18} color={item.danger ? C.red : C.textMuted} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: item.danger ? C.red : C.text, fontWeight: 500 }}>{item.label}</div>
              {showAmharic && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{item.am}</div>}
            </div>
            {item.badge && <span style={{ fontSize: 11, color: item.badgeColor, fontWeight: 600 }}>{item.badge}</span>}
            {!item.danger && <Icon name="chevron_right" size={16} color={C.textFaint} />}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <div style={{ fontSize: 12, color: C.textFaint }}>PrimePay v1.0 · Powered by EthioTelecom Telebirr</div>
        <div style={{ fontSize: 11, color: C.textFaint, marginTop: 2 }}>Regulated by National Bank of Ethiopia</div>
      </div>
    </div>
  );
}
