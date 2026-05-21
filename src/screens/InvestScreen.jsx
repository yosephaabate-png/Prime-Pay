import { useState } from 'react'
import Icon from '../components/Icon.jsx'

export default function InvestScreen({ onNavigate, C, accent, showAmharic }) {
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const products = [
    {
      id: "mmf",
      emoji: "📈",
      name: "Money Market Fund",
      am: "ሞኒ ማርኬት ፈንድ",
      return: "8.2%",
      min: "100 ETB",
      liquidity: "Daily",
      liquidity_am: "ዕለታዊ",
      horizon: "Short term",
      color: accent,
      desc: "Invest in a diversified pool of short-term government and corporate instruments. Withdraw any time.",
      desc_am: "ማንኛውም ጊዜ ማውጣት ይቻላል",
      features: ["Daily liquidity", "NBE regulated", "Starting 100 ETB", "Auto-reinvest option"],
    },
    {
      id: "tbill",
      emoji: "🏦",
      name: "Treasury Bills",
      am: "የግምጃ ቤት ሰነዶች",
      return: "7.8%",
      min: "500 ETB",
      liquidity: "91 Days",
      liquidity_am: "91 ቀናት",
      horizon: "Short term",
      color: "#60a5fa",
      desc: "Government-backed fixed-return securities. Lock in your rate and earn guaranteed interest.",
      desc_am: "በመንግስት የተደገፈ ቋሚ ትርፍ",
      features: ["Govt. guaranteed", "Fixed return", "91-day maturity", "Rollover available"],
    },
  ];

  const handleInvest = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  if (done) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, alignItems: "center", justifyContent: "center", padding: "40px 28px" }}>
        <div style={{ fontSize: 56 }}>🎉</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 16, marginBottom: 6, textAlign: "center" }}>Investment Placed!</div>
        <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", marginBottom: 20 }}>ኢንቨስትመንቱ ተቀምጧል</div>
        <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: "20px", width: "100%", marginBottom: 28 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.text }}>ETB {amount}</div>
            <div style={{ fontSize: 13, color: C.textMuted }}>{selected?.name}</div>
          </div>
          {[
            ["Expected annual return", selected?.return],
            ["Funded from", "Telebirr Wallet"],
            ["Confirmation", "INV-2026-4892"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${C.cardBorder}` }}>
              <span style={{ color: C.textMuted, fontSize: 12 }}>{k}</span>
              <span style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setDone(false); setSelected(null); setAmount(""); onNavigate("portfolio"); }} style={{ width: "100%", padding: "16px", background: accent, borderRadius: 16, border: "none", cursor: "pointer", fontSize: 16, fontWeight: 600, color: C.accentText, fontFamily: "inherit" }}>
          View Portfolio
        </button>
      </div>
    );
  }

  if (!selected) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 24px 80px", overflowY: "auto" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>Invest</div>
        <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", marginBottom: 24 }}>ኢንቨስት ያድርጉ</div>

        <div style={{ background: `${accent}10`, border: `1px solid ${accent}25`, borderRadius: 16, padding: "14px 16px", marginBottom: 24, display: "flex", gap: 10 }}>
          <Icon name="trending_up" size={20} color={accent} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Available to invest</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>ETB 4,350.00</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>From Telebirr wallet</div>
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Available Products</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {products.map(p => (
            <button key={p.id} onClick={() => setSelected(p)} style={{ display: "flex", flexDirection: "column", gap: 0, background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 20, cursor: "pointer", textAlign: "left", overflow: "hidden" }}>
              <div style={{ padding: "18px 18px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{p.emoji}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{p.name}</div>
                      {showAmharic && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{p.am}</div>}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: p.color }}>{p.return}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>Annual return</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.55, margin: "12px 0 16px" }}>{p.desc}</div>
              </div>
              <div style={{ display: "flex", borderTop: `1px solid ${C.cardBorder}` }}>
                {[
                  { label: "Min.", value: p.min },
                  { label: "Liquidity", value: p.liquidity },
                ].map((stat, i) => (
                  <div key={i} style={{ flex: 1, padding: "12px 16px", borderRight: i === 0 ? `1px solid ${C.cardBorder}` : "none" }}>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{stat.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Product detail
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, overflowY: "auto", paddingBottom: 80 }}>
      <div style={{ padding: "24px 24px 0" }}>
        <button onClick={() => { setSelected(null); setAmount(""); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.textMuted, marginBottom: 20, padding: 0 }}>
          <Icon name="arrow_left" size={18} color={C.textMuted} />
          <span style={{ fontSize: 13 }}>Back</span>
        </button>
      </div>

      {/* Product header */}
      <div style={{ margin: "0 24px", background: `linear-gradient(135deg, ${selected.color}20, ${selected.color}08)`, border: `1px solid ${selected.color}30`, borderRadius: 20, padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${selected.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{selected.emoji}</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{selected.name}</div>
            {showAmharic && <div style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic" }}>{selected.am}</div>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
          {[
            { label: "Annual Return", value: selected.return },
            { label: "Min. Invest", value: selected.min },
            { label: "Liquidity", value: selected.liquidity },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: selected.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.65, marginBottom: 20 }}>{selected.desc}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {selected.features.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${selected.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="check" size={12} color={selected.color} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 13, color: C.text }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Investment Amount / ኢንቨስትመንት መጠን</label>
          <input value={amount} onChange={e => setAmount(e.target.value.replace(/\D/, ""))} placeholder="0 ETB" style={{ width: "100%", padding: "14px 16px", background: C.inputBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, color: C.text, fontSize: 28, fontWeight: 700, fontFamily: "inherit", outline: "none", textAlign: "center" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {["500", "1000", "2000", "5000"].map(q => (
              <button key={q} onClick={() => setAmount(q)} style={{ flex: 1, padding: "8px", background: C.inputBg, border: `1px solid ${C.cardBorder}`, borderRadius: 8, color: C.textMuted, fontSize: 12, cursor: "pointer" }}>{q}</button>
            ))}
          </div>
          {amount && (
            <div style={{ marginTop: 10, padding: "10px 14px", background: `${selected.color}10`, borderRadius: 10, fontSize: 12, color: C.textMuted }}>
              Estimated annual earnings: <strong style={{ color: selected.color }}>ETB {Math.round(parseInt(amount) * parseFloat(selected.return) / 100)}</strong>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "0 24px 24px" }}>
        <button onClick={handleInvest} disabled={!amount || parseInt(amount) < 100 || loading} style={{ width: "100%", padding: "16px", background: (!amount || parseInt(amount) < 100) ? C.textFaint : selected.color, borderRadius: 16, border: "none", cursor: (!amount || parseInt(amount) < 100 || loading) ? "default" : "pointer", fontSize: 16, fontWeight: 600, color: C.accentText, fontFamily: "inherit" }}>
          {loading ? "Processing…" : `Invest ${amount ? "ETB " + amount : ""} · ኢንቨስት ያድርጉ`}
        </button>
      </div>
    </div>
  );
}
