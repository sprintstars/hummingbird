import { getAllServices } from "@/lib/db";
import { makeResponseBody } from "@/lib/utils";

const headers = { "Content-Type": "application/json" };

const revalidation = process.env.NODE_ENV === "development" ? 0 : 300;
export const revalidate = revalidation;

/** Get all services */
export const GET = async (req: Request) => {
  const requestURL = new URL(req.url);
  const userId = requestURL.searchParams.get("user");
  const limit = Number(requestURL.searchParams.get("limit")) ?? 12;

  if (!userId) {
    return new Response(makeResponseBody("error", "A `user` parameter must be supplied"), {
      status: 500,
      headers,
    });
  }

  const services = await getAllServices(userId, limit);

  if (services.tag === "Result.Err") {
    return new Response(makeResponseBody("error", services.message), {
      status: services.code,
      headers,
    });
  }
  return new Response(makeResponseBody("ok", services), { headers });
};
