import { useContext } from "react";
import styles from "../styles/Home.module.css";
import { SettingsContext } from "../data/settingsContext";

export default function TopNav() {
  const [settings, setSettings] = useContext(SettingsContext);
  const homeLink =
    process.env.NODE_ENV === "development"
      ? "/"
      : "https://100daysofjames.vercel.app";  
  return (
    <div className={styles.topNav}>
      <a href={homeLink} className={styles.navCircle}>
        <h3>&uarr;</h3>
      </a>
      <div
        className={styles.navCircle}
        onClick={() => {
          setSettings((settings) => ({
            ...settings,
            showInfo: !settings.showInfo,
          }));
        }}
      >
        <h2>i</h2>
      </div>
      <div
        className={styles.navCircle}
        onClick={() => {
          setSettings((settings) => ({
            ...settings,
            showVerseNum: !settings.showVerseNum,
          }));
        }}
      >
        <h2>#</h2>
      </div>
      <div
        className={settings.showHighlights ? styles.navCircleHighlight : styles.navCircle}
        onClick={() => {
          setSettings((settings) => ({
            ...settings,
            showHighlights: !settings.showHighlights,
          }));
        }}
      >
        <h2>h</h2>
      </div>      
    </div>
  );
}
