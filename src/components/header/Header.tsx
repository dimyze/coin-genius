import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Coin Genius</h1>
      <p className={styles.tagline}>Know your coin, stay ahead in the game</p>
    </header>
  );
}

export default Header;
