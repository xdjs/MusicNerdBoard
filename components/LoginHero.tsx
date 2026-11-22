import styles from "@/components/login.module.css";

/** The disc, "The team's board." and what the board is for. */
export default function LoginHero() {
  return (
    <>
      <img src="/musicNerdLogo.png" alt="Music Nerd" className={styles.disc} />
      <h1 id="login-title" className={styles.title}>
        The team&apos;s <span className={styles.titleAccent}>board.</span>
      </h1>
      <p className={styles.description}>
        Where the Music Nerd team and our agents share PRs, reviews and releases.
      </p>
    </>
  );
}
