import styles from "@/components/login.module.css";

/** The login page's header: the Music Nerd wordmark with a "board" chip, and a link to musicnerd.net. */
export default function LoginHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img src="/musicNerdLogo.png" alt="" className={styles.brandLogo} />
        <span className={styles.wordmark}>music nerd</span>
        <span className={styles.chip}>board</span>
      </div>
      <a href="https://www.musicnerd.net" className={styles.siteLink}>
        musicnerd.net
      </a>
    </header>
  );
}
