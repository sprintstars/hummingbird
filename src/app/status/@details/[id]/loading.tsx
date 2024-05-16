import { FunctionComponent } from "react";

interface StatusLoadingProps {}

const StatusLoading: FunctionComponent<StatusLoadingProps> = () => {
  return (
    <div className="border-4 border-transparent bg-slate-300 flex-[2] rounded-md p-4 text-slate-900">
      Loading...
    </div>
  );
};

export default StatusLoading;
