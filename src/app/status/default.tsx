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
import { Input } from "@/components/Primitives/Input";

// types
import type { Order, Filter } from "@/components/ServiceStatus";

export default function ServicesChildren() {
  const [order, setOrder] = useState<Order>("down");
  const [filter, setFilter] = useState<Filter>("unfiltered");
  const [nameFilter, setNameFilter] = useState<string>("");
  return (
    <>
      <div className="flex items-center flex-wrap gap-4 p-2">
        <label className="w-[46%] flex-auto">
          Order
          <Select
            value={order}
            onValueChange={(value) => {
              setOrder(value as Order);
            }}
          >
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
        <label className="w-[46%] flex-auto">
          Filter
          <Select
            value={filter}
            onValueChange={(value) => {
              setFilter(value as Filter);
            }}
          >
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
        <Input
          type="search"
          placeholder="filter by name"
          className="flex-auto text-foreground"
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>
      <StatusList order={order} filter={filter} nameFilter={nameFilter} />
    </>
  );
}
