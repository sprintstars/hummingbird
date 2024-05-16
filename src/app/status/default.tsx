import type { Service } from "@/lib/utils";
import Link from "next/link";
import { FunctionComponent } from "react";

export const revalidate = 60;

type ServiceListProps = {
  services: Service[];
  children: React.ReactNode;
};

type ServiceProps = {
  id: number;
  name: string;
  healthy: boolean;
};

const healthyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="size-10 my-1">
    <path
      fillRule="evenodd"
      fill="rgb(51,204,165)"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

const unhealthyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#fefefe"
    className="size-10 my-1"
  >
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      clipRule="evenodd"
    />
  </svg>
);

const ServiceList: FunctionComponent<ServiceListProps> = ({ services, children }) => {
  return (
    <div className="sm:overflow-y-auto rounded-md flex-1 flex items-center flex-col gap-4 px-2 text-slate-700">
      {children}
    </div>
  );
};

const Service: FunctionComponent<ServiceProps> = ({ id, name, healthy }) => {
  const bg = healthy ? "bg-teal-50" : "bg-rose-400";
  const even = !(id & 1);
  const h = even ? "6" : "20";
  return (
    <Link
      href={`/status/${id}`}
      className={`flex items-center w-full h-${h} flex-auto content-center rounded-md p-2 text-center ${bg}`}
    >
      {healthy ? healthyIcon : unhealthyIcon}
      <span className="flex-1 pr-4">{name}</span>
    </Link>
  );
};

export default function ServicesChildren() {
  return (
    <ServiceList>
      <Service id={1} name="netlify" healthy={true} />
      <Service id={4} name="twilio" healthy={false} />
      <Service id={2} name="auth0" healthy={true} />
      <Service id={3} name="aws" healthy={true} />
      <Service id={5} name="azure" healthy={true} />
      <Service id={6} name="vercel" healthy={true} />
      <Service id={7} name="sentry" healthy={true} />
      <Service id={8} name="pingdom" healthy={true} />
      <Service id={9} name="supabase" healthy={true} />
      <Service id={9} name="one two" healthy={true} />
      <Service id={9} name="two three" healthy={true} />
      <Service id={9} name="three four" healthy={true} />
      <Service id={9} name="five six" healthy={true} />
      <Service id={9} name="six seven" healthy={true} />
      <Service id={9} name="seven eight" healthy={true} />
      <Service id={9} name="eight nine" healthy={false} />
      <Service id={9} name="nine ten" healthy={true} />
    </ServiceList>
  );
}
