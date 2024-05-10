import ServiceList, { type ServiceStatus } from "./ServiceList";

type ServiceContainerProps = {
  list: ServiceStatus[];
};

const ServicesContainer = (props: Readonly<ServiceContainerProps>) => {
  const disruptions = props.list.reduce(
    (sum, service) => service.healthy ? sum : sum + 1,
    0,
  );

  return (
    <>
      <div className="col-start-2 col-span-4 md:col-start-1 md:col-span-3 md:mx-12 px-3 border border-slate-500 rounded-lg text-slate-200">
        Ordering & Filtering
      </div>
      <div className="col-start-1 col-span-6 md:col-span-3 row-start-5 row-span-1 md:row-start-3 md:row-span-4">
        <ServiceList list={props.list} />
      </div>
      {/* Details */}
      <div className="grid grid-cols-[3fr_1fr] text-right mx-auto md:grid-cols-2 col-start-1 col-span-6 md:col-start-4 md:col-span-3 gap-[5vh] row-start-3 row-span-2 md:row-start-3 md:row-span-3 px-10 content-around text-3xl text-slate-200">
        <span>Disruptions</span>
        <span className="flex items-center">
          {disruptions}
        </span>
        <span>Recently Resolved</span>
        <span className="flex items-center">0</span>
        <span>Fully Operational</span>
        <span className="flex items-center">
          {props.list.reduce(
            (sum, service) => service.healthy ? sum + 1 : sum,
            0,
          )}
        </span>
      </div>
    </>
  );
};

export default ServicesContainer;
