import Link from "next/link";
import StatusDetails from "@/components/ServiceHealth/ServiceStatusDetails";
import { API } from "@/lib/utils";

const wait = (ms: number) =>
  new Promise((res, _) => {
    setTimeout(res, ms);
  });

export default async function StatusDetailsView({ params }: { params: { id: string } }) {
  await wait(1000);
  const response = await fetch(`${API}/services/${params.id}`, { cache: "no-cache" });
  const body = await response.json();
  return (
    <>
      <Link href="/status" className="text-right px-4 text-slate-200">
        Back
      </Link>
      <StatusDetails
        id={Number(params.id)}
        name={body.payload.name}
        history={body.payload.history}
      />
    </>
  );
}

// import StatusDetails from "@/components/ServiceHealth/ServiceStatusDetails";
// import Link from "next/link";

// const wait = (ms: number) =>
//   new Promise((res, _) => {
//     setTimeout(res, ms);
//   });

// export default async function StatusDetailsView({ params }: { params: { id: string } }) {
//   await wait(3000);
//   return (
//     <>
//       <main className="flex-[2] rounded-md text-slate-900">
//         <StatusDetails id={Number(params.id)} />
//       </main>
//     </>
//   );
// }
