import type { Metadata } from "next";
import { Geist, Geist_Mono, Be_Vietnam_Pro} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beVietnam= Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets:["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Ishita Babar",
  icons: {
    icon: "https://i.ibb.co/dJ1ys6Y9/logo.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${beVietnam.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
