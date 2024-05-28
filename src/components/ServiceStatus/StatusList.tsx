"use client";

import { useCallback } from "react";
import { useServicesContext } from "@/lib/context/services";
import Status from "./Status";
import { ScrollArea } from "@/components/Primitives/Scrollbar";

// types
import type { FunctionComponent } from "react";
import type { ServiceHistory } from "@/lib/utils";
import Link from "next/link";

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
    <>
      <ScrollArea className="shadow-ib">
        <div
          className={`flex items-center flex-col gap-4
      h-full rounded-md px-2
      text-slate-700
        colbp:text-xl
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
      <Link
        className="relative mx-auto max-w-96 p-1 border-4 border-transparent w-[95%] rounded-md text-center bg-service-up"
        href="/status/create"
      >
        <div
          className={`
      flex items-center flex-col gap-4
      h-full rounded-md px-2
    text-slate-700
        colbp:text-xl`}
        >
          <button
            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            title="Add New"
          >
            <svg
              className="stroke-teal-500 fill-none group-active:stroke-teal-200 group-active:duration-0 duration-300"
              viewBox="0 0 24 24"
              height="50px"
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="1.5"
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              ></path>
              <path strokeWidth="1.5" d="M8 12H16"></path>
              <path strokeWidth="1.5" d="M12 16V8"></path>
            </svg>
          </button>
        </div>
      </Link>
    </>
  );
};

export default StatusList;
