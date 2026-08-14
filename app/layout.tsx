import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Sora } from "next/font/google";
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

const sora = Sora({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const deployedUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://forautopus.netlify.app";
const metadataBase = new URL(
  deployedUrl.startsWith("http") ? deployedUrl : `https://${deployedUrl}`,
);
const title = "Autopus — The AI operating system for running fleets at scale";
const description =
  "Automate fleet operations, maximize utilization, and unlock real performance insights with Autopus.";

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  icons: {
    icon: "/autopus/autopus-symbol-road.png",
    shortcut: "/autopus/autopus-symbol-road.png",
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
        <body className={`${dmSans.variable} ${instrumentSerif.variable} ${sora.variable}`}>
        {children}
      </body>
    </html>
  );
}
