import { ServicesContextProvider } from "@/lib/context/services";
import { createClient } from "@/lib/supabase/server";
import { API } from "@/lib/utils";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export default async function ServicesLayout({
  children,
  details,
}: Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const results = await db.query(
    `
    SELECT * FROM status_owners
    JOIN services on service_id = services.id
    WHERE user_id = $1
    `,
    [user.id]
  );

  // const response = await fetch(`${API}/api/services`, { cache: "no-cache" });
  // const body = await response.json();
  return (
    <div className="sm:max-h-screen col-start-1 col-span-6 row-span-4 flex flex-col sm:flex-row gap-4 p-6 mx-6">
      <ServicesContextProvider init={results.rows}>
        <main className="flex flex-col flex-[2] rounded-md text-slate-900">{details}</main>
        <aside className="flex-1 flex flex-col rounded-md gap-4 px-2">{children}</aside>
      </ServicesContextProvider>
    </div>
  );
}
