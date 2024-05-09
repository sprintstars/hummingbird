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
    <div className="flex flex-col p-6 gap-3 shadow-ib w-fit max-h-[80vh] overflow-y-auto items-center ">
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
