// Design tokens for PrimePay — editorial light theme, Ethiopian emerald accent.
export const TWEAK_DEFAULTS = {
  theme: "light",
  accentColor: "#1f7a52",
  showAmharic: true,
};

export function getColors(theme, accent) {
  const isDark = theme === "dark";
  return {
    bg: isDark ? "#0a0d0b" : "#f3efe6",
    card: isDark ? "#131714" : "#ffffff",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,20,16,0.08)",
    cardBorderStrong: isDark ? "rgba(255,255,255,0.16)" : "rgba(15,20,16,0.18)",
    surface: isDark ? "#1a1f1c" : "#ebe6da",
    text: isDark ? "#ece8de" : "#0f1410",
    textMuted: isDark ? "#8a8c84" : "#6b6960",
    textFaint: isDark ? "#4a4e48" : "#b8b3a8",
    accent: accent,
    accentText: "#ffffff",
    green: isDark ? "#5eb88a" : "#1f7a52",
    red: isDark ? "#e07a6e" : "#b54a3e",
    gold: isDark ? "#d4b46b" : "#a8893d",
    screenBg: isDark ? "#0a0d0b" : "#f3efe6",
    navBg: isDark ? "#0d100e" : "#ffffff",
    navBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,20,16,0.10)",
    inputBg: isDark ? "#171c19" : "#ebe6da",
    shimmer1: isDark ? "#131714" : "#e8e4de",
    shimmer2: isDark ? "#1a1f1c" : "#f0ede8",
  };
}
