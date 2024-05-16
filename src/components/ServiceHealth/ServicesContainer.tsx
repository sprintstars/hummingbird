"use client";

import { useCallback, useEffect, useState } from "react";
import ServiceList from "./ServiceList";
import ServiceDetails from "./ServiceDetails";
import { type Service } from "@/lib/utils";
import QuickFilterButton from "./QuickButtons";

const address = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/services`;

const ServicesContainer = () => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("unhealthy first");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services?.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <>
      <div className="col-start-2 col-span-4 md:col-start-1 md:col-span-3 md:mx-12  ">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <QuickFilterButton
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterValue="unhealthy first"
          buttonText="Unhealthy First"
        />
        <QuickFilterButton
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterValue="healthy first"
          buttonText="Healthy First"
        />
      </div>

      <div className="col-start-1 col-span-6 md:col-span-3 row-start-5 row-span-1 md:row-start-3 md:row-span-4">
        {filteredServices ? (
          <ServiceList list={filteredServices} selectedFilter={selectedFilter} />
        ) : (
          <div className="text-slate-200 w-[25rem] mx-auto">Loading...</div>
        )}
      </div>
      <ServiceDetails
        setSelectedFilter={setSelectedFilter}
        disruptions={disruptions}
        operational={operational}
        selectedFilter={selectedFilter}
      />
    </>
  );
};

export default ServicesContainer;
