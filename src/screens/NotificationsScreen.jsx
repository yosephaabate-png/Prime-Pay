import Icon from '../components/Icon.jsx'

export default function NotificationsScreen({ C, onBack }) {
  const items = [
    { text: "Your MMF earned ETB 85 in dividends", time: "2 hours ago", icon: "📈" },
    { text: "Yonas T. accepted your transfer of ETB 350", time: "Yesterday", icon: "✅" },
    { text: "T-Bill matures on Jun 15 — renew or withdraw?", time: "2 days ago", icon: "🏦" },
  ];
  return (
    <div style={{ flex: 1, background: C.bg, padding: "24px 24px 80px", overflowY: "auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.textMuted, marginBottom: 20, padding: 0 }}>
        <Icon name="arrow_left" size={18} color={C.textMuted} />
        <span style={{ fontSize: 13 }}>Back</span>
      </button>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 24 }}>Notifications</div>
      {items.map((n, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: `1px solid ${C.cardBorder}` }}>
          <div style={{ fontSize: 22 }}>{n.icon}</div>
          <div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.5 }}>{n.text}</div>
            <div style={{ fontSize: 11, color: C.textFaint, marginTop: 4 }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
