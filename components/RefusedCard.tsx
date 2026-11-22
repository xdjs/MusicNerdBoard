import styles from "@/components/login.module.css";

/**
 * The card shown when the team check refuses an email: it says so, and offers another try.
 *
 * @param email - The refused email, or null when Privy didn't give one.
 * @param onTryAgain - Opens Privy's email login again.
 */
export default function RefusedCard({
  email,
  onTryAgain,
}: {
  email: string | null;
  onTryAgain: () => void;
}) {
  return (
    <div className={styles.card}>
      <div role="alert" className={styles.alert}>
        <svg className={styles.noteIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff75d8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5" />
          <path d="M12 16h.01" />
        </svg>
        <div>
          <div className={styles.alertTitle}>That email isn&apos;t on the team</div>
          <div className={styles.alertBody}>
            {email ?? "That email"} can&apos;t open the board. You&apos;ve been signed out. Ask a
            team admin to add it.
          </div>
        </div>
      </div>
      <button type="button" className={styles.primary} onClick={onTryAgain}>
        Try another email
      </button>
    </div>
  );
}
