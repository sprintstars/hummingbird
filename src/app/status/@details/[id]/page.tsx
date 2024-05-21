import Link from "next/link";
import { StatusDetails } from "@/components/ServiceDetails";
import { API } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

const StatusDetailsView = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`${API}/services/${params.id}`, { cache: "no-cache" });
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
        history={body.payload.history}
      />
    </>
  );
};

export default StatusDetailsView;
