import styles from "@/components/login.module.css";

/** The login page's footer: Music Nerd's terms and privacy policy. */
export default function LoginFooter() {
  return (
    <footer className={styles.footer}>
      <a href="https://www.musicnerd.net/terms">Terms</a> ·{" "}
      <a href="https://www.musicnerd.net/privacy">Privacy</a>
    </footer>
  );
}
