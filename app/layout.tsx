export const metadata = { title: "Music Nerd Board" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "-apple-system, system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
