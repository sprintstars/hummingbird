import { StatusList } from "@/components/ServiceStatus/StatusList";

export default function ServicesChildren() {
  return (
    <>
      <header className="flex items-center p-2">
        <label className="flex-1 block">
          Test
          <input type="checkbox" />
        </label>
        <label className="flex-1 block">
          Test
          <input type="checkbox" />
        </label>
        <label className="flex-1 block">
          Test
          <input type="checkbox" />
        </label>
        <label className="flex-1 block">
          Test
          <input type="checkbox" />
        </label>
      </header>
      <StatusList active={-1} />
    </>
  );
}
