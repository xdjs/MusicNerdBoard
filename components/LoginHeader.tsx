/** The login page's header: the Music Nerd wordmark with a "board" chip, and a link to musicnerd.net. */
export default function LoginHeader() {
  return (
    <header className="flex items-center justify-between sm:px-12 sm:py-7">
      <div className="flex items-center gap-2 sm:gap-2.5">
        <img src="/images/musicNerdLogo.png" alt="" className="size-7 rounded-full sm:size-8" />
        <span className="text-[16px] font-bold tracking-[-0.03em] sm:text-[18px]">music nerd</span>
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-muted sm:px-2.5 sm:py-[3px] sm:text-[12px] dark:border-border-dark dark:text-muted-dark">board</span>
      </div>
      <a href="https://www.musicnerd.net" className="flex min-h-11 items-center text-[13px] text-muted sm:block sm:min-h-0 sm:text-[14px] dark:text-muted-dark">
        musicnerd.net
      </a>
    </header>
  );
}
