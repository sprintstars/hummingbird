import { db } from "@/lib/db";
import { isServiceEndpoint, makeResponseBody } from "@/lib/utils";

type ReqOptions = { params: { id: string } };
type StrategyFunction = (url: string) => Promise<boolean>;

const headers = { "Content-Type": "application/json" };
const ping = async (url: string) => {
  const response = await fetch(url, { cache: "no-cache" });
  return response.ok;
};

const strategies = {
  ping,
  rss: () => Promise.reject(false),
  json: () => Promise.reject(false),
};

const getEndpoint = async (id: number) => {
  try {
    const response = await db.query("SELECT * FROM services WHERE id = $1", [id]);
    if (response.rows.length > 0 && isServiceEndpoint(response.rows[0])) {
      return response.rows[0];
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

export const GET = async (req: Request, { params }: ReqOptions) => {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const serviceId = Number.parseInt(params.id, 10);

  if (!Number.isInteger(serviceId)) {
    return new Response(
      makeResponseBody(
        "error",
        `The id in the URL is malformed: ${params.id}. It must be an integer`
      ),
      {
        status: 500,
        headers,
      }
    );
  }

  const endpoint = await getEndpoint(serviceId);

  if (!endpoint) {
    return new Response(
      makeResponseBody("error", `Could not find the endpoint with id ${serviceId}`),
      {
        status: 404,
        headers,
      }
    );
  }

  const healthy = await getHealth(ping, endpoint.url);

  try {
    await db.query("INSERT INTO status_history (service_id, healthy, time) VALUES ($1, $2, $3)", [
      serviceId,
      healthy,
      new Date(),
    ]);
    return new Response("ok");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Oops!";
    return new Response(message, { status: 500 });
  }
};
