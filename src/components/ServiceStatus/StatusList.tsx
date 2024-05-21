"use client";

import { useCallback } from "react";
import { useServicesContext } from "@/lib/context/services";
import Status from "./Status";
import { ScrollArea } from "@/components/Primitives/Scrollbar";

// types
import type { FunctionComponent } from "react";
import type { ServiceHistory } from "@/lib/utils";

export type Order = "up" | "down" | "unordered";
export type Filter = "up" | "down" | "unfiltered";

type StatusListProps = {
  order: Order;
  filter: Filter;
  nameFilter: string;
};

const StatusList: FunctionComponent<StatusListProps> = ({ order, filter, nameFilter }) => {
  const { services } = useServicesContext();

  const sorter = useCallback(
    (a: ServiceHistory, b: ServiceHistory) => {
      if (a.history_health[0] === b.history_health[0]) {
        return 0;
      }
      if (order === "down") {
        if (a.history_health[0] && !b.history_health[0]) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a.history_health[0] && !b.history_health[0]) {
          return -1;
        } else {
          return 1;
        }
      }
    },
    [order]
  );

  const filterer = useCallback(
    (s: ServiceHistory) => (filter === "down" ? !s.history_health[0] : s.history_health[0]),
    [filter]
  );

  const nameFilterer = useCallback(
    (s: ServiceHistory) => s.name.toLowerCase().includes(nameFilter.toLowerCase()),
    [nameFilter]
  );

  const sorted = order === "unordered" ? services : [...services].sort(sorter);
  const filtered = filter === "unfiltered" ? sorted : sorted.filter(filterer);
  const nameFiltered = nameFilter === "" ? filtered : filtered.filter(nameFilterer);

  return (
    <ScrollArea>
      <div
        className={`flex items-center flex-col gap-4
      h-full rounded-md px-2
      text-slate-700
        sm:text-xl
      `}
      >
        {nameFiltered.map((service) => (
          <Status
            id={service.id}
            key={`${service.name}-${service.history_health[0]}`}
            name={service.name}
            healthy={service.history_health[0]}
            count={sorted.length}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default StatusList;
