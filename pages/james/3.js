import renderPassage from "../../components/passage";

const chapterNum = 3;

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

export default function James3({ rawVerses }) {
  const verses = JSON.parse(rawVerses);
  return renderPassage(verses, chapterNum);
}
