import { useContext } from "react";
import styles from "../styles/Home.module.css";
import TopNav from "../components/topNav";
import BottomNav from "./bottomNav";
import { SettingsContext } from "../data/settingsContext";

function toggleHighlight(key, settings, setSettings) {
  let tempHighlights = settings.highlights;

  if (tempHighlights[key]) {
    delete tempHighlights[key];
  } else {
    tempHighlights[key] = { note: "temp" };
  }

  setSettings((settings) => ({
    ...settings,
    highlights: tempHighlights,
  }));
}

function renderHighlight(verse) {
  const [settings, setSettings] = useContext(SettingsContext);
  const key = `${verse.bookname}-${verse.chapter}-${verse.verse}`;

  if (settings.showHighlights && settings.highlights[key]) {
    return (
      <span>
        <span
          onClick={() => toggleHighlight(key, settings, setSettings)}
          className={styles.highlight}
        >
          {verse.text}
        </span>
        <span className={styles.note}>{settings.highlights[key].note}</span>
      </span>
    );
  }
  if (settings.showHighlights) {
    return (
      <span onClick={() => toggleHighlight(key, settings, setSettings)}>
        {verse.text}
      </span>
    );
  }

  return <span>{verse.text}</span>;
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

function renderBookInfo(bookInfo) {
  return (
    <>
      <h3>{bookInfo.title}</h3>
      <p>{bookInfo.notes[0]}</p>
      <p>{bookInfo.notes[1]}</p>
    </>
  );
}

function NotesPanel() {
  // Display all the notes that are available in stacked order
  // Scroll that note to the top when the corresponding verse is scrolled to the top
  // [todo] is there a better way of matching scrolling?
  const [settings, setSettings] = useContext(SettingsContext);
  return Object.entries(settings.highlights).map(([key, value]) => {
    switch (key) {
      case "bookInfo":
        return (
          <div className={styles.card} key={key}>
            {renderBookInfo(value)}
          </div>
        );
      default:
        return (
          <div className={styles.card} key={key}>
            {value.note}
          </div>
        );
    }
  });
}

export default function Passage(verses, chapterNum) {
  const [settings, setSettings] = useContext(SettingsContext);
  return (
    <div className={styles.container}>
      <TopNav />
      <div className={styles.wrapper}>
        <div className={styles.passage}>
          <h1>James {chapterNum}</h1>
          {verses.map((verse) => renderVerse(verse))}
        </div>
        <div className={styles.info}>
          {settings.showInfo ? <NotesPanel /> : null}
        </div>
      </div>
      <BottomNav page={chapterNum} />
    </div>
  );
}
