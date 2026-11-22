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
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 backdrop-blur-[20px] backdrop-saturate-180 sm:gap-3.5 sm:p-5 dark:border-border-dark dark:bg-card-dark">
      <div role="alert" className="flex items-start gap-3 rounded-xl border border-pink/35 bg-pink/10 px-3.5 py-3 text-[14px] leading-normal">
        <svg className="mt-px shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff75d8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5" />
          <path d="M12 16h.01" />
        </svg>
        <div>
          <div className="font-semibold">That email isn&apos;t on the team</div>
          <div className="text-muted wrap-anywhere dark:text-muted-dark">
            {email ?? "That email"} can&apos;t open the board. You&apos;ve been signed out. Ask a
            team admin to add it.
          </div>
        </div>
      </div>
      <button type="button" className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-pink text-[15px] font-bold text-black disabled:cursor-default disabled:opacity-70" onClick={onTryAgain}>
        Try another email
      </button>
    </div>
  );
}
