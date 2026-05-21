import Icon from '../components/Icon.jsx'

const ACCENTS = [
  { value: "#1f7a52", label: "Emerald" },
  { value: "#0f1410", label: "Ink" },
  { value: "#a8893d", label: "Gold" },
  { value: "#b54a3e", label: "Clay" },
];

function Toggle({ C, accent, on, onClick }) {
  return (
    <button onClick={onClick} aria-pressed={on} style={{ width: 44, height: 26, borderRadius: 13, border: "none", cursor: "pointer", padding: 3, background: on ? accent : C.textFaint, display: "flex", justifyContent: on ? "flex-end" : "flex-start", transition: "background .2s" }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
    </button>
  );
}

function Row({ C, title, am, showAmharic, children, divider }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: divider ? `1px solid ${C.cardBorder}` : "none" }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{title}</div>
        {showAmharic && am && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{am}</div>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsScreen({ C, tweaks, onChange, onBack }) {
  const accent = tweaks.accentColor;
  const showAmharic = tweaks.showAmharic;
  const isDark = tweaks.theme === "dark";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 24px 40px", overflowY: "auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.textMuted, marginBottom: 20, padding: 0 }}>
        <Icon name="arrow_left" size={18} color={C.textMuted} />
        <span style={{ fontSize: 13 }}>Back</span>
      </button>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>Settings</div>
      <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", marginBottom: 28 }}>ቅንብሮች</div>

      {/* Appearance */}
      <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, marginBottom: 4, paddingBottom: 8, borderBottom: `1px solid ${C.cardBorderStrong}` }}>Appearance</div>
      <Row C={C} title="Dark Theme" am="ጨለማ መልክ" showAmharic={showAmharic} divider>
        <Toggle C={C} accent={accent} on={isDark} onClick={() => onChange({ theme: isDark ? "light" : "dark" })} />
      </Row>
      <Row C={C} title="Bilingual Labels" am="የአማርኛ መለያዎች" showAmharic={showAmharic}>
        <Toggle C={C} accent={accent} on={showAmharic} onClick={() => onChange({ showAmharic: !showAmharic })} />
      </Row>

      {/* Accent */}
      <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, margin: "24px 0 4px", paddingBottom: 8, borderBottom: `1px solid ${C.cardBorderStrong}` }}>Accent Color</div>
      <div style={{ display: "flex", gap: 14, paddingTop: 18 }}>
        {ACCENTS.map(a => {
          const selected = accent === a.value;
          return (
            <button key={a.value} onClick={() => onChange({ accentColor: a.value })} aria-label={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: a.value, border: selected ? `2px solid ${C.text}` : `2px solid ${C.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selected && <Icon name="check" size={18} color="#fff" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 11, color: selected ? C.text : C.textMuted, fontWeight: selected ? 600 : 400 }}>{a.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <div style={{ fontSize: 12, color: C.textFaint }}>PrimePay v1.0 · Powered by EthioTelecom Telebirr</div>
        <div style={{ fontSize: 11, color: C.textFaint, marginTop: 2 }}>Regulated by National Bank of Ethiopia</div>
      </div>
    </div>
  );
}
