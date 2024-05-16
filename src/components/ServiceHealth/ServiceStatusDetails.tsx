import { FunctionComponent } from "react";

interface StatusDetailsProps {
  id: number;
  name: string;
  history: {
    time: Date;
    healthy: boolean;
  }[];
}

const StatusDetails: FunctionComponent<StatusDetailsProps> = ({ id, name, history }) => {
  return (
    <div className="w-full flex-1 rounded-md p-4 bg-slate-100">
      <div>id: {id}</div>
      <div>name: {name}</div>
      <div>{JSON.stringify(history)}</div>
    </div>
  );
};

export default StatusDetails;
