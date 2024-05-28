import { ServicesContextProvider } from "@/lib/context/services";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAllServices } from "@/lib/db";

type StatusLayoutProps = Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>;

const ServicesError = () => <section>Couldn&apos;t load any services</section>;

export default async function StatusLayout({ children, details }: StatusLayoutProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  // 2 hours of history when each history item is 5 minutes apart
  const services = await getAllServices(user.id, 48);

  return (
    <main className="colbp:max-h-screen col-start-1 col-span-6 row-span-4 flex flex-col colbp:flex-row gap-4 lg:gap-8 p-6 mx-6">
      {services.tag === "Result.Ok" ? (
        <ServicesContextProvider init={services}>
          <section className="flex flex-col flex-[2] colbp:ml-4 rounded-md text-slate-900">
            {details}
          </section>
          <section className="flex-1 flex flex-col rounded-md gap-4 px-2">{children}</section>
        </ServicesContextProvider>
      ) : (
        <ServicesError />
      )}
    </main>
  );
}
