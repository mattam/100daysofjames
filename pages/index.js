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
          className={styles.card}
        >
          <h3>Day 1 &rarr;</h3>
        </a>
      </main>
    </div>
  );
}
