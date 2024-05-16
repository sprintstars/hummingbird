import type { FunctionComponent, ReactNode } from "react";
import { useState } from "react"; // Import useState directly

interface ServiceDetailsProps {
  disruptions: number;
  operational: number;
  setSelectedFilter: (value: string) => void; // added selectedFilter prop
  selectedFilter: string;
}

const ServiceDetails: FunctionComponent<ServiceDetailsProps> = ({
  disruptions,
  operational,
  setSelectedFilter,
  selectedFilter,
}) => {
  const handleDisruptionsClick = () => {
    setSelectedFilter("unhealthy first"); // Call setSelectedFilter
  };

  const handleOperationalClick = () => {
    setSelectedFilter("healthy first");
  };

  return (
    <div className="font-museoModerno grid grid-cols-[3fr_1fr] text-right mx-auto md:grid-cols-2 col-start-1 col-span-6 md:col-start-4 md:col-span-3 gap-[5vh] row-start-3 row-span-2 md:row-start-3 md:row-span-3 px-10 content-around text-3xl text-slate-200">
      <span
        onClick={handleDisruptionsClick}
        className={`cursor-pointer  ${disruptions > 0 ? "text-red-400 font-bold" : ""} ${
          selectedFilter === "unhealthy first" ? "underline" : ""
        }`}
      >
        Disruptions
      </span>
      <span className={`flex items-center ${disruptions > 0 ? "text-red-400 font-bold" : ""}`}>
        {disruptions}
      </span>
      <span>Recently Resolved</span>
      <span className="flex items-center">0</span>
      <span
        onClick={handleOperationalClick}
        className={`cursor-pointer ${selectedFilter === "healthy first" ? "underline" : ""}`}
      >
        Fully Operational
      </span>
      <span className="flex items-center">{operational}</span>
    </div>
  );
};

export default ServiceDetails;
