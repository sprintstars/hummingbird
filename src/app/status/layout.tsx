import { ServicesContextProvider } from "@/lib/context/services";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export default async function StatusLayout({
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
    return redirect("/");
  }

  const results = await db.query(
    `
SELECT
  s.id,
  s.name,
  (
    SELECT ARRAY (
      SELECT sh.time
      FROM
        status_history sh
      WHERE
        sh.service_id = s.id
      ORDER BY sh.time DESC
      LIMIT 24
    ) as time
  ) AS history_times,
  (
    SELECT ARRAY (
      SELECT sh.healthy
      FROM
        status_history sh
      WHERE
        sh.service_id = s.id
      ORDER BY sh.time DESC
      LIMIT 24
    ) as time
  ) AS history_health
FROM
  services s
  JOIN status_owners so ON s.id = so.service_id
WHERE
  so.user_id = $1
  `,
    [user.id]
  );

  return (
    <>
      <main className="md:max-h-screen col-start-1 col-span-6 row-span-4 flex flex-col md:flex-row gap-4 lg:gap-8 p-6 mx-6">
        <ServicesContextProvider init={results.rows}>
          <section className="flex flex-col flex-[2] md:ml-4 rounded-md text-slate-900">
            {details}
          </section>
          <section className="flex-1 flex flex-col rounded-md gap-4 px-2">{children}</section>
        </ServicesContextProvider>
      </main>
    </>
  );
}
