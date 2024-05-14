import ServiceHealth from "./ServiceHealth";
import { type Service } from "@/lib/util";

type ServiceListProps = {
  list: Service[];
};

const ServiceList = (props: Readonly<ServiceListProps>) => {
  return (
    <div className="flex flex-col w-[25rem] gap-3 h-full mx-auto items-center overflow-y-auto">
      {props.list.map((service, i) => (
        <ServiceHealth
          key={service.name + i}
          name={service.name}
          timestamp={service.timestamp}
          healthy={service.healthy}
        />
      ))}
    </div>
  );
};
export default ServiceList;
