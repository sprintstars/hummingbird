import Link from "next/link";
import { FunctionComponent } from "react";

export const revalidate = 60;

type ServiceProps = {
  id: number;
  name: string;
  healthy: boolean;
};

const Service: FunctionComponent<ServiceProps> = ({ id, name, healthy }) => {
  const bg = healthy ? "bg-teal-50" : "bg-rose-400";
  const even = !(id & 1);
  const h = even ? "6" : "20";
  return (
    <Link
      href={`/status/${id}`}
      className={`w-full h-${h} flex-auto content-center rounded-sm p-2 text-center ${bg}`}
    >
      {name}
    </Link>
  );
};

export default function ServicesChildren() {
  return (
    <div className="sm:overflow-y-auto rounded-md flex-1 flex flex-wrap-reverse items-center flex-col gap-4 px-2 text-slate-700">
      <Service id={1} name="netlify" healthy={true} />
      <Service id={2} name="auth0" healthy={true} />
      <Service id={3} name="aws" healthy={true} />
      <Service id={4} name="twilio" healthy={false} />
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
    </div>
  );
}
