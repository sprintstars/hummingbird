"use client";
import { ServiceList } from "@/components/ServiceHealth";

export const revalidate = 60;

export default function ServicesChildren() {
  return (
    <>
      <ServiceList list={services} />
    </>
  );
}
