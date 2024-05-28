"use client";

import {
  type FunctionComponent,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { isServiceHistoryArray, type ServiceHistory } from "../utils";
import { createClient } from "../supabase/client";

const servicesEndpoint = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/services`;

type ServicesContextProviderProps = {
  init: ServiceHistory[];
  children: React.ReactNode;
};

const ServicesContext = createContext<{ services: ServiceHistory[]; refresh: () => void } | null>(
  null
);

const ServicesContextProvider: FunctionComponent<ServicesContextProviderProps> = ({
  children,
  init,
}) => {
  const [services, setServices] = useState<ServiceHistory[]>(init);

  const refresh = useCallback(() => {
    console.log("reloading...");
    window.location.href = "/status";
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const response = await fetch(`${servicesEndpoint}?user=${user.id}&limit=48`);
        const body = await response.json();
        if (body.status === "ok") {
          const services = body.payload;
          for (const service of services) {
            service.history_times = service.history_times.map((time: string) => new Date(time));
          }
          if (isServiceHistoryArray(services)) {
            setServices(services);
          }
        } else {
          console.error("There's a problem fetching the services");
        }
      } else {
        window.location.reload();
      }
    };
    const timeoutId = setTimeout(fetchServices, 300_000);
    return () => clearTimeout(timeoutId);
  }, [services]);
  return (
    <ServicesContext.Provider value={{ services, refresh }}>{children}</ServicesContext.Provider>
  );
};

const useServicesContext = () => {
  const cxs = useContext(ServicesContext);
  if (cxs === null) {
    throw new Error("useServices cannot be used outside of the ServicesContextProvider");
  }
  return cxs;
};

export { ServicesContextProvider, useServicesContext };
