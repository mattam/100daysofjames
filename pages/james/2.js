import Passage from "../../components/passage";

const chapterNum = 2;

export async function getStaticProps() {
  const res = await fetch(
    `https://labs.bible.org/api/?passage=James%20${chapterNum}&type=json&formatting=para`
  );
  const rawVerses = await res.text();

  return {
    props: {
      rawVerses,
    },
  };
}

export default function James2({ rawVerses }) {
  const verses = JSON.parse(rawVerses);
  return Passage(verses, chapterNum);
}
