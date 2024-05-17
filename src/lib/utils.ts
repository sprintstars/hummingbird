// ShadCN
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data
export const API = `${process.env.NEXT_PUBLIC_HOSTNAME}/api`;

// Domain models
export type Service = {
  id: number;
  name: string;
  time: Date;
  healthy: boolean;
};

export type UpdateStrategy = "ping" | "rss" | "json";

export type ServiceEndpoint = {
  id: number;
  name: string;
  url: string;
  strategy: UpdateStrategy;
};

// Type guards
export type Validator<T> = (obj: any) => obj is T;

export const isService: Validator<Service> = (o: any): o is Service =>
  typeof o.id === "number" &&
  typeof o.name === "string" &&
  o.time instanceof Date &&
  typeof o.healthy === "boolean";

export const isServicesArray: Validator<Service[]> = (o: any): o is Service[] => {
  if (Array.isArray(o)) {
    return o.map(isService).every(Boolean);
  }
  return false;
};

export const isServiceEndpoint: Validator<ServiceEndpoint> = (o: any): o is ServiceEndpoint =>
  typeof o.id === "number" &&
  typeof o.name === "string" &&
  typeof o.url === "string" &&
  (o.strategy === "ping" || o.strategy === "rss" || o.strategy === "json");

export const isServiceEnpointArray: Validator<ServiceEndpoint[]> = (
  o: any
): o is ServiceEndpoint[] => {
  if (Array.isArray(o)) {
    return o.map(isServiceEndpoint).every(Boolean);
  }
  return false;
};

// Util functions
export const makeResponseBody = (status: "ok" | "error" | "not found", payload?: any) =>
  JSON.stringify({
    status,
    payload,
  });

export const tryParseJson = <T>(jsonStr: string, validator: Validator<T>): T | null => {
  try {
    const parsed = JSON.parse(jsonStr);
    if (validator(parsed)) {
      return parsed;
    }
    return null;
  } catch (e) {
    return null;
  }
};
