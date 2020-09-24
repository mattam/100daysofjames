import { useCallback, useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { SettingsContext } from "../data/settingsContext";
import useKeyboardShortcut from "../lib/useKeyboardShortcut";
import Launcher from "./launcher";

export default function TopNav() {
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [settings, setSettings] = useContext(SettingsContext);
  const homeLink =
    process.env.NODE_ENV === "development"
      ? "/"
      : "https://100daysofjames.vercel.app";

  const keys = ["Shift", "P"];
  const escapeKey = ["Esc"];

  const handleKeyboardShortcut = useCallback(
    (keys) => {
      setShowMenu((currentShowMenu) => !currentShowMenu);
      console.log(showMenu);
    },
    [setShowMenu]
  );

  const handleEscapeShortcut = useCallback(
    (escapeKey) => {
      Keyboard.dismiss();
      setShowMenu((currentShowMenu) => !currentShowMenu);
    },
    [setShowMenu]
  );

  useKeyboardShortcut(keys, handleKeyboardShortcut);
  useKeyboardShortcut(escapeKey, handleEscapeShortcut);

  return (
    <div className={styles.topNav}>
      <div
        className={styles.navCircle}
        onClick={() => {
          setShowSettings((showSettings) => !showSettings);
        }}
      >
        <h2>&hellip;</h2>
      </div>
      {showMenu && <Launcher />}
      {showSettings && (
        <div className={styles.settingsBox}>
          <ul>
            <li
              className={settings.showHighlights ? styles.selectedSetting : ""}
              onClick={() => {
                setSettings((settings) => ({
                  ...settings,
                  showHighlights: !settings.showHighlights,
                }));
              }}
            >
              highlight
            </li>
            <li
              className={settings.showVerseNum ? styles.selectedSetting : ""}
              onClick={() => {
                setSettings((settings) => ({
                  ...settings,
                  showVerseNum: !settings.showVerseNum,
                }));
              }}
            >
              verse numbers
            </li>
            <li
              className={settings.showInfo ? styles.selectedSetting : ""}
              onClick={() => {
                setSettings((settings) => ({
                  ...settings,
                  showInfo: !settings.showInfo,
                }));
              }}
            >
              info
            </li>
            <a href={homeLink}>
              <li>exit</li>
            </a>
          </ul>
        </div>
      )}
    </div>
  );
}
