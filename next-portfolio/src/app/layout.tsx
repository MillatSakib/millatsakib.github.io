import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://millatsakib.github.io"),
  title: "Md. Sohan Millat Sakib | Portfolio",
  description:
    "Portfolio of Md. Sohan Millat Sakib, full stack web developer and software engineer.",
  keywords: [
    "md sohan millat sakib",
    "portfolio",
    "mern stack",
    "full stack web developer",
    "software engineer",
    "green university of bangladesh",
  ],
  authors: [{ name: "Md. Sohan Millat Sakib" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Md. Sohan Millat Sakib | Portfolio",
    description:
      "Portfolio of Md. Sohan Millat Sakib, full stack web developer and software engineer.",
    url: "https://millatsakib.github.io",
    siteName: "Portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "google493b1073fee4b8de",
  },
  icons: {
    icon: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sora.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
