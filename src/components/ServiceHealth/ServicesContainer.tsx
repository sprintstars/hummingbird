import ServiceList, { type ServiceStatus } from "./ServiceList";

type ServiceContainerProps = {
  list: ServiceStatus[];
};

const ServicesContainer = (props: Readonly<ServiceContainerProps>) => {
  return (
    <div className="flex-1 grid grid-cols-6 grid-rows-[60px_1fr_1fr_1fr_1fr_1fr] text-white gap-6">
      <div className="col-start-1 col-span-2">Filtering Area</div>
      <div className="col-start-1 col-span-2 row-span-5">
        <ServiceList list={props.list} />
      </div>
      {/* Details */}

      <div className="text-3xl col-start-3 col-span-2">Disruptions</div>
      <div className="text-3xl col-start-5">1</div>

      <div className="text-3xl col-start-3 col-span-2">Recently Resolved</div>
      <div className="text-3xl col-start-5">0</div>

      <div className="text-3xl col-start-3 col-span-2">Fully Operational</div>
      <div className="text-3xl col-start-5">3</div>
    </div>
  );
};

export default ServicesContainer;
