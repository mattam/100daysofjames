import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>#100daysofJames</h1>

        <p className={styles.description}>
          Read through James and experiment with ways of learning it
        </p>

        <a
          href="https://100daysofjames-git-matt-day1.mattam.vercel.app/james/1"
          className={styles.dayLink}
        >
          <h3>Day 1 &rarr;</h3>
          <p>
            Setting up initial experiment to display the 5 chapters of James
          </p>
        </a>
        <a
          href="https://100daysofjames-git-matt-day2.mattam.vercel.app/james/1"
          className={styles.dayLink}
        >
          <h3>Day 2 &rarr;</h3>
          <p>
            Adjusting the navigation to make it easier to browse the passage.
          </p>
        </a>
      </main>
    </div>
  );
}
