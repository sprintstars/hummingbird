// ShadCN
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data
export const API = `${process.env.NEXT_PUBLIC_HOSTNAME}/api`;

// Data Types
export type Ok<T> = {
  tag: "Result.Ok";
} & T;

export type Err<T> = {
  tag: "Result.Err";
} & T;

export type Result<T, U> = Ok<T> | Err<U>;

// Domain models
export type Service = {
  id: number;
  name: string;
  url: string;
  time: Date;
  healthy: boolean;
};

export type ServiceHistory = {
  id: number;
  name: string;
  url: string;
  history_times: Date[];
  history_health: boolean[];
};

export type ServiceDailyAverage = {
  date: string;
  downtime_percentage: number;
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

export const isArrayOf =
  <T>(validtor: Validator<T>) =>
  (o: any): o is T[] => {
    if (Array.isArray(o)) {
      return o.map(validtor).every(Boolean);
    }
    return false;
  };
export const isDate: Validator<Date> = (o: any): o is Date => o instanceof Date;
export const isDateArray: Validator<Date[]> = isArrayOf(isDate);
export const isBoolean: Validator<boolean> = (o: any): o is boolean => typeof o === "boolean";
export const isBooleanArray: Validator<boolean[]> = isArrayOf(isBoolean);

export const isService: Validator<Service> = (o: any): o is Service =>
  typeof o.id === "number" &&
  typeof o.name === "string" &&
  typeof o.url === "string" &&
  o.time instanceof Date &&
  typeof o.healthy === "boolean";

export const isServiceArray: Validator<Service[]> = isArrayOf(isService);

export const isServiceHistory: Validator<ServiceHistory> = (o: any): o is ServiceHistory =>
  typeof o.id === "number" &&
  typeof o.name === "string" &&
  typeof o.url === "string" &&
  isDateArray(o.history_times) &&
  isBooleanArray(o.history_health);

export const isServiceHistoryArray: Validator<ServiceHistory[]> = isArrayOf(isServiceHistory);

export const isServiceEndpoint: Validator<ServiceEndpoint> = (o: any): o is ServiceEndpoint =>
  typeof o.id === "number" &&
  typeof o.name === "string" &&
  typeof o.url === "string" &&
  (o.strategy === "ping" || o.strategy === "rss" || o.strategy === "json");

export const isServiceEnpointArray: Validator<ServiceEndpoint[]> = isArrayOf(isServiceEndpoint);

export const isServiceDailyAverage: Validator<ServiceDailyAverage> = (
  o: any
): o is ServiceDailyAverage =>
  typeof o.date === "string" &&
  o.date.length === 5 &&
  typeof o.downtime_percentage === "number" &&
  o.downtime_percentage < 100;

export const isServiceDailyAverageArray: Validator<ServiceDailyAverage[]> =
  isArrayOf(isServiceDailyAverage);

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

export const assignOk = <T>(o: T): Ok<T> =>
  Object.defineProperty<T>(o, "tag", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: "Result.Ok",
  }) as Ok<T>;

export const assignErr = <T>(o: T): Err<T> =>
  Object.defineProperty<T>(o, "tag", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: "Result.Err",
  }) as Err<T>;
