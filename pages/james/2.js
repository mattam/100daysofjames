import styles from '../../styles/Home.module.css'
import Link from "next/link";

export default function James1() {
  return (
    <div className={styles.container}>
      <h1>James 1</h1>

      <Link href="/">
          <a className={styles.card}>
            <h3>Home &larr;</h3>
          </a>
        </Link>
    </div>
    )
}