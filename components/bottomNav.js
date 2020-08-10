import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function BottomNav(props) {
  const { page } = props;
  return (
    <div className={styles.bottomNav}>
      {page > 1 ? (
        <Link href={`/james/${page - 1}`}>
          <a className={styles.navButton}>
            <h3>Prev &larr;</h3>
          </a>
        </Link>
      ) : (
        <div className={styles.navButton}></div>
      )}
      <a href="https://100daysofjames.vercel.app" className={styles.navButton}>
        <h3>Home</h3>
      </a>
      {page < 5 ? (
        <Link href={`/james/${page + 1}`}>
          <a className={styles.navButton}>
            <h3>Next &rarr;</h3>
          </a>
        </Link>
      ) : (
        <div className={styles.navButton}></div>
      )}
    </div>
  );
}
