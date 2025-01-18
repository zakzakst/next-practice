import { Noto_Sans_JP } from "next/font/google";

export const fontNotoSansJp = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-Noto-Sans-JP",
  display: "swap",
  fallback: ["sans-serif"],
});
