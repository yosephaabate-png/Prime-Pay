import Icon from '../components/Icon.jsx'

export default function SavingsScreen({ C, accent, showAmharic, onBack }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 24px 80px", overflowY: "auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.textMuted, marginBottom: 20, padding: 0 }}>
        <Icon name="arrow_left" size={18} color={C.textMuted} />
        <span style={{ fontSize: 13 }}>Back</span>
      </button>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>Savings Goals</div>
      <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", marginBottom: 24 }}>የቁጠባ ዕቅዶች</div>
      {[
        { name: "Emergency Fund", am: "የአደጋ ጊዜ ፈንድ", current: 3500, target: 10000, emoji: "🛡️", monthly: 500 },
        { name: "New Business", am: "አዲስ ሥራ", current: 8200, target: 30000, emoji: "💼", monthly: 1200 },
        { name: "Education", am: "ትምህርት", current: 1500, target: 15000, emoji: "🎓", monthly: 700 },
      ].map(g => {
        const pct = Math.round(g.current / g.target * 100);
        return (
          <div key={g.name} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: "18px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 30 }}>{g.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{g.name}</div>
                {showAmharic && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{g.am}</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>ETB {g.current.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>of {g.target.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ height: 8, background: C.surface, borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${accent}, ${accent}99)`, borderRadius: 4 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: C.textMuted }}>{pct}% funded</span>
              <span style={{ fontSize: 12, color: accent, fontWeight: 600 }}>ETB {g.monthly}/mo auto-save</span>
            </div>
          </div>
        );
      })}
      <button style={{ width: "100%", padding: "16px", background: "none", border: `2px dashed ${C.cardBorder}`, borderRadius: 16, cursor: "pointer", fontSize: 15, fontWeight: 600, color: C.textMuted, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Icon name="plus" size={18} color={C.textMuted} />
        Add New Goal
      </button>
    </div>
  );
}
