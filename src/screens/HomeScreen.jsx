import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { initials, firstName } from '../format.js'

export default function HomeScreen({ onNavigate, C, accent, showAmharic, user }) {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const txns = [
    { mark: "↓", label: "Telebirr Top-up", am: "ቴሌብር ቅድሚያ ክፍያ", amount: "+500.00", credit: true, time: "Today · 09:42" },
    { mark: "↗", label: "MMF Investment", am: "ሞኒ ማርኬት ፈንድ", amount: "−2,000.00", credit: false, time: "Yesterday" },
    { mark: "→", label: "Sent · Yonas T.", am: "ለዮናስ ተ. ተላከ", amount: "−350.00", credit: false, time: "Apr 29" },
    { mark: "✓", label: "T-Bill Maturity", am: "ቲ-ቢል ብስለት", amount: "+1,240.00", credit: true, time: "Apr 28" },
  ];

  // Sparkline points (simple SVG growth curve)
  const sparkPoints = "0,38 18,30 36,34 54,22 72,26 90,14 108,18 126,8";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, overflowY: "auto", paddingBottom: 90 }}>
      {/* Top bar */}
      <div style={{ padding: "18px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, border: `1.5px solid ${C.text}`, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, background: accent, borderRadius: 1 }} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, letterSpacing: 0.4 }}>PRIME<span style={{ color: accent }}>PAY</span></div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => onNavigate("notifications")} style={{ width: 38, height: 38, borderRadius: "50%", background: "transparent", border: `1px solid ${C.cardBorderStrong}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Icon name="bell" size={16} color={C.text} />
            <div style={{ position: "absolute", top: 8, right: 9, width: 6, height: 6, borderRadius: "50%", background: accent }} />
          </button>
          <button onClick={() => onNavigate("profile")} style={{ width: 38, height: 38, borderRadius: "50%", background: C.text, border: "none", cursor: "pointer", color: C.bg, fontSize: 12, fontWeight: 600 }}>{initials(user.name)}</button>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: "28px 24px 0" }}>
        <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, marginBottom: 6 }}>
          {showAmharic ? "እንኳን ደህና መጡ" : "Welcome back"}
        </div>
        <div className="serif" style={{ fontSize: 30, color: C.text, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          <em style={{ fontStyle: "italic" }}>Hello,</em> {firstName(user.name)}.
        </div>
      </div>

      {/* Balance — full-bleed editorial */}
      <div style={{ margin: "24px 24px 0", padding: "20px 0", borderTop: `1px solid ${C.cardBorderStrong}`, borderBottom: `1px solid ${C.cardBorderStrong}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap" }}>
            {showAmharic ? "ጠቅላላ ቀሪ ሂሳብ" : "Total Balance"}
          </div>
          <button onClick={() => setBalanceVisible(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: C.textMuted, fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="eye" size={12} color={C.textMuted} />
            {balanceVisible ? "Hide" : "Show"}
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 500, letterSpacing: 0.5 }}>ETB</div>
          <div className="serif tabular" style={{ fontSize: 52, color: C.text, lineHeight: 1, letterSpacing: "-0.02em" }}>
            {balanceVisible ? "24,850.00" : "•••••"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: C.green, fontSize: 11, fontWeight: 600 }}>▲ 12.4%</span>
            <span style={{ fontSize: 11, color: C.textMuted }}>30d</span>
          </div>
          <svg width="140" height="40" viewBox="0 0 140 40" style={{ flex: 1, maxWidth: 140 }}>
            <polyline points={sparkPoints} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="126" cy="8" r="2.5" fill={accent} />
          </svg>
        </div>
      </div>

      {/* Quick Actions — horizontal list */}
      <div style={{ margin: "24px 0 0", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { icon: "send", label: "Send", am: "ላክ", action: "send" },
            { icon: "trending_up", label: "Invest", am: "ኢንቨስት", action: "invest" },
            { icon: "piggy", label: "Save", am: "ቆጥብ", action: "savings" },
            { icon: "qr", label: "Scan", am: "QR ቅዱ", action: "send" },
          ].map(item => (
            <button key={item.label} onClick={() => onNavigate(item.action)} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, padding: "16px 14px", background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, cursor: "pointer", textAlign: "left" }}>
              <Icon name={item.icon} size={18} color={C.text} strokeWidth={1.5} />
              <div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{showAmharic ? item.am : item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured product callout */}
      <div style={{ margin: "28px 24px 0", padding: "20px", background: C.text, color: C.bg, borderRadius: 10, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, opacity: 0.12 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="58" fill="none" stroke={accent} strokeWidth="1" />
            <circle cx="60" cy="60" r="40" fill="none" stroke={accent} strokeWidth="1" />
            <circle cx="60" cy="60" r="22" fill="none" stroke={accent} strokeWidth="1" />
            <circle cx="60" cy="60" r="6" fill={accent} />
          </svg>
        </div>
        <div style={{ fontSize: 10, color: accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>This Week</div>
        <div className="serif" style={{ fontSize: 24, color: C.bg, lineHeight: 1.1, marginBottom: 8, letterSpacing: "-0.02em", maxWidth: 220 }}>
          Lock in <em style={{ fontStyle: "italic", color: accent }}>7.8%</em> on 91-day T-Bills.
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: 16, maxWidth: 240 }}>Government-backed. Auto-rollover at maturity. From 500 ETB.</div>
        <button onClick={() => onNavigate("invest")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: accent, border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#fff", fontFamily: "inherit", letterSpacing: 0.3 }}>
          Invest now <Icon name="arrow_right" size={14} color="#fff" />
        </button>
      </div>

      {/* Investments */}
      <div style={{ margin: "32px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.cardBorderStrong}` }}>
          <div className="serif" style={{ fontSize: 22, color: C.text, letterSpacing: "-0.02em" }}>Portfolio</div>
          <button onClick={() => onNavigate("portfolio")} style={{ fontSize: 11, color: C.textMuted, background: "none", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>All →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { label: "Money Market Fund", am: "ሞኒ ማርኬት ፈንድ", value: "12,500.00", ret: "+8.2%", tag: "MMF" },
            { label: "Treasury Bills 91d", am: "91 ቀን ቲ-ቢሎች", value: "8,000.00", ret: "+7.8%", tag: "T-BILL" },
          ].map((inv, i) => (
            <div key={inv.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i === 0 ? `1px solid ${C.cardBorder}` : "none" }}>
              <div>
                <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1.5, fontWeight: 600, marginBottom: 4 }}>{inv.tag}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{inv.label}</div>
                {showAmharic && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{inv.am}</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="serif tabular" style={{ fontSize: 22, fontWeight: 400, color: C.text, letterSpacing: "-0.02em" }}>{inv.value}</div>
                <div style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>{inv.ret} YTD</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div style={{ margin: "32px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.cardBorderStrong}` }}>
          <div className="serif" style={{ fontSize: 22, color: C.text, letterSpacing: "-0.02em" }}>Activity</div>
          <button onClick={() => onNavigate("history")} style={{ fontSize: 11, color: C.textMuted, background: "none", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>All →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {txns.map((tx, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < txns.length - 1 ? `1px solid ${C.cardBorder}` : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${C.cardBorderStrong}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: tx.credit ? C.green : C.text, flexShrink: 0 }}>{tx.mark}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{tx.label}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{tx.time}</div>
              </div>
              <div className="tabular" style={{ fontSize: 14, fontWeight: 500, color: tx.credit ? C.green : C.text }}>{tx.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
