import { useState, useEffect, useRef } from 'react'
import { TWEAK_DEFAULTS, getColors } from './theme.js'
import BottomNav from './components/BottomNav.jsx'
import OnboardingScreen from './screens/OnboardingScreen.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import InvestScreen from './screens/InvestScreen.jsx'
import SendScreen from './screens/SendScreen.jsx'
import PortfolioScreen from './screens/PortfolioScreen.jsx'
import HistoryScreen from './screens/HistoryScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import SavingsScreen from './screens/SavingsScreen.jsx'
import NotificationsScreen from './screens/NotificationsScreen.jsx'
import SettingsScreen from './screens/SettingsScreen.jsx'

const DEVICE_W = 402;
const DEVICE_H = 874;
const MAIN_SCREENS = ["home", "invest", "send", "portfolio", "history", "profile"];
const TWEAKS_KEY = "primepay.tweaks";

function loadTweaks() {
  try {
    const saved = localStorage.getItem(TWEAKS_KEY);
    return saved ? { ...TWEAK_DEFAULTS, ...JSON.parse(saved) } : TWEAK_DEFAULTS;
  } catch {
    return TWEAK_DEFAULTS;
  }
}

export default function App() {
  const [tweaks, setTweaks] = useState(loadTweaks);
  const [screen, setScreen] = useState("onboard");

  const C = getColors(tweaks.theme, tweaks.accentColor);
  const accent = tweaks.accentColor;
  const showAmharic = tweaks.showAmharic;
  const navigate = (s) => setScreen(s);
  const updateTweaks = (patch) => setTweaks(t => ({ ...t, ...patch }));

  useEffect(() => {
    try {
      localStorage.setItem(TWEAKS_KEY, JSON.stringify(tweaks));
    } catch {
      // localStorage unavailable — settings stay in-memory only
    }
  }, [tweaks]);

  const renderScreen = () => {
    switch (screen) {
      case "onboard":
        return <OnboardingScreen onDone={() => setScreen("home")} C={C} accent={accent} showAmharic={showAmharic} />;
      case "home":
        return <HomeScreen onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} />;
      case "invest":
        return <InvestScreen onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} />;
      case "send":
        return <SendScreen onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} />;
      case "portfolio":
        return <PortfolioScreen C={C} accent={accent} showAmharic={showAmharic} />;
      case "history":
        return <HistoryScreen C={C} accent={accent} showAmharic={showAmharic} />;
      case "profile":
        return <ProfileScreen C={C} accent={accent} showAmharic={showAmharic} onNavigate={navigate} />;
      case "savings":
        return <SavingsScreen C={C} accent={accent} showAmharic={showAmharic} onBack={() => navigate("home")} />;
      case "notifications":
        return <NotificationsScreen C={C} onBack={() => navigate("home")} />;
      case "settings":
        return <SettingsScreen C={C} tweaks={tweaks} onChange={updateTweaks} onBack={() => navigate("profile")} />;
      default:
        return <HomeScreen onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} />;
    }
  };

  const showNav = MAIN_SCREENS.includes(screen);

  // Scale the device frame to fit the viewport.
  const scaleRef = useRef(null);
  useEffect(() => {
    function rescale() {
      const scale = Math.min(
        (window.innerWidth - 40) / DEVICE_W,
        (window.innerHeight - 40) / DEVICE_H,
        1
      );
      if (scaleRef.current) scaleRef.current.style.transform = `scale(${scale})`;
    }
    rescale();
    window.addEventListener("resize", rescale);
    return () => window.removeEventListener("resize", rescale);
  }, []);

  return (
    <div ref={scaleRef} className="device-scaler">
      <div style={{
        width: DEVICE_W,
        height: DEVICE_H,
        borderRadius: 40,
        overflow: "hidden",
        background: C.bg,
        boxShadow: "0 40px 90px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.25)",
      }}>
        <div className="mobile-screen" style={{ background: C.bg }}>
          {renderScreen()}
          {showNav && <BottomNav screen={screen} onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} />}
        </div>
      </div>
    </div>
  );
}
