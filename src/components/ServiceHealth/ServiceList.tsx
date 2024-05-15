import ServiceHealth from "./ServiceHealth";
import { type Service } from "@/lib/utils";

type ServiceListProps = {
  list: Service[];
  sortHealthyFirst?: boolean; // add sort order group
};

const ServiceList = ({ list, sortHealthyFirst }: ServiceListProps) => {
  const sortedList = [...list].sort((a, b) => {
    if (sortHealthyFirst) {
      if (a.healthy === b.healthy) {
        return 0;
      } else if (a.healthy && !b.healthy) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (a.healthy === b.healthy) {
        return 0;
      } else if (a.healthy && !b.healthy) {
        return 1;
      } else {
        return -1;
      }
    }
  });

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
