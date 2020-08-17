import { useContext } from "react";
import styles from "../styles/Home.module.css";
import { SettingsContext } from "../data/settingsContext";

export default function TopNav() {
  const [settings, setSettings] = useContext(SettingsContext);
  return (
    <div className={styles.topNav}>
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
    </div>
  );
}
