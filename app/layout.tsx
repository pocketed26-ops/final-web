import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { Gamepad } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} no-scrollbar antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-[var(--background)] antialiased">
        <div className="site-root">{children}</div>
        
        {/* Floating Game Button */}
        <a
          href="/website_games.html"
          className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 bg-[#FFD21F] text-[#014AAC] rounded-full shadow-[0_8px_24px_rgba(1,74,172,0.25)] hover:scale-110 hover:-translate-y-1 transition-all duration-200 border-2 border-white"
          title="Play Financial Games"
        >
          <Gamepad size={28} strokeWidth={2.5} />
        </a>
      </body>
    </html>
  );
}
