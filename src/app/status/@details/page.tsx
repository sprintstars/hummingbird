"use client";

export default function StatusDetails() {
  return (
    <aside
      onTransitionStart={(e) => {
        console.log(e);
      }}
      className="border flex-[2] border-green-300 rounded-md p-4 text-slate-300"
    >
      <h3>Details Summary</h3>
    </aside>
  );
}
