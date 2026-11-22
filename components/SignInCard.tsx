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
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 backdrop-blur-[20px] backdrop-saturate-180 sm:gap-3.5 sm:p-5 dark:border-border-dark dark:bg-card-dark">
      <button type="button" className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-pink text-[15px] font-bold text-black disabled:cursor-default disabled:opacity-70" onClick={onSignIn} disabled={disabled}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
        Sign in with email
      </button>
      <div className="flex items-start gap-2 text-[13px] leading-[1.45] text-muted dark:text-muted-dark">
        <svg className="mt-px shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <span>Only team emails get in.</span>
      </div>
      {error && (
        <p role="alert" className="text-[13px] leading-[1.45] text-pink-text dark:text-pink">
          {error}
        </p>
      )}
    </div>
  );
}
