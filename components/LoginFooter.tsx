/** The login page's footer: Music Nerd's terms and privacy policy. */
export default function LoginFooter() {
  return (
    <footer className="text-center text-[12px] text-muted sm:px-12 sm:pt-6 sm:pb-7 dark:text-muted-dark">
      <a href="https://www.musicnerd.net/terms" className="underline">Terms</a> ·{" "}
      <a href="https://www.musicnerd.net/privacy" className="underline">Privacy</a>
    </footer>
  );
}
