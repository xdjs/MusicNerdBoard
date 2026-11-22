import styles from "@/components/login.module.css";

/**
 * The sign-in card: the email sign-in button and who gets in.
 *
 * @param onSignIn - Opens Privy's email login.
 * @param disabled - True until Privy is ready, and while a sign-in is being checked.
 * @param error - Why the last sign-in failed, when it wasn't a refusal.
 */
export default function SignInCard({
  onSignIn,
  disabled,
  error,
}: {
  onSignIn: () => void;
  disabled: boolean;
  error: string | null;
}) {
  return (
    <div className={styles.card}>
      <button type="button" className={styles.primary} onClick={onSignIn} disabled={disabled}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
        Sign in with email
      </button>
      <div className={styles.note}>
        <svg className={styles.noteIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <span>Only team emails get in.</span>
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
