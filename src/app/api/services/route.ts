import db from "@/lib/db";
import { isServiceHistoryArray, makeResponseBody } from "@/lib/utils";

const headers = { "Content-Type": "application/json" };

const revalidation = process.env.NODE_ENV === "development" ? 0 : 300;
export const revalidate = revalidation;

// `
//       WITH status_history_cte AS (
//         SELECT
//           sh.service_id,
//           ARRAY_AGG(sh.time ORDER BY sh.time DESC) as history_times,
//           ARRAY_AGG(sh.healthy ORDER BY sh.time DESC) as history_health
//         FROM
//           status_history sh
//         GROUP BY
//           sh.service_id
//         LIMIT 10
//       )
//       SELECT
//         s.id,
//         s.name,
//         sh_cte.history_times,
//         sh_cte.history_health
//       FROM
//         services s
//       JOIN
//         status_owners so ON s.id = so.service_id
//       JOIN
//         status_history_cte sh_cte ON s.id = sh_cte.service_id
//       WHERE
//         so.user_id = $1
//     `,

export const GET = async (req: Request) => {
  const requestURL = new URL(req.url);
  const userID = requestURL.searchParams.get("id");
  const limit = requestURL.searchParams.get("limit") ?? 12;
  try {
    const data = await db.query(
      `
SELECT
  s.id,
  s.name,
  (
    SELECT ARRAY (
      SELECT sh.time
      FROM
        status_history sh
      WHERE
        sh.service_id = s.id
      ORDER BY sh.time DESC
      LIMIT $2
    ) as time
  ) AS history_times,
  (
    SELECT ARRAY (
      SELECT sh.healthy
      FROM
        status_history sh
      WHERE
        sh.service_id = s.id
      ORDER BY sh.time DESC
      LIMIT $2
    ) as time
  ) AS history_health
FROM
  services s
  JOIN status_owners so ON s.id = so.service_id
WHERE
  so.user_id = $1
    `,
      [userID, limit]
    );
    const services = data.rows;
    if (!isServiceHistoryArray(services)) {
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
