"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import ServiceList, { type ServiceStatus } from "./ServiceList";
import { type Service } from "@/lib/util";

const address = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/services`;

const ServicesContainer = () => {
  const [services, setServices] = useState<Service[] | null>(null);

  const disruptions = services
    ? services.reduce(
      (sum, service) => (service.healthy ? sum : sum + 1),
      0,
    )
    : 0;

  const operational = services
    ? services.reduce(
      (sum, service) => (service.healthy ? sum + 1 : sum),
      0,
    )
    : 0;

  const fetchData = useCallback(async () => {
    const response = await fetch(address);
    const body = await response.json();
    setServices(body.payload);
  }, []);

  useEffect(() => {
    fetchData();
    const intervalID = setInterval(() => {
      fetchData();
    }, 100_000);

    return () => clearInterval(intervalID);
  }, [fetchData]);

  return (
    <>
      <div className="col-start-2 col-span-4 md:col-start-1 md:col-span-3 md:mx-12 px-3 border border-slate-500 rounded-lg text-slate-200">
        Ordering & Filtering
      </div>
      <div className="col-start-1 col-span-6 md:col-span-3 row-start-5 row-span-1 md:row-start-3 md:row-span-4">
        {services
          ? <ServiceList list={services} />
          : <div className="text-slate-200 w-[25rem] mx-auto">Loading...</div>}
      </div>
      {/* Details */}
      <div className="font-museoModerno grid grid-cols-[3fr_1fr] text-right mx-auto md:grid-cols-2 col-start-1 col-span-6 md:col-start-4 md:col-span-3 gap-[5vh] row-start-3 row-span-2 md:row-start-3 md:row-span-3 px-10 content-around text-3xl text-slate-200">
        <span
          className={disruptions > 0 ? "text-red-400 font-bold underline" : ""}
        >
          Disruptions
        </span>
        <span
          className={`flex items-center ${
            disruptions > 0 ? "text-red-400 font-bold" : ""
          }`}
        >
          {disruptions}
        </span>
        <span>Recently Resolved</span>
        <span className="flex items-center">0</span>
        <span>Fully Operational</span>
        <span className="flex items-center">
          {operational}
        </span>
      </div>
    </>
  );
};

export default ServicesContainer;