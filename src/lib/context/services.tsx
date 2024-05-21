"use client";

import { type FunctionComponent, createContext, useContext, useState, useEffect } from "react";
import type { ServiceHistory } from "../utils";

const servicesEndpoint = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/services`;

type ServicesContextProviderProps = {
  init: ServiceHistory[];
  children: React.ReactNode;
};

const ServicesContext = createContext<{ services: ServiceHistory[] } | null>(null);

const ServicesContextProvider: FunctionComponent<ServicesContextProviderProps> = ({
  children,
  init,
}) => {
  const [services, setServices] = useState<ServiceHistory[]>(init);
  useEffect(() => {
    const fetchServices = () => {
      // const response = await fetch(servicesEndpoint);
      // const body = await response.json();
      // setServices(body.payload);
      // setServices(
      //   services.map((service) => ({ ...service, healthy: Math.random() > 0.5 ? true : false }))
      // );
      return services;
    };
    const intervalID = setTimeout(fetchServices, 100_000);
    return () => clearTimeout(intervalID);
  }, [services]);
  return <ServicesContext.Provider value={{ services }}>{children}</ServicesContext.Provider>;
};

const useServicesContext = () => {
  const services = useContext(ServicesContext);
  if (services === null) {
    throw new Error("useServices cannot be used outside of the ServicesContextProvider");
  }
  return services;
};

export { ServicesContextProvider, useServicesContext };
