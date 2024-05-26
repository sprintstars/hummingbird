"use client";

import { FunctionComponent } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { PencilLine, Trash2 } from "lucide-react";
import StatusHistory from "./StatusHistory";

interface StatusDetailsProps {
  id: number;
  name: string;
  url: string;
  history: {
    time: Date;
    healthy: boolean;
  }[];
  daily: { day: number; percentage: number }[];
}

const StatusDetails: FunctionComponent<StatusDetailsProps> = ({
  id,
  name,
  url,
  history,
  daily,
}) => {
  const dailyUD = daily.map((item) => {
    return {
      day: item.day,
      down: item.percentage,
      up: 100 - item.percentage,
    };
  });
  return (
    <div className="flex-1 flex flex-col h-full rounded-md p-4 bg-foreground">
      <header className="flex items-center">
        <span className="text-5xl p-4 text-service-up-fg">{name}</span>
        <div className="flex justify-end flex-1 gap-8">
          <PencilLine />
          <Trash2 />
        </div>
      </header>
      <h3>2 Hour Status History</h3>
      <StatusHistory name={name} history={history} />
      <h3>Daily Downtime</h3>
      <ResponsiveContainer width="100%" className="-ml-5 flex-1 min-h-40 h-full">
        <BarChart data={dailyUD}>
          <XAxis
            // label="Days"
            dataKey="day"
            stroke="#888888"
            fontSize={12}
            tickLine={true}
            axisLine={true}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={true}
            axisLine={true}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Bar
            dataKey="down"
            stackId="a"
            fill="#fb6f84"
            radius={[0, 0, 0, 0]}
            className="fill-primary"
          />
          <Bar
            dataKey="up"
            stackId="a"
            fill="#33cca5"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="self-center pb-4 -mt-3">Days</div>
      <div className="text-center text-xl bg-zinc-200 shadow-md rounded-md px-4 py-6 text-service-up-fg">
        {url}
      </div>
      {/* <div>id: {id}</div> */}
      {/* <div>{JSON.stringify(history)}</div> */}
    </div>
  );
};

export default StatusDetails;
