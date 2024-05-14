import ServiceHealth from "./ServiceHealth";
import { type Service } from "@/lib/utils";

type ServiceListProps = {
  list: Service[];
};

const ServiceList = (props: Readonly<ServiceListProps>) => {
  const sortedList = [...props.list].sort((a, b) => {
    if (a.healthy === b.healthy) {
      // If they do, they are considered equal in terms of sorting
      return 0;
    } else {
      // If 'a' is healthy and 'b' is not, 'a' should come after 'b'
      if (a.healthy) {
        return 1;
      }
      // If 'b' is healthy and 'a' is not, 'a' should come before 'b'
      else {
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
