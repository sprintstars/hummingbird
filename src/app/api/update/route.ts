import { db } from "@/lib/db";
import { isServiceEnpointArray } from "@/lib/utils";

type StrategyFunction = (url: string) => Promise<boolean>;

const ping = async (url: string) => {
  const response = await fetch(url, { cache: "no-cache" });
  return response.ok;
};

const strategies = {
  ping,
  rss: () => Promise.reject(false),
  json: () => Promise.reject(false),
};

const getEndpoints = async () => {
  try {
    const response = await db.query("SELECT * FROM services");
    if (isServiceEnpointArray(response.rows)) {
      return response.rows;
    }
    return null;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    console.log(message);
    return null;
  }
};

const getHealth = (strategy: StrategyFunction, url: string) => {
  return strategy(url);
};

// When the CRON runs this handler
// Append a status_history row for each service in services
export const GET = async (req: Request) => {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  let sql = "INSERT INTO status_history (service_id, healthy, time) VALUES ";

  const endpoints = await getEndpoints();

  if (endpoints === null) {
    return new Response("There was an error while querying the database for service endpoints", {
      status: 500,
    });
  }

  type ServiceStatusDB = {
    service_id: number;
    healthy: boolean;
    time: Date;
  };

  const values: Array<ServiceStatusDB[keyof ServiceStatusDB]> = [];
  const subs: string[] = [];
  let i = 0;

  for (const { id, url, strategy } of endpoints) {
    const colSize = 3;
    const strat = strategies[strategy];
    const healthy = await getHealth(strat, url);

    values.push(id, healthy, new Date());
    subs.push(`($${i * colSize + 1}, $${i * colSize + 2}, $${i * colSize + 3})`);
    i += 1;
  }

  sql += subs.join(", ");
  // Append to status_history
  try {
    await db.query(sql, values);
    return new Response("ok");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Oops!";
    return new Response(message, { status: 500 });
  }
};
