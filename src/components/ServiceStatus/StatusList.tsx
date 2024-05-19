"use client";

import { useCallback } from "react";
import { useServicesContext } from "@/lib/context/services";
import Status from "./Status";

// types
import type { FunctionComponent } from "react";
import type { Service } from "@/lib/utils";

export type Order = "up" | "down" | "unordered";
export type Filter = "up" | "down" | "unfiltered";

type StatusListProps = {
  order: Order;
  filter: Filter;
};

const StatusList: FunctionComponent<StatusListProps> = ({ order, filter }) => {
  const { services } = useServicesContext();

  const sorter = useCallback(
    (a: Service, b: Service) => {
      if (a.healthy === b.healthy) {
        return 0;
      }
      if (order === "down") {
        if (a.healthy && !b.healthy) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a.healthy && !b.healthy) {
          return -1;
        } else {
          return 1;
        }
      }
    },
    [order]
  );

  const filterer = useCallback(
    (s: Service) => (filter === "down" ? !s.healthy : s.healthy),
    [filter]
  );

  const sorted = order === "unordered" ? services : [...services].sort(sorter);
  const filtered = filter === "unfiltered" ? sorted : sorted.filter(filterer);

  return (
    <div
      className={`flex items-center flex-col gap-4
      h-full rounded-md px-2
      text-slate-700
        sm:overflow-y-auto sm:text-xl
      `}
    >
      {filtered.map((service) => (
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
