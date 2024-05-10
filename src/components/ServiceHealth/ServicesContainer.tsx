import ServiceList, { type ServiceStatus } from "./ServiceList";

type ServiceContainerProps = {
  list: ServiceStatus[];
};

const ServicesContainer = (props: Readonly<ServiceContainerProps>) => {
  return (
    <>
      <div className="col-start-1 col-span-2">Filtering Area</div>
      <div
        className={`col-start-1 col-span-3 row-span-3 overflow-y-auto ${
          props.list.length > 8 ? "shadow-ib" : ""
        }`}
      >
        <ServiceList list={props.list} />
      </div>
      {/* Details */}
      <div className="grid grid-cols-2 col-start-4 col-span-3 row-start-3 row-span-3 text-3xl text-slate-200">
        <div>Disruptions</div>
        <div>1</div>
        <div>Recently Resolved</div>
        <div>0</div>
        <div>Fully Operational</div>
        <div>3</div>
      </div>
    </>
  );
};

export default ServicesContainer;
