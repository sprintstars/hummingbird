import fs from "node:fs/promises";
import path from "node:path";
import { isServicesArray, type Service, tryParseJson } from "@/lib/util";

const jsonLocation = path.resolve("data/mockBackend.json");

type ServiceEndpoints = {
  name: string;
  url: string;
  strategy: "ping";
};

const urls: ServiceEndpoints[] = [
  {
    name: "netflify",
    url: "https://www.netlifystatus.com/",
    strategy: "ping",
  },
  {
    name: "auth0",
    url: "https://status.auth0.com/",
    strategy: "ping",
  },
  {
    name: "twilio",
    url: "https://status.twilio.com/",
    strategy: "ping",
  },
  {
    name: "google",
    url: "http://localhost:3000/api/fakeService",
    strategy: "ping",
  },
  {
    name: "sentry",
    url: "https://status.sentry.io/",
    strategy: "ping",
  },
];

const ping = async (url: string) => {
  const response = await fetch(url);
  return response.ok;
};

const strategies = {
  ping,
};

const readServices = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const services = tryParseJson<Service[]>(data, isServicesArray);
    return services;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    console.log(message);
    return null;
  }
};

const writeServices = async (services: Service[]) => {
  try {
    return fs.writeFile(jsonLocation, JSON.stringify(services), "utf-8");
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    console.log(message);
    return;
  }
};

type Strategy = (url: string) => Promise<boolean>;

const getHealth = (strategy: Strategy, url: string) => {
  return strategy(url);
};

// When the CRON runs this handler
// Update the health on the mock backend.json
export const GET = async (req: Request) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  const services = await readServices(jsonLocation);

  if (services === null) {
    console.log("There was an error while reading the backend");
    return;
  }

  // Get the name by looping through the array
  for (let i = 0; i < urls.length; i++) {
    const name = urls[i].name;
    const url = urls[i].url;

    const strategy = strategies[urls[i].strategy];

    // PGet the health of the endpoint
    const healthy = await getHealth(strategy, url);

    // run the update health function
    updateHealth(services, name, healthy);
  }

  await writeServices(services);
  return new Response("ok");
};

const updateHealth = async (
  services: Service[],
  name: string,
  healthy: boolean,
) => {
  const serviceIndexToUpdate = services.findIndex(
    (serviceObject) => serviceObject.name === name,
  );

  if (serviceIndexToUpdate < 0) {
    return console.log(`Could not find the service called ${name}`);
  }

  const updatedService = { name, healthy, timestamp: Date.now() };
  services[serviceIndexToUpdate] = updatedService;
};
