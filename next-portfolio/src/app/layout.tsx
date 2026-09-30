import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const SITE_URL = "https://millatsakib.com";
const FULL_NAME = "Md. Sohan Millat Sakib";
const SHORT_NAME = "Millat Sakib";
const TITLE = `${FULL_NAME} | Full Stack Web Developer`;
const DESCRIPTION =
  "Portfolio of Md. Sohan Millat Sakib — MERN Stack Web Developer & Software Engineer at Green University of Bangladesh. Skilled in React, Node.js, Express, and MongoDB.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "md sohan millat sakib",
    "sohan millat sakib",
    "millat sakib",
    "millatsakib",
    "millat sakib portfolio",
    "millat sakib developer",
    "millat sakib bangladesh",
    "mern stack developer bangladesh",
    "full stack web developer",
    "software engineer bangladesh",
    "green university of bangladesh cse",
    "narayanganj developer",
    "react developer bangladesh",
    "node.js developer",
    "mongodb developer",
    "javascript developer bangladesh",
    "portfolio",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  category: "Technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: `${SHORT_NAME} | Portfolio`,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        secureUrl: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — Full Stack Web Developer Portfolio`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@millatsakib",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google493b1073fee4b8de",
  },
  icons: {
    icon: [
      { url: "/logo2.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/logo2.png",
    shortcut: "/logo2.png",
  },
  manifest: "/manifest.json",
  appLinks: {},
  other: {
    "application-name": SHORT_NAME,
    "geo.region": "BD",
    "geo.placename": "Narayanganj, Bangladesh",
    "geo.position": "23.6238;90.4992",
    "ICBM": "23.6238, 90.4992",
    "rating": "general",
    "language": "English",
    "revisit-after": "7 days",
    "coverage": "Worldwide",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
  },
};

export const viewport = {
  themeColor: "#f7b955",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sora.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for faster load — helps Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* OG Secure Image URL for HTTPS sharing */}
        <meta property="og:image:secure_url" content="https://millatsakib.com/og-image.png" />

        {/* Geo / Location SEO — helps rank for Bangladesh location searches */}
        <meta name="geo.region" content="BD-B" />
        <meta name="geo.placename" content="Narayanganj, Dhaka, Bangladesh" />
        <meta name="geo.position" content="23.6238;90.4992" />
        <meta name="ICBM" content="23.6238, 90.4992" />

        {/* Mobile / Device meta */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="application-name" content="Millat Sakib" />

        {/* Crawl hints */}
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="Worldwide" />
        <meta name="language" content="English" />
      </head>
      <body className="min-h-full font-sans antialiased" suppressHydrationWarning>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={4500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
