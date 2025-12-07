import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.cabecalho}>
      <div className={styles.cabecalho__container}>
        <div className={styles.cabecalho__logo}>
          <a href='#'>
            <strong>Eco</strong>Track
          </a>
        </div>
      </div>
    </header>
  );
}
