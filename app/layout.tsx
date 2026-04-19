import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LoaderGuard from "../components/LoaderGuard";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PocketEd",
  description: "PocketEd Interactive Learning Platform",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192" },
      { url: "/icon-512.png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} no-scrollbar antialiased`}
    >
      <head>
        {/* Blocking script: runs synchronously before first paint.
            If the user has already seen the loader during this window session,
            stamp the <html> element immediately so CSS hides the loader
            before the browser ever paints it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(window.__POCKETED_HAS_VISITED){document.documentElement.classList.add("has-visited")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full overflow-x-hidden overflow-y-hidden bg-[var(--background)] antialiased">
        <LoaderGuard />
        <div className="site-root">{children}</div>
      </body>
    </html>
  );
}
