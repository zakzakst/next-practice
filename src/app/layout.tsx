import type { Metadata } from "next";
import { fontNotoSansJp } from "@/app/_styles/fonts";
import "@/app/_styles/globals.scss";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${fontNotoSansJp.variable}`}>{children}</body>
    </html>
  );
}
