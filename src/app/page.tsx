import React from "react";
import { ServicesContainer } from "@/components/ServiceHealth";

const services = [
  { name: "netlify", timestamp: 1715272492681, healthy: true },
  { name: "auth0", timestamp: 1722812400000, healthy: false },
  { name: "twilio", timestamp: 1725490800000, healthy: true },
  { name: "netlify", timestamp: 1715272492681, healthy: true },
  { name: "auth0", timestamp: 1722812400000, healthy: false },
  { name: "netlify", timestamp: 1715272492681, healthy: true },
  { name: "auth0", timestamp: 1722812400000, healthy: false },
  { name: "twilio", timestamp: 1725490800000, healthy: true },
  { name: "netlify", timestamp: 1715272492681, healthy: true },
  { name: "auth0", timestamp: 1722812400000, healthy: false },
];

export default function Home() {
  return (
    <>
      <ServicesContainer list={services} />
    </>
  );
}
