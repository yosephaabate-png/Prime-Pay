export default function HistoryScreen({ C, showAmharic }) {
  const txns = [
    { icon: "📲", label: "Telebirr Top-up", am: "ቴሌብር ቅድሚያ ክፍያ", amount: "+500", type: "credit", date: "May 1, 2026" },
    { icon: "📈", label: "MMF Investment", am: "ሞኒ ማርኬት ፈንድ", amount: "-2,000", type: "debit", date: "Apr 30, 2026" },
    { icon: "💸", label: "Sent to Yonas T.", am: "ለዮናስ ተ. ተላከ", amount: "-350", type: "debit", date: "Apr 29, 2026" },
    { icon: "🏦", label: "T-Bill Maturity", am: "ቲ-ቢል ብስለት", amount: "+1,240", type: "credit", date: "Apr 28, 2026" },
    { icon: "💰", label: "MMF Dividend", am: "ሞኒ ማርኬት ፈንድ ትርፍ", amount: "+85", type: "credit", date: "Apr 25, 2026" },
    { icon: "📲", label: "Received from Meron", am: "ከሜሮን ተቀበለ", amount: "+750", type: "credit", date: "Apr 22, 2026" },
    { icon: "📈", label: "T-Bill Purchase", am: "ቲ-ቢል ግዢ", amount: "-3,000", type: "debit", date: "Apr 15, 2026" },
    { icon: "💸", label: "Utility Bill", am: "የኮሙዩኒቲ ሂሳብ", amount: "-120", type: "debit", date: "Apr 10, 2026" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, padding: "24px 24px 80px", overflowY: "auto" }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>History</div>
      <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", marginBottom: 24 }}>ታሪክ</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {txns.map((tx, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: `1px solid ${C.cardBorder}` }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{tx.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{tx.label}</div>
              {showAmharic && <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>{tx.am}</div>}
              <div style={{ fontSize: 11, color: C.textFaint }}>{tx.date}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: tx.type === "credit" ? C.green : C.red }}>{tx.amount} ETB</div>
          </div>
        ))}
      </div>
    </div>
  );
}
