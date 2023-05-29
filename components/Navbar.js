import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">
          <a>| Home</a>
        </Link>
      </li>
      <li>
        <Link href="/strikesDetails">
          <a>| Detalhes</a>
        </Link>
      </li>
    </ul>
  );
}
