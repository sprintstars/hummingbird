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
        className={`${inter.className} ${palanquin.variable} ${museoModerno.variable} grid grid-cols-6 grid-rows-[3.5rem_2rem_10rem_10rem_1fr_20vh] md:grid-rows-[3.5rem_2rem_1fr_1fr_1fr_10vh_10vh] gap-x-2 gap-y-3 h-auto md:h-screen bg-footer bg-app-background font-palanquin`}
      >
        <header className="col-start-6 px-4 py-2 text-slate-50">
          <div className="h-10 w-10 float-right rounded-full border border-slate-600 bg-slate-700">
          </div>
        </header>
        {children}
        <div className="relative col-start-5 col-span-2 md:col-start-6 md:col-span-1 row-start-6 row-span-2">
          <Image
            src="./logo.svg"
            alt="Hummingbird logo"
            priority={false}
            fill={true}
          />
        </div>
      </body>
    </html>
  );
}
