import Link from "next/link";

export const revalidate = 60;

export default function StatusDetails({ params }: { params: { id: number } }) {
  return (
    <>
      <aside className="border flex-[2] border-green-300 rounded-md p-4 text-slate-300">
        <h3>Details for {params.id}</h3>
        <Link href="/status">Back</Link>
      </aside>
    </>
  );
}
