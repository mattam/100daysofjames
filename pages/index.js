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

const renderDevLink = () => {
  return (
    <Link href="/james/1">
      <a className={styles.dayLink}>
        <h3>Today &rarr;</h3>
        <p>Development Link for today</p>
      </a>
    </Link>
  );
};

const renderTopNav = () => {
  return (
    <div className={styles.topNav}>
      <a href="https://github.com/mattam/100daysofjames">
        <img src="/github-logo.png" alt="github repo" />
      </a>
    </div>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>#100DaysofJames</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderTopNav()}
      <main className={styles.main}>
        <h1 className={styles.title}>#100daysofJames</h1>

        <p className={styles.description}>
          Read through James and experiment with ways of learning it
        </p>

        {process.env.NODE_ENV === "development" && renderDevLink()}

        {days
          .slice(0)
          .reverse()
          .map((day) => renderDay(day))}
      </main>
    </div>
  );
}
