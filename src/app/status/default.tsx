"use client";

import { useState } from "react";
import { StatusList } from "@/components/ServiceStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Primitives/Select";

// types
import type { Order, Filter } from "@/components/ServiceStatus";

export default function ServicesChildren() {
  const [order, setOrder] = useState<Order>("down");
  const [filter, setFilter] = useState<Filter>("unfiltered");
  return (
    <>
      <div className="flex items-center gap-2 h-10 p-2">
        <label className="flex-auto">
          Order
          <Select value={order}>
            <SelectTrigger>
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem
                className="cursor-pointer hover:bg-foreground hover:text-background"
                value="up"
              >
                Up
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-foreground hover:text-background"
                value="down"
              >
                Down
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-foreground hover:text-background"
                value="unordered"
              >
                Unordered
              </SelectItem>
            </SelectContent>
          </Select>
        </label>
        <label className="flex-auto">
          Filter
          <Select value={filter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem
                className="cursor-pointer hover:bg-foreground hover:text-background"
                value="up"
              >
                Up
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-foreground hover:text-background"
                value="down"
              >
                Down
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-foreground hover:text-background"
                value="unfiltered"
              >
                Unfiltered
              </SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>
      <StatusList order={order} filter={filter} />
    </>
  );
}
