import ServiceHealth from "./ServiceHealth";
import { type Service } from "@/lib/utils";

type ServiceListProps = {
  list: Service[];
};

const ServiceList = (props: Readonly<ServiceListProps>) => {
  const sortedList = [...props.list].sort((a, b) =>
    a.healthy === b.healthy ? 0 : a.healthy ? 1 : -1
  );
  //what is going on

  return (
    <div className="flex flex-col w-[25rem] gap-3 h-full mx-auto items-center overflow-y-auto">
      {sortedList.map((service, i) => (
        <ServiceHealth
          key={service.name + i}
          name={service.name}
          timestamp={service.time}
          healthy={service.healthy}
        />
      ))}
    </div>
  );
};
export default ServiceList;
