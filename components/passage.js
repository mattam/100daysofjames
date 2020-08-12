import styles from "../styles/Home.module.css";
import BottomNav from "./bottomNav";

function renderVerse(verse) {
  let hasPara = false;
  if (verse.text.includes(`<p class="bodytext">`)) {
    verse.text = verse.text.replace('<p class="bodytext">', "");
  }
  if (verse.text.includes(`</p>`)) {
    verse.text = verse.text.replace("</p>", "");
    hasPara = true;
  }

  return (
    <span key={verse.verse}>
      {verse.title && <h3>{verse.title}</h3>}
      <span>{verse.text} </span>
      {hasPara && <h3></h3>}
    </span>
  );
}

export default function renderPassage(verses, chapterNum) {
  return (
    <div className={styles.container}>
      <div className={styles.passage}>
        <h1>James {chapterNum}</h1>
        {verses.map((verse) => renderVerse(verse))}
      </div>
      <BottomNav page={chapterNum} />
    </div>
  );
}
