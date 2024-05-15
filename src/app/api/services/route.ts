import db from "@/lib/db";
import { isServicesArray, makeResponseBody } from "@/lib/utils";

const headers = { "Content-Type": "application/json" };

export const GET = async (req: Request) => {
  try {
    const data = await db.query(`
    SELECT DISTINCT on (name)
      name, healthy, time
    FROM services
    JOIN status_history on services.id = status_history.service_id
    ORDER BY name, time DESC;
    `);
    const services = data.rows;
    if (!isServicesArray(services)) {
      return new Response(
        makeResponseBody("error", "There was a problem validating the data from the database"),
        { status: 500, headers }
      );
    }
    if (services.length === 0) {
      return new Response(
        makeResponseBody("error", "There is no service status history in the database"),
        { status: 404, headers }
      );
    }
    return new Response(makeResponseBody("ok", services), { headers });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    return new Response(makeResponseBody("error", message), { status: 500, headers });
  }
};
