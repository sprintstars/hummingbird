export default function StatusDetails() {
  const disruptions = 1;
  const operational = 3;
  const isOperationalClicked = false;
  const isDisruptionsClicked = true;
  return (
    <aside className="border-4 border-transparent flex-[2] rounded-md p-4 text-slate-300">
      <div className="h-full font-museoModerno grid grid-cols-[3fr_1fr] text-right mx-auto md:grid-cols-2 col-start-1 col-span-6 md:col-start-4 md:col-span-3 gap-[5vh] row-start-3 row-span-2 md:row-start-3 md:row-span-3 px-10 content-around text-3xl text-slate-200">
        <span
          className={`cursor-pointer  ${disruptions > 0 ? "text-red-400 font-bold" : ""} ${
            isDisruptionsClicked ? "underline" : ""
          }`}
        >
          Disruptions
        </span>
        <span className={`flex items-center ${disruptions > 0 ? "text-red-400 font-bold" : ""}`}>
          {disruptions}
        </span>
        <span>Recently Resolved</span>
        <span className="flex items-center">0</span>
        <span className={`cursor-pointer ${isOperationalClicked ? "underline" : ""}`}>
          Fully Operational
        </span>
        <span className="flex items-center">{operational}</span>
      </div>
    </aside>
  );
}
