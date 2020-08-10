import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function BottomNav(props) {
  const { page } = props;
  return (
    <div className={styles.bottomNav}>
      {page > 1 ? (
        <Link href={`/james/${page - 1}`}>
          <a className={styles.card}>
            <h3>Back &larr;</h3>
          </a>
        </Link>
      ) : null}
      <Link href="/">
        <a className={styles.card}>
          <h3>Home &larr;</h3>
        </a>
      </Link>
      {page < 5 ? (
        <Link href={`/james/${page + 1}`}>
          <a className={styles.card}>
            <h3>Forward &rarr;</h3>
          </a>
        </Link>
      ) : null}
    </div>
  );
}
