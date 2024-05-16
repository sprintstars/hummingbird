import Link from "next/link";

const wait = (ms: number) =>
  new Promise((res, _) => {
    setTimeout(res, ms);
  });

export default async function StatusDetails({ params }: { params: { id: number } }) {
  await wait(3000);
  return (
    <>
      <aside className="border-4 border-transparent bg-slate-300 flex-[2] rounded-md p-4 text-slate-900">
        <h3>Details for {params.id}</h3>
        <Link href="/status">Back</Link>
      </aside>
    </>
  );
}
