import "./globals.css";
import type { Metadata } from "next";
import { Inter, MuseoModerno, Palanquin } from "next/font/google";
import { AuthButton } from "@/components/Auth";
import Image from "next/image";
import { revalidatePath } from "next/cache";

// Hostname
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Fonts
const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["400", "700"],
});
// const palanquin = Palanquin({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Hummingbird",
  description: "Services status",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  revalidatePath("/");
  return (
    <html lang="en">
      <body
        className={`
        ${museoModerno.className}
        `}
      >
        {/* border-x-2 border-teal-600 shadow-xl shadow-teal-600 */}
        <div
          className={`
          grid grid-cols-6 grid-rows-[3.5rem_2rem_10rem_10rem_1fr_20vh] gap-x-2 gap-y-3
            colbp:grid-rows-[3.5rem_2rem_1fr_1fr_1fr_10vh_10vh]
          min-h-screen max-w-[100rem] mx-auto
            colbp:max-h-screen
          bg-layout
        `}
        >
          <header className="flex col-start-1 col-span-6 px-4 py-2 text-slate-50">
            <AuthButton className="flex-1" />
          </header>
          {children}
          <div
            className={`
            relative
            col-start-4 col-span-3 row-start-6 row-span-2
          `}
          >
            <Image
              src="/logo.svg"
              alt="Hummingbird logo"
              priority={true}
              fill={true}
              className="object-contain object-right"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
