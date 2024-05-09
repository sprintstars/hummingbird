import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

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
        className={`${inter.className} grid grid-cols-6 grid-rows-[3.5rem_2rem_1fr_1fr_1fr_15vh] gap-x-10 gap-y-4 h-screen bg-footer bg-app-background`}
      >
        <header className="col-span-6 text-slate-50">
          <div>Person</div>
        </header>
        {children}
        <div className="relative col-start-6 row-start-6">
          <Image
            src="./logo.svg"
            alt="Hummingbird logo"
            fill={true}
          />
        </div>
      </body>
    </html>
  );
}
