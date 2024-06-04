import { getOneService } from "@/lib/db";
import { makeResponseBody } from "@/lib/utils";

type ReqOptions = { params: { id: string } };

const headers = { "Content-Type": "application/json" };
//GET by id
export const GET = async (req: Request, { params }: ReqOptions) => {
  const requestURL = new URL(req.url);
  const userId = requestURL.searchParams.get("user");
  const limit = Number(requestURL.searchParams.get("limit")) ?? 48;
  const serviceId = Number.parseInt(params.id, 10);

  if (!userId) {
    return new Response(makeResponseBody("error", "A user must be specified"), {
      status: 500,
      headers,
    });
  }

  if (!Number.isInteger(serviceId)) {
    return new Response(makeResponseBody("error", `Malformed resource ${serviceId}`), {
      status: 500,
      headers,
    });
  }

  const result = await getOneService(userId, serviceId, limit);

  if (result.tag === "Result.Err") {
    return new Response(makeResponseBody("error", result.message), {
      status: result.code,
      headers,
    });
  }

  const statusHistory = {
    name: result.name,
    url: result.url,
    history: result.history_times.map((time, i) => ({ healthy: result.history_health[i], time })),
  };

  return new Response(makeResponseBody("ok", statusHistory), { headers });
};
