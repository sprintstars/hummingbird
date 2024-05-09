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
        className={`${inter.className} flex flex-col h-screen bg-footer bg-app-background`}
      >
        <header className="text-slate-50">
          <div>Person</div>
        </header>
        {children}
        <Image
          className="absolute bottom-0 right-0"
          src="./logo.svg"
          alt="Hummingbird logo"
          width={128}
          height={128}
        />
      </body>
    </html>
  );
}
