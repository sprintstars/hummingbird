import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Primitives/Tooltip";

import type { FunctionComponent } from "react";

interface StatusHistoryProps {
  name: string;
  health: boolean[];
  times: Date[];
}

const StatusHistory: FunctionComponent<StatusHistoryProps> = ({ name, health, times }) => {
  return (
    <div className="flex flex-row-reverse gap-[3px] pb-8">
      {times.map((time, i) => {
        return (
          <TooltipProvider key={`${name}-${i}`} delayDuration={50} skipDelayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`h-6 flex-1 shadow-lg rounded-sm ${
                    health[i] ? "bg-emerald-300" : "bg-service-down"
                  } hover:shadow-2xl`}
                ></div>
              </TooltipTrigger>
              <TooltipContent className="bg-background">
                <p className="text-foreground">{new Date(time).toLocaleTimeString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default StatusHistory;
