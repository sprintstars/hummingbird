import { ServicesContextProvider } from "@/lib/context/services";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAllServices } from "@/lib/db";
import Link from "next/link";

type StatusLayoutProps = Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>;

const EmptyServices = () => (
  <>
    <div className="flex items-center justify-center mx-auto max-w-96 h-full text-center">
      <Link
        href="/status/create"
        className=" w-[95%] p-8 rounded-md bg-service-up text-service-up-fg"
      >
        Add your first service!
      </Link>
    </div>
  </>
);

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
      <ServicesContextProvider init={services.tag === "Result.Ok" ? services : []}>
        <section className="flex flex-col flex-[2] colbp:ml-4 rounded-md text-slate-900">
          {details}
        </section>
        <section className="flex-1 flex flex-col rounded-md gap-4 px-2">
          {services.tag === "Result.Ok" ? children : <EmptyServices />}
        </section>
      </ServicesContextProvider>
    </main>
  );
}
