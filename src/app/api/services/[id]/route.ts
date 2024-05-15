import db from "@/lib/db";
import { isServicesArray, makeResponseBody } from "@/lib/utils";

type ReqOptions = { params: { id: string } };

const headers = { "Content-Type": "application/json" };

export const GET = async (_: Request, { params }: ReqOptions) => {
  try {
    const data = await db.query(`
    SELECT name, healthy, time
    FROM status_history
    JOIN services on service_id = services.id
    WHERE service_id = ${params.id}
    ORDER BY time DESC;
    `);

    if (data.rows.length === 0) {
      return new Response(
        makeResponseBody("not found", `Could not find the service for id ${params.id}`),
        { status: 404, headers }
      );
    }

    if (!isServicesArray(data.rows)) {
      return new Response(makeResponseBody("error", "There was a problem with the database"), {
        status: 500,
        headers,
      });
    }

    const statusHistory = {
      name: data.rows[0].name,
      history: data.rows.map(({ healthy, time }) => ({ healthy, time })),
    };

    return new Response(makeResponseBody("ok", statusHistory), { headers });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    return new Response(makeResponseBody("error", message), { status: 500, headers });
  }
};
