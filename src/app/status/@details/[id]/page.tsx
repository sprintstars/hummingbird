import Link from "next/link";
import { StatusDetails } from "@/components/ServiceDetails";
import { API } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import db from "@/lib/db";

const StatusDetailsView = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`${API}/services/${params.id}`, { cache: "no-cache" });
  const dailyResponse = await db.query(
    `
      WITH cte AS (
        SELECT
          extract('day' from "time") AS day,
          COUNT(CASE WHEN NOT healthy THEN 1 END) AS false_count,
          COUNT(*) AS total_count
        FROM status_history
        WHERE "time" >= current_date - interval '11 days' AND service_id = $1
        GROUP BY extract('day' from "time")
      )
      SELECT
        day,
        round(100.0 * false_count / total_count, 2) AS percentage
      FROM cte
      ORDER BY day;
    `,
    [params.id]
  );
  const body = await response.json();
  return (
    <>
      <Link href="/status" className="h-10 p-0 mb-4 text-slate-200 flex items-center">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      <StatusDetails
        id={Number(params.id)}
        name={body.payload.name}
        url={body.payload.url}
        history={body.payload.history}
        daily={dailyResponse.rows}
      />
    </>
  );
};

export default StatusDetailsView;
