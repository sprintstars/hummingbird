"use client";

import { useServicesContext } from "@/lib/context/services";
import { useRouter } from "next/navigation";

type StatusSummaryProps = {
  searchParams: { message: string };
};

const StatusSummary = ({ searchParams }: StatusSummaryProps) => {
  const { services, refresh } = useServicesContext();
  const router = useRouter();
  const disruptions = services.reduce(
    (sum, service) => (service.history_health[0] ? sum : sum + 1),
    0
  );
  const operational = services.reduce(
    (sum, service) => (service.history_health[0] ? sum + 1 : sum),
    0
  );
  const resolved = services.reduce((sum, service) => {
    const currentHealth = service.history_health[0];
    if (currentHealth === false) return sum;
    for (const health of service.history_health) {
      if (health === false) {
        return sum + 1;
      }
    }
    return sum;
  }, 0);

  if (searchParams.message) {
    refresh();
    router.push("/status");
  }

  return (
    <>
      {searchParams.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
      <div
        className={`grid grid-cols-[3fr_1fr] gap-[5vh] content-around
          colbp:grid-cols-2
        col-start-1 col-span-6 row-start-3 row-span-2
          colbp:col-start-4 colbp:col-span-3 colbp:row-start-3 colbp:row-span-3
        h-full mx-auto px-10
        text-right text-3xl text-foreground
        lg:text-[3vw]
        `}
      >
        <span className={`${disruptions > 0 ? "text-service-down font-bold" : ""}`}>
          Disruptions
        </span>
        <span
          className={`flex items-center ${
            disruptions > 0
              ? "text-service-down font-bold text-5xl lg:text-[3.5vw]"
              : "lg:text-[3vw]"
          }`}
        >
          {disruptions}
        </span>
        <span>Resolved</span>
        <span className="flex items-center">{resolved}</span>
        <span>Operational</span>
        <span className="flex items-center">{operational}</span>
      </div>
    </>
  );
};

export default StatusSummary;
