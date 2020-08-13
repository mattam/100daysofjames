import { useContext } from "react";
import styles from "../styles/Home.module.css";
import TopNav from "../components/topNav";
import BottomNav from "./bottomNav";
import { SettingsContext } from "../data/settingsContext";

function renderVerse(verse) {
  const [settings, setSettings] = useContext(SettingsContext);
  let hasPara = false;
  if (verse.text.includes(`<p class="bodytext">`)) {
    verse.text = verse.text.replace('<p class="bodytext">', "");
  }
  if (verse.text.includes(`</p>`)) {
    verse.text = verse.text.replace("</p>", "");
    hasPara = true;
  }

  // [TODO] I don't want to deal with the bold tags right now
  if (verse.text.includes(`<b>`)) {
    verse.text = verse.text.replace(/\<b\>/g, "");
  }
  if (verse.text.includes(`</b>`)) {
    verse.text = verse.text.replace(/\<\/b\>/g, "");
  }

  return (
    <span key={verse.chapter + verse.verse}>
      {verse.title && <h3>{verse.title}</h3>}
      {settings.showVerseNum && (
        <sup className={styles.superscript}>{verse.verse}</sup>
      )}
      {/* extra space after verse.text for spaces between verses */}
      <span>{verse.text} </span>
      {/* H3 to create paragraph indent */}
      {hasPara && <h3></h3>}
    </span>
  );
}

export default function Passage(verses, chapterNum) {
  return (
    <div className={styles.container}>
      <TopNav />
      <div className={styles.passage}>
        <h1>James {chapterNum}</h1>
        {verses.map((verse) => renderVerse(verse))}
      </div>
      <BottomNav page={chapterNum} />
    </div>
  );
}
