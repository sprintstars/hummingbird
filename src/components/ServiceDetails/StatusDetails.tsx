"use client";

import { FunctionComponent } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { PencilLine, Trash2 } from "lucide-react";
import StatusHistory from "./StatusHistory";
import { ServiceDailyAverage } from "@/lib/utils";
import { useServicesContext } from "@/lib/context/services";
import { deleteService, editService } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Primitives/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Primitives/Select";
import SubmitButton from "../Primitives/SubmitButton";
import { Input } from "../Primitives/Input";

interface StatusDetailsProps {
  id: number;
  dailyAverages: ServiceDailyAverage[];
}

const StatusDetails: FunctionComponent<StatusDetailsProps> = ({ id, dailyAverages }) => {
  const { services } = useServicesContext();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="flex-1 flex flex-col h-full rounded-md p-4 bg-foreground">
        Could not find a service with id {id}
      </div>
    );
  }

  const dailyUD = dailyAverages.map((item) => {
    return {
      day: item.date,
      down: item.downtime_percentage,
      up: 100 - item.downtime_percentage,
    };
  });
  return (
    <div className="flex-1 flex flex-col h-full rounded-md p-4 colbp:p-16 bg-foreground">
      <header className="flex items-center">
        <span className="text-5xl p-4 text-service-up-fg">{service.name}</span>
        <div className="flex justify-end flex-1 gap-8">
          <Dialog>
            <DialogTrigger>
              <PencilLine />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit {service.name}</DialogTitle>
              </DialogHeader>
              <form className="flex flex-col gap-4">
                <div className="text-white flex flex-col gap-1">
                  <label className="text-white text-md font-medium" htmlFor="name">
                    Name (e.g. Twillio, AWS ...)
                  </label>
                  <Input
                    defaultValue={service.name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Service Name"
                    required
                  />
                </div>

                <div className="text-white flex flex-col gap-1">
                  <label className="text-white text-md font-medium" htmlFor="url">
                    URL
                  </label>
                  <Input
                    type="text"
                    name="url"
                    id="url"
                    defaultValue={service.url}
                    placeholder="https://example.com"
                    required
                  />
                </div>

                <div className="text-white flex flex-col gap-1">
                  <label
                    className="text-white text-md font-medium"
                    htmlFor="strategy"
                    aria-required
                  >
                    Strategy
                  </label>

                  <Select defaultValue="ping" name="strategy">
                    <SelectTrigger>
                      <SelectValue placeholder="Strategy" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem
                        className="cursor-pointer hover:bg-foreground hover:text-background"
                        value="ping"
                      >
                        Ping
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:bg-foreground hover:text-background"
                        value="rss"
                      >
                        RSS
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:bg-foreground hover:text-background"
                        value="json"
                      >
                        JSON
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <SubmitButton formAction={editService} pendingText="Editing...">
                  Edit
                </SubmitButton>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Trash2 />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will unlink you from the service and may delete
                  all of its history.
                </DialogDescription>
              </DialogHeader>
              <form>
                <input type="hidden" name="serviceId" value={id} />
                <SubmitButton
                  className="text-red-400 font-semibold tracking-wider"
                  formAction={deleteService}
                  pendingText="Deleteing..."
                >
                  Delete
                </SubmitButton>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <h3>2 Hour Status History</h3>
      <StatusHistory
        name={service.name}
        health={service.history_health}
        times={service.history_times}
      />
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
        {service.url}
      </div>
    </div>
  );
};

export default StatusDetails;
