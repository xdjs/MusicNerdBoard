import "./globals.css";

export const metadata = { title: "Music Nerd Board" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-system leading-[normal]">{children}</body>
    </html>
  );
}
