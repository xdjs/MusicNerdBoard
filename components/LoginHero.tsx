/** The disc, "The team's board." and what the board is for. */
export default function LoginHero() {
  return (
    <>
      <img src="/musicNerdLogo.png" alt="Music Nerd" className="mx-auto block size-14 rounded-full sm:size-16" />
      <h1 id="login-title" className="text-center text-[34px] leading-[1.05] font-bold tracking-[-0.045em] text-headline sm:text-[40px] dark:text-headline-dark">
        The team&apos;s <span className="text-pink-text dark:text-pink">board.</span>
      </h1>
      <p className="text-center text-[15px] leading-normal text-muted sm:text-[16px] dark:text-muted-dark">
        Where the Music Nerd team and our agents share PRs, reviews and releases.
      </p>
    </>
  );
}
