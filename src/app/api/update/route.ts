import fs from "node:fs/promises";
import path from "node:path";
import {
  isServicesArray,
  makeResponseBody,
  type Service,
  tryParseJson,
} from "@/lib/util";
import { timeStamp } from "node:console";

const jsonLocation = path.resolve("data/mockBackend.json");

const urls = [
  {
    name: "netflify",
    url: "https://www.netlifystatus.com/",
  },
  {
    name: "auth0",
    url: "https://status.auth0.com/",
  },
  {
    name: "twilio",
    url: "https://status.twilio.com/",
  },
  {
    name: "google",
    url: "https://www.google.com/",
  },
  {
    name: "sentry",
    url: "https://status.sentry.io/",
  },
];

export const GET = async (req: Request) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  // When the CRON runs this handler
  // Update the health on the mock backend.json

  // Get the name by looping through the array
  for (let i = 0; i < urls.length; i++) {
    const name = urls[i].name;
    const url = urls[i].url;

    console.log(name, url);

    const pingResponse = await fetch(url);
    const healthy = pingResponse.ok;

    console.log(healthy);

    updateHealth(name, healthy);
  }

  return new Response("ok");

  // Ping the URL associated with that name
  // if the response is status 200 then
  // healthy = true
  // else healthy = false
  // run the update health function
};

const updateHealth = async (name: string, healthy: boolean) => {
  try {
    const data = await fs.readFile(jsonLocation, "utf-8");
    const services = tryParseJson<Service[]>(data, isServicesArray);

    if (services === null) {
      return console.log("There was a problem parsing the services data");
    }

    const serviceIndexToUpdate = services.findIndex(
      (serviceObject) => serviceObject.name === name
    );

    if (serviceIndexToUpdate < 0) {
      return console.log(`Could not find the service called ${name}`);
    }

    const updatedService = { name, healthy, timestamp: Date.now() };

    services[serviceIndexToUpdate] = updatedService;

    await fs.writeFile(jsonLocation, JSON.stringify(services), "utf-8");
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    return console.log(message);
  }
};
