import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { MuseoModerno, Palanquin } from "next/font/google";

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-museo-moderno",
});
const palanquin = Palanquin({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-palanquin",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hummingbird",
  description: "Services status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${palanquin.variable} ${museoModerno.variable} grid grid-cols-6 grid-rows-[3.5rem_2rem_1fr_1fr_1fr_15vh] gap-x-10 gap-y-4 h-screen bg-footer bg-app-background font-palanquin`}
      >
        <header className="col-span-6 text-slate-50">
          <div>Person</div>
        </header>
        {children}
        <div className="relative col-start-6 row-start-6">
          <Image src="./logo.svg" alt="Hummingbird logo" fill={true} />
        </div>
      </body>
    </html>
  );
}
