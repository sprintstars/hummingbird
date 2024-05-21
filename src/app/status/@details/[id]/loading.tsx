import Link from "next/link";
import { FunctionComponent } from "react";
import { ChevronLeft } from "lucide-react";

interface StatusLoadingProps {}

const StatusLoading: FunctionComponent<StatusLoadingProps> = () => {
  return (
    <>
      <Link href="/status" className="h-10 p-0 mb-4 text-slate-200 flex items-center">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="w-full flex-1 rounded-md p-4 bg-slate-100">Loading...</div>
    </>
  );
};

export default StatusLoading;
