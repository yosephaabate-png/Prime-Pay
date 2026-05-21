export default function PortfolioScreen({ C, accent, showAmharic }) {
  const total = 20500;
  const mmf = 12500;
  const tbill = 8000;
  const mmfPct = Math.round(mmf / total * 100);
  const tbillPct = Math.round(tbill / total * 100);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, overflowY: "auto", padding: "24px 24px 80px" }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>Portfolio</div>
      <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", marginBottom: 24 }}>ፖርትፎሊዮዎ</div>

      {/* Total */}
      <div style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}08)`, border: `1px solid ${accent}30`, borderRadius: 24, padding: "22px", marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Total Invested</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: C.text }}>ETB 20,500</div>
        <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
          <div>
            <div style={{ fontSize: 12, color: C.textMuted }}>Total Earned</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>+ETB 1,890</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: C.textMuted }}>Return Rate</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>+9.2%</div>
          </div>
        </div>
      </div>

      {/* Allocation bar */}
      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: "18px", marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 14 }}>Allocation</div>
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 10, marginBottom: 14 }}>
          <div style={{ width: `${mmfPct}%`, background: accent }} />
          <div style={{ width: `${tbillPct}%`, background: "#60a5fa" }} />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: accent }} />
            <span style={{ fontSize: 12, color: C.textMuted }}>MMF {mmfPct}%</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "#60a5fa" }} />
            <span style={{ fontSize: 12, color: C.textMuted }}>T-Bills {tbillPct}%</span>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Holdings</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { name: "Money Market Fund", am: "ሞኒ ማርኬት ፈንድ", value: "12,500", earned: "+540", rate: "+8.2%", color: accent, icon: "📈", next: "Anytime" },
          { name: "Treasury Bills (91d)", am: "91 ቀን ቲ-ቢሎች", value: "8,000", earned: "+310", rate: "+7.8%", color: "#60a5fa", icon: "🏦", next: "Jun 15, 2026" },
        ].map(h => (
          <div key={h.name} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 18, overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${h.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{h.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{h.name}</div>
                    {showAmharic && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{h.am}</div>}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>ETB {h.value}</div>
                  <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>{h.earned} ({h.rate})</div>
                </div>
              </div>
            </div>
            <div style={{ padding: "10px 16px", borderTop: `1px solid ${C.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.surface }}>
              <span style={{ fontSize: 11, color: C.textMuted }}>Next withdrawal: {h.next}</span>
              <button style={{ fontSize: 12, color: h.color, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Redeem</button>
            </div>
          </div>
        ))}
      </div>

      {/* Savings Goals */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {showAmharic ? "የቁጠባ ዕቅዶች · Savings Goals" : "Savings Goals"}
          </div>
          <button style={{ fontSize: 12, color: accent, background: "none", border: "none", cursor: "pointer" }}>+ Add</button>
        </div>
        {[
          { name: "Emergency Fund", am: "የአደጋ ጊዜ ፈንድ", current: 3500, target: 10000, emoji: "🛡️" },
          { name: "New Business", am: "አዲስ ሥራ", current: 8200, target: 30000, emoji: "💼" },
        ].map(g => {
          const pct = Math.round(g.current / g.target * 100);
          return (
            <div key={g.name} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: "16px", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ fontSize: 22 }}>{g.emoji}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{g.name}</div>
                    {showAmharic && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{g.am}</div>}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>ETB {g.current.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>of {g.target.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ height: 6, background: C.surface, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: accent, borderRadius: 3, transition: "width 1s ease" }} />
              </div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>{pct}% funded</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
