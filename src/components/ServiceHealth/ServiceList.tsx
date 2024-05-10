import ServiceHealth from "./ServiceHealth";

//specifically type things at top level
export type ServiceStatus = {
  name: string;
  timestamp: number;
  healthy: boolean;
};

type ServiceListProps = {
  list: ServiceStatus[];
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
