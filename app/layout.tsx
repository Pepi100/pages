import type { Metadata } from "next";
import { Geist,} from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Korean Numbers Practice - Sino & Native Number Trainer",
  description:
    "Master Korean numbers effortlessly with this interactive tool. Practice both Sino-Korean and Native Korean numbers with instant feedback and adjustable ranges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={geistSans.className}
      >
        {children}
      </body>
    </html>
  );
}
