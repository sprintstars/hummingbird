import Link from "next/link";
import { StatusDetails } from "@/components/ServiceDetails";
import { API } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import db from "@/lib/db";

const StatusDetailsView = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`${API}/services/${params.id}`, { cache: "no-cache" });
  const dailyResponse = await db.query(
    `
    with counts as (
      select
        to_char(status_history.time, 'MM-DD') "day",
        count(CASE WHEN NOT healthy THEN 1 END) AS false_count,
        count(*) AS total_count
      from
        status_history
      where
        status_history.time > current_timestamp - interval '28 days' AND service_id = $1
      group by
        1
      order by
        1
    )
    select
      day,
      round(100.0 * false_count / total_count, 2) AS percentage
    from counts
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
