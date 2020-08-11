import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import days from "../data/days.json";

const renderDay = (day) => {
  return (
    <a
      key={day.dayNum}
      href={`https://100daysofjames-git-matt-day${day.dayNum}.mattam.vercel.app/james/1`}
      className={styles.dayLink}
    >
      <h3>Day {day.dayNum} &rarr;</h3>
      <p>{day.description}</p>
    </a>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>#100DaysofJames</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>#100daysofJames</h1>

        <p className={styles.description}>
          Read through James and experiment with ways of learning it
        </p>

        {days
          .slice(0)
          .reverse()
          .map((day) => renderDay(day))}

        <ul>
          <li>
            <Link href="/james/1">
              <a>Developer Link to the first chapter</a>
            </Link>
          </li>
          <li>
            <a href="https://github.com/mattam/100daysofjames">Github Repo</a>
          </li>
        </ul>
      </main>
    </div>
  );
}
