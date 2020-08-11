import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function BottomNav(props) {
  const { page } = props;
  const hiddenStyle = styles.navCircle + " " + styles.navButtonHidden;
  const leftStyle = page > 1 ? styles.navCircle : hiddenStyle;
  const rightStyle = page < 5 ? styles.navCircle : hiddenStyle;

  return (
    <div className={styles.bottomNavContainer}>
      <div className={styles.bottomNavSpacer}></div>
      <div className={styles.bottomNav}>
        <Link href={`/james/${page - 1}`}>
          <a className={leftStyle}>
            <h3>&larr;</h3>
          </a>
        </Link>
        <a
          href="https://100daysofjames.vercel.app"
          className={styles.navCircle}
        >
          <h3>&uarr;</h3>
        </a>
        <Link href={`/james/${page + 1}`}>
          <a className={rightStyle}>
            <h3>&rarr;</h3>
          </a>
        </Link>
      </div>
    </div>
  );
}
