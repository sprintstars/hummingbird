"use client";

import { useCallback, type FunctionComponent } from "react";
import { type Service } from "@/lib/utils";
import { useServicesContext } from "@/lib/context/services";
import Status from "./Status";

const StatusList: FunctionComponent = () => {
  const { services } = useServicesContext();
  const sortHealthyFirst = false;

  const sorter = useCallback(
    (a: Service, b: Service) => {
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

  const sorted = [...services].sort(sorter);

  return (
    <div className="sm:overflow-y-auto sm:text-xl rounded-md flex items-center flex-col gap-4 px-2 text-slate-700 h-full">
      {sorted.map((service) => (
        <Status
          id={service.id}
          key={`${service.name}-${service.healthy}`}
          name={service.name}
          healthy={service.healthy}
          count={sorted.length}
        />
      ))}
    </div>
  );
};

export default StatusList;
