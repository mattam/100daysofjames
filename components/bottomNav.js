import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function BottomNav(props) {
  const { page } = props;
  return (
    <div className={styles.bottomNav}>
      {page > 1 ? (
        <Link href={`/james/${page - 1}`}>
          <a className={styles.card}>
            <h3>Prev &larr;</h3>
          </a>
        </Link>
      ) : null}
      <a href="https://100daysofjames.vercel.app/" className={styles.card}>
        <h3>Home</h3>
      </a>
      {page < 5 ? (
        <Link href={`/james/${page + 1}`}>
          <a className={styles.card}>
            <h3>Next &rarr;</h3>
          </a>
        </Link>
      ) : null}
    </div>
  );
}
