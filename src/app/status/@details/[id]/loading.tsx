import Link from "next/link";
import { FunctionComponent } from "react";

interface StatusLoadingProps {}

const StatusLoading: FunctionComponent<StatusLoadingProps> = () => {
  return (
    <>
      <Link href="/status" className="text-right px-4 text-slate-200">
        Back
      </Link>
      <div className="w-full flex-1 rounded-md p-4 bg-slate-100">Loading...</div>
    </>
  );
};

export default StatusLoading;
