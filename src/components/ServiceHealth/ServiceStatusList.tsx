"use client";

import { useCallback, type FunctionComponent } from "react";
import { type Service as ServiceType } from "@/lib/utils";
import { useServicesContext } from "@/lib/context/services";
import Service from "./ServiceStatus";

type ServiceListProps = Readonly<{
  active: number;
}>;

export const ServiceList: FunctionComponent<ServiceListProps> = ({ active = -1 }) => {
  const { services } = useServicesContext();
  const sortHealthyFirst = false;

  const sorter = useCallback(
    (a: ServiceType, b: ServiceType) => {
      if (a.healthy === b.healthy) {
        return 0;
      }
      if (sortHealthyFirst) {
        if (a.healthy && !b.healthy) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (a.healthy && !b.healthy) {
          return 1;
        } else {
          return -1;
        }
      }
    },
    [sortHealthyFirst]
  );

  const sClone = [...services].sort(sorter);
  const activeIndex = sClone.findIndex((service) => service.id === active);
  const activeService = sClone[activeIndex];

  const sorted = sClone.filter((service) => service.id !== active);
  // Splice the pinned service in so that it keeps it position
  if (activeIndex !== -1) {
    sorted.splice(activeIndex, 0, activeService);
  }

  return (
    <div className="sm:overflow-y-auto sm:text-xl rounded-md flex items-center flex-col gap-4 px-2 text-slate-700 h-full">
      {sorted.map((service) => (
        <>
          <Service
            id={service.id}
            key={`${service.name}-${service.healthy}`}
            name={service.name}
            healthy={service.healthy}
            pinned={service.id === active}
            count={sorted.length}
          />
        </>
      ))}
    </div>
  );
};
