import React from "react";
import { ServicesContainer } from "@/components/ServiceHealth";

const services = [
  {
    name: "Netlify",
    healthy: false,
  },
  {
    name: "Twilio",
    healthy: true,
  },
  {
    name: "Sentry",
    healthy: false,
  },
  {
    name: "Azure",
    healthy: true,
  },
  {
    name: "Supabase",
    healthy: false,
  },
  {
    name: "Clerk",
    healthy: false,
  },
];

export default function Home() {
  return (
    <>
      <ServicesContainer list={services} />
    </>
  );
}
