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
    <div className="flex text-center">Add your first service!</div>
    <Link
      className="relative mx-auto max-w-96 p-1 border-4 border-transparent w-[95%] rounded-md text-center bg-service-up"
      href="/status/create"
    >
      <div
        className={`
flex items-center flex-col gap-4
h-full rounded-md px-2
text-slate-700
colbp:text-xl`}
      >
        <button
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          title="Add New"
        >
          <svg
            className="stroke-teal-500 fill-none group-active:stroke-teal-200 group-active:duration-0 duration-300"
            viewBox="0 0 24 24"
            height="50px"
            width="50px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeWidth="1.5"
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            ></path>
            <path strokeWidth="1.5" d="M8 12H16"></path>
            <path strokeWidth="1.5" d="M12 16V8"></path>
          </svg>
        </button>
      </div>
    </Link>
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
