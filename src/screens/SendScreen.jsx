import { useState } from 'react'
import Icon from '../components/Icon.jsx'

export default function SendScreen({ onNavigate, C, accent, showAmharic }) {
  const [sendStep, setSendStep] = useState(0); // 0=method, 1=details, 2=confirm, 3=done
  const [method, setMethod] = useState(null);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const contacts = [
    { name: "Yonas Tesfaye", phone: "+251 91 234 5678", avatar: "YT" },
    { name: "Meron Alemu", phone: "+251 92 876 5432", avatar: "MA" },
    { name: "Dawit Girma", phone: "+251 93 111 2233", avatar: "DG" },
    { name: "Sara Haile", phone: "+251 91 999 0011", avatar: "SH" },
  ];

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSendStep(3); }, 1500);
  };

  if (sendStep === 3) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, alignItems: "center", justifyContent: "center", padding: "40px 28px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: `${C.green}22`, border: `2px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Icon name="check" size={36} color={C.green} strokeWidth={2.5} />
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, textAlign: "center", marginBottom: 8 }}>Money Sent!</div>
        <div style={{ fontSize: 14, color: C.textMuted, textAlign: "center", marginBottom: 6 }}>ETB {amount} sent to {recipient || "Yonas Tesfaye"}</div>
        <div style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic", textAlign: "center", marginBottom: 32 }}>ገንዘብ ተላከ</div>
        <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: "16px 20px", width: "100%", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ color: C.textMuted, fontSize: 13 }}>Transaction ID</span>
            <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>TXN-2026-8471</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: C.textMuted, fontSize: 13 }}>Via Telebirr</span>
            <span style={{ color: C.green, fontSize: 13, fontWeight: 600 }}>Completed ✓</span>
          </div>
        </div>
        <button onClick={() => onNavigate("home")} style={{ width: "100%", padding: "16px", background: accent, borderRadius: 16, border: "none", cursor: "pointer", fontSize: 16, fontWeight: 600, color: C.accentText, fontFamily: "inherit" }}>
          Back to Home
        </button>
      </div>
    );
  }

  if (sendStep === 0) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 24px 80px", overflowY: "auto" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>Send Money</div>
        <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 28, fontStyle: "italic" }}>ገንዘብ ላክ</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Choose Method</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { id: "phone", icon: "phone", title: "Phone Number", subtitle: "Send to any Telebirr user", am: "ስልክ ቁጥር" },
            { id: "contact", icon: "contact", title: "Contacts", subtitle: "Pick from your phone book", am: "እውቂያዎች" },
            { id: "qr", icon: "qr", title: "Scan QR Code", subtitle: "Point camera at QR to pay instantly", am: "QR ኮድ ቅዱ" },
          ].map(m => (
            <button key={m.id} onClick={() => { setMethod(m.id); setSendStep(1); }} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={m.icon} size={20} color={accent} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{m.title}</div>
                {showAmharic && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{m.am}</div>}
                <div style={{ fontSize: 12, color: C.textMuted }}>{m.subtitle}</div>
              </div>
              <Icon name="chevron_right" size={18} color={C.textFaint} />
            </button>
          ))}
        </div>

        {/* Recent contacts */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Recent Contacts</div>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 4 }}>
            {contacts.map(c => (
              <button key={c.name} onClick={() => { setRecipient(c.name); setSendStep(1); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${accent}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: accent }}>{c.avatar}</div>
                <div style={{ fontSize: 11, color: C.text, fontWeight: 500 }}>{c.name.split(" ")[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (sendStep === 1) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 24px 40px", overflowY: "auto" }}>
        <button onClick={() => setSendStep(0)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.textMuted, marginBottom: 20, padding: 0 }}>
          <Icon name="arrow_left" size={18} color={C.textMuted} />
          <span style={{ fontSize: 13 }}>Back</span>
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 28 }}>Transfer Details</div>

        {method === "qr" ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ width: 200, height: 200, background: C.card, border: `2px solid ${C.cardBorder}`, borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name="qr" size={80} color={C.textMuted} />
              <div style={{ fontSize: 11, color: C.textMuted }}>Camera viewfinder</div>
            </div>
            <div style={{ fontSize: 14, color: C.textMuted, textAlign: "center" }}>Point your camera at a Telebirr QR code</div>
            <button onClick={() => { setMethod("phone"); }} style={{ fontSize: 13, color: accent, background: "none", border: "none", cursor: "pointer" }}>Enter manually instead</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
            {method === "contact" && (
              <div>
                <label style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Select Contact</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {contacts.map(c => (
                    <button key={c.name} onClick={() => setRecipient(c.name)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: recipient === c.name ? `${accent}18` : C.inputBg, border: `1px solid ${recipient === c.name ? accent : C.cardBorder}`, borderRadius: 12, cursor: "pointer" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${accent}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: accent }}>{c.avatar}</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: C.textMuted }}>{c.phone}</div>
                      </div>
                      {recipient === c.name && <span style={{ marginLeft: "auto" }}><Icon name="check" size={16} color={accent} /></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {method === "phone" && (
              <div>
                <label style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Recipient Phone / ተቀባይ ስልክ</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ padding: "14px 12px", background: C.inputBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, color: C.text, fontSize: 14, fontWeight: 600 }}>🇪🇹 +251</div>
                  <input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="91 234 5678" style={{ flex: 1, padding: "14px 16px", background: C.inputBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, color: C.text, fontSize: 15, fontFamily: "inherit", outline: "none" }} />
                </div>
              </div>
            )}
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Amount (ETB) / መጠን</label>
              <input value={amount} onChange={e => setAmount(e.target.value.replace(/\D/, ""))} placeholder="0" style={{ width: "100%", padding: "14px 16px", background: C.inputBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, color: C.text, fontSize: 28, fontWeight: 700, fontFamily: "inherit", outline: "none", textAlign: "center" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {["100", "500", "1,000", "5,000"].map(q => (
                  <button key={q} onClick={() => setAmount(q.replace(",", ""))} style={{ flex: 1, padding: "8px", background: C.inputBg, border: `1px solid ${C.cardBorder}`, borderRadius: 8, color: C.textMuted, fontSize: 12, cursor: "pointer" }}>{q}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Note (Optional)</label>
              <input value={note} onChange={e => setNote(e.target.value)} placeholder="What's it for?" style={{ width: "100%", padding: "14px 16px", background: C.inputBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, color: C.text, fontSize: 15, fontFamily: "inherit", outline: "none" }} />
            </div>
          </div>
        )}

        {method !== "qr" && (
          <button onClick={() => setSendStep(2)} disabled={!amount || !recipient} style={{ width: "100%", padding: "16px", background: (!amount || !recipient) ? C.textFaint : accent, borderRadius: 16, border: "none", cursor: (!amount || !recipient) ? "default" : "pointer", fontSize: 16, fontWeight: 600, color: C.accentText, fontFamily: "inherit", marginTop: 20 }}>
            Review Transfer
          </button>
        )}
      </div>
    );
  }

  if (sendStep === 2) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 24px 40px", overflowY: "auto" }}>
        <button onClick={() => setSendStep(1)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.textMuted, marginBottom: 20, padding: 0 }}>
          <Icon name="arrow_left" size={18} color={C.textMuted} />
          <span style={{ fontSize: 13 }}>Back</span>
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>Confirm Transfer</div>
        <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", marginBottom: 28 }}>ዝውውሩን ያረጋግጡ</div>
        <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 20, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "20px 20px 0", textAlign: "center" }}>
            <div style={{ fontSize: 42, fontWeight: 700, color: C.text }}>ETB {amount}</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>to {recipient}</div>
          </div>
          <div style={{ margin: "20px 20px", height: 1, background: C.cardBorder }} />
          {[
            ["From", "Almaz Bekele (Telebirr)"],
            ["To", recipient],
            ["Fee", "Free via Telebirr"],
            ["Note", note || "—"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 20px" }}>
              <span style={{ color: C.textMuted, fontSize: 13 }}>{k}</span>
              <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 20 }} />
        </div>
        <div style={{ background: `${accent}10`, border: `1px solid ${accent}25`, borderRadius: 14, padding: "14px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Icon name="lock" size={16} color={accent} />
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>Secured by your Telebirr PIN. Transactions are encrypted end-to-end and processed via EthioTelecom network.</div>
        </div>
        <button onClick={handleSend} disabled={loading} style={{ width: "100%", padding: "16px", background: accent, borderRadius: 16, border: "none", cursor: loading ? "default" : "pointer", fontSize: 16, fontWeight: 600, color: C.accentText, fontFamily: "inherit" }}>
          {loading ? "Processing…" : "Confirm & Send · አረጋግጥ"}
        </button>
      </div>
    );
  }
  return null;
}
