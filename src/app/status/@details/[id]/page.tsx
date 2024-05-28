import Link from "next/link";
import { StatusDetails } from "@/components/ServiceDetails";
import { ChevronLeft } from "lucide-react";
import { getOneDailyAverageDowntime } from "@/lib/db";

type ServiceDetailsViewProps = {
  params: { id: string };
};

const StatusDetailsView = async ({ params }: ServiceDetailsViewProps) => {
  const serviceId = Number.parseInt(params.id, 10);

  if (!Number.isInteger(serviceId)) {
    return (
      <div className="flex-1 flex flex-col h-full rounded-md p-4 bg-foreground">
        Malformed id...
      </div>
    );
  }

  const dailyAverageDowntime = await getOneDailyAverageDowntime(serviceId, 28);

  return (
    <>
      <Link href="/status" className="h-10 p-0 mb-4 text-slate-200 flex items-center">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      {dailyAverageDowntime.tag === "Result.Ok" ? (
        <StatusDetails id={Number(params.id)} dailyAverages={dailyAverageDowntime} />
      ) : (
        <div className="flex-1 flex flex-col h-full rounded-md p-4 bg-foreground">
          There was a problem fetching averages from the database...
          {dailyAverageDowntime.message}
        </div>
      )}
    </>
  );
};

export default StatusDetailsView;
