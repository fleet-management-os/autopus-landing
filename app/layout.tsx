import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const deployedUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://forautopus.netlify.app";
const metadataBase = new URL(
  deployedUrl.startsWith("http") ? deployedUrl : `https://${deployedUrl}`,
);
const title = "Autopus — The operating system for modern fleets";
const description =
  "Automate fleet operations, maximize utilization, and unlock real performance insights with Autopus.";

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  icons: {
    icon: "/autopus/autopus-symbol.png",
    shortcut: "/autopus/autopus-symbol.png",
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1733, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${instrumentSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
