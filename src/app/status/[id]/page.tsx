import { ServiceList } from "@/components/ServiceHealth/ServiceStatusList";

export default function ServicesChildren({ params }: { params: { id: string } }) {
  return (
    <>
      <header className="flex items-center p-2">
        <label className="flex-1 block">
          {params.id}
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
      <ServiceList active={Number(params.id)} />
    </>
  );
}
