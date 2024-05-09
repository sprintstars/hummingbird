import ServiceList, { type ServiceStatus } from "./ServiceList";

type ServiceContainerProps = {
  list: ServiceStatus[];
};

const ServicesContainer = (props: Readonly<ServiceContainerProps>) => {
  return (
    <>
      <div className="col-start-1 col-span-2">Filtering Area</div>
      <div className="col-start-1 col-span-3 row-span-3 shadow-ib overflow-y-auto">
        <ServiceList list={props.list} />
      </div>
      {/* Details */}
      <div className="text-3xl col-start-4 col-span-2 text-slate-200">
        Disruptions
      </div>
      <div className="text-3xl col-start-6 text-slate-200">1</div>

      <div className="text-3xl col-start-4 col-span-2 text-slate-200">
        Recently Resolved
      </div>
      <div className="text-3xl col-start-6 text-slate-200">0</div>

      <div className="text-3xl col-start-4 col-span-2 text-slate-200">
        Fully Operational
      </div>
      <div className="text-3xl col-start-6 text-slate-200">3</div>
    </>
  );
};

export default ServicesContainer;
