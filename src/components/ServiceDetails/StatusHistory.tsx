import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Primitives/Tooltip";

import type { FunctionComponent } from "react";

interface StatusHistoryProps {
  name: string;
  history: { time: Date; healthy: boolean }[];
}

const StatusHistory: FunctionComponent<StatusHistoryProps> = ({ name, history }) => {
  return (
    <div className="flex flex-row-reverse gap-[3px] pb-8">
      {history.map((status, i) => {
        return (
          <TooltipProvider key={`${name}-${i}`} delayDuration={50} skipDelayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`h-6 flex-1 shadow-lg rounded-sm ${
                    status.healthy ? "bg-emerald-300" : "bg-service-down"
                  } hover:shadow-2xl`}
                ></div>
              </TooltipTrigger>
              <TooltipContent className="bg-background">
                <p className="text-foreground">{new Date(status.time).toLocaleTimeString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default StatusHistory;
