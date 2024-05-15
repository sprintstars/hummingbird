"use client";

import { useCallback, useEffect, useState } from "react";
import ServiceList from "./ServiceList";
import ServiceDetails from "./ServiceDetails";
import { type Service } from "@/lib/utils";

const address = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/services`;

const ServicesContainer = () => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [sortHealthyFirst, setSortHealthyFirst] = useState(false); // state for sort order

  const disruptions = services
    ? services.reduce((sum, service) => (service.healthy ? sum : sum + 1), 0)
    : 0;

  const operational = services
    ? services.reduce((sum, service) => (service.healthy ? sum + 1 : sum), 0)
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

  // fully operational sorting order
  const toggleSortHealthyFirst = () => {
    setSortHealthyFirst(true);
  };

  const toggleDisruptionsFirst = () => {
    setSortHealthyFirst(false);
  };

  return (
    <>
      <div className="col-start-2 col-span-4 md:col-start-1 md:col-span-3 md:mx-12 px-3 border border-slate-500 rounded-lg text-slate-200">
        Ordering & Filtering
      </div>
      <div className="col-start-1 col-span-6 md:col-span-3 row-start-5 row-span-1 md:row-start-3 md:row-span-4">
        {services ? (
          <ServiceList list={services} sortHealthyFirst={sortHealthyFirst} />
        ) : (
          <div className="text-slate-200 w-[25rem] mx-auto">Loading...</div>
        )}
      </div>
      <ServiceDetails
        disruptions={disruptions}
        operational={operational}
        onOperationalClick={toggleSortHealthyFirst}
        onDisruptionsClick={toggleDisruptionsFirst}
      />
    </>
  );
};

export default ServicesContainer;
