import type { Metadata } from "next";
import {
  Barlow_Condensed,
  DM_Sans,
  Cormorant_Garamond,
  Roboto_Mono,
} from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DownForce Cinematixs — Automotive & Motorsports Media",
  description:
    "Precision automotive photography and motorsports film production. Built for speed. Delivered in 48 hours.",
  keywords: [
    "automotive photography",
    "motorsports film",
    "car photography",
    "race coverage",
    "automotive video production",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${dmSans.variable} ${cormorant.variable} ${robotoMono.variable}`}
    >
      <body className="bg-void text-studio antialiased">{children}</body>
    </html>
  );
}
