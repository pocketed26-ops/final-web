import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      <body className="min-h-full overflow-x-hidden overflow-y-hidden bg-[var(--background)] antialiased">
        <div className="site-root">{children}</div>
      </body>
    </html>
  );
}
