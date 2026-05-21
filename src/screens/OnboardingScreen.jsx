import { useState } from 'react'
import Icon from '../components/Icon.jsx'

export default function OnboardingScreen({ onDone, C, accent, showAmharic }) {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const slides = [
    {
      mark: "chart",
      eyebrow: "01 — Invest",
      titleA: "Your wallet, ",
      titleB: "finally",
      titleC: " earning.",
      subtitle: "Turn idle Telebirr balance into Money Market Funds and Treasury Bills. From 100 ETB upward.",
      am: "ኢንቨስት ያድርጉ ሲዘዋወሩ",
    },
    {
      mark: "growth",
      eyebrow: "02 — Grow",
      titleA: "Returns that ",
      titleB: "compound",
      titleC: ".",
      subtitle: "Up to 8.2% annual yield on regulated, government-backed instruments. Withdraw anytime.",
      am: "ቁጠባዎን ያሳድጉ",
    },
    {
      mark: "shield",
      eyebrow: "03 — Secured",
      titleA: "Built on the ",
      titleB: "Telebirr",
      titleC: " rails.",
      subtitle: "Operated under EthioTelecom infrastructure. Regulated by the National Bank of Ethiopia.",
      am: "ደህንነቱ የተጠበቀ እና አስተማማኝ",
    },
  ];

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onDone(); }, 1400);
  };

  if (step < 3) {
    const slide = slides[step];
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "0 28px 32px", position: "relative", overflow: "hidden" }}>
        {/* Brand mark top */}
        <div style={{ paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, border: `1.5px solid ${C.text}`, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, background: accent, borderRadius: 1 }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: 0.3 }}>PRIME<span style={{ color: accent }}>PAY</span></div>
          </div>
          {step < 2 && (
            <button onClick={() => setStep(3)} style={{ background: "none", border: "none", color: C.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Skip →</button>
          )}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 8 }}>
          {/* Geometric mark */}
          <div style={{ marginBottom: 28, width: 96, height: 96 }}>
            {slide.mark === "chart" && (
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                <rect x="1" y="1" width="94" height="94" rx="6" stroke={C.text} strokeWidth="1.2" />
                <rect x="18" y="54" width="10" height="24" fill={C.text} />
                <rect x="34" y="40" width="10" height="38" fill={C.text} />
                <rect x="50" y="28" width="10" height="50" fill={accent} />
                <rect x="66" y="18" width="10" height="60" fill={C.text} />
              </svg>
            )}
            {slide.mark === "growth" && (
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                <circle cx="48" cy="48" r="46" stroke={C.text} strokeWidth="1.2" />
                <path d="M20 64 L36 48 L48 56 L76 28" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="76" cy="28" r="4" fill={accent} />
                <path d="M66 28 H78 V40" stroke={accent} strokeWidth="1.5" fill="none" />
              </svg>
            )}
            {slide.mark === "shield" && (
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                <path d="M48 6 L84 18 V48 C84 68 68 84 48 90 C28 84 12 68 12 48 V18 Z" stroke={C.text} strokeWidth="1.2" fill="none" />
                <path d="M48 6 L84 18 V48 C84 56 80 64 74 70 L48 50 Z" fill={accent} opacity="0.18" />
                <path d="M32 48 L44 60 L66 36" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>{slide.eyebrow}</div>
          <div className="serif" style={{ fontSize: 42, color: C.text, lineHeight: 1.05, marginBottom: 16, letterSpacing: "-0.02em" }}>
            {slide.titleA}<em style={{ fontStyle: "italic", color: accent }}>{slide.titleB}</em>{slide.titleC}
          </div>
          {showAmharic && <div className="serif" style={{ fontSize: 18, color: C.textMuted, fontStyle: "italic", marginBottom: 14 }}>{slide.am}</div>}
          <div style={{ fontSize: 14.5, color: C.textMuted, lineHeight: 1.6, maxWidth: 320 }}>{slide.subtitle}</div>

          <div style={{ display: "flex", gap: 6, marginTop: 32, marginBottom: 24 }}>
            {slides.map((_, i) => (
              <div key={i} style={{ flex: i === step ? 1 : "0 0 24px", height: 2, background: i <= step ? accent : C.cardBorderStrong, transition: "flex .35s" }} />
            ))}
          </div>
        </div>

        <button onClick={() => setStep(s => s + 1)} style={{ width: "100%", padding: "18px", background: C.text, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: C.bg, fontFamily: "inherit", letterSpacing: 0.3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{step === 2 ? "Get Started" : "Continue"}</span>
          <Icon name="arrow_right" size={18} color={C.bg} />
        </button>
      </div>
    );
  }

  // Registration
  if (step === 3) {
    const incomplete = !name || phone.length < 8 || pin.length < 4;
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 28px 28px", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <div style={{ width: 22, height: 22, border: `1.5px solid ${C.text}`, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, background: accent, borderRadius: 1 }} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: 0.3 }}>PRIME<span style={{ color: accent }}>PAY</span></div>
        </div>

        <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>New Account</div>
        <div className="serif" style={{ fontSize: 36, color: C.text, lineHeight: 1.05, marginBottom: 6, letterSpacing: "-0.02em" }}>
          Open your <em style={{ fontStyle: "italic", color: accent }}>Prime</em> account.
        </div>
        {showAmharic && <div className="serif" style={{ fontSize: 15, color: C.textMuted, fontStyle: "italic", marginBottom: 24 }}>መለያ ይፍጠሩ</div>}
        {!showAmharic && <div style={{ marginBottom: 24 }} />}

        <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
          <div>
            <label style={{ fontSize: 10, color: C.textMuted, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Almaz Bekele" style={{ width: "100%", padding: "8px 0", background: "transparent", border: "none", borderBottom: `1px solid ${C.cardBorderStrong}`, color: C.text, fontSize: 16, fontFamily: "inherit", outline: "none" }} />
          </div>
          <div>
            <label style={{ fontSize: 10, color: C.textMuted, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Telebirr Phone</label>
            <div style={{ display: "flex", gap: 12, alignItems: "center", borderBottom: `1px solid ${C.cardBorderStrong}`, padding: "8px 0" }}>
              <div style={{ color: C.text, fontSize: 16, fontWeight: 500, whiteSpace: "nowrap" }}>+251</div>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="91 234 5678" style={{ flex: 1, padding: 0, background: "transparent", border: "none", color: C.text, fontSize: 16, fontFamily: "inherit", outline: "none" }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 10, color: C.textMuted, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Create 4-digit PIN</label>
            <div style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ flex: 1, height: 52, border: `1px solid ${pin.length > i ? C.text : C.cardBorderStrong}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: pin.length > i ? C.text : "transparent" }}>
                  {pin.length > i && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.bg }} />}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginTop: 14 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((k, i) => (
                <button key={i} onClick={() => {
                  if (k === "⌫") setPin(p => p.slice(0, -1));
                  else if (k !== "") setPin(p => (p + k).slice(0, 4));
                }} disabled={k === ""} style={{ padding: "14px", background: "transparent", border: "none", color: C.text, fontSize: 20, cursor: k === "" ? "default" : "pointer", fontFamily: "inherit", fontWeight: 400 }}>{k}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: C.textFaint, lineHeight: 1.5, margin: "16px 0 14px", display: "flex", gap: 8, alignItems: "flex-start" }}>
          <Icon name="lock" size={12} color={C.textFaint} />
          <div>Telebirr link is automatic. By continuing you agree to PrimePay's Terms and NBE-regulated privacy policy.</div>
        </div>
        <button onClick={handleSignup} disabled={incomplete || loading} style={{ width: "100%", padding: "18px", background: incomplete ? C.surface : C.text, border: "none", cursor: incomplete || loading ? "default" : "pointer", fontSize: 14, fontWeight: 500, color: incomplete ? C.textMuted : C.bg, fontFamily: "inherit", letterSpacing: 0.3 }}>
          {loading ? "Creating Account…" : "Open Account"}
        </button>
      </div>
    );
  }
  return null;
}
