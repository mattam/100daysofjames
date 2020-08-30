import { useContext } from "react";
import styles from "../styles/Home.module.css";
import TopNav from "../components/topNav";
import BottomNav from "./bottomNav";
import { SettingsContext } from "../data/settingsContext";

function toggleHighlight(key, settings, setSettings) {
  let tempHighlights = settings.highlights;

  if (tempHighlights[key]) {
    delete tempHighlights[key]
  } else {
    tempHighlights[key] = { note: "temp"};
  }

  setSettings((settings) => ({
    ...settings,
    highlights: tempHighlights
  }))

}

function renderHighlight(verse) {
  const [settings, setSettings] = useContext(SettingsContext);
  const key = `${verse.bookname}-${verse.chapter}-${verse.verse}`;

  if (settings.showHighlights && settings.highlights[key]) {
    return <span onClick={() => toggleHighlight(key, settings, setSettings)} className={styles.highlight}>{verse.text}</span>;
  }

  return <span onClick={() => toggleHighlight(key, settings, setSettings)}>{verse.text}</span>;
}

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
      <span>{renderHighlight(verse)} </span>
      {/* H3 to create paragraph indent */}
      {hasPara && <h3></h3>}
    </span>
  );
}

function InfoPanel() {
  const [settings, setSettings] = useContext(SettingsContext);
  if (!settings.showInfo) {
    return null;
  }
  return (
    <div className={styles.card}>
      <h3>Historical background</h3>
      <p>
        The writer of this epistle was evidently the half-brother of our Lord
        Jesus Christ (Gal. 1:19) and the brother of Jude, the writer of the
        epistle that bears his name (cf. Matt. 13:55). This was the opinion of
        many of the early church fathers and writers.[1] This James was not the
        brother of the Apostle John, the son of Zebedee, who suffered martyrdom
        early in the history of the church (Mark 1:19; Acts 12:2). Neither was
        he the son of Alphaeus (Mark 3:18) or the father of Judas (Luke 6:16).
        He was the leading man in the Jerusalem church who spoke at the
        Jerusalem Council (Acts 15:13-21; cf. 12:17; 21:18; 1 Cor. 15:7).
      </p>
      <p>
        Some commentators believed that the similarities in the Greek of this
        epistle and James’ speech in Acts 15 support his identification as the
        writer.[2] The fact that the writer wrote this epistle in very good
        Greek should not rule this James out. He would have been fluent in both
        Aramaic and Greek as a gifted Galilean. The recipients of this letter
        were the Jewish Christians of the Diaspora, Jews who had scattered from
        Palestine and had come to faith in Christ (1:1). Several Jewish
        references in the book support the claim that a Jew wrote it to other
        Jews (e.g., 1:18; 2:2, 21; 3:6; 5:4, 7).
      </p>
    </div>
  );
}

export default function Passage(verses, chapterNum) {
  return (
    <div className={styles.container}>
      <TopNav />
      <div className={styles.passage}>
        <InfoPanel />
        <h1>James {chapterNum}</h1>
        {verses.map((verse) => renderVerse(verse))}
      </div>
      <BottomNav page={chapterNum} />
    </div>
  );
}
