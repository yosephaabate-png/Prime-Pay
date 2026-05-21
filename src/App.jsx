import { useState, useEffect } from 'react'
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

const MAIN_SCREENS = ["home", "invest", "send", "portfolio", "history", "profile"];
const TWEAKS_KEY = "primepay.tweaks";
const SESSION_KEY = "primepay.session";

function loadTweaks() {
  try {
    const saved = localStorage.getItem(TWEAKS_KEY);
    return saved ? { ...TWEAK_DEFAULTS, ...JSON.parse(saved) } : TWEAK_DEFAULTS;
  } catch {
    return TWEAK_DEFAULTS;
  }
}

function loadSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [tweaks, setTweaks] = useState(loadTweaks);
  const [screen, setScreen] = useState(() => (loadSession() ? "home" : "onboard"));
  const [user, setUser] = useState(() => loadSession() || { name: "Almaz Bekele", phone: "912345678" });

  const C = getColors(tweaks.theme, tweaks.accentColor);
  const accent = tweaks.accentColor;
  const showAmharic = tweaks.showAmharic;
  const navigate = (s) => setScreen(s);
  const updateTweaks = (patch) => setTweaks(t => ({ ...t, ...patch }));

  const signIn = (profile) => {
    setUser(profile);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    } catch {
      // localStorage unavailable — session stays in-memory only
    }
    setScreen("home");
  };

  const signOut = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // localStorage unavailable — nothing to clear
    }
    setScreen("onboard");
  };

  useEffect(() => {
    try {
      localStorage.setItem(TWEAKS_KEY, JSON.stringify(tweaks));
    } catch {
      // localStorage unavailable — settings stay in-memory only
    }
  }, [tweaks]);

  // Keep the page background in sync so overscroll never reveals a stray color.
  useEffect(() => {
    document.body.style.background = C.bg;
  }, [C.bg]);

  const renderScreen = () => {
    switch (screen) {
      case "onboard":
        return <OnboardingScreen onDone={signIn} C={C} accent={accent} showAmharic={showAmharic} />;
      case "home":
        return <HomeScreen onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} user={user} />;
      case "invest":
        return <InvestScreen onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} />;
      case "send":
        return <SendScreen onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} user={user} />;
      case "portfolio":
        return <PortfolioScreen C={C} accent={accent} showAmharic={showAmharic} />;
      case "history":
        return <HistoryScreen C={C} accent={accent} showAmharic={showAmharic} />;
      case "profile":
        return <ProfileScreen C={C} accent={accent} showAmharic={showAmharic} onNavigate={navigate} onSignOut={signOut} user={user} />;
      case "savings":
        return <SavingsScreen C={C} accent={accent} showAmharic={showAmharic} onBack={() => navigate("home")} />;
      case "notifications":
        return <NotificationsScreen C={C} onBack={() => navigate("home")} />;
      case "settings":
        return <SettingsScreen C={C} tweaks={tweaks} onChange={updateTweaks} onBack={() => navigate("profile")} />;
      default:
        return <HomeScreen onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} user={user} />;
    }
  };

  const showNav = MAIN_SCREENS.includes(screen);

  return (
    <div className="mobile-screen" style={{ background: C.bg }}>
      {renderScreen()}
      {showNav && <BottomNav screen={screen} onNavigate={navigate} C={C} accent={accent} showAmharic={showAmharic} />}
    </div>
  );
}
