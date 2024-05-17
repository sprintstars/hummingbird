import "./globals.css";
import type { Metadata } from "next";
import { Inter, MuseoModerno, Palanquin } from "next/font/google";
import { redirect } from "next/navigation";
import Image from "next/image";

import { ServicesContextProvider } from "@/lib/context/services";
import { createClient } from "@/lib/supabase/server";
import db from "@/lib/db";
import { AuthButton } from "@/components/Auth";

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
  details: React.ReactNode;
}>;

export default async function RootLayout({ children, details }: RootLayoutProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const results = await db.query(
    `
    SELECT DISTINCT on (name)
    services.id, name, healthy, time
    FROM status_owners
    JOIN services on service_id = services.id
    JOIN status_history on services.id = status_history.service_id
    WHERE user_id = $1
    ORDER BY name, time DESC
    `,
    [user.id]
  );
  // ${inter.className}
  // ${palanquin.className}

  return (
    <html lang="en">
      <body
        className={`
        ${museoModerno.className}
        grid grid-cols-6 grid-rows-[3.5rem_2rem_10rem_10rem_1fr_20vh] gap-x-2 gap-y-3
          md:grid-rows-[3.5rem_2rem_1fr_1fr_1fr_10vh_10vh]
        min-h-screen
          md:max-h-screen
        bg-layout
        `}
      >
        <header className="col-start-1 col-span-6 px-4 py-2 text-slate-50">
          <AuthButton />
        </header>
        <main className="sm:max-h-screen col-start-1 col-span-6 row-span-4 flex flex-col sm:flex-row gap-4 p-6 mx-6">
          <ServicesContextProvider init={results.rows}>
            <section className="flex flex-col flex-[2] rounded-md text-slate-900">
              {details}
            </section>
            <section className="flex-1 flex flex-col rounded-md gap-4 px-2">{children}</section>
          </ServicesContextProvider>
        </main>
        <div className="relative col-start-5 col-span-2 md:col-start-6 md:col-span-1 row-start-6 row-span-2">
          <Image src="/logo.svg" alt="Hummingbird logo" priority={true} fill={true} />
        </div>
      </body>
    </html>
  );
}
