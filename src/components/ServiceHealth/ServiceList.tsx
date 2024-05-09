import ServiceHealth from "./ServiceHealth";

//specifically type things at top level
export type ServiceStatus = {
  name: string;
  healthy: boolean;
};

type ServiceListProps = {
  list: ServiceStatus[];
};

const ServiceList = (props: Readonly<ServiceListProps>) => {
  return (
    <div className="flex flex-col px-6 gap-3 h-full items-center shadow-ib self-center min-w-80">
      {props.list.map((service, i) => (
        <ServiceHealth
          key={service.name + i}
          name={service.name}
          healthy={service.healthy}
        />
      ))}
    </div>
  );
};
export default ServiceList;
