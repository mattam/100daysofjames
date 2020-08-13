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

  // [TODO] I don't want to deal with the bold tags right now
  if (verse.text.includes(`<b>`)) {
    verse.text = verse.text.replace(/\<b\>/g, "");
  }
  if (verse.text.includes(`</b>`)) {
    verse.text = verse.text.replace(/\<\/b\>/g, "");
  }

  return (
    <span key={verse.verse}>
      {verse.title && <h3>{verse.title}</h3>}
      {/* extra space after verse.text for spaces between verses */}
      <span>{verse.text} </span>
      {/* H3 to create paragraph indent */}
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
