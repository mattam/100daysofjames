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

        <p className={styles.description}>Read through James and experiment with ways of learning it</p>

        <Link href="/james/1">
          <a className={styles.card}>
            <h3>James 1 &rarr;</h3>
          </a>
        </Link>

        <Link href="/james/2">
          <a className={styles.card}>
            <h3>James 2 &rarr;</h3>
          </a>
        </Link>

        <Link href="/james/3">
          <a className={styles.card}>
            <h3>James 3 &rarr;</h3>
          </a>
        </Link>

        <Link href="/james/4">
          <a className={styles.card}>
            <h3>James 4 &rarr;</h3>
          </a>
        </Link>

        <Link href="/james/5">
          <a className={styles.card}>
            <h3>James 5 &rarr;</h3>
          </a>
        </Link>
      </main>
    </div>
  );
}
