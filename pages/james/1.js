import styles from "../../styles/Home.module.css";
import BottomNav from "../../components/bottomNav";

export async function getStaticProps() {
  const res = await fetch(
    "https://labs.bible.org/api/?passage=James%201&type=json&formatting=para"
  );
  const verses = await res.text();

  return {
    props: {
      verses,
    },
  };
}

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
      <span>{verse.text}</span>
      {hasPara && <h3></h3>}
    </span>
  );
}

function renderPassage(rawVerses) {
  const verses = JSON.parse(rawVerses);

  return (
    <div className={styles.container}>
      <div className={styles.passage}>
        {verses.map((verse) => renderVerse(verse))}
      </div>
      <BottomNav page={1} />
    </div>
  );
}

export default function James1({ verses }) {
  return renderPassage(verses);
}
