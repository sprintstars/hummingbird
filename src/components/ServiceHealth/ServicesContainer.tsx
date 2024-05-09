import ServiceList, { type ServiceStatus } from "./ServiceList";

type ServiceContainerProps = {
  list: ServiceStatus[];
};

const ServicesContainer = (props: Readonly<ServiceContainerProps>) => {
  return (
    <div className="grid grid-cols-6 grid-rows-[60px 240px] text-white">
      <div className="col-start-1 col-end-2 ...">Filtering Area</div>
      <div className="col-start-1 col-end-2 ...">
        Service List area
        <ServiceList list={props.list} />
      </div>
      <div className="col-start-3 col-span-2 ">
        <div className="grid grid-cols-2 grid-rows-3 gap-6">
          <div className="text-3xl">Disruptions</div>
          <div className="text-3xl">1</div>

          <div className="text-3xl">Recently Resolved</div>
          <div className="text-3xl">0</div>

          <div className="text-3xl">Fully Operational</div>
          <div className="text-3xl">3</div>
        </div>
      </div>
    </div>
  );
};

export default ServicesContainer;
