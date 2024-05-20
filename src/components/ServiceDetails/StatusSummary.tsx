"use client";

import { useServicesContext } from "@/lib/context/services";

const StatusSummary = () => {
  const { services } = useServicesContext();
  const disruptions = services.reduce((sum, service) => (service.healthy ? sum : sum + 1), 0);
  const operational = services.reduce((sum, service) => (service.healthy ? sum + 1 : sum), 0);
  const isDisruptionsClicked = true;
  const isOperationalClicked = false;
  return (
    <>
      <div
        className={`grid grid-cols-[3fr_1fr] gap-[5vh] content-around
          md:grid-cols-2
        col-start-1 col-span-6 row-start-3 row-span-2
          md:col-start-4 md:col-span-3 md:row-start-3 md:row-span-3
        h-full mx-auto px-10
        text-right text-3xl text-foreground
        lg:text-[3vw]
        `}
      >
        <span
          className={`cursor-pointer  ${disruptions > 0 ? "text-service-down font-bold" : ""} ${
            isDisruptionsClicked ? "underline" : ""
          }`}
        >
          Disruptions
        </span>
        <span
          className={`flex items-center ${
            disruptions > 0 ? "text-service-down font-bold text-5xl" : ""
          }`}
        >
          {disruptions}
        </span>
        <span>Resolved</span>
        <span className="flex items-center">0</span>
        <span className={`cursor-pointer ${isOperationalClicked ? "underline" : ""}`}>
          Operational
        </span>
        <span className="flex items-center">{operational}</span>
      </div>
    </>
  );
};

export default StatusSummary;
